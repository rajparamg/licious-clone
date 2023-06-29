import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocationModalComponent } from 'src/app/components/modals/location-modal/location-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showDrawer:boolean | any;
  @ViewChild(LocationModalComponent) locationModal!: any;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onLiciousLogoClick(evt:Event){
    console.log('onLiciousLogoClick');
    let activeRoute=this.router.routerState.snapshot.url;
    if (activeRoute != "/home") {
      this.router.navigate(['./home']);
    }
    console.log(this.router.routerState.snapshot.url);
  }
  onLocationClick(evt:Event){
    console.log('onLocationClick');
    this.locationModal.showLocationModal=true;
    console.log();
  }
  onLogIn(){
    console.log('onLogIn');
    this.showDrawer=true;
    setTimeout(()=>{
this.showDrawer=false;
    },500)
  }
}
