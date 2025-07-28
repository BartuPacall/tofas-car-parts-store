import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { BrandsComponent } from './brands/brands.component';
import { FiatComponent } from './cars/fiat/fiat.component';
import { AlfaRomeoComponent } from './cars/alfa-romeo/alfa-romeo.component';
import { OpelComponent } from './cars/opel/opel.component';
import { CitroenComponent } from './cars/citroen/citroen.component';
import { PeugeotComponent } from './cars/peugeot/peugeot.component';
import { DsComponent } from './cars/ds/ds.component';
import { JeepComponent } from './cars/jeep/jeep.component';
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
import { authGuard } from './auth.guard';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './admin.guard';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'cars/fiat', component: FiatComponent },
  { path: 'cars/opel', component: OpelComponent },
  { path: 'cars/ds', component: DsComponent },
  { path: 'cars/jeep', component: JeepComponent },
  { path: 'cars/citroen', component: CitroenComponent },
  { path: 'cars/peugeot', component: PeugeotComponent },
  { path: 'cars/alfa-romeo', component: AlfaRomeoComponent },
  { path: 'parts-of-cars/part-cross', component: PartCrossComponent },
  { path: 'parts-of-cars/part-sedan', component: PartSedanComponent },
  { path: 'parts-of-cars/part-4008', component: Part4008Component },
  { path: 'parts-of-cars/part-5008', component: Part5008Component },
  { path: 'parts-of-cars/part-astra', component: PartAstraComponent },
  { path: 'parts-of-cars/part-c3', component: PartC3Component },
  { path: 'parts-of-cars/part-c4', component: PartC4Component },
  { path: 'parts-of-cars/part-guilia', component: PartGuiliaComponent },
  { path: 'parts-of-cars/part-stelvio', component: PartStelvioComponent },
  { path: 'parts-of-cars/part-corsa', component: PartCorsaComponent },
  { path: 'parts-of-cars/part-ds4', component: PartDs4Component },
  { path: 'parts-of-cars/part-ds7', component: PartDs7Component },
  { path: 'parts-of-cars/part-renegade', component: PartRenegadeComponent },
  { path: 'parts-of-cars/part-avenger', component: PartAvengerComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'basket', component: BasketComponent, canActivate: [authGuard] },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [adminGuard],
  },

  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
