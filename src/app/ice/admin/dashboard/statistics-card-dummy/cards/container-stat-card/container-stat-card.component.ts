import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-container-stat-card',
  templateUrl: './container-stat-card.component.html',
  styleUrls: ['./container-stat-card.component.scss']
})
export class ContainerStatCardComponent implements OnInit, OnDestroy {

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
    const intervalDuration = 2000 / 350;
    this.subscription = interval(intervalDuration)
      .pipe(take(350))
      .subscribe(() => {
        this.value++;
      });

    this.addCardClickListener();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.clickListener) {
      this.clickListener();
    }
  }

}
