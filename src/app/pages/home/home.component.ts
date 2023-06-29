import { Component, OnInit } from '@angular/core';
import { bestSellers, breakfastmeat, categories, combos, deliciousBonless, fresh, oneNinenineLover, topRatedMeat } from './state/home.data';
import { Category } from './state/home.model';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Array<Category> = categories;
  bestSellers: Object = bestSellers;
  freshLicious: Array<any> = fresh;
  combosForYou: Object = combos;
  oneNinenineLoverData: Object = oneNinenineLover;
  breakfastmeatData: Object = breakfastmeat;
  deliciousBonlessData: Object = deliciousBonless;
  topRatedMeatData: Object = topRatedMeat;
  selectedCartItems: any = {};
  constructor(private httpService: HttpService) { }
  ngOnInit(): void {
    this.httpService.carItem$.subscribe(data => {
      this.selectedCartItems = {};
      if (data) {
        data.forEach((d: any) => {
          if (!this.selectedCartItems[d.type]) {
            this.selectedCartItems[d.type] = {}
            if (!this.selectedCartItems[d.type][d.name]) {
              this.selectedCartItems[d.type][d.name] = 1
            }
          } else {
            if (!this.selectedCartItems[d.type][d.name]) {
              this.selectedCartItems[d.type][d.name] = 1
            } else {
              this.selectedCartItems[d.type][d.name] ++
            }
          }
          // if (!this.selectedCartItems[d.name]) {
          //   this.selectedCartItems[d.name]=1;
          // } else {
          // if (this.selectedCartItems.hasOwnProperty( d.name )) {
          //   this.selectedCartItems[d.name]++;
          // } else {
          // this.selectedCartItems[d.name]=1;
          // }
          // }
        })
        console.log(this.selectedCartItems);
      }
    })
  }
  addItemToCart(item: any) {
    // console.log(addItemToCart)
    this.httpService.addItemAndUpdateData(item);
    console.log('addItemToCart')
    console.log(item);
    // this.cartItems.push(item);
  }
  removeItemFromCart(item:any){
    this.httpService.removeItemUpdateData(item);
  }

}
