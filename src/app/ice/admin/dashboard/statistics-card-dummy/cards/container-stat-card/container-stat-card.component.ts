import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-container-stat-card',
  templateUrl: './container-stat-card.component.html',
  styleUrls: ['./container-stat-card.component.scss']
})
export class ContainerStatCardComponent implements OnInit {

  public value = 0;
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    const intervalDuration = 2000 / 350;
    this.subscription = interval(intervalDuration)
      .pipe(take(350))
      .subscribe(() => {
        this.value++;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
