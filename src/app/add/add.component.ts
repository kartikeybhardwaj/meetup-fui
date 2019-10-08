import {
  Component,
  OnInit
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  startDate = '';
  endDate = '';

  startHour = '13';
  startMinute = '00';

  endHour = '15';
  endMinute = '00';

  hours: string[] = [
    '00', '01', '02', '03', '04',
    '05', '06', '07', '08', '09',
    '10', '11', '12', '13', '14',
    '15', '16', '17', '18', '19',
    '20', '21', '22', '23'
  ];

  minutes: string[] = [
    '00', '05', '10', '15', '20',
    '25', '30', '35', '40', '45',
    '50', '55'
  ];

  isPrivate = true;

  constructor(
    private appInfo: AppStorageService
  ) {
    appInfo.headerText = 'Add';
  }

  ngOnInit() {}

}
