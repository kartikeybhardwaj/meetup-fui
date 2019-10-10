import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  LiveStorageService
} from './live.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  constructor(
    public appInfo: AppStorageService,
    public liveInfo: LiveStorageService
  ) {
    appInfo.headerText = 'Live';
  }

  ngOnInit() {}

}
