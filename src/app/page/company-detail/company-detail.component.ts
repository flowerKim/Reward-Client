import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';
import { Globals } from '../../../util/globals'
// import { consumeBinding } from '@angular/core/src/render3/instructions';
// import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})

export class CompanyDetailComponent implements OnInit {

  pageID: string = 'company_detail'
  companyInfo: {} = {}


  title: string = '| 서비스 리스트'
  searchType: string[] = ["대리운전", "꽃배달", "퀵서비스", "보험", "통신"]
  searchChannel: string[] = ["전화", "웹링크 호출", "제휴사 앱 설치", "상담예약", "구매(실물판매)"]

  type: string
  channel: string
  partner_start
  partner_end

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private globals: Globals
  ) {
    // let status = '서비스중'
    let url = globals.makeConnectURL('select', this.pageID) + '?code=' + activatedRoute.snapshot.params['id']
    http.get(url).subscribe(data => {
      this.companyInfo = data
      this.companyInfo['code'] = activatedRoute.snapshot.params['id']
    })
  }

  ngOnInit() { }

  onClickSubmit() {
    let url = '/service_add/' + this.companyInfo['code']
    this.router.navigate([url]);
  }

  valueChangeEvent(id: string, event: any) { this.companyInfo[id] = event.target.value }

  modify(data: NgForm) {
    if (data['partner_start'] != '')
      this.companyInfo['partner_start'] = data['partner_start']['year'] + '-' + data['partner_start']['month'] + '-' + data['partner_start']['day']
    if (data['partner_end'] != '')
      this.companyInfo['partner_end'] = data['partner_end']['year'] + '-' + data['partner_end']['month'] + '-' + data['partner_end']['day']
    let checkedData = this.globals.dataCheckAndSetting(this.companyInfo)
    if (checkedData) {
      let id = 'company_info_update'
      this.http.post(this.globals.makeConnectURL('update', id), checkedData).subscribe(data => {
        if (data['result'] == 0) {
          alert("제휴 업체 정보가 수정되었습니다.")
          this.router.navigate(['/']);
        }
        else { alert(this.globals.serverERRMassage) }
      })
    }
  }

}
