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
      console.log('carItem$$$$$$');
      console.log(data);
      this.selectedCartItems = {};
      if (data) {
        data.forEach((d: any) => {
          // if (!this.selectedCartItems[d.type]) {
          //   this.selectedCartItems[d.type] = {}
          //   if (!this.selectedCartItems[d.type][d.name]) {
          //     this.selectedCartItems[d.type][d.name] = 1
          //   }
          // } else {
          //   if (!this.selectedCartItems[d.type][d.name]) {
          //     this.selectedCartItems[d.type][d.name] = 1
          //   } else {
          //     this.selectedCartItems[d.type][d.name] ++
          //   }
          // }
          if (!this.selectedCartItems[d.type]) {
            this.selectedCartItems[d.type] = {}
            if (!this.selectedCartItems[d.type][d.name]) {
              this.selectedCartItems[d.type][d.name] = d.quantity;
            }
          } else {
            if (!this.selectedCartItems[d.type][d.name]) {
              this.selectedCartItems[d.type][d.name] = d.quantity;
            } else {
              this.selectedCartItems[d.type][d.name] = d.quantity;
            }
          }
            this.selectedCartItems[d.type][d.name] = d.quantity;
        })
        console.log(this.selectedCartItems);
      }
    })
  }
  addItemToCart(item: any) {
    // console.log(addItemToCart)
    // this.httpService.addItemAndUpdateData(item);
    this.httpService.addItemToCart(item);
    console.log('addItemToCart')
    console.log(item);
    // this.cartItems.push(item);
  }
  removeItemFromCart(item:any){
    // this.httpService.removeItemUpdateData(item);
    this.httpService.removeItemFromCart(item);
  }

}
