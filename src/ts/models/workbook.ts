import IDMan from "./id-man";
import Page from "./page";
import * as _ from "lodash";

export default class Workbook extends IDMan {
  private pages:Page[];

  constructor(public pageCount:number) {
    super();

    this.pages = _.times(pageCount, ()=> new Page());
  }

  page(n) {
    return this.pages[n - 1];
  }
}