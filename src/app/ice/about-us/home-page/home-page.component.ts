import { Component, Input, OnInit,AfterViewInit } from '@angular/core';
import { Card } from '../card';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  @Input() card :Card;
  @Input() index: number;

  public isCollapsed = true;
   constructor() {
   }
    

  ngOnInit(): void {
  
  }

 

  public getColor(index :number) : string {
    switch( index) { 
      case 0 : return "#1697c5"
      case 1 : return "#cf246c"
      case 2 : return "#e89f1e"
      case 3 : return "#71a330"  
      case 4 : return "#df771a"
      case 5 : return "#27b4ba"
    }
  }

}
