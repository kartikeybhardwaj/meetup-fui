import {
  Injectable
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  HttpClient
} from '@angular/common/http';

@Injectable()
export class MyStorageService {

  createdIsFetching = false;
  createdMessage = '';
  createdErrorMessage = '';

  joinedIsFetching = false;
  joinedMessage = '';
  joinedErrorMessage = '';

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {
    this.getMyCreatedMeetups();
    this.getMyJoinedMeetups();
  }

  getMyCreatedMeetups(): void {
    if (!this.appInfo.myCreatedMeetups) {
      this.createdMessage = '';
      this.createdErrorMessage = '';
      this.createdIsFetching = true;
      const reqUrl = 'http://localhost:3200/get-my-created-meetups';
      this.http.get(reqUrl, this.appInfo.headersWithAuth).subscribe(
        (response: any) => {
          this.createdIsFetching = false;
          if (response && response.responseId) {
            if (response.responseId === 211) {
              this.appInfo.myCreatedMeetups = response.returnData;
              if (this.appInfo.myCreatedMeetups.length === 0) {
                this.createdMessage = 'D\'oh! No meetups found.';
              }
            } else if (response.message) {
              this.createdErrorMessage = response.message;
            }
          }
        },
        (error: any) => {
          this.createdIsFetching = false;
          this.createdErrorMessage = 'some error occurred';
        });
    }
  }

  getMyJoinedMeetups(): void {
    if (!this.appInfo.myJoinedMeetups) {
      this.joinedMessage = '';
      this.joinedErrorMessage = '';
      this.joinedIsFetching = true;
      const reqUrl = 'http://localhost:3200/get-my-joined-meetups';
      this.http.get(reqUrl, this.appInfo.headersWithAuth).subscribe(
        (response: any) => {
          this.joinedIsFetching = false;
          if (response && response.responseId) {
            if (response.responseId === 211) {
              this.appInfo.myJoinedMeetups = response.returnData;
              if (this.appInfo.myJoinedMeetups.length === 0) {
                this.joinedMessage = 'D\'oh! No meetups found.';
              }
            } else if (response.message) {
              this.joinedErrorMessage = response.message;
            }
          }
        },
        (error: any) => {
          this.joinedIsFetching = false;
          this.joinedErrorMessage = 'some error occurred';
        });
    }
  }

}
