import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { NgForm } from '@angular/forms';

import { Globals } from '../../../util/globals'

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  pageID: string = 'company_detail'
  companyInfo: {} = {}
  searchType: string[]
  searchChannel: string[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private globals: Globals,
    private http: HttpClient
  ) {
      let url = globals.makeConnectURL('select', this.pageID) +'?code=' + activatedRoute.snapshot.params['id']
      http.get(url).subscribe(data => {
        this.companyInfo = data
        this.companyInfo['code'] = activatedRoute.snapshot.params['id']
        console.log('companyInfo ==> ' + this.companyInfo['c_name'])
        console.log('companyInfo ==> ' + this.companyInfo['type'])
        console.log('companyInfo ==> ' + this.companyInfo['channel'])
      })
      console.log('url ==> ' + url)

      this.searchType = globals.searchType
      this.searchChannel = globals.searchChannel
   }

  ngOnInit() { }



  valueChangeEvent(id: string, event: any) { 
    this.companyInfo[id] = event.target.value
    console.log('changevaule id==> ' + id )
    console.log('changevaule event==> ' + this.companyInfo[id])
  }

  modify(data: NgForm) {
    if (data['partner_start'] != '')
    this.companyInfo['partner_start'] = data['partner_start']['year'] + '-' + data['partner_start']['month'] + '-' + data['partner_start']['day']
    if (data['partner_end'] != '')
    this.companyInfo['partner_end'] = data['partner_end']['year'] + '-' + data['partner_end']['month'] + '-' + data['partner_end']['day']
    let checkedData = this.globals.dataCheckAndSetting(this.companyInfo)
    if (checkedData) {
      console.log(checkedData)
    //   let id = 'company_info_update'
    //   this.http.post(this.globals.makeConnectURL('update', id), checkedData).subscribe(data => {
    //     if (data['result'] == 0) {
    //       alert("제휴 업체 정보가 수정되었습니다.")
    //       this.router.navigate(['/']);
    //     }
    //     else { alert(this.globals.serverERRMassage) }
    //   })
    }
  }


}
