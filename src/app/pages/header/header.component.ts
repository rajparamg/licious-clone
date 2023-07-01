import { Component, OnInit, ViewChild, Input, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LocationModalComponent } from 'src/app/components/modals/location-modal/location-modal.component';
import { HttpService } from 'src/app/services/http/http.service';
import { CartComponent } from '../cart/cart.component';
import { DrawerService } from 'src/app/services/drawer/drawer.service';
import { Subscription } from 'rxjs';

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
  savedMoney:number=0;
  defaultDeliveryCharge:number=39;
  deliveryCharge:number=0;
  deliveryChargeApplyOnPrice:number=399;
  finalTotalPrice:number=0;
  orderSummary:any={};
  waivedOffMessage:string="Congratulations, Your delivery charge is waived off!!!";
  deliveryChargeApplyMessage:string=`Your cart value is less than ₹${this.deliveryChargeApplyOnPrice} & delivery charge applies`;
  subscription:Subscription | undefined;
  
  constructor(
    private router: Router,
    private httpService:HttpService,
    private drawerService:DrawerService
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
      this.totalCartItemPriceWithoutDiscount=this.getTotalPrice(items);
      // this.deliveryCharge=0;
      this.orderSummary={};
      // for(let item of items){
      //   if (item.price && item.discountPrice) {
      //     this.totalCartItemPrice += item.discountPrice;
      //   } else{
      //     this.totalCartItemPrice += item.price;
      //   }
      //   this.totalCartItemPriceWithoutDiscount += item.price;
      // }
      //saved price
      this.savedMoney = this.getSavedMoney(items);
      this.deliveryCharge = this.getDeliveryCharge();
      this.orderSummary['totalCartItemPriceWithoutDeliveryCharge'] = this.totalCartItemPrice;
      //adding delivery charge as rs39 if order item price is 399<
      // this.totalCartItemPrice = this.totalCartItemPrice < this.deliveryChargeApplyOnPrice ? this.totalCartItemPrice + this.deliveryCharge : this.totalCartItemPrice;
      this.finalTotalPrice = this.getFinalCartItemPriceWithDeliveryCharge(items);

      console.log('getFreshCartItems')
      console.log(this.savedMoney)
      console.log(this.cartItems)
      console.log(this.totalCartItem)
      console.log(this.totalCartItemPrice)
      console.log(this.finalTotalPrice)
      this.orderSummary['deliveryChargeMessage'] = this.getDeliveryMessage();
      this.orderSummary['savedMoney'] = this.savedMoney;
      this.orderSummary['deliveryCharge'] = this.deliveryCharge;
      this.orderSummary['totalCartItemPrice'] = this.totalCartItemPrice;
      this.orderSummary['finalTotalPrice'] = this.finalTotalPrice;
      this.orderSummary['totalCartItem'] = this.totalCartItem;
      this.orderSummary['cartItems'] = items;
    }
  }
  getTotalQuantity(items:any):number {
    return items.reduce((total:number, cartItem:any) => total + cartItem.quantity, 0);
  }
  getTotalPrice(items:any):number{
    return items.reduce((total:number, val:any)=> total+val.price*val.quantity,0);
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
  getSavedMoney(items:any):number{
    this.savedMoney=0;
    this.savedMoney = this.getTotalPrice(items)-this.getTotalAfterDiscountPrice(items);
    return this.savedMoney;
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
  getDeliveryMessage():string{
    let message:string=""
    message = this.totalCartItemPrice < this.deliveryChargeApplyOnPrice ? this.deliveryChargeApplyMessage : this.waivedOffMessage
    return message;
  }
  ngOnInit(): void {
   this.subscription = this.httpService.carItem$.subscribe(data=>{
      if (data) {
        this.getFreshCartItems(data);
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
    if (this.cartItems.length == 0) {
      alert("Cart is empty");
    }
  }
  openCartDrawer(evt:Event){
    console.log('openCartDrawer');
    console.log(evt.target);
    if (evt.target) {
      
    }
    this.drawerService.showCartDrawer();
    this.drawerService.populateDrawerData(this.orderSummary);
  }
  ngOnDestroy(){
    console.log('ngOnDestroy')
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
