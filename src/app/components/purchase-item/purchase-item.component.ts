import { Component, Input, Output,  OnInit, OnChanges, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-purchase-item',
  templateUrl: './purchase-item.component.html',
  styleUrls: ['./purchase-item.component.scss']
})
export class PurchaseItemComponent implements OnInit, OnChanges {
  @Input() itemData: any;
@Output() onAddItem:EventEmitter<any>=new EventEmitter();
@Output() onRemoveItem:EventEmitter<any>=new EventEmitter();
  @Input() selectedItems:any;
  isSelectedItems:boolean=false;
  constructor() { }
  ngOnChanges(changes:any){
    if (changes && changes.selectedItems && changes.selectedItems.currentValue) {
      this.selectedItems=changes.selectedItems.currentValue;
      console.log('ngOnChanges- purchase');
      console.log(changes);
      console.log(this.selectedItems);
      if(this.selectedItems && typeof this.selectedItems == 'object' && Object.keys(this.selectedItems).length == 0){
        this.isSelectedItems=false;
      } else{
        this.isSelectedItems=true;
      }
    }
  }
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit')
  }
  addItemToCart(evt:any,item:any){
    console.log('addItemToCart');
    console.log(item);
    this.onAddItem.emit(item)
  }
  removeItemFromCart(evt:any, item:any){
    this.onRemoveItem.emit(item);
  }

}
