import { Component, OnInit } from '@angular/core';
import { citiesWeServe } from './state/footer.data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  citiesWeServe:object=citiesWeServe;
  constructor() { }

  ngOnInit(): void {
  }

}
