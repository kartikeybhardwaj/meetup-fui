import {
  Component,
  OnInit
} from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef
} from '@angular/material/bottom-sheet';
import {
  AppStorageService
} from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrls: ['./navigation-panel.component.css']
})
export class NavigationPanelComponent implements OnInit {

  constructor(
    public appInfo: AppStorageService,
    private bottomSheet: MatBottomSheet,
    private router: Router
  ) {}

  ngOnInit() {}

  gotoAddMeetup(): void {
    this.router.navigate(['add']);
  }

  openMenuBottomSheet(): void {
    // tslint:disable-next-line: no-use-before-declare
    this.bottomSheet.open(BottomSheetMenu);
  }

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'bottom-sheet-menu',
  templateUrl: 'bottom-sheet-menu.html',
})
// tslint:disable-next-line: component-class-suffix
export class BottomSheetMenu {

  constructor(
    public appInfo: AppStorageService,
    private bottomSheetRef: MatBottomSheetRef < BottomSheetMenu >,
    private router: Router
  ) {}

  goto(route: string): void {
    this.dissmissBottomSheet();
    this.router.navigate([route]);
  }

  logout(): void {
    this.appInfo.user = null;
    this.appInfo.localStorage.removeItem('meetupToken');
    this.router.navigate(['login']);
  }

  dissmissBottomSheet(): void {
    this.bottomSheetRef.dismiss();
  }
}
