import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import {
  AppStorageService
} from '../app.service';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog
} from '@angular/material/dialog';
import {
  MapsAPILoader
} from '@agm/core';

declare var google: any;

export interface AddDialogData {
  title: string;
  country: string;
  lat: number;
  lng: number;
}

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

  mapTitle = '';
  mapCountry = '';
  mapLat: number;
  mapLng: number;

  constructor(
    private appInfo: AppStorageService,
    public mapDialog: MatDialog
  ) {
    appInfo.headerText = 'Add';
  }

  ngOnInit() {}

  openMapDialog(): void {
    // tslint:disable-next-line: no-use-before-declare
    const dialogRef = this.mapDialog.open(AddMapDialog, {
      maxWidth: '100%',
      minWidth: '80%',
      data: {
        title: this.mapTitle,
        country: this.mapCountry,
        lat: this.mapLat,
        lng: this.mapLng
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.mapTitle = result.title;
      this.mapCountry = result.country;
      this.mapLat = result.lat;
      this.mapLng = result.lng;
    });
  }

  removeMap(): void {
    this.mapTitle = '';
    this.mapCountry = '';
    this.mapLat = null;
    this.mapLng = null;
  }

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'add-map-dialog',
  templateUrl: 'add-map-dialog.html',
})
// tslint:disable-next-line: component-class-suffix
export class AddMapDialog implements OnInit {

  private geoCoder;
  isFetchingName = false;

  @ViewChild('search', {
    static: false
  })
  public searchElementRef: ElementRef;

  constructor(
    public dialogRef: MatDialogRef < AddMapDialog > ,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close(this.data));
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.data.lat = place.geometry.location.lat();
          this.data.lng = place.geometry.location.lng();
          this.getAddress(this.data.lat, this.data.lng);
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.data.lat = position.coords.latitude;
        this.data.lng = position.coords.longitude;
        this.getAddress(this.data.lat, this.data.lng);
      });
    }
  }

  markerDragEnd($event: any) {
    this.data.lat = $event.coords.lat;
    this.data.lng = $event.coords.lng;
    this.getAddress(this.data.lat, this.data.lng);
  }

  getAddress(latitude, longitude) {
    this.isFetchingName = true;
    this.geoCoder.geocode({
      location: {
        lat: latitude,
        lng: longitude
      }
    }, (results, status) => {
      this.isFetchingName = false;
      if (status === 'OK') {
        if (results[0]) {
          this.data.title = results[0].formatted_address;
          this.data.country = results[results.length - 1].formatted_address;
        } else {
          console.log('No results');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

}
