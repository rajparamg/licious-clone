import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ModalsService } from 'src/app/services/modals/modals.service';

@Component({
  selector: 'app-location-modal',
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.scss']
})
export class LocationModalComponent implements OnInit {
  showLocationModal:boolean=false;
  @HostListener('document:click', ['$event'])
  clickout(event:any) {
    let className=event.target.className;
    console.log(className);
    //logic for hiding locationAlert Modal
    if (className.includes('modalBottomsheetBackdrop') || className.includes('closeImg') || className.includes('locationHeaderCancel')) {
      this.showLocationModal=false;
    } else if(className.includes('Modal_location_popup_backdrop__BGnPo') || className.includes('header_container')){
      this.modalService.hideLocationSearch();
    }
  }
  @ViewChild('locationModal') locationModalRef!: ElementRef;
  constructor(private modalService:ModalsService) { }

onModalClick(event:any) {
    // setTimeout(() => {
    //   console.log(this.locationModalRef.nativeElement.className);
    //   if (
    //     this.locationModalRef.nativeElement.className ===
    //     'modalDialogwrapper'
    //   ) {
    //     this.showLocationModal = true;
    //     console.log('closed');
    //   }
    // });isLocationSearch
    console.log(event.target.className) 
    if (event.target.className.includes('locationHeaderConfirm')) {
      console.log('change location-open location search modal')
      this.showLocationModal=false;
      this.modalService.showLocationSearch();
    }
  }

  ngOnInit(): void {
  }
}
