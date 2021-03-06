/// <reference path="./typings/browser.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Route} from './constants/constants'

import MainContext from "./contexts/main-context";
import FileSelectorContext from "./contexts/file-selector-context";
import WorkbookContext from "./contexts/workbook-context";

import WorkbookComponent from "./components/workbook-component";
import FileSelectorComponent from "./components/file-selector-component";

class MarkerWorkbook {
  static run(dom, firstDataURI, firstWorkbookData) {


    ReactDOM.render(
      <article className="dot-body">
        <MainContext {...{firstDataURI, firstWorkbookData}}>
          <WorkbookContext route={Route.Workbook}>
            <WorkbookComponent/>
          </WorkbookContext>
          <FileSelectorContext route={Route.FileSelector}>
            <FileSelectorComponent/>
          </FileSelectorContext>
        </MainContext>
      </article>
      , dom);
  }
}

window.MarkerWorkbook = MarkerWorkbook;