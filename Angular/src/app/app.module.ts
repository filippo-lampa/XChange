import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProfilesearchComponent } from './profilesearch/profilesearch.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { NotificationService } from '../app/shared/services/notification.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewMessageComponent } from './chat/new-message/new-message.component';
import { MessagesComponent } from './chat/messages/messages.component';
import { MessageService } from '../app/shared/services/message.service';
import { PusherService } from '../app/shared/services/pusher.service';
import { TokenInterceptor } from './shared/interceptor/token.interceptor';
import { ExchangeReceivedComponent } from './exchange-received/exchange-received.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    FooterComponent,
    ProductListComponent,
    ProductComponent,
    ProfilesearchComponent,
    ExchangeComponent,
    LoginComponent,
    RegisterComponent,
    NewMessageComponent,
    MessagesComponent,
    ExchangeReceivedComponent,
    AddProductComponent,
    AdminBoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [NotificationService, MessageService, PusherService, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
