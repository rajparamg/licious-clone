import { Component, OnInit, ViewChild, ElementRef, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnChanges,OnInit {
  @ViewChild('drawerDiv') drawerElement: ElementRef | any;
  @Input() showDrawer:any;

  constructor(
  ) { }
    ngOnChanges(changes:any){
      if (!!changes.showDrawer) {
        if (changes.showDrawer.currentValue) {
          this.openDrawer()
        }
      }
    }
  ngOnInit(): void {
  }
  openDrawer() {
    console.log('--------openDrawer--------');
    let screenWith = innerWidth;
    console.log(screenWith);
    let formWidth = 350;
    if (screenWith >= 1281) {
      formWidth = 700;
    } else if (screenWith >= 1025) {
      formWidth = 590;
    } else if (screenWith >= 768) {
      formWidth = 392;
    } else {
      formWidth = 350;
    }
    const style = this.drawerElement.nativeElement.style;
    // style.width = formWidth + 'px';
    style.display = 'block';
    // this.drawerElement.nativeElement.classList.add("actionForm");//now adding width by screen media quries
    // this.isFormShown = true;
  }

  closeDrawer() {
    const style = this.drawerElement.nativeElement.style;
    style.display = 'none';
    // style.width = '0'
    console.log('..Close Drawer..');
    
    // if (this.isFormShown) {
    //   this.isFormShown = false;
    //   this.closeDrawerEvt.emit();
    // }
  }


}
