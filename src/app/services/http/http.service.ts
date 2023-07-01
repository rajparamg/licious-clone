import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  cartItems: Array<any>=[];
  public carItemSub = new BehaviorSubject<any>(this.cartItems);
  public carItem$ = this.carItemSub.asObservable();
  constructor() { }
  // addItemAndUpdateData(item:any){
  //   this.cartItems.push(item);
  //   this.carItemSub.next(this.cartItems);
  // }
  // removeItemUpdateData(item:any){
  //   console.log('removeItemUpdateData');
  //   console.log(this.cartItems);
  //   console.log(item);
  //   let itemIndex = this.cartItems.findIndex((ct:any)=> ct.type === item.type && ct.id === item.id )
  //   this.cartItems.splice(itemIndex,1);
  //   // this.cartItems=this.cartItems.filter((ct:any)=> ct.meatType !== item.meatType && ct.id !== item.id );
  //   this.carItemSub.next(this.cartItems);
  // }

addItemToCart(item:any) {
  var existingItem:any = this.cartItems.find((cartItem:any) => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    this.cartItems.push({ ...item, quantity: 1 });
  }
  this.carItemSub.next(this.cartItems);
}

removeItemFromCart(item:any) {
  var itemIndex = this.cartItems.findIndex((cartItem:any) => cartItem.id === item.id);
  if (itemIndex !== -1) {
    this.cartItems[itemIndex].quantity--;
    
    if (this.cartItems[itemIndex].quantity <= 0) {
      this.cartItems.splice(itemIndex, 1);
    }
  }
    this.carItemSub.next(this.cartItems);
}

clearCart() {
  // Empty the cartItems array
  this.cartItems = [];
  this.carItemSub.next(this.cartItems);

}
}
