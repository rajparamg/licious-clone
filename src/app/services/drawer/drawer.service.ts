import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  cartDrawerData:object={};
  cartDrawerBSub = new BehaviorSubject<object>(this.cartDrawerData);
  cartDrawerData$ = this.cartDrawerBSub.asObservable();
  showCartBSub = new BehaviorSubject<boolean>(false);
  showCart$ = this.showCartBSub.asObservable();
  constructor() { }
hideCartDrawer(){
  this.showCartBSub.next(false);
}
showCartDrawer(){
  this.showCartBSub.next(true);
}
populateDrawerData(data:object){
  console.log('populateDrawerData')
  console.log(data)
  this.cartDrawerBSub.next(data);
}

}
