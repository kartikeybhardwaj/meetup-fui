import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private appInfo: AppStorageService
  ) {
    appInfo.headerText = 'Signup';
  }

  ngOnInit() {}

}
