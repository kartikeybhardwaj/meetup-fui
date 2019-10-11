import {
  Injectable,
  NgZone
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { AppStorageService } from '../app.service';

declare var gapi: any;

@Injectable()
export class GoogleCalendarService {

  meetupId = '';
  htmlLink = '';
  message = '';
  errorMessage = '';
  isHappening = false;
  isAdded = false;

  // Client ID and API key from the Developer Console
  CLIENT_ID = '<YOUR_CLIENT_ID_GOES_HERE>';
  API_KEY = '<YOUR_API_KEY_GOES_HERE>';
  // Array of API discovery doc URLs for APIs used
  DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
  // Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
  SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  thisEvent: any = {};

  constructor(
    private zone: NgZone,
    private http: HttpClient,
    private appInfo: AppStorageService
  ) {
    globalThis.this = this;
  }

  /**
   *  On load, called to load the auth2 library and API client library.
   */
  handleClientLoad() {
    globalThis.this.isAdded = false;
    globalThis.this.isHappening = true;
    globalThis.this.message = '';
    globalThis.this.errorMessage = '';
    globalThis.this.htmlLink = '';
    gapi.load('client:auth2', globalThis.this.initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  initClient() {
    gapi.client.init({
      apiKey: globalThis.this.API_KEY,
      clientId: globalThis.this.CLIENT_ID,
      discoveryDocs: globalThis.this.DISCOVERY_DOCS,
      scope: globalThis.this.SCOPES
    }).then(() => {
      globalThis.this.zone.run(() => {
        globalThis.this.isHappening = false;
      });
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(globalThis.this.updateSigninStatus);
      // Handle the initial sign-in state.
      globalThis.this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, (error) => {
      globalThis.this.zone.run(() => {
        globalThis.this.isHappening = false;
        globalThis.this.errorMessage = 'some error occurred';
      });
      console.error(error);
    });
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      if (!globalThis.globalThis.isAdded) {
        globalThis.this.insertThisEvent();
      }
    } else {
      globalThis.this.zone.run(() => {
        globalThis.this.isHappening = true;
      });
      if (!globalThis.globalThis.isAdded) {
        globalThis.this.handleAuthClick();
      }
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user.
   */
  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }

  insertThisEvent() {
    globalThis.this.zone.run(() => {
      globalThis.this.isHappening = false;
    });
    gapi.client.calendar.events.insert({
      calendarId: 'primary',
      resource: globalThis.this.thisEvent,
      sendUpdates: 'all',
      sendNotifications: true
    }).then((response: any) => {
      globalThis.this.zone.run(() => {
        globalThis.this.isHappening = false;
        if (response.status === 200) {
          globalThis.this.isAdded = true;
          globalThis.this.message = 'Google Calendar event added';
          globalThis.this.htmlLink = response.result.htmlLink;
          globalThis.this.registerEventGoogleCalendar();
        } else {
          globalThis.this.errorMessage = 'unable to add event in calendar';
        }
        globalThis.this.handleSignoutClick();
      });
    });
  }

  registerEventGoogleCalendar(): void {
    const reqUrl = 'http://localhost:3200/register-to-google-calendar';
    const reqPayload = JSON.stringify(this.generateGoogleEventRegisteredRequestObject());
    this.http.post(reqUrl, reqPayload, this.appInfo.headersWithAuth).subscribe(
      (response: any) => {
        if (response && response.responseId) {
          if (response.responseId === 211) {
            // do nothing
          } else if (response.message) {
            // do nothing
          }
        }
      },
      (error: any) => {
        // do nothing
      });
  }

  generateGoogleEventRegisteredRequestObject(): any {
    return {
      meetupId: globalThis.this.meetupId,
      htmlLink: globalThis.this.htmlLink
    };
  }

}
