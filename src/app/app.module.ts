import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';

import {
  AgmCoreModule
} from '@agm/core';

import {
  MatIconModule
} from '@angular/material/icon';
import {
  MatButtonModule
} from '@angular/material/button';
import {
  MatRippleModule,
  MatNativeDateModule
} from '@angular/material/core';
import {
  MatBottomSheetModule
} from '@angular/material/bottom-sheet';
import {
  MatListModule
} from '@angular/material/list';
import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';
import {
  MatDialogModule
} from '@angular/material/dialog';
import {
  MatInputModule
} from '@angular/material/input';
import {
  MatDatepickerModule
} from '@angular/material/datepicker';
import {
  MatSelectModule
} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {
  AppRoutingModule
} from './app-routing.module';
import {
  AppComponent
} from './app.component';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  LoginComponent
} from './login/login.component';
import {
  AppStorageService
} from './app.service';
import {
  PageNotFoundComponent
} from './page-not-found/page-not-found.component';
import {
  UnauthorizedAccessComponent
} from './unauthorized-access/unauthorized-access.component';
import {
  SignupComponent
} from './signup/signup.component';
import {
  HeaderComponent
} from './header/header.component';
import {
  UpcomingComponent
} from './upcoming/upcoming.component';
import {
  LiveComponent
} from './live/live.component';
import {
  PreviousComponent
} from './previous/previous.component';
import {
  AllComponent
} from './all/all.component';
import {
  DescriptionComponent,
  DescriptionMapDialog
} from './description/description.component';
import {
  AddComponent
} from './add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    UnauthorizedAccessComponent,
    SignupComponent,
    HeaderComponent,
    UpcomingComponent,
    LiveComponent,
    PreviousComponent,
    AllComponent,
    DescriptionComponent,
    DescriptionMapDialog,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [
    AppStorageService,
    MatDatepickerModule
  ],
  entryComponents: [
    DescriptionMapDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
