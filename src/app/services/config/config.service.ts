import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public mode = environment.mode;

  constructor() { }

  async getBaseUrl() {

    if (this.mode == "Production") {
      return "/";
    } else if (this.mode == "Dev") {
      return "https://www.licious.in/"
    } else {
      return "http://192.168.7.119:9998/";
    }
  }

  // async getLiciousBaseUrl() {
  //   if (this.mode == "Production") {
  //     return "http://localhost:3000/";
  //   } else if (this.mode == "Dev") {
  //     return 'https://trybe-dev.atishae.com/';
  //   } else {
  //     return "http://localhost:3000/";
  //   }
  // }

}
