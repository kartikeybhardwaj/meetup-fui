import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  HttpClient
} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username = '';
  email = '';
  password = '';
  repassword = '';
  message = '';
  errorMessage = '';
  isSigningUp = false;

  constructor(
    private appInfo: AppStorageService,
    private http: HttpClient
  ) {
    appInfo.headerText = 'Signup';
  }

  ngOnInit() {}

  validateEmail(email: string): boolean {
    let success = false;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      success = true;
    }
    return success;
  }

  validateSignup(): boolean {
    let success = false;
    this.username = this.username.trim();
    this.email = this.email.trim();
    if (!this.username.length || !this.email.length || !this.password.length) {
      this.errorMessage = 'please fill in all the details to proceed';
    } else if (this.username.indexOf(' ') !== -1) {
      this.errorMessage = 'username cannot contain spaces';
    } else if (!this.validateEmail(this.email)) {
      this.errorMessage = 'invalid email address';
    } else if (this.username.length < 4 || this.password.length < 4 || this.username.length > 12 || this.password.length > 12) {
      this.errorMessage = 'username and password should have a minimum of length 4 and maximum 12';
    } else if (this.password !== this.repassword) {
      this.errorMessage = 'passwords does not match';
    } else {
      success = true;
    }
    return success;
  }

  signup(): void {
    this.message = '';
    this.errorMessage = '';
    if (this.validateSignup()) {
      this.isSigningUp = true;
      const reqUrl = 'http://localhost:3200/signup';
      const reqPayload = JSON.stringify(this.generateSignupRequestObject());
      this.http.post(reqUrl, reqPayload, this.appInfo.headers).subscribe(
        (response: any) => {
          this.isSigningUp = false;
          if (response && response.responseId) {
            if (response.responseId === 211) {
              this.message = 'your account has been successfully created';
            } else if (response.message) {
              this.errorMessage = response.message;
            }
          }
        },
        (error: any) => {
          this.isSigningUp = false;
          this.errorMessage = 'some error occurred';
        });
    }
  }

  generateSignupRequestObject(): any {
    return {
      username: this.username,
      email: this.email,
      password: this.appInfo.encryptWithoutNumber(this.password)
    };
  }

}
