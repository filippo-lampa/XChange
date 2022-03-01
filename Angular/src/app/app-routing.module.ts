import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProfilesearchComponent } from './profilesearch/profilesearch.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'products/:id',
    component: ProductComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  },
  {
    path: 'search/:userName',
    component: ProfilesearchComponent
  },
  {
    path: 'search',
    component: ProfilesearchComponent
  },
  { path: 'categories/:name',
    component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
