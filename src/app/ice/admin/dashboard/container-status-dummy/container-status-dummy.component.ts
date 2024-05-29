import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-status-dummy',
  templateUrl: './container-status-dummy.component.html',
  styleUrls: ['./container-status-dummy.component.scss']
})
export class ContainerStatusDummyComponent implements OnInit {

  selectedName : string = "";
  selectedValue: string = 'status';

  constructor() { }

  ngOnInit() {
  }

  fetchSelectedName(name : string){
    this.selectedName = name;
  }

}
