import IDMan from "./id-man";
import Page from "./page";
import * as _ from "lodash";
import WorkbookRecord from "../records/workbook-record";

export default class Workbook extends IDMan {
  public pageNumber:number = 1;
  private pages:Page[];

  constructor(public key, public pageCount:number, public isPDF:boolean = false) {
    super();

    this.pages = _.times(pageCount, ()=> new Page());

    let stored = new WorkbookRecord(key).read('workbook');
    if (stored) {
      this.pages = stored.pages.map((pageData)=> {
        return Page.fromJSON(pageData);
      });
      if (this.page.length < pageCount) {
        _.times(pageCount - this.page.length + 1, ()=> this.pages.push(new Page()))
      }
    } else {
      this.pages = _.times(pageCount, ()=> new Page());
    }
  }

  get currentPage(){
    return this.pages[this.pageNumber - 1];
  }

  page(n) {
    this.pageNumber = n;
    this.currentPage.update();
    this.currentPage.updateMarker();
    return this.currentPage;
  }

  get forJSON() {
    return {
      pages: this.pages.map((page)=> page.forJSON)
    }
  }
}