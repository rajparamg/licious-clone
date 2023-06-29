import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { CategoryHolderComponent } from './components/category-holder/category-holder.component';
import { FooterComponent } from './components/footer/footer.component';
import { FooterContentMiddleComponent } from './components/footer/footer-content-middle/footer-content-middle.component';
import { FooterPopularSearchComponent } from './components/footer/footer-popular-search/footer-popular-search.component';
import { PurchaseItemComponent } from './components/purchase-item/purchase-item.component';
import { HeaderComponent } from './pages/header/header.component';
import { LocationModalComponent } from './components/modals/location-modal/location-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    DrawerComponent,
    CategoryHolderComponent,
    FooterComponent,
    FooterContentMiddleComponent,
    FooterPopularSearchComponent,
    PurchaseItemComponent,
    HeaderComponent,
    LocationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
