import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-content-middle',
  templateUrl: './footer-content-middle.component.html',
  styleUrls: ['./footer-content-middle.component.scss']
})
export class FooterContentMiddleComponent implements OnInit {
@Input() citiesWeServe:any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.citiesWeServe)
  }

}
