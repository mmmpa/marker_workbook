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
    if (stored) {
      this.pages = stored.pages.map((pageData)=> {
        return Page.fromJSON(pageData);
      });
      if (this.page.length < pageCount) {
        _.times(pageCount - this.page.length, ()=> this.pages.push(new Page()))
      }
    } else {
      this.pages = _.times(pageCount, ()=> new Page());
    }
  }

  page(n) {
    return this.pages[n - 1];
  }

  get forJSON() {
    return {
      pages: this.pages.map((page)=> page.forJSON)
    }
  }
}