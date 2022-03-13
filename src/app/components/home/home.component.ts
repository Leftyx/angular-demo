import { Component, OnInit } from '@angular/core';

import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public message = '';

  constructor(private readonly sharedService: SharedService) { }

  ngOnInit(): void {
    this.sharedService.message.subscribe((value: string) => {
      this.message = value;
    });
  }

  // public changeSharedValue() {
  //   this.sharedService.setMessage('something');
  //   this.message = this.sharedService.getMessage();
  // }

}
