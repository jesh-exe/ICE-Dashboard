import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CoreConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-unauthorization',
  templateUrl: './unauthorization.component.html',
  styleUrls: ['./unauthorization.component.scss']
})
export class UnauthorizationComponent implements OnInit {

  public coreConfig: any;

  private _unsubscribeAll: Subject<any>;

  constructor(private _coreConfigService: CoreConfigService) {
    this._unsubscribeAll = new Subject();


    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: false
        },
        footer: {
          hidden: false
        },
        menu: {
          hidden: false
        },
        customizer: false,
        enableLocalStorage: false
      }
    };
  }

  ngOnInit(): void {

    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      this.coreConfig = config;
    });
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
