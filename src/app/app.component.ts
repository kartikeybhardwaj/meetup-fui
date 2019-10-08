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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    public appInfo: AppStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    // get user data and set to appInfo.user
    this.appInfo.user = {
      username: 'kartoon',
      displayname: 'kartoon'
    };
    this.router.navigate(['add']);
  }

}
