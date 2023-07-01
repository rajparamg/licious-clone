import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {
  isLocationSearch = new BehaviorSubject<boolean>(false);
  isLocationSearch$ = this.isLocationSearch.asObservable();
  constructor() { }
  hideLocationSearch(){
  this.isLocationSearch.next(false);
}
showLocationSearch(){
  this.isLocationSearch.next(true);
}
}
