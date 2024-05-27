import { EventEmitter, Injectable } from "@angular/core";
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { environment } from "environments/environment";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { mergeMap, delay, map, mergeAll, tap } from "rxjs/operators";
import { BehaviorSubject, defer, from, Observable, of } from "rxjs";
// import { CheckIsOnlineService } from "app/ice/services/check-is-online.service";
// import isOnline from "is-online";
import { ToastrService } from "ngx-toastr";
import { FileItem } from "ng2-file-upload";
import { FileUploadingComponent } from "../file-uploading/file-uploading.component";
import { filesize } from "filesize";
@Injectable({
  providedIn: "root",
})
export class UploadService {
  headers: string[] = [];
  private baseUrl = environment.baseURL + "/storage/multipart";
  public speedUpdates: BehaviorSubject<any>;
  private speedArr: number[] = [];
  uploadProgress$ = new EventEmitter<any>();
  finishedProgress$ = new EventEmitter<any>();

  private FILE_CHUNK_SIZE = 10000000; // 10MB  = 10*1000*1000
  private parallelUploads = 2;
  constructor(
    private httpClient: HttpClient,
    // private checkStatus: CheckIsOnlineService,
    private toastr: ToastrService
  ) {
    this.speedUpdates = new BehaviorSubject("");
  }

  //(1)Start Multipart
  private intiateMultipartUpload(httpheader, filePath): Promise<any> {
    console.log(httpheader);
    // const httpParams = new HttpParams()
    //   .set('fileName', encodeURIComponent(params.fileName))
    //   .set('fileType', encodeURIComponent(params.fileType))
    return this.httpClient
      .get(`${this.baseUrl}/start/${filePath}`, { headers: httpheader })
      .toPromise();
  }

  //(3)upload chunk by chunk
  async getData(urlObject, NUM_CHUNKS: number, file, filePath): Promise<any> {
    // console.log(urlObject.url, urlObject.index, filePath);
    var startTime = new Date().getTime();
    let start, end, blob;
    start = (urlObject.index - 1) * this.FILE_CHUNK_SIZE;
    end = urlObject.index * this.FILE_CHUNK_SIZE;
    blob =
      urlObject.index < NUM_CHUNKS ? file.slice(start, end) : file.slice(start);

    const req = new HttpRequest("PUT", urlObject.url.toString(), blob, {
      reportProgress: true,
    });
    return new Promise((resolve, reject) => {
      this.httpClient.request(req).subscribe(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // const currentPresigned = urlObject
            urlObject["ETag"] = event.headers
              .get("ETag")
              .replace(/[|&;$%@"<>()+,]/g, "");
            // debugger;
            urlObject["startTime"] = startTime;
            resolve(urlObject);
          }
        },
        (err) => {
          console.log("Error", err);
          reject(urlObject);
        }
      ); //when internet is turned off
    });
  }

  //Main Function called by component
  async uploadMultipartFile(
    param: any,
    file: any,
    fileUpload: FileUploadingComponent,
    headers: any[],
    queue: FileItem[]
  ) {
    var uploadPartsArray: any = [];
    //Set headers
    let httpheader = new HttpHeaders();
    for (let i = 0; i < headers.length; i++) {
      httpheader = httpheader.set(headers[i].key, headers[i].value);
      // console.log(headers[i].key, headers[i].value);
    }
    var filePath;
    if (param === "") {
      filePath = file.name;
    } else if (param === null) {
      filePath = file.name;
    } else {
      filePath = param + "/" + file.name;
    }

    var startTimeFile: Date = new Date();
    const uploadIdResponse = await this.intiateMultipartUpload(
      httpheader,
      filePath
    );
    this.FILE_CHUNK_SIZE = uploadIdResponse.chunkSize;
    this.parallelUploads = uploadIdResponse.parallelUploads;
    const fileSize = file.size;
    const NUM_CHUNKS = Math.floor(fileSize / this.FILE_CHUNK_SIZE) + 1;
    console.log(
      "Check",
      uploadIdResponse,
      this.parallelUploads,
      this.FILE_CHUNK_SIZE
    );
    //getting all presigned urls for particular file
    const httpParams = new HttpParams()
      .set("totalNumberOfChunks", NUM_CHUNKS.toString())
      .set("uploadId", uploadIdResponse.uploadId);
    const urls: any = await this.httpClient
      .get(`${this.baseUrl}/bulk/${filePath}`, {
        headers: httpheader,
        params: httpParams,
      })
      .toPromise();
    // console.log("uploadUrlPresigned", urls);
    let counter = 1;

    this.chunksUpload(
      urls,
      NUM_CHUNKS,
      file,
      filePath,
      uploadPartsArray,
      counter,
      startTimeFile,
      uploadIdResponse.uploadId,
      fileUpload,
      queue
    );
  }
  //(2)For all urls of a file
  chunksUpload(
    urls,
    NUM_CHUNKS,
    file,
    filePath,
    uploadPartsArray,
    counter,
    startTimeFile,
    uploadId,
    fileUpload,
    queue
  ) {
    // debugger;
    const observables = urls.map((url) =>
      defer(() => this.getData(url, NUM_CHUNKS, file, filePath))
    );
    var total = 0;
    from(observables)
      .pipe(mergeAll(this.parallelUploads))
      .subscribe(
        (val: any) => {
          let successUrl = urls.filter((url) => url.index === val.index);
          successUrl.eTag = val.ETag;
          uploadPartsArray.push({ eTag: val.ETag, partNumber: val.index });
          var time = new Date().getTime() - val.startTime;
          console.log(time, this.FILE_CHUNK_SIZE);
          if (time > 0) {
            var speed = Math.round(
              this.FILE_CHUNK_SIZE / 1000000 / (time / 1000)
            );
            this.speedArr.push(speed);
            console.log(this.speedArr);

            for (let i = 0; i < this.speedArr.length; i++) {
              total += this.speedArr[i];
            }
            console.log("Speed " + total + " mbps");
            this.speedUpdates.next(Math.round(total / this.speedArr.length));
          }
          // uploadPartsArray.push({ "eTag": val.ETag, "partNumber": val.index });
          const percentDone = Math.round((counter / NUM_CHUNKS) * 100);
          counter++;
          this.uploadProgress$.emit({
            progress: percentDone,
            token: file.name,
            success: false,
          });
          console.log(uploadPartsArray);
          if (uploadPartsArray.length === NUM_CHUNKS) {
            this.httpClient
              .post(`${this.baseUrl}/complete/${filePath}`, {
                parts: uploadPartsArray.sort((a, b) => {
                  return a.PartNumber - b.PartNumber;
                }),
                uploadId: uploadId,
              })
              .toPromise()
              .then((res) => {
                Swal.fire(
                  file.name + " file Uploaded Successfully!",
                  "",
                  "success"
                );
                var time = new Date().valueOf() - startTimeFile.valueOf();
                console.log("Time requested", time * 0.001, " seconds");
                Swal.fire({
                  icon: "success",
                  title: "Time Required in seconds",
                  text: time * 0.001,
                  customClass: {
                    confirmButton: "btn btn-success",
                  },
                });
                let n = 100 / queue.length;
                queue.pop(file);
                fileUpload.totalSize = fileUpload.totalSize - file.size;
                console.log("fileUpload.totalSize", fileUpload.totalSize);
                fileUpload.totalfileSize = filesize(fileUpload.totalSize, {
                  base: 10,
                  standard: "jedec",
                });
                fileUpload.progressstatus = 100 - Math.round(n);
                console.log(
                  "fileUpload.progressstatus",
                  fileUpload.progressstatus
                );
                console.log("queue", queue);
                uploadPartsArray = [];
                startTimeFile = new Date();
                this.finishedProgress$.emit({
                  data: "ok",
                  progress: 100,
                  token: file.name,
                  success: true,
                });
              });
          }
        },
        (err) => {
          console.log(err);
          this.toastr.warning(`Offline due to network failure`, "Offline!", {
            positionClass: "toast-top-right",
            toastClass: "toast ngx-toastr",
            closeButton: true,
            progressBar: true,
            timeOut: 1000,
          });
          // var timeInterval = setInterval(() => {
          //   let options = {
          //     timeout: 1000,
          //   };
          //   isOnline(options).then((status) => {
          //     if (status) {
          // debugger;
          // clearInterval(timeInterval);
          this.toastr.success(`Back Online`, "Upload Restarted!", {
            positionClass: "toast-top-right",
            toastClass: "toast ngx-toastr",
            closeButton: true,
            progressBar: true,
            timeOut: 1000,
          });
          // console.log("is online");
          urls = urls.filter((url) => !("ETag" in url));
          this.chunksUpload(
            urls,
            NUM_CHUNKS,
            file,
            filePath,
            uploadPartsArray,
            counter,
            startTimeFile,
            uploadId,
            fileUpload,
            queue
          );
          //     } else {
          //       // console.log("offline");
          //     }
          //   });
          // }, 10000);
        }
      );
  }
}
