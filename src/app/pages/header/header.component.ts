import { Component, OnInit, ViewChild, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocationModalComponent } from 'src/app/components/modals/location-modal/location-modal.component';
import { HttpService } from 'src/app/services/http/http.service';
import { CartComponent } from '../cart/cart.component';
import { DrawerService } from 'src/app/services/drawer/drawer.service';
import { Observable, Subscription } from 'rxjs';
import { ModalsService } from 'src/app/services/modals/modals.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges, OnDestroy {
  // @Input() cartItems:any;
  currentCity:string="Bengaluru"
  locationDetectionMessage:string="Detecting Location"
  cartItems:any;
  showDrawer: boolean | any;
  @ViewChild(LocationModalComponent) locationModal!: any;
  totalCartItem:number=0;
  totalCartItemPrice:number=0;
  totalCartItemPriceWithoutDiscount:number=0;
  defaultDeliveryCharge:number=39;
  deliveryCharge:number=0;
  deliveryChargeApplyOnPrice:number=399;
  finalTotalPrice:number=0;
  subscription:Subscription | undefined;
  locationSearch$:Observable<any> | undefined;
  isSearch:boolean=false;
  searchText:string="";
  constructor(
    private router: Router,
    private httpService:HttpService,
    private drawerService:DrawerService,
    private modalService:ModalsService
    ) { }
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
  getFreshCartItems(items:Array<any>){
    if (items) {
      this.cartItems=items
      this.totalCartItem=this.getTotalQuantity(items);
      this.totalCartItemPrice=this.getTotalAfterDiscountPrice(items);
      this.deliveryCharge = this.getDeliveryCharge();
      //adding delivery charge as rs39 if order item price is 399<
      // this.totalCartItemPrice = this.totalCartItemPrice < this.deliveryChargeApplyOnPrice ? this.totalCartItemPrice + this.deliveryCharge : this.totalCartItemPrice;
      this.finalTotalPrice = this.getFinalCartItemPriceWithDeliveryCharge(items);
    }
  }
  getTotalQuantity(items:any):number {
    return items.reduce((total:number, cartItem:any) => total + cartItem.quantity, 0);
  }
  getTotalAfterDiscountPrice(items:any):number{
    //this discount may be on some items only
    this.totalCartItemPrice=0
    for(let item of items){
      if (item.price && item.discountPrice) {
        this.totalCartItemPrice += item.discountPrice*item.quantity;
      } else{
        this.totalCartItemPrice += item.price*item.quantity;
      }
    }
    return this.totalCartItemPrice;
  }
  getDeliveryCharge():number{
      this.deliveryCharge = this.totalCartItemPrice <= 0 ||  this.totalCartItemPrice < this.deliveryChargeApplyOnPrice? this.defaultDeliveryCharge : 0;
    return this.deliveryCharge;
  }
  getFinalCartItemPriceWithDeliveryCharge(items:any):number{
    let totalCartItemPriceWithDeliveryCharge:number=0;
    totalCartItemPriceWithDeliveryCharge = this.getTotalAfterDiscountPrice(items)+this.getDeliveryCharge();
    return totalCartItemPriceWithDeliveryCharge;
  }
  ngOnInit(): void {
   this.subscription = this.httpService.carItem$.subscribe(data=>{
      if (data) {
        this.getFreshCartItems(data);
      }
    })
    this.locationSearch$=this.modalService.isLocationSearch$;
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
  }
  showSearchBox(){
    console.log('showSearchBox');
    let activeRoute = this.router.routerState.snapshot.url;
    console.log(activeRoute);
    if (activeRoute != "/home") {
        this.isSearch=false;
    } else {
        this.isSearch=true;
    }
   
  }
  onProductSearch(event:any){
    console.log(event.target.value);
    console.log('onProductSearch');
    this.searchText=event.target.value;
    // this.httpService.searchProduct(this.searchText).subscribe((data)=>{
    //   console.log('searchProduct -- http call');
    //   console.log(data);
    // },(error)=>{
    //   console.log(error);
    // })
  }
  onLogIn() {
    console.log('onLogIn');
    this.showDrawer = true;
    setTimeout(() => {
      this.showDrawer = false;
    }, 500)
  }
  openCart(){
    if (this.cartItems.length == 0) {
      alert("Cart is empty");
    }
  }
  openCartDrawer(evt:Event){
    console.log('openCartDrawer');
    console.log(evt.target);
    this.drawerService.showCartDrawer();
  }
  ngOnDestroy(){
    console.log('ngOnDestroy')
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
