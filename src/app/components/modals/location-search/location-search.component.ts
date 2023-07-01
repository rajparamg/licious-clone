import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent implements OnInit {
  isSearch:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  onSearch(){
    console.log('onSearch');
    this.isSearch=true;
    
  }
}
