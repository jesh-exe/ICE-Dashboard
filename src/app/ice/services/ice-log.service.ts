import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IceLogService {
  private  LOG_LEVEL:number=environment.log_level;
  private DEBUG:number=4;
  private INFO:number=3;
  private WARN:number=2;
  private ERROR:number=1;
  private LOG_PREFIX="ICE_LOG: ";


  constructor() { }


 

  
  debug(message){
    if(this.DEBUG<=this.LOG_LEVEL){
      console.log(this.LOG_PREFIX + ' DEBUG:' +message);
    }

  }
  info(message:string){
    if(this.INFO<=this.LOG_LEVEL){
      console.log(this.LOG_PREFIX + ' INFO:' +message);
    }
    
  }
  warn(message:string){
    if(this.WARN<=this.LOG_LEVEL){
      console.log(this.LOG_PREFIX + ' WARN:' +message);
    }
    
  }
  error(message:string){
    if(this.ERROR<=this.LOG_LEVEL){
      console.log(this.LOG_PREFIX + ' ERROR:' +message);
    }
    
  }
}
