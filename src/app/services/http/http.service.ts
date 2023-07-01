import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  cartItems: Array<any>=[];
  carItemSub = new BehaviorSubject<any>(this.cartItems);
  carItem$ = this.carItemSub.asObservable();
  liciousUrl="https://www.licious.in/api/search?query="
  constructor(private http:HttpClient) { }
  headers: any = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
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

searchProduct(searchKey:string):Observable<any>{
  let api="", queryText=`${searchKey}&page=1`;
  api=`${this.liciousUrl}${queryText}`;
  let httpOptions={
    headers:new HttpHeaders(this.headers)
  }
  return this.http.get(api,httpOptions);
}

}
