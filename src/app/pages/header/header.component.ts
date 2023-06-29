import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LocationModalComponent } from 'src/app/components/modals/location-modal/location-modal.component';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  // @Input() cartItems:any;
  currentCity:string="Bengaluru"
  locationDetectionMessage:string="Detecting Location"
  cartItems:any;
  showDrawer: boolean | any;
  @ViewChild(LocationModalComponent) locationModal!: any;
  totalCartItem:number=0;
  totalCartItemPrice:number=0;
  constructor(private router: Router, private httpService:HttpService) { }
  ngOnChanges(changes:any){
    // if (!!changes && changes.cartItems && !!changes.cartItems.currentValue) {
    //   let cartItems=changes.cartItems.currentValue
    //   this.totalCartItem=cartItems.length
    //   this.totalCartItemPrice=0;
    //   for(let item of cartItems){
    //     if (item.price && item.discountPrice) {
    //       this.totalCartItemPrice += item.discountPrice;
    //     } else{
    //       this.totalCartItemPrice += item.price;
    //     }
    //   }
    // }
  }
  calulateTotalItemAndPrice(items:Array<any>){
    if (items) {
      this.cartItems=items
      this.totalCartItem=items.length
      this.totalCartItemPrice=0;
      for(let item of items){
        if (item.price && item.discountPrice) {
          this.totalCartItemPrice += item.discountPrice;
        } else{
          this.totalCartItemPrice += item.price;
        }
      }
    }
    console.log('calulateTotalItemAndPrice')
    console.log(this.cartItems)
    console.log(this.totalCartItem)
    console.log(this.totalCartItemPrice)

  }
  ngOnInit(): void {
    this.httpService.carItem$.subscribe(data=>{
      if (data) {
        this.calulateTotalItemAndPrice(data);
      }
    })
  }
  onLiciousLogoClick(evt: Event) {
    console.log('onLiciousLogoClick');
    let activeRoute = this.router.routerState.snapshot.url;
    if (activeRoute != "/home") {
      this.router.navigate(['./home']);
    }
    console.log(this.router.routerState.snapshot.url);
  }
  onLocationClick(evt: Event) {
    console.log('onLocationClick');
    this.locationModal.showLocationModal = true;
    console.log();
  }
  onLogIn() {
    console.log('onLogIn');
    this.showDrawer = true;
    setTimeout(() => {
      this.showDrawer = false;
    }, 500)
  }
  openCart(){
    console.log('onLogIn');
    if (this.cartItems.length == 0) {
      alert("Cart is empty");
    }
  }
}
