import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profileform',
  templateUrl: './profileform.component.html',
  styleUrls: ['./profileform.component.scss']
})
export class ProfileformComponent implements OnInit {

  // constructor() { }

  public profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  ngOnInit(): void {
    return;
  }

  onSubmitForm() {
    console.log(this.profileForm.value);
  }
}
