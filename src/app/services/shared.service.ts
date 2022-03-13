import { Injectable } from '@angular/core';

import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private messageSource = new ReplaySubject<string>(10);
  public message = this.messageSource.asObservable();

  constructor() {
    console.log('SharedService | Started');
    return;
  }

  public changeMessage(message: string): void {
    this.messageSource.next(message);
  }

}
