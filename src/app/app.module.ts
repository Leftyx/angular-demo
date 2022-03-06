import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersService } from './services/users.service';
import { ModalComponent } from './components/modal/modal.component';
import { ProfileformComponent } from './components/profileform/profileform.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ProfileformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ UsersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
