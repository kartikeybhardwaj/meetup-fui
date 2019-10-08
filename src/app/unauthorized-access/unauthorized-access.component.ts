import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';

@Component({
  selector: 'app-unauthorized-access',
  templateUrl: './unauthorized-access.component.html',
  styleUrls: ['./unauthorized-access.component.css']
})
export class UnauthorizedAccessComponent implements OnInit {

  constructor(
    private appInfo: AppStorageService
  ) {
    appInfo.headerText = 'D\'oh!';
  }

  ngOnInit() {}

}
