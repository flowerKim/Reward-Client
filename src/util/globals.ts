import { Injectable } from '@angular/core';
import * as wjcCore from 'wijmo/wijmo'

@Injectable()
export class Globals {

  /* 
  
  글로벌 변수
  
  */
  private searchFieldData: string = '1'
  connectReal: boolean = false

  pageSize: number = 10

  companyFieldName: string[] = ['번호', '업체명', '전화번호', '등록일', '서비스리스트', '제휴해지']
  // companyFieldName: string[] = ['번호', '업체명', '전화번호', '등록일', '분류', '제휴해지']
  companyDataKey: string[] = ['code', 'c_name', 'b_num', 'regdate', 'type', 'status']

  serviceFieldName: string[] = ['번호', '분류', '채널', '업체명', '서비스상태', '제휴 시작일', '제휴 만료일', '고객 사용 내역']
  serviceDataKey: string[] = ['code', 'type', 'channel', 'c_name', 'status', 'partner_start', 'partner_end', 'usage_history']

  usageHistoryFieldName: string[] = ['번호', '업체명', '분류', '채널', '통화시간', '고객이름', '전화번호']
  usageHistoryDataKey: string[] = ['code', 'c_name', 'type', 'channel', 'used_time', 'user_name', 'user_callnum']

  fullFieldName: string[] = [
    '업체명', '사업자 번호', '분류', '채널', '제휴기간', '제휴기간',
    '대표자명', '회사 연락처', '주소지', '담당자명', '담당자 직급', '담당자 연락처', '비고'
  ]
  fullDataKey: string[] = [
    'c_name', 'b_num', 'type', 'channel', 'partner_start', 'partner_end',
    'ceo_name', 'company_callnum', 'address', 'manager_name', 'manager_position', 'manager_callnum', '_desc'
  ]

  serverERRMassage: string = "문제가 발생하였습니다. \n개발부에 문의하세요."

  searchType: string[] = ["대리운전", "꽃배달", "퀵서비스", "보험", "통신"]
  searchChannel: string[] = ["전화", "웹링크 호출", "제휴사 앱 설치", "상담예약", "구매(실물판매)"]

  /* 
  
  글로벌 메서드
  
  */

  setSearchFieldData(data: any) {
    if (data == '1') { this.searchFieldData = '' }
    else { this.searchFieldData = data }
  }
  getSearchFieldData() { return this.searchFieldData }

  toggleSort(fieldName: string, wjmCV: wjcCore.CollectionView) {
    var sd = wjmCV.sortDescriptions;
    var ascending = true;
    if (sd.length > 0 && sd[0].property === fieldName) ascending = !sd[0].ascending;
    var sdNew = new wjcCore.SortDescription(fieldName, ascending);
    sd.splice(0, sd.length, sdNew);
  }

  getSort(propName: string, wjmCV: wjcCore.CollectionView) {
    var sd = wjmCV.sortDescriptions;
    if (sd.length > 0 && sd[0].property === propName) return sd[0].ascending ? '▲' : '▼';
    return '';
  }

  makeConnectURL(CRUD: string, pageID: string) {
    var url = ''
    let serverURL_localTest: string = 'http://localhost:3000/'
    let serverURL_real: string = 'https://dev.'

    if (this.connectReal) { url += serverURL_real }
    else { url += serverURL_localTest }

    switch (CRUD) {
      case 'insert': {
        url += 'i/'
        break
      }
      case 'select': {
        url += 's/'
        break
      }
      case 'update': {
        url += 'u/'
        break
      }
      case 'delete': {
        url += 'd/'
        break
      }
    }

    url += pageID
    return url
  }

  dataCheckAndSetting(data) {
    var sendData: {} = {}
    let fieldName = this.fullFieldName
    let dataKey = this.fullDataKey
    let thisData
    var _data
    var loopCheck: boolean = true
    var returnCheck: boolean = true

    let emptyCheck = function(thisData:any, fieldName:string) {
      if (thisData == '' || thisData == undefined || thisData == null || thisData == 'undefined') {
        alert(fieldName + '을(를) 입력해주세요.')
        returnCheck = false
        loopCheck = false
        return false
      } else if (thisData == 1 || thisData == 7) {
        alert(fieldName + '을(를) 확인해주세요.')
        returnCheck = false
        loopCheck = false
        return false
      }
      else return true
    }

    for (let i = 0; i < dataKey.length; i++) {
      if (!loopCheck) break
      thisData = data[dataKey[i]]
      switch (i) {
        case 0 : case 6 : case 8 : {
          if (emptyCheck(thisData, fieldName[i])) {
            sendData[dataKey[i]] = thisData.trim()
          } break
        }
        case 1 : {
          if (emptyCheck(thisData, fieldName[i])) {
            _data = thisData.trim().replace(/-/gi, '')
            let lengthCheck: boolean = _data.match(/\d{1}/g) != null
            let logicCheck: boolean = _data.match(/^\d{3}\d{2}\d{5}$/) != null
            if (lengthCheck && logicCheck) {
                _data = _data.replace(/(^\d{3})(\d{2})(\d{5}$)/, "$1-$2-$3")
                sendData[dataKey[i]] = _data
            } else emptyCheck(i, fieldName[i])
          } break
        }
        case 7 : {
          if (emptyCheck(thisData, fieldName[i])) {
            let logicCheck: boolean
            _data = thisData.trim().replace(/-/gi, '')
            let dataLength = _data.match(/\d{1}/g).length
            switch (dataLength) {
              case 8 : {
                logicCheck = _data.match(/^\d{4}\d{4}$/) != null
                if (logicCheck) {
                  _data = _data.replace(/(^\d{4})(\d{4}$)/, "$1-$2")
                  sendData[dataKey[i]] = _data
                } else emptyCheck(i, fieldName[i])
                break
              }
              case 9 : {
                logicCheck = _data.match(/^\d{2}\d{3}\d{4}$/) != null
                if (logicCheck) {
                  _data = _data.replace(/(^\d{2})(\d{3})(\d{4}$)/, "$1-$2-$3")
                  sendData[dataKey[i]] = _data
                } else emptyCheck(i, fieldName[i])
                break
              }
              case 10 : {
                logicCheck = _data.match(/^\d{3}\d{3}\d{4}$/) != null
                if (logicCheck) {
                  _data = _data.replace(/(^\d{3})(\d{3})(\d{4}$)/, "$1-$2-$3")
                  sendData[dataKey[i]] = _data
                } else emptyCheck(i, fieldName[i])
                break
              }
              case 11 : {
                logicCheck = _data.match(/^\d{3}\d{4}\d{4}$/) != null
                if (logicCheck) {
                  _data = _data.replace(/(^\d{3})(\d{4})(\d{4}$)/, "$1-$2-$3")
                  sendData[dataKey[i]] = _data
                } else emptyCheck(i, fieldName[i])
                break
              }
              default : emptyCheck(i, fieldName[i])
            }
          } break
        }
        default : {
          if (thisData == '' || thisData == undefined || thisData == null || thisData == 'undefined')
            sendData[dataKey[i]] = ''
          else sendData[dataKey[i]] = thisData.trim()
          break
        }
      }
    }
    if (returnCheck) {
      if (data['code']) sendData['code'] = data['code']
      console.log(sendData)
      return sendData
    } else return returnCheck
  }

}