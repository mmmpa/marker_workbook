declare type Size = {
  width: number,
  height: number
}

declare type Position = {
  x: number,
  y: number
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
  pageNumber: number;
  pageCount: number,
}

declare var PDFJS: any;
declare var $: any;

declare module 'change-case' {
  declare var exports: any;
}

declare module 'events' {
  declare var exports: any;
}

declare type MarkerParameters = {
  x: number,
  y: number,
  thickness: number,
  length: number,
  rotation: number,
}

declare class FileSelectorContext {
  dispatch(a: string): void;
}

type EaterDispatch = (name: string, ...args: any[]) => void
type FeederListenTo = (name: string, callback: (...args: any[]) => void) => void
