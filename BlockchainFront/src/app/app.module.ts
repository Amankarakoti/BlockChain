import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SendPageComponent } from './send-page/send-page.component';
import { RecievePageComponent } from './recieve-page/recieve-page.component';
import { SendRecieveComponent } from './send-recieve/send-recieve.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ReceiptComponent } from './receipt/receipt.component';

const appRoutes:Routes=[
  {path:"",component:HomeComponent},
  {path:"send-recieve",component:SendRecieveComponent},
  {path:"send-page",component:SendPageComponent},
  {path:"recieve-page",component:RecievePageComponent},
  {path:"receipt",component:ReceiptComponent}



]
@NgModule({
  declarations: [
    AppComponent,
    SendPageComponent,
    RecievePageComponent,
    SendRecieveComponent,
    HomeComponent,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),FormsModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
