import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AppStorageService
} from './app.service';
import {
  HttpHeaders,
  HttpClient
} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isVerifyingToken = false;

  constructor(
    public appInfo: AppStorageService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const localStorageMeetupToken = this.appInfo.localStorage.getItem('meetupToken');
    console.log(localStorageMeetupToken);
    if (!localStorageMeetupToken) {
      this.router.navigate(['login']);
    } else {
      this.isVerifyingToken = true;
      const reqUrl = 'http://localhost:3200/fast-forward';
      this.appInfo.headersWithAuth = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: localStorageMeetupToken
        })
      };
      this.http.get(reqUrl, this.appInfo.headersWithAuth).subscribe(
        (response: any) => {
          this.isVerifyingToken = false;
          if (response && response.responseId) {
            if (response.responseId === 211) {
              this.appInfo.user = response.returnData;
            } else {
              this.appInfo.localStorage.removeItem('meetupToken');
              this.router.navigate(['login']);
            }
          }
        },
        (error: any) => {
          this.isVerifyingToken = false;
          this.appInfo.localStorage.removeItem('meetupToken');
          this.router.navigate(['login']);
        }
      );
    }
  }

}
