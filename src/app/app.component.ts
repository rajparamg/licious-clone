import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'licious-clone';
  showDrawer:boolean | any;
  constructor(private router:Router){
    this.router.navigate(['./products'])
  }

  onLogIn(){
    console.log('onLogIn');
    this.showDrawer=true;
    setTimeout(()=>{
this.showDrawer=false;
    },500)
  }
}
