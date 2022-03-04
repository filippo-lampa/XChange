import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule} from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { ProfilesearchComponent } from './profilesearch/profilesearch.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { NotificationService} from '../app/shared/services/notification.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewMessageComponent } from './chat/new-message/new-message.component';
import { MessagesComponent } from './chat/messages/messages.component';
import { MessageService } from '../app/shared/services/message.service';
import { PusherService } from '../app/shared/services/pusher.service';

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
    MessagesComponent
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
  providers: [NotificationService, MessageService, PusherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
