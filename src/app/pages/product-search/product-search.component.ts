import { Component, OnInit } from '@angular/core';
import { Category } from '../home/state/home.model';
import { categories } from '../home/state/home.data';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  categories: Array<Category> = categories;

  constructor() { }

  ngOnInit(): void {
  }

}
