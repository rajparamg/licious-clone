import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'licious-clone';
  showDrawer:boolean | any;
  constructor(private router:Router){
    this.router.navigate(['./home']);
  }

  onLiciousLogoClick(evt:Event){
    console.log('onLiciousLogoClick');
    let activeRoute=this.router.routerState.snapshot.url;
    if (activeRoute != "/home") {
      this.router.navigate(['./home']);
    }
    console.log(this.router.routerState.snapshot.url);
  }
  onLocationClick(evt:Event){
    console.log('onLocationClick');
    
    console.log();
  }
  onLogIn(){
    console.log('onLogIn');
    this.showDrawer=true;
    setTimeout(()=>{
this.showDrawer=false;
    },500)
  }
}
