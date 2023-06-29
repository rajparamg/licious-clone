import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']
})
export class LocationModalComponent implements OnInit {
  showLocationModal:boolean=false;
  @HostListener('document:click', ['$event'])
  clickout(event:any) {
    if (event.target.className.includes('modalBottomsheetBackdrop') || event.target.className.includes('closeImg')) {
      this.showLocationModal=false;
    }
  }
  @ViewChild('locationModal') locationModalRef!: ElementRef;

onModalClick() {
    setTimeout(() => {
      console.log(this.locationModalRef.nativeElement.className);
      if (
        this.locationModalRef.nativeElement.className ===
        'modalDialogwrapper'
      ) {
        this.showLocationModal = true;
        console.log('closed');
      }
    });
  }
  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
  }
}
