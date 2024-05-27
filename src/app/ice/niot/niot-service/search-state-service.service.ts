import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchStateServiceService {
  private sequencedetails: any[];

  constructor() { }

  setSequencedetails(sequences: any[]) {
    this.sequencedetails = sequences;
  }

  getSequencedetails() {
    return this.sequencedetails;
  }
}
