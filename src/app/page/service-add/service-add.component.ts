import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';

import { Globals } from '../../../util/globals'
import { consumeBinding } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-service-add',
  templateUrl: './service-add.component.html',
  styleUrls: ['./service-add.component.css']
})
export class ServiceAddComponent implements OnInit {

  title: string = '| 업체 서비스 추가 등록'
  companyInfo: {} = {}
  searchType: string[]
  searchChannel: string[]
  pageID: string = 'company_detail'

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private globals: Globals
  ) {

    let url = globals.makeConnectURL('select', this.pageID) + '?code=' + activatedRoute.snapshot.params['id']
    http.get(url).subscribe(data => {
      this.companyInfo['code'] = data['code']
      this.companyInfo['c_name'] = data['c_name']
      this.companyInfo['b_num'] = data['b_num']
      this.companyInfo['ceo_name'] = data['ceo_name']
      this.companyInfo['company_callnum'] = data['company_callnum']
      this.companyInfo['address'] = data['address']

    })
    this.searchType = globals.searchType
    this.searchChannel = globals.searchChannel
  }

  ngOnInit() { }

  valueChangeEvent(id: string, event: any) { this.companyInfo[id] = event.target.value }

  modify(data: NgForm) {
    if (data['partner_start'] != '')
      this.companyInfo['partner_start'] = data['partner_start']['year'] + '-' + data['partner_start']['month'] + '-' + data['partner_start']['day']
    if (data['partner_end'] != '')
      this.companyInfo['partner_end'] = data['partner_end']['year'] + '-' + data['partner_end']['month'] + '-' + data['partner_end']['day']
    let checkedData = this.globals.dataCheckAndSetting(this.companyInfo)
    if (checkedData) {
      let pageID = 'new_company'
      this.http.post(this.globals.makeConnectURL('insert', pageID), checkedData).subscribe(data => {
        if (data['result'] == 0) {
          alert("제휴 업체가 등록되었습니다.")
          this.router.navigate(['/company']);
        }
        else { alert(this.globals.serverERRMassage) }
      })
    }

  }


}
