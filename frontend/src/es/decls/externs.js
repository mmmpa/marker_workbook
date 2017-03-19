declare type Size = {
  width: number,
  height: number
}

declare type PagingParameters = {
  pageNumber: number,
  scale: number,
  callback: (p: PagedResult) => void
}

declare type PagedResult = {
  pageNumber: number,
  size: Size,
  dataURL: string,
}

declare interface Pager {
  page(p: PagingParameters): void;
}

declare var PDFJS: any;
declare var $: any;

declare module 'change-case' {
  declare var exports: any;
}

