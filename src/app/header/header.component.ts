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
    const thisDate = new Date().toString();
    this.today = thisDate.substr(0, 3) + ',' + thisDate.substr(3, 7);
  }

  ngOnInit() {}

}
