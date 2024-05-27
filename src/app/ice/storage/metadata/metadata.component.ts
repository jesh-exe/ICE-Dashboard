import { FileUploadService } from 'app/ice/storage/storage-service/file-upload.service';
import { Observable } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, Pipe, PipeTransform, ViewEncapsulation, QueryList } from '@angular/core';
import { ControlContainer, FormControl, FormBuilder, FormGroup } from '@angular/forms'
import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { Output, EventEmitter } from '@angular/core';
import { FileUploadingComponent } from '../file-uploading/file-uploading.component';
import { IceLogService } from 'app/ice/services/ice-log.service';

const states = ['filetype', 'Assay_Type', 'LibrarySelection', 'LibrarySource', 'LibraryLayout', 'Platform', 'Model', 'Number of Replicates', 'AVG_Read_Length_fastq', 'Number of Reads', 'size_MB', 'InsertSize', 'Sample/Organism_Name', 'Sample/Organism_Scientific Name', 'cell_line', 'tissue', 'Sex', 'Disease'];

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.scss']
})

export class MetadataComponent implements OnInit {
  public items = [{ key: '', value: '' }];
  @ViewChild('instance') inst: QueryList<NgbTypeahead>;
  private focusObservableList = Array<Subject<string>>();
  private clickObservableList = Array<Subject<string>>();
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @Output() newItemEvent = new EventEmitter<string>();

  constructor(private logService: IceLogService) {

  }

  addNewItem(items: any) {
   // this.newItemEvent.emit(items);
    this.items.push({
      key: '',
      value: ''
    });
    this.logService.debug(items);
  }

  ngAfterViewInit() {
    console.log(this.inst);

    this.focus$.subscribe((item) => {
      this.logService.debug(item);
      const tableIndex = Number(item);
      let focusItem$: Subject<string>
      this.focusObservableList.some((focus, index) => {

        if (index === tableIndex) {
          focusItem$ = focus;
          return true;
        } else {
          return false
        }
      });

      if (item) {
        focusItem$.next(item);
      }
    })
  }

  search = (text$: Observable<string>) => {
    // input value change stream for each control
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    // input click stream for each control
    const inputClick$ = new Subject<string>();
    this.clickObservableList.push(inputClick$);
    const clicksWithClosedPopup$ = inputClick$
      .pipe(
        filter((item) => {
          // const tableIndex = states.findIndex(element => element.position === item.position)
          const tableIndex = Number(item);
          let ngbTypeHeader: NgbTypeahead
          this.inst.some((value, index) => {
            if (tableIndex === index) {
              ngbTypeHeader = value;
              return true;
            }
            return false;
          })
          return ngbTypeHeader && !ngbTypeHeader.isPopupOpen()
        }),
        map(item => '')
      );
    // input focus stream for each control
    const inputFocus$ = new Subject<string>();
    this.focusObservableList.push(inputFocus$);
    const focusSteam$ = inputFocus$.pipe(map((item) => ''));
    // merge all stream
    return merge(debouncedText$, focusSteam$, clicksWithClosedPopup$).pipe(
      map(term => {
        console.log('term :', term);
        if (term === '') {
          return states;
        } else {
          return states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1);

        }
      })
    );
  }

  // addInfo() {
  //   //this.newItemEvent.emit(value);
  //   this.items.push({
  //   key:'',
  //    value:''
  //   });
  //   console.log('Items ',this.items);
  //   //this.fileupload.uploadMetadata(this.items);

  // }

  /**
 * DeleteItem
 *
 * @param id
 */
  deleteItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items.indexOf(this.items[i]) === id) {
        this.items.splice(i, 1);
        break;
      }
    }
  }


  ngOnInit(): void {
  }
}

