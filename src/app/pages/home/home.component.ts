import { Component, OnInit } from '@angular/core';
import { bestSellers, categories } from './state/home.data';
import { Category } from './state/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {  
  categories: Array<Category> = categories;
  bestSellers: Array<any> = bestSellers;
  constructor() { }
  ngOnInit(): void {
 
  }


}
