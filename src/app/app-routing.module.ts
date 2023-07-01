import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategoryHolderComponent } from './components/category-holder/category-holder.component';
import { ProductSearchComponent } from './pages/product-search/product-search.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'search', component:ProductSearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
