import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-category-holder',
  templateUrl: './category-holder.component.html',
  styleUrls: ['./category-holder.component.scss']
})
export class CategoryHolderComponent implements OnInit, OnChanges {
  // categories:Array<Category>=categories;
  @Input() categories: any;
  @Input() bestSellers: any;
  @Input() freshLicious: any;
  @Input() combos: any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  ngOnInit(): void {

  }
  onViewAll(){
    
  }

}
