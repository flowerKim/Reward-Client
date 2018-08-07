import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { CompanyComponent } from '../../app/page/company/company.component'
import { CompanyDetailComponent } from '../../app/page/company-detail/company-detail.component'
import { NewCompanyComponent } from '../../app/page/new-company/new-company.component'
import { ServiceComponent } from '../../app/page/service/service.component'
import { UsageHistoryComponent } from '../../app/page/usage-history/usage-history.component'
import { ServiceAddComponent } from '../../app/page/service-add/service-add.component'
import { ServiceDetailComponent } from '../../app/page/service-detail/service-detail.component'

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent
  }, {
    path: 'company_detail/:id',
    component: CompanyDetailComponent
  }, {
    path: 'new_company',
    component: NewCompanyComponent
  }, {
    path: 'service',
    component: ServiceComponent
  }, {
    path: 'service_add/:id',
    component: ServiceAddComponent
  }, {
    path: 'service_detail/:id',
    component: ServiceDetailComponent
  }, {
    path: 'usage_history',
    component: UsageHistoryComponent
  }, {
    path: '',
    redirectTo: '/company',
    pathMatch: 'full'
  }

  // { path: 'crisis-center', component: CrisisListComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '**', component: PageNotFoundComponent }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
