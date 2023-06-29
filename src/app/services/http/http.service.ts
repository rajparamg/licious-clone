import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  cartItems: Array<unknown>=[];
  public carItemSub = new BehaviorSubject<any>(this.cartItems);
  public carItem$ = this.carItemSub.asObservable();
  constructor() { }
  addItemAndUpdateData(item:any){
    this.cartItems.push(item);
    this.carItemSub.next(this.cartItems);
  }
  removeItemUpdateData(item:any){
    console.log('removeItemUpdateData');
    console.log(this.cartItems);
    console.log(item);
    let itemIndex = this.cartItems.findIndex((ct:any)=> ct.type === item.type && ct.id === item.id )
    this.cartItems.splice(itemIndex,1);
    // this.cartItems=this.cartItems.filter((ct:any)=> ct.meatType !== item.meatType && ct.id !== item.id );
    this.carItemSub.next(this.cartItems);
  }
}
