import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router'

import * as wjcCore from 'wijmo/wijmo'
import { Globals } from '../../../util/globals'

@Component({
  selector: 'app-usage-history',
  templateUrl: './usage-history.component.html',
  styleUrls: ['./usage-history.component.css']
})
export class UsageHistoryComponent implements OnInit {
  wjmCV: wjcCore.CollectionView
  fieldNames: string[]
  dataKey = this.globals.usageHistoryDataKey

  private _filter: string
  private _toFilter: any
  private _thisFilterFunction: wjcCore.IPredicate
  selectedField: string = 'type'
  itemsLength: number
  title: string = '| 제휴서비스 고객 사용 내역'
  searchGubun: string[] = ["채널", "분류", "업체명"]


  constructor(
    private http: HttpClient,
    private globals: Globals
  ) {
    // let pageID = 'service'
    let pageID ='usage_history'
    this.fieldNames = globals.usageHistoryFieldName

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

  ngOnInit() { }

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
    if (data == this.searchGubun[0]) { this.selectedField = 'type' }
    else if (data == this.searchGubun[1]) { this.selectedField = 'channel' }
    else if (data == this.searchGubun[2]) { this.selectedField = 'c_name' }
  }

}
