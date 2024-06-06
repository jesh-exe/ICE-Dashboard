import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-stat-card',
  templateUrl: './user-stat-card.component.html',
  styleUrls: ['./user-stat-card.component.scss']
})
export class UserStatCardComponent implements OnInit {

  public value = 0;
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    const intervalDuration = 2000 / 654;
    this.subscription = interval(intervalDuration)
      .pipe(take(654))
      .subscribe(() => {
        this.value++;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // public value = 0;

  // constructor() { }

  // ngOnInit() {
  //   var interval = setInterval(()=>{
  //     this.value = this.value+1;
  //     if(this.value == 678)
  //       clearInterval(interval);
  //   },6)
  //   setTimeout(()=>{
  //     clearInterval(interval);
  //     this.value = 678
  //   },2000)
  // } 

}
