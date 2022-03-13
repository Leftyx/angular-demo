import { Component, OnInit } from '@angular/core';

import { interval, shareReplay, take, tap } from 'rxjs';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public counter = 0;
  public message = '';

  constructor(private readonly sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.startTimer();
    this.sharedService.message.subscribe((value: string) => {
      this.message = value;
    });
  }

  public changeSharedValue() {
    this.sharedService.changeMessage(new Date().toISOString());
  }

  private startTimer() {
    const timerObservable = interval(1000).pipe(
      take(10),
      tap((counter: number) => {
        // console.log('Timer (tap):', counter);
      }),
      shareReplay()
    );

    timerObservable.subscribe((value: number) => {
      this.counter = value + 1;
      console.log('1 subscriber', value);
    });

    timerObservable.subscribe((value: number) => {
      this.counter = value + 1;
      console.log('2 subscriber', value);
    });

  }
}
