import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './chat/messages/messages.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProfilesearchComponent } from './profilesearch/profilesearch.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { ExchangeReceivedComponent } from './exchange-received/exchange-received.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';
import { ProfileditComponent } from './profiledit/profiledit.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';

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
    path: 'messages/:senderId/:receiverId',
    component: MessagesComponent
  },
  {
    path: 'receivedxchangeoffer/:notificationId',
    component: ExchangeReceivedComponent
  },
  {
    path: 'addproduct',
    component: AddProductComponent
  },
  {
    path: 'adminboard',
    component: AdminBoardComponent
  },
  {
    path: 'user/:userId/editprofile',
    component: ProfileditComponent
  },
  {
    path: 'notification-page',
    component: NotificationPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
