import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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

  private clickListener: () => void;
  constructor(private renderer: Renderer2, private el: ElementRef) { }
  private addCardClickListener() {
    const cardStat = this.el.nativeElement.querySelector('.card-stat');
    this.clickListener = this.renderer.listen(cardStat, 'click', () => {
      const cardInner = cardStat.querySelector('.card-inner');
      cardInner.classList.toggle('flipped');
    });
  }
  ngOnInit() {
    const intervalDuration = 2000 / 218;

    this.subscription = interval(intervalDuration)
      .pipe(take(218))
      .subscribe(() => {
        this.value++;
      });

      this.addCardClickListener();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
