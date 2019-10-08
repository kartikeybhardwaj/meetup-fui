import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private appInfo: AppStorageService
  ) {
    appInfo.headerText = 'D\'oh!';
  }

  ngOnInit() {}

}
