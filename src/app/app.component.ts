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

}
