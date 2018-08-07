import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router'

import * as wjcCore from 'wijmo/wijmo'
import { Globals } from '../../../util/globals'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})

export class CompanyComponent implements OnInit {

  wjmCV: wjcCore.CollectionView
  fieldNames: string[]
  dataKey = this.globals.companyDataKey
  itemsLength: number

  private _filter: string
  private _toFilter: any
  private _thisFilterFunction: wjcCore.IPredicate
  selectedField: string = this.globals.companyDataKey[1]

  title: string = '| 제휴 회사 목록'
  searchGubun: string[] = ["업체명", "분류"]
  selectedValue: string = '1' //all
  values = ''
  value = ''
  id
  servicegubun
  searchFieldData: any
  cNameData: any

  constructor(
    private http: HttpClient,
    private globals: Globals,
    private router: Router
  ) {
    let pageID = 'company'
    this.fieldNames = globals.companyFieldName

    http.get(globals.makeConnectURL('select', pageID)).subscribe(data => {
      this.wjmCV = new wjcCore.CollectionView(data)
      this.wjmCV.pageSize = globals.pageSize
      this.itemsLength = this.wjmCV.items.length
    });

    this._thisFilterFunction = this._filterFunction.bind(this)

  }

  ngOnInit() {

  }

  // filtering
  get filter(): string { return this._filter }
  set filter(value: string) {
    if (this._filter != value) { this._filter = value; this._applyFilter() }
  }
  private _applyFilter() {
    if (this._toFilter) clearTimeout(this._toFilter)
    this._toFilter = setTimeout(() => {
      this._toFilter = null
      if (this.wjmCV) {
        var cv = this.wjmCV
        if (cv) {
          if (cv.filter != this._thisFilterFunction) cv.filter = this._thisFilterFunction
          else cv.refresh()
        }
      }
    }, 500)
  }
  private _filterFunction(item: any): boolean {
    var filter = this.filter.toLowerCase();
    if (!filter) { return true }
    return item[this.selectedField].toLowerCase().indexOf(filter) > -1
  }

  toggleSort(fieldName: string) { this.globals.toggleSort(fieldName, this.wjmCV) }
  getSort(propName: string) { return this.globals.getSort(propName, this.wjmCV) }

  // 제휴해지 버튼 이벤트
  partnerTermination(code) {
    let YesOrNo: boolean = confirm("제휴해지를 하시겠습니까?")
    if (YesOrNo == true) {
      let url = this.globals.makeConnectURL('update', 'partnership_termination')
      this.http.post(url, { "code": code }).subscribe(data => {
        if (data['result'] == 0) alert("제휴해지가 완료되었습니다.")
        else alert(this.globals.serverERRMassage)
      })
    }
  }

  searchFeild(data: any) {
    this.searchFieldData = data
    this.globals.setSearchFieldData(this.searchFieldData)
    this.router.navigate(['/service'])
  }


  // 서비스확인 버튼 이벤트
  serviceCheck(data:string) {
    this.cNameData = data
    let url = '/service/' + this.cNameData
    // this.router.navigate([url]);
    console.log("***************")
    console.log(data)
    console.log("***************")
    // let YesOrNo: boolean = confirm("제휴해지를 하시겠습니까?")
    // if (YesOrNo == true) {
    //   let url = this.globals.makeConnectURL('update', 'partnership_termination')
    //   this.http.post(url, { "code": code }).subscribe(data => {
    //     if (data['result'] == 0) alert("제휴해지가 완료되었습니다.")
    //     else alert(this.globals.serverERRMassage)
    //   })
    // }
  }

  dropDown(data: any) {
    this.selectedValue = data
    if (data == this.searchGubun[0]) { this.selectedField = this.globals.companyDataKey[1] }
    else if (data == this.searchGubun[1]) { this.selectedField = this.globals.companyDataKey[4] }
    // console.log('selected chage ==> ' + this.selectedValue);
  }

  onClickSubmit(data: any) {
    // console.log('selected value ==> ' + this.selectedValue);
    // console.log("Entered Email id : " + data.emailid);
    // alert("Entered Email id : " + data.emailid);
    // this.selectedValue = '1';
  }

  onKey(value: string) {
    // this.values = event.target.value;
    console.log(this.values)
  }

  onEnter(value: string) {
    this.value = value;
    console.log("onengter: " + this.values)
  }

}
