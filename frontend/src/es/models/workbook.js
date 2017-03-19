// @flow

import IDMan from '../lib/decorators/id-man';
import PageMeta from './page-meta';
import Marker from '../models/marker'

@IDMan
export default class Workbook {
  pageNumber: number;
  pager: Pager;
  pageMetas: PageMeta[]

  constructor ({ pager }: { pager: Pager }) {
    this.pager = pager;
    this.pageMetas = [];

    for (let i = pager.pageCount; i--;) {
      this.pageMetas.push(new PageMeta())
    }
  }

  resetPosition () {

  }

  removeMarker (marker: Marker) {

  }

  get currentPage (): number {
    return this.pager.pageNumber;
  }

  page (p: PagingParameters): void {
    this.pager.page(p)
  }

  get forJSON (): { pages: any[] } {
    return {
      pages: this.pageMetas.map(m => m.forJSON),
    };
  }
}
