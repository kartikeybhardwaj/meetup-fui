import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import { LiveStorageService } from '../live/live.service';
import { UpcomingStorageService } from '../upcoming/upcoming.service';
import { PreviousStorageService } from '../previous/previous.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  constructor(
    public appInfo: AppStorageService,
    public liveInfo: LiveStorageService,
    public upcomingInfo: UpcomingStorageService,
    public previousInfo: PreviousStorageService
  ) {
    appInfo.headerText = 'Home';
  }

  ngOnInit() {}

}
