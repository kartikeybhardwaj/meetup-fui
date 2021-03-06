import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  AppStorageService
} from '../app.service';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material/dialog';
import {
  HttpClient
} from '@angular/common/http';
import {
  GoogleCalendarService
} from './google.calendar.service';

export interface DescriptionDialogData {
  title: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  isFetchingDescription = false;
  isRegistering = false;
  description: Meetup;
  descriptionExtras: any = {};

  errorMessageFetching = '';
  errorMessage = '';
  message = '';

  private activatedRouteSnapshot: ActivatedRouteSnapshot;
  private selectedId: any = null;

  constructor(
    public appInfo: AppStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public mapDialog: MatDialog,
    private http: HttpClient,
    public googleCalendarInfo: GoogleCalendarService
  ) {
    this.activatedRouteSnapshot = activatedRoute.snapshot;
    if (this.activatedRouteSnapshot.params && this.activatedRouteSnapshot.params.id) {
      this.selectedId = this.activatedRouteSnapshot.params.id;
    }
  }

  ngOnInit() {
    if (this.selectedId === null) {
      this.router.navigate(['page-not-found']);
    } else {
      this.errorMessageFetching = '';
      this.isFetchingDescription = true;
      const reqUrl = 'http://localhost:3200/get-meetup';
      const reqPayload = JSON.stringify(this.generateGetDescriptionRequestObject());
      this.http.post(reqUrl, reqPayload, this.appInfo.headersWithAuth).subscribe(
        (response: any) => {
          this.isFetchingDescription = false;
          if (response && response.responseId) {
            if (response.responseId === 211) {
              this.description = response.returnData;
              this.descriptionExtras.peopleRegistered = this.description.joinedBy.length;
              this.descriptionExtras.isRegistrationOpen = true;
              this.descriptionExtras.tense = 'people are attending';
              if (this.descriptionExtras.peopleRegistered === 1) {
                this.descriptionExtras.tense = 'person is attending';
              }
              if (new Date().getTime() > new Date(this.description.timeline.to.$date).getTime()) {
                this.descriptionExtras.isRegistrationOpen = false;
                this.descriptionExtras.tense = 'people attended';
                if (this.descriptionExtras.peopleRegistered === 1) {
                  this.descriptionExtras.tense = 'person attended';
                }
              }
              this.descriptionExtras.amIGoing = this.description.joinedBy.map((user) => {
                return user.userId.$oid === this.appInfo.user._id.$oid;
              }).includes(true);
              this.descriptionExtras.googleCalendarMeta = this.description.joinedBy.map((meetup) => {
                if (meetup.userId.$oid === this.appInfo.user._id.$oid) {
                  return meetup.googleCalendarMeta;
                }
              });
              if (this.descriptionExtras.googleCalendarMeta[0] !== undefined) {
                this.descriptionExtras.googleCalendarMeta = this.descriptionExtras.googleCalendarMeta[0];
                this.googleCalendarInfo.htmlLink = this.descriptionExtras.googleCalendarMeta.htmlLink;
              }
              this.descriptionExtras.from = new Date(this.description.timeline.from.$date).toString();
              this.descriptionExtras.from = this.descriptionExtras.from.toString();
              this.descriptionExtras.from =
                this.descriptionExtras.from.substr(0, 3) + ',' +
                this.descriptionExtras.from.substr(3, 7) + ', ' +
                this.descriptionExtras.from.substr(16, 5);
              this.descriptionExtras.to = new Date(this.description.timeline.to.$date).toString();
              this.descriptionExtras.to = this.descriptionExtras.to.toString();
              this.descriptionExtras.to =
                this.descriptionExtras.to.substr(0, 3) + ',' +
                this.descriptionExtras.to.substr(3, 7) + ', ' +
                this.descriptionExtras.to.substr(16, 5);
              this.appInfo.headerText = this.description.title;
            } else if (response.message) {
              this.errorMessageFetching = response.message;
            }
          }
        },
        (error: any) => {
          this.isFetchingDescription = false;
          this.errorMessageFetching = 'some error occurred';
        });
    }
  }

  generateGetDescriptionRequestObject() {
    return {
      _id: this.selectedId
    };
  }

  register(): void {
    this.message = '';
    this.errorMessage = '';
    this.isRegistering = true;
    const reqUrl = 'http://localhost:3200/register-to-meetup';
    const reqPayload = JSON.stringify(this.generateRegisterToMeetupRequestObject());
    this.http.post(reqUrl, reqPayload, this.appInfo.headersWithAuth).subscribe(
      (response: any) => {
        this.isRegistering = false;
        if (response && response.responseId) {
          if (response.responseId === 211) {
            this.descriptionExtras.amIGoing = true;
            this.descriptionExtras.peopleRegistered += 1;
            this.descriptionExtras.tense = 'people are attending';
          } else if (response.message) {
            this.errorMessage = response.message;
          }
        }
      },
      (error: any) => {
        this.isRegistering = false;
        this.errorMessageFetching = 'some error occurred';
      });
  }

  generateRegisterToMeetupRequestObject() {
    return {
      meetupId: this.selectedId
    };
  }

  addToGoogleCalendar(): void {
    this.googleCalendarInfo.meetupId = this.selectedId;
    this.googleCalendarInfo.thisEvent = {
      summary: this.description.title,
      location: this.description.location.title ? this.description.location.title : '',
      description: this.description.description,
      start: {
        dateTime: new Date(this.description.timeline.from.$date).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      end: {
        dateTime: new Date(this.description.timeline.to.$date).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      recurrence: [],
      attendees: [],
      visibility: 'public',
      anyoneCanAddSelf: true
    };
    this.googleCalendarInfo.handleClientLoad();
  }

  openMapDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.mapDialog.open(DescriptionMapDialog, {
      maxWidth: '100%',
      minWidth: '80%',
      data: {
        title: this.description.location.title,
        lat: this.description.location.latitude,
        lng: this.description.location.longitude
      }
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

}

export interface Meetup {
  _id: any;
  title: string;
  description: string;
  location: MeetupLocation;
  timeline: MeetupTimeline;
  isPrivate: boolean;
  joinedBy: any[];
  metadata: MeetupMetadata;
}

export interface MeetupLocation {
  title: string;
  country: string;
  latitude: any;
  longitude: any;
}

export interface MeetupTimeline {
  from: any;
  to: any;
}

export interface MeetupMetadata {
  createdBy: any;
  createdOn: any;
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'description-map-dialog',
  templateUrl: 'description-map-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class DescriptionMapDialog {

  constructor(
    public dialogRef: MatDialogRef < DescriptionMapDialog > ,
    @Inject(MAT_DIALOG_DATA) public data: DescriptionDialogData
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
