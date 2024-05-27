import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { FileListService } from "app/ice/storage/storage-service/file-list.service";
import { FileUploadService } from "app/ice/storage/storage-service/file-upload.service";
import { FileElement } from "../../model/file-element";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IceLogService } from "app/ice/services/ice-log.service";
// enum CheckBox {
//   fastq = "fastq",
//   sra = "sra",
//   sam = "sam",
//   bam = "bam",
//   bed = "bed",
//   pdf = "pdf",
//   mp4 = "mp4",
//   txt = "txt",
//   none = "NONE",
// }
enum CheckBoxSize {
  lt100Mb = "1,100000000",
  fr100MBto500MB = "100000000,500000000",
  fr500MBto1GB = "500000000,1000000000",
  fr1GBto1TB = "1000000000,1000000000000",
  fr1TBto5TB = "1000000000000,50000000000000",
  none = "NONE",
}

@Component({
  selector: "sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["../sharedwithme-drive.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  // Public
  public sliderPriceValue = [1, 5000];
  public fileElements: FileElement[];
  metadataArray: Array<any> = [];
  onFilterSelectArray: Array<any> = [];
  onFilterReferenceArray: Array<any> = [];
  @Output() filtersize = new EventEmitter<string>();
  defaultChoice = "";
  selectedValue = "1,100000000";
  // currentlyChecked: CheckBox;
  // check_box_type = CheckBox;
  currentChecked: CheckBoxSize;
  check_box_size = CheckBoxSize;
  onBadgeArray: Array<any> = [];
  indexOfS;
  enumkey;
  items = [
    { name: "txt", selected: false, id: "extension1" },
    { name: "pdf", selected: false, id: "extension2" },
    { name: "c", selected: false, id: "extension3" },
    { name: "jpg", selected: false, id: "extension4" },
    { name: "jpeg", selected: false, id: "extension5" },
    { name: "mp4", selected: false, id: "extension6" },
    { name: "seq", selected: false, id: "extension7" },
    { name: "fasta", selected: false, id: "extension8" },
    { name: "vcf", selected: false, id: "extension9" },
    { name: "gtf", selected: false, id: "extension10" },
    { name: "fastq", selected: false, id: "extension11" },
    { name: "fa", selected: false, id: "extension12" },
    { name: "fq", selected: false, id: "extension13" },
    { name: "fna", selected: false, id: "extension14" },
    { name: "gff", selected: false, id: "extension15" },
    { name: "gff3", selected: false, id: "extension16" },
    { name: "bam", selected: false, id: "extension17" },
    { name: "sam", selected: false, id: "extension18" },
    { name: "bed1", selected: false, id: "extension19" },
    { name: "gz", selected: false, id: "extension20" },
    { name: "tar", selected: false, id: "extension21" },
  ];
  metalist = [
    { name: "filetype", selected: false, id: "metadata1" },
    { name: "assay_type", selected: false, id: "metadata2" },
    { name: "libraryselection", selected: false, id: "metadata3" },
    { name: "librarysource", selected: false, id: "metadata4" },
    { name: "librarylayout", selected: false, id: "metadata5" },
    { name: "platform", selected: false, id: "metadata6" },
    { name: "model", selected: false, id: "metadata7" },
    { name: "number_of_replicates", selected: false, id: "metadata8" },
    { name: "avg_read_length_fastq", selected: false, id: "metadata9" },
    { name: "number_of_reads", selected: false, id: "metadata10" },
    { name: "insertsize", selected: false, id: "metadata11" },
    { name: "size_mb", selected: false, id: "metadata12" },
    { name: "organism_name", selected: false, id: "metadata13" },
    { name: "organism_scientific_name", selected: false, id: "metadata14" },
    { name: "cell_line", selected: false, id: "metadata15" },
    { name: "tissue", selected: false, id: "metadata16" },
    { name: "sex", selected: false, id: "metadata17" },
    { name: "disease", selected: false, id: "metadata18" },
  ];

  showDropDown = false;
  checkedList: string[] = [];
  constructor(
    private fileupload: FileUploadService,
    public filelist: FileListService,
    private logService: IceLogService
  ) {}
  selectedItems = [];

  showDropdown = false;
  showDropdownList = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  toggleDropdownMetaList() {
    this.showDropdownList = !this.showDropdownList;
  }
  onItemSelect(item) {
    console.log("a:", item, "b:", item.name, "c:", item.selected, "d", item.id);

    if (item.selected) {
      this.onBadgeArray.push(item.name);
      this.onFilterSelectArray.push(item.name);
      this.onFilterReferenceArray.push(item);
    } else {
      let index = this.onFilterSelectArray.indexOf(item);
      this.onFilterSelectArray.splice(index, 1);

      this.onFilterReferenceArray.splice(index, 1);
      this.onBadgeArray.splice(index, 1);
    }
    this.refreshFileList();
  }

  selectedMetaList = [];

  onMetaListSelect(item) {
    console.log("a:", item, "b:", item.name, "c:", item.selected, "d", item.id);
    if (item.selected) {
      this.onBadgeArray.push(item.name);
      this.onFilterSelectArray.push(item.name);
      this.onFilterReferenceArray.push(item);
    } else {
      let index = this.onFilterSelectArray.indexOf(item);
      this.onFilterSelectArray.splice(index, 1);
      this.onFilterReferenceArray.splice(index, 1);
      this.onBadgeArray.splice(index, 1);
    }
    this.refreshFileList();
  }

  reset() {
    this.onFilterReferenceArray.filter((val) => {
      val.checked = false;
      val.selected = false;
    });
    this.onFilterSelectArray = [];
    this.onFilterReferenceArray = [];
    this.onBadgeArray = [];
    this.refreshFileList();
    const anyFiltersSelected = this.onFilterSelectArray.length > 0;

    if (!anyFiltersSelected) {
      this.showDropdown = false;
      this.showDropdownList = false;
    }
  }

  commonCodeMultipleFilter(value, event) {
    // console.log("test", event.target.id);
    let tempVal = value;
    if (event.target.checked) {
      if (event.target.id.startsWith("sizeRange")) {
        var range = value.split(",");
        var from = range[0];
        var to = range[1];

        var fr = parseInt(from);
        var t = parseInt(to);

        // console.log(typeof(t))
        if (fr === 1 && t <= 100000000) {
          console.log("less than 100mb");
          tempVal = fr + "Byte" + " - " + t / 1000 / 1000 + "MB";
        } else if (fr >= 100000000 && t <= 500000000) {
          tempVal = fr / 1000 / 1000 + "MB" + " - " + t / 1000 / 1000 + "MB";
        } else if (fr >= 500000000 && t <= 1000000000) {
          tempVal =
            fr / 1000 / 1000 + "MB" + " - " + t / 1000 / 1000 / 1000 + "GB";
        } else if (fr >= 1000000000 && t >= 1000000000000) {
          tempVal =
            fr / 1000 / 1000 / 1000 +
            "GB" +
            " - " +
            t / 1000 / 1000 / 1000 / 1000 +
            "TB";
        } else if (fr >= 1000000000000 && t >= 5000000000000) {
          tempVal =
            fr / 1000 / 1000 / 1000 / 1000 +
            "TB" +
            " - " +
            t / 1000 / 1000 / 1000 / 1000 +
            "TB";
        }
      }
      for (var i = 0; i < this.onFilterSelectArray.length; i++) {
        if (
          event.target.id.startsWith("sizeRange") &&
          this.onFilterReferenceArray[i].id.startsWith("sizeRange")
        ) {
          this.onBadgeArray.splice(i, 1);
          this.onFilterReferenceArray.splice(i, 1);
          this.onFilterSelectArray.splice(i, 1);
          break;
        }
        // else if (
        //   event.target.id.startsWith("extension") &&
        //   this.onFilterReferenceArray[i].id.startsWith("extension")
        // ) {
        //   this.onBadgeArray.splice(i, 1);
        //   this.onFilterReferenceArray.splice(i, 1);
        //   this.onFilterSelectArray.splice(i, 1);
        //   break;
        // }
      }

      this.onBadgeArray.push(tempVal);
      this.onFilterSelectArray.push(value);
      this.onFilterReferenceArray.push(event.target);
    } else {
      for (var i = 0; i < this.onFilterSelectArray.length; i++) {
        if (
          event.target.id.startsWith("sizeRange") &&
          this.onFilterReferenceArray[i].id.startsWith("sizeRange")
        ) {
          this.onFilterReferenceArray.splice(i, 1);
          this.onFilterSelectArray.splice(i, 1);
          console.log(this.onBadgeArray.splice(i, 1));
          break;
        }
        //    else if (
        //     event.target.id.startsWith("extension") &&
        //     this.onFilterReferenceArray[i].id.startsWith("extension")
        //   ) {
        //     this.onFilterReferenceArray.splice(i, 1);
        //     this.onFilterSelectArray.splice(i, 1);
        //     console.log(this.onBadgeArray.splice(i, 1));
        //     break;
        //   }
      }
    }
    this.refreshFileList();
  }

  refreshFileList() {
    var from, to;
    var keys: String[] = [];
    var ext: String[] = [];
    // console.log("line171 onFilterSelectArray", this.onFilterSelectArray);
    // console.log("line171 onFilterSelectArray", this.onBadgeArray);

    for (var i = 0; i < this.onFilterSelectArray.length; i++) {
      var localCheckboxValue: String = this.onFilterSelectArray[i];
      var localCheckboxRefernce: any = this.onFilterReferenceArray[i];
      // console.log("localCheckboxRefernce", localCheckboxRefernce);
      if (localCheckboxRefernce.id.startsWith("sizeRange")) {
        // console.log("localCheckboxRefernce.id",localCheckboxRefernce.id)
        var range = localCheckboxValue.split(",");
        from = range[0];
        to = range[1];
        // console.log("from",from,to)
      } else if (localCheckboxRefernce.id.startsWith("extension")) {
        // console.log("localCheckboxRefernce.id",localCheckboxRefernce.id)
        ext.push(localCheckboxValue);

        // console.log("ext",ext)
      } else if (localCheckboxRefernce.id.startsWith("metadata")) {
        // console.log("localCheckboxRefernce.id",localCheckboxRefernce.id)
        keys.push(localCheckboxValue);
        // console.log("keys",keys)
      }
    }

    // console.log(from, to);
    // console.log(ext);
    // console.log(keys);

    this.fileupload
      .getFileOnMultipleFilter(from, to, ext, keys)
      .subscribe((response) => {
        console.log("response", response);
        this.logService.info(JSON.stringify(response));
        this.filtersize.emit(response);
      });
  }
  //method for metadata
  // onMultipleFilterSelect(event: any) {
  //   console.log("in metadata ");
  //   if (event.target.checked) {
  //     this.commonCodeMultipleFilter(event.target.value, event);
  //   } else {
  //     let index = this.onFilterSelectArray.indexOf(event.target.value);
  //     this.onFilterSelectArray.splice(index, 1);
  //     this.onFilterReferenceArray[index].checked = false;
  //     this.onFilterReferenceArray.splice(index, 1);
  //     this.onBadgeArray.splice(index, 1);
  //     this.commonCodeMultipleFilter(event.target.value, event);
  //   }
  // }
  //method for size and file extension type
  onMultipleFilterSelect1(value, event) {
    if (event.target.id.startsWith("sizeRange")) {
      if (this.currentChecked === value) {
        this.currentChecked = CheckBoxSize.none;
        this.commonCodeMultipleFilter(this.currentChecked, event);
      } else {
        this.currentChecked = value;
        this.commonCodeMultipleFilter(this.currentChecked, event);
      }
      // } else if (event.target.id.startsWith("extension")) {
      //   if (this.currentlyChecked === value) {
      //     this.currentlyChecked = CheckBox.none;
      //     this.commonCodeMultipleFilter(this.currentChecked, event);
      //   } else {
      //     this.currentlyChecked = value;
      //     this.commonCodeMultipleFilter(this.currentlyChecked, event);
      //   }
    }
  }

  removefilter(data) {
    console.log(data);
    let index = this.onBadgeArray.indexOf(data);

    this.onFilterSelectArray.splice(index, 1);
    this.onFilterReferenceArray[index].checked = false;
    // console.log(this.onFilterReferenceArray[index]);
    //this.onFilterReferenceArray.splice(index, 1);
    //this.onBadgeArray.splice(index, 1);

    // console.log("remove onFilterSelectArray", this.onFilterSelectArray);
    this.refreshFileList();
  }

  ngOnInit(): void {}
}
