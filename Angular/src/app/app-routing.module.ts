import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProfilesearchComponent } from './profilesearch/profilesearch.component';
import { RegisterComponent } from './register/register.component';
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
  {
    path: 'categories/:name',
    component: ProductListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'messages/:userId',
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
