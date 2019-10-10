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
export class UpcomingStorageService {

  isFetching = false;
  message = '';
  errorMessage = '';

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {
    this.getUpcomingMeetups();
  }

  getUpcomingMeetups(): void {
    if (!this.appInfo.upcomingMeetups) {
      this.message = '';
      this.errorMessage = '';
      this.isFetching = true;
      const reqUrl = 'http://localhost:3200/get-upcoming-meetups';
      this.http.get(reqUrl, this.appInfo.headersWithAuth).subscribe(
        (response: any) => {
          this.isFetching = false;
          if (response && response.responseId) {
            if (response.responseId === 211) {
              this.appInfo.upcomingMeetups = response.returnData;
              if (this.appInfo.upcomingMeetups.length === 0) {
                this.message = 'D\'oh! No meetups found.';
              }
            } else if (response.message) {
              this.errorMessage = response.message;
            }
          }
        },
        (error: any) => {
          this.isFetching = false;
          this.errorMessage = 'some error occurred';
        });
    }
  }

}
