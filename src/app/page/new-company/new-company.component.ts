import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'

import { Globals } from '../../../util/globals'

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})

export class NewCompanyComponent implements OnInit {

  title: string = '| 제휴 회사 등록'
  searchType: string[] = ["대리운전", "꽃배달", "퀵배달", "보험", "통신"];
  searchChannel: string[] = ["전화", "상담예약", "앱 설치"];

  type: string
  channel: string
  uid;
  servicegubun;

  constructor(
    private http: HttpClient,
    private router: Router,
    private globals: Globals
  ) {

  }

  ngOnInit() {

  }

  valueChangeEvent(id: string, event: any) {
    if (id == 'type') this.type = event.target.value
    else if (id == 'channel') this.channel = event.target.value
  }

  onClickSubmit(data: NgForm) {
    data['type'] = this.type
    data['channel'] = this.channel
    if (data['partner_start'] != '')
      data['partner_start'] = data['partner_start']['year'] + '-' + data['partner_start']['month'] + '-' + data['partner_start']['day']
    if (data['partner_end'] != '')
      data['partner_end'] = data['partner_end']['year'] + '-' + data['partner_end']['month'] + '-' + data['partner_end']['day']

    let checkedData = this.globals.dataCheckAndSetting(data)
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