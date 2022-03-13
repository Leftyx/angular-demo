import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileformComponent } from './components/profileform/profileform.component';
import { UsersService } from './services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent,
    ProfileformComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent
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
