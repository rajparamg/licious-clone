import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DrawerService } from './services/drawer/drawer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'licious-clone';
  showDrawer:boolean | any;
  showCart:boolean=false;
  showCart$: Observable<any> | undefined;
  cartDrawerData$: Observable<any> | undefined;
  constructor(private router:Router, private drawerService:DrawerService){
    this.router.navigate(['./home']);
  }
  ngOnInit():void{
    this.showCart$=this.drawerService.showCart$;
    this.cartDrawerData$=this.drawerService.cartDrawerData$;
  }
}
