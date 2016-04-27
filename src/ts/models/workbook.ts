import IDMan from "./id-man";
import Page from "./page";
import * as _ from "lodash";
import WorkbookRecord from "../records/workbook-record";

export default class Workbook extends IDMan {
  private pages:Page[];

  constructor(public key, public pageCount:number) {
    super();

    this.pages = _.times(pageCount, ()=> new Page());

    let stored = new WorkbookRecord(key).read('workbook');
    if(stored){
      console.log(stored)
    }
  }

  page(n) {
    return this.pages[n - 1];
  }

  get forJSON(){
    return {
      pages: this.pages.map((page)=> page.forJSON)
    }
  }
}