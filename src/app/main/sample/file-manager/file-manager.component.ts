import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FileListService } from 'app/ice/storage/storage-service/file-list.service';
import { Observable } from 'rxjs/internal/Observable';
import { FileElement } from '../../../ice/storage/file/model/file-element';
import { ListOfFiles } from '../../../ice/storage/file/model/listOfFiles';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

  fileElements: FileElement[];
  // currentRoot: FileElement;
  currentPath: string;
  currentPathValue: string;
  canNavigateUp = false;
   data 
  done = false;
  closeResult: string;

  constructor( public filelist: FileListService,private modalService: NgbModal,private _coreSidebarService: CoreSidebarService,) {

  }

  pathToValue(){
    this.currentPathValue = this.currentPath.substring(this.currentPath.indexOf('/list/')+5);
  }
  ngOnInit(): void {


    this.filelist.getAllFiles().subscribe((response) => {
     
      this.fileElements = response.listOfFiles;
      this.done = true;
      console.log(this.done);

    });



  }

  // ngAfterViewInit() {
  //   let _this = this;
  //   sidebarToggle: {
  //     click() 
  //     {
  //       _this.toggleSidebar('calendar-main-sidebar');
  //     }
  //   } click() 
  //   {
  //     _this.toggleSidebar('calendar-main-sidebar');
  //   }
  // }

  // addFolder(folder: { name: string }) {
  //   this.fileService.add({ isFolder: true, name: folder.name });
  //   this.updateFileElementQuery();
  // }

  removeElement(element: FileElement) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then((result)=>{
      if(result.value){
        this.filelist.deleteFile(element.fileName).subscribe(res=>{
          console.log(res);
          this.filelist.getAllFiles().subscribe(res=>{
            console.log(res);
            this.fileElements=res.listOfFiles;
          })
        })
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Your Data has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
      }else{
        return;
      }
    })
  
    // .subscribe(response => {
    //   console.log("test delete", response);
    //   //this.updateFileElementQuery();
    //   this.ngOnInit();

    // });

  }

  viewElement(element:FileElement){
    // console.log("target",target);
    //     this.modalService.open(target.target,{
    //       centered:true,
    //     });
    //     console.log("show",target.element);
    // this.filelist.getAllFiles().then((response: FileElement[]) => {
    //   //this.fileElements = response;
    //   console.log("view",response);
    //   response.map((ele)=>
    //   {
    //     if(target.element.size==ele.size)
    //       {
    //         console.log("Elemenet",target.element,ele);
    //         //this.done=target.element.size;
    //         console.log(target.element.size);
    //         this.data= target.element.size;
    //         // return target.element.size;
    //       }
    //   })
 
     // console.log(this.data);
      // this.modalService.open(this.data).result.then((result)=>{
      //   this.closeResult=`${result}`;
      // })
      //if(element.f)
      // this.done = true;
      // console.log(this.done);
      
    // });
   // return this.data;
  }

  
  // viewElement(element:FileElement) {
  //   // this.modalService.open(element).result.then((result) => {
  //   //   this.closeResult = `Closed with: ${result}`;
  //   // }, (reason) => {
  //   //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   // });
  // }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  // moveElement(event: { element: FileElement; moveTo: FileElement }) {
  //   this.fileService.update(event.element.id, { parent: event.moveTo.id });
  //   this.updateFileElementQuery();
  // }

  // renameElement(element: FileElement) {
  //   this.fileService.update(element.id, { name: element.name });
  //   this.updateFileElementQuery();
  // }

  updateFileElementQuery() {
  ///  this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.id : 'root');
  }
  // updateFileElementQuery1() {
  //   this.fileElements = this.fileService.queryInFolder(this.currentRoot ? this.currentRoot.isFolder:false);
  // }
  navigateUp() {
    console.log('up');

    if(this.currentPath.endsWith('/list/')){
      return;
    }
    var str = this.currentPath.substring(0, this.currentPath.lastIndexOf('/'));
    console.log(str);
     str = str.substring(0, str.lastIndexOf('/')+1);
    console.log(str);

    this.currentPath = str;
    this.pathToValue();

    this.filelist.getlist(str).subscribe(response => {
      this.fileElements = response.listOfFiles;
    });

    // if (this.currentRoot && this.currentRoot.parent === 'root') {
    //   this.currentRoot = null;
    //   this.canNavigateUp = false;
    //   this.updateFileElementQuery();
    // } else {
    //   this.currentRoot = this.fileService.get(this.currentRoot.parent);
    //   this.updateFileElementQuery();
    // }
    // this.currentPath = this.popFromPath(this.currentPath);

  }

  navigateToFolder(element: FileElement) {
    console.log("navigate down");
    console.log(element);
    this.currentPath = element.fileDownloadUri;
    this.pathToValue();

    this.filelist.getlist(element.fileDownloadUri).subscribe(response => {
      this.fileElements = response.listOfFiles;
    });



    // this.currentRoot = element;
    // this.updateFileElementQuery();
    // this.currentPath = this.pushToPath(this.currentPath, element.name);
    // console.log("current: ", element.uri)
    // this.filelist.getlist(element.uri).subscribe(response => {
    //   console.log("Data", response);
    //   this.data = response;
    //   this.data.listOfFiles.map((res) => {
    //     this.fileService.add({ name: res.fileName, isFolder: res.directory, parent: 'root', uri: res.fileDownloadUri });
    //     console.log("preet", this.fileService.add({ name: res.fileName, isFolder: res.directory, parent: 'root', uri: res.fileDownloadUri }))
    //   })
    //   this.updateFileElementQuery();
    // });
    // if(list!==null){
    //   this.fileService.updatedata(list);
    //   this.ngOnInit();
    // }

    this.canNavigateUp = true;
  }

  pushToPath(path: string, folderName: string) {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  popFromPath(path: string) {
    let p = path ? path : '';
    let split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }

}


function click() {
  throw new Error('Function not implemented.');
}

