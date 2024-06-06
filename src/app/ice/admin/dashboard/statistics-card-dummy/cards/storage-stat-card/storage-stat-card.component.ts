import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-storage-stat-card',
  templateUrl: './storage-stat-card.component.html',
  styleUrls: ['./storage-stat-card.component.scss']
})
export class StorageStatCardComponent implements OnInit {
  public value = 0;
  private subscription: Subscription;

  constructor() { }

  ngOnInit() {
    const intervalDuration = 2000 / 218;

    this.subscription = interval(intervalDuration)
      .pipe(take(218))
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
