import {
  Injectable
} from '@angular/core';
import {
  HttpHeaders
} from '@angular/common/http';
import * as crypto from 'crypto-js';

@Injectable()
export class AppStorageService {

  isUnauthorized = false;

  user: any = '';
  encodingNumber: number;

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  headersWithAuth: any = null;

  localStorage: any = null;

  liveMeetups: any = null;
  upcomingMeetups: any = null;
  previousMeetups: any = null;

  headerText = 'MeetUp';

  constructor() {
    this.localStorage = window.localStorage;
    this.encodingNumber = Math.floor(Math.random() * 100) + 1;
  }

  encryptWithNumber(password): string {
    return crypto.SHA256(password + this.encodingNumber).toString(crypto.enc.Base64);
  }

  encryptWithoutNumber(password): string {
    return crypto.SHA256(password).toString(crypto.enc.Base64);
  }

  getShortDate(date: number): string {
    const thisDate = new Date(date).toString();
    return thisDate.substr(0, 3) + ',' + thisDate.substr(3, 7);
  }

}
