import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  PreviousStorageService
} from './previous.service';

@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.css']
})
export class PreviousComponent implements OnInit {

  constructor(
    public appInfo: AppStorageService,
    public previousInfo: PreviousStorageService
  ) {
    appInfo.headerText = 'Previous';
  }

  ngOnInit() {}

}
