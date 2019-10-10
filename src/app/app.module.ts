import {
  BrowserModule
} from '@angular/platform-browser';
import {
  NgModule
} from '@angular/core';
import {
  HttpClientModule
} from '@angular/common/http';

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
import {
  MatSlideToggleModule
} from '@angular/material/slide-toggle';
import {
  FormsModule
} from '@angular/forms';

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
  AddComponent,
  AddMapDialog
} from './add/add.component';
import {
  NavigationPanelComponent,
  BottomSheetMenu
} from './navigation-panel/navigation-panel.component';
import {
  LiveStorageService
} from './live/live.service';
import {
  UpcomingStorageService
} from './upcoming/upcoming.service';
import {
  PreviousStorageService
} from './previous/previous.service';
import {
  MyStorageService
} from './my/my.service';
import {
  MyComponent
} from './my/my.component';

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
    MyComponent,
    AddMapDialog,
    DescriptionComponent,
    DescriptionMapDialog,
    AddComponent,
    NavigationPanelComponent,
    BottomSheetMenu
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places']
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
    MatSlideToggleModule,
    FormsModule
  ],
  providers: [
    AppStorageService,
    LiveStorageService,
    UpcomingStorageService,
    PreviousStorageService,
    MyStorageService,
    MatDatepickerModule
  ],
  entryComponents: [
    AddMapDialog,
    DescriptionMapDialog,
    BottomSheetMenu
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
