import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { AppComponent } from './app.component'
import { RoutingModule } from '../util/routing/routing.module'
import { CompanyComponent } from './page/company/company.component'
import { CompanyDetailComponent } from './page/company-detail/company-detail.component'
import { NewCompanyComponent } from './page/new-company/new-company.component'

import { Globals } from '../util/globals'
import { ServiceComponent } from './page/service/service.component'
import { UsageHistoryComponent } from './page/usage-history/usage-history.component'
import { ServiceAddComponent } from './page/service-add/service-add.component'
import { DatepickerComponent } from '../util/datepicker/datepicker.component'
import { NgbdDatepickerBasic } from '../util/datepicker/datepicker-basic'
import { NgbdDatepickerPopup } from '../util/datepicker/datepicker-popup';
import { ServiceDetailComponent } from './page/service-detail/service-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RoutingModule,
    ReactiveFormsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    CompanyComponent,
    CompanyDetailComponent,
    NewCompanyComponent,
    ServiceComponent,
    UsageHistoryComponent,
    ServiceAddComponent,
    DatepickerComponent,
    NgbdDatepickerBasic,
    NgbdDatepickerPopup,
    ServiceDetailComponent
  ],
  providers: [
    Globals
  ],
  bootstrap: [
    AppComponent
  ]
})

export class AppModule { }
