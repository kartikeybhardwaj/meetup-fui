import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';

@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.css']
})
export class PreviousComponent implements OnInit {

  constructor(
    private appInfo: AppStorageService
  ) {
    appInfo.headerText = 'Previous';
  }

  ngOnInit() {}

}
