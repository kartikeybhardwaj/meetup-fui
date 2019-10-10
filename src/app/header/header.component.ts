import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  today: string;

  constructor(
    public appInfo: AppStorageService
  ) {
    this.today = appInfo.getShortDate(new Date().getTime());
  }

  ngOnInit() {}

}
