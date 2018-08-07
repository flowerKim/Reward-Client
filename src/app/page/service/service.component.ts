import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router'

import * as wjcCore from 'wijmo/wijmo'
import { Globals } from '../../../util/globals'

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})

export class ServiceComponent implements OnInit {

  wjmCV: wjcCore.CollectionView
  fieldNames: string[]
  serverURL: string
  dataKey = this.globals.serviceDataKey
  itemsLength: number

  private _filter: string
  private _toFilter: any
  private _thisFilterFunction: wjcCore.IPredicate
  selectedField: string = this.globals.serviceDataKey[1]

  title: string = '| 서비스 리스트'
  searchGubun: string[] = ["분류", "채널", "업체명", "서비스상태"]
  // searchType: string[] = ["업체리스트", "서비스리스트"]
  searchFieldData: any

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private globals: Globals
  ) {
    let pageID = 'service'
    this.fieldNames = globals.serviceFieldName

    this.http.get(globals.makeConnectURL('select', pageID)).subscribe(data => {
      this.wjmCV = new wjcCore.CollectionView(data)
      this.wjmCV.pageSize = globals.pageSize
      this.itemsLength = this.wjmCV.items.length
    });

    this._thisFilterFunction = this._filterFunction.bind(this)


    if (this.globals.getSearchFieldData() != '1') {
      this.dropDown('업체명')
      this._filter = this.globals.getSearchFieldData();
      this._applyFilter()
      this.globals.setSearchFieldData('1')
    }
  }

  ngOnInit() {
  }

  searchFeild(data: any) {
    this.searchFieldData = data
    this.globals.setSearchFieldData(this.searchFieldData)
    this.router.navigate(['/usage_history'])
  }

  toggleSort(fieldName: string) { this.globals.toggleSort(fieldName, this.wjmCV) }
  getSort(propName: string) { return this.globals.getSort(propName, this.wjmCV) }

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

  dropDown(data: any) {
    if (data == this.searchGubun[0]) { this.selectedField = this.globals.serviceDataKey[1] }
    else if (data == this.searchGubun[1]) { this.selectedField = this.globals.serviceDataKey[2] }
    else if (data == this.searchGubun[2]) { this.selectedField = this.globals.serviceDataKey[3] }
    else if (data == this.searchGubun[3]) { this.selectedField = this.globals.serviceDataKey[4] }
  }

}
