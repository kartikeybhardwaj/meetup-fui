import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  AppStorageService
} from '../app.service';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material/dialog';

export interface DialogData {
  title: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  private activatedRouteSnapshot: ActivatedRouteSnapshot;
  private selectedId: any = null;

  constructor(
    public appInfo: AppStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public mapDialog: MatDialog
  ) {
    this.activatedRouteSnapshot = activatedRoute.snapshot;
    if (this.activatedRouteSnapshot.params && this.activatedRouteSnapshot.params.id) {
      this.selectedId = this.activatedRouteSnapshot.params.id;
    }
  }

  ngOnInit() {
    if (this.selectedId === null) {
      this.router.navigate(['page-not-found']);
    } else {
      this.appInfo.headerText = 'meetup title';
    }
  }

  openMapDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.mapDialog.open(DescriptionMapDialog, {
      maxWidth: '100%',
      minWidth: '80%',
      data: {
        title: 'this is title for place, bla bla bla bla bla',
        lat: 51.678418,
        lng: 7.809007
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'description-map-dialog',
  templateUrl: 'description-map-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class DescriptionMapDialog {

  constructor(
    public dialogRef: MatDialogRef < DescriptionMapDialog > ,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
