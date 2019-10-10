import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  UpcomingStorageService
} from './upcoming.service';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit {

  constructor(
    public appInfo: AppStorageService,
    public upcomingInfo: UpcomingStorageService
  ) {
    appInfo.headerText = 'Upcoming';
  }

  ngOnInit() {}

}
