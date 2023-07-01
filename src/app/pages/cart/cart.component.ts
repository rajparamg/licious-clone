import { Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawerService } from 'src/app/services/drawer/drawer.service';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnChanges {
  @HostListener('window:click', ['$event'])
  onWindowClick(event:any) {
    let className=event.target.className;
    if (className.includes('closeCart') || className.includes('orderSummary') ) {
      this.drawerService.hideCartDrawer();
    }
  }
  // @Input() orderSummary: any;
  subscription:Subscription | undefined;
    cartItems:any;
  showDrawer: boolean | any;
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
  constructor(private drawerService:DrawerService, private httpService:HttpService) { }
  ngOnChanges(changes:any) {
    console.log('cart --- changes----')
    console.log(changes)
    console.log(this.orderSummary)
    if (changes && changes.orderSummary && changes.orderSummary.currentValue) {
      let items=changes.orderSummary.currentValue.cartItems;
      console.log('orderSummary')
      console.log(items)
    }
  }
  ngOnInit(): void {
    this.subscription = this.httpService.carItem$.subscribe(data=>{
      if (data) {
        this.getUpdatedCartItems(data);
      }
    })
  }
  getUpdatedCartItems(items:Array<any>){
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
      this.deliveryCharge = this.totalCartItemPrice > 0 &&  this.totalCartItemPrice < this.deliveryChargeApplyOnPrice? this.defaultDeliveryCharge : 0;
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
  deleteItem(item:any){
    console.log('deleteItem');
    console.log(item);
  }
  removeItem(item:any){
    console.log('removeItem');
    console.log(item);
    this.httpService.removeItemFromCart(item);
  }
  addItem(item:any){
    console.log('addItem');
    console.log(item);
    this.httpService.addItemToCart(item);
}
  onProceedToCheckout(){
    console.log('onProceedToCheckout- feature - Coming Soon');
  }

  ngOnDestroy(){
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
