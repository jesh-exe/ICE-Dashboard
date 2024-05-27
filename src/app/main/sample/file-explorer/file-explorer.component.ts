import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { FileElement } from '../../../ice/storage/file/model/file-element';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss']
})
export class FileExplorerComponent implements OnInit,AfterViewInit {
  grid = true;
  popup = false
  @Input() fileElements: FileElement[]
  @Input() canNavigateUp: string
  @Input() path: string
  @Output() folderAdded = new EventEmitter<{ name: string }>()
  @Output() elementRemoved = new EventEmitter<FileElement>()
  @Output() elementShowed=new EventEmitter<
 // target:any
 FileElement
>()
  @Output() elementRenamed = new EventEmitter<FileElement>()
  @Output() elementMoved = new EventEmitter<{
    element: FileElement
    moveTo: FileElement
  }>()
  @Output() navigatedDown = new EventEmitter<FileElement>()
  @Output() navigatedUp = new EventEmitter()
  @ViewChild(MatMenuTrigger, {static:true}) rootMenuTrigger: MatMenuTrigger;

  menuTopLeftPosition =  {x: '0', y: '0'} 
  selectedElement : FileElement;
  constructor(private _coreSidebarService: CoreSidebarService,) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    
  }

  toggleEventSidebar() {
    this._coreSidebarService.getSidebarRegistry('properties-event-sidebar').toggleOpen();
  }
  
  deleteElement(element: FileElement) {
    this.elementRemoved.emit(element);
  }

  // showElement(target,element:FileElement){
  //   this.selectedElement = element;
  //   console.log("file-exp",target,element);
  //   this.elementShowed.emit({target,element});
  //   // console.log("file-explorer",this.elementShowed.emit({target,element}));
  //   this._coreSidebarService.getSidebarRegistry('properties-event-sidebar').toggleOpen();
  // }

  showElement(element:FileElement){
    this.selectedElement = element;
    console.log("file-exp",this.selectedElement);
    //this.elementShowed.emit(element);
    this.toggleEventSidebar();
    // console.log("file-explorer",this.elementShowed.emit({target,element}));
   // this._coreSidebarService.getSidebarRegistry('properties-event-sidebar').toggleOpen();
  }

  navigate(element: FileElement) {
    if (element.directory) {
      this.navigatedDown.emit(element);
    }
  }

  navigateUp() {
    this.navigatedUp.emit();
  }

  moveElement(element: FileElement, moveTo: FileElement) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  openMenu(event: MouseEvent, element: FileElement ){ //viewChild: MatMenuTrigger) {
    event.preventDefault();
    console.log(element);
    console.log(event);
    // we record the mouse position in our object 
    this.menuTopLeftPosition.x = event.clientX + 'px'; 
    this.menuTopLeftPosition.y = event.clientY + 'px'; 
    this.rootMenuTrigger.menuData = {element: element} 
    console.log(this.rootMenuTrigger,element);
    this.rootMenuTrigger.openMenu();
    
  }

}
