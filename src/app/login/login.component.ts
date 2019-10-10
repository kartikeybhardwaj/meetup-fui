import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  message = '';
  errorMessage = '';
  isLoggingIn = false;

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient,
    private router: Router
  ) {
    appInfo.headerText = 'Login';
  }

  ngOnInit() {
    const localStorageMeetupToken = this.appInfo.localStorage.getItem('meetupToken');
    if (localStorageMeetupToken) {
      this.router.navigate(['home']);
    }
  }

  validateLogin(): boolean {
    let success = false;
    if (this.username.length && this.password.length) {
      success = true;
      this.message = '';
    } else {
      this.message = 'Please enter username and password to login';
    }
    return success;
  }

  login(): void {
    this.message = '';
    this.errorMessage = '';
    if (this.validateLogin()) {
      this.isLoggingIn = true;
      const reqUrl = 'http://localhost:3200/login';
      const reqPayload = JSON.stringify(this.generateLoginRequestObject());
      this.http.post(reqUrl, reqPayload, this.appInfo.headers).subscribe(
        (response: any) => {
          this.isLoggingIn = false;
          if (response && response.responseId) {
            if (response.responseId === 211) {
              this.appInfo.user = response.returnData;
              this.appInfo.headersWithAuth = {
                headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  Authorization: 'Bearer ' + response.token
                })
              };
              this.appInfo.localStorage.setItem('meetupToken', 'Bearer ' + response.token);
              this.router.navigate(['home']);
            } else if (response.message) {
              this.errorMessage = response.message;
            }
          }
        },
        (error: any) => {
          this.isLoggingIn = false;
          this.errorMessage = 'some error occurred';
        });
    }
  }

  generateLoginRequestObject(): any {
    return {
      username: this.username,
      password: this.appInfo.encryptWithNumber(this.appInfo.encryptWithoutNumber(this.password)),
      number: this.appInfo.encodingNumber
    };
  }

}
