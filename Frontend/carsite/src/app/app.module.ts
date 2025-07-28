import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { BrandsComponent } from './brands/brands.component';
import { FiatComponent } from './cars/fiat/fiat.component';
import { DsComponent } from './cars/ds/ds.component';
import { AlfaRomeoComponent } from './cars/alfa-romeo/alfa-romeo.component';
import { JeepComponent } from './cars/jeep/jeep.component';
import { PeugeotComponent } from './cars/peugeot/peugeot.component';
import { CitroenComponent } from './cars/citroen/citroen.component';
import { OpelComponent } from './cars/opel/opel.component';
import { PartCrossComponent } from './parts-of-cars/part-cross/part-cross.component';
import { PartSedanComponent } from './parts-of-cars/part-sedan/part-sedan.component';
import { Part4008Component } from './parts-of-cars/part-4008/part-4008.component';
import { Part5008Component } from './parts-of-cars/part-5008/part-5008.component';
import { PartAstraComponent } from './parts-of-cars/part-astra/part-astra.component';
import { PartC3Component } from './parts-of-cars/part-c3/part-c3.component';
import { PartC4Component } from './parts-of-cars/part-c4/part-c4.component';
import { PartGuiliaComponent } from './parts-of-cars/part-guilia/part-guilia.component';
import { PartStelvioComponent } from './parts-of-cars/part-stelvio/part-stelvio.component';
import { PartCorsaComponent } from './parts-of-cars/part-corsa/part-corsa.component';
import { PartDs4Component } from './parts-of-cars/part-ds4/part-ds4.component';
import { PartDs7Component } from './parts-of-cars/part-ds7/part-ds7.component';
import { PartRenegadeComponent } from './parts-of-cars/part-renegade/part-renegade.component';
import { PartAvengerComponent } from './parts-of-cars/part-avenger/part-avenger.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BasketComponent } from './basket/basket.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    BrandsComponent,
    FiatComponent,
    DsComponent,
    AlfaRomeoComponent,
    JeepComponent,
    PeugeotComponent,
    CitroenComponent,
    OpelComponent,
    PartCrossComponent,
    PartSedanComponent,
    Part4008Component,
    Part5008Component,
    PartAstraComponent,
    PartC3Component,
    PartC4Component,
    PartGuiliaComponent,
    PartStelvioComponent,
    PartCorsaComponent,
    PartDs4Component,
    PartDs7Component,
    PartRenegadeComponent,
    PartAvengerComponent,
    PartGuiliaComponent,
    ForgotPasswordComponent,
    BasketComponent,
    CheckoutComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
