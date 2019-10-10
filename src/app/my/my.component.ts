import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  MyStorageService
} from './my.service';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {

  constructor(
    public appInfo: AppStorageService,
    public myInfo: MyStorageService
  ) {
    appInfo.headerText = 'My meetups';
  }

  ngOnInit() {}

}
