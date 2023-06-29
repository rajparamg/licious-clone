import { Component, OnInit } from '@angular/core';
import { bestSellers, breakfastmeat, categories, combos, deliciousBonless, fresh, oneNinenineLover, topRatedMeat } from './state/home.data';
import { Category } from './state/home.model';

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
  constructor() { }
  ngOnInit(): void {
 
  }


}
