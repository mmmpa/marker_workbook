import React from 'react';
import ReactDOM from 'react-dom';

import MainContext from './contexts/main-context';
// import FileSelectorContext from './contexts/file-selector-context';
// import WorkbookContext from './contexts/workbook-context';

// import WorkbookComponent from './components/workbook-component';
// import FileSelectorComponent from './components/file-selector-component';

class MarkerWorkbook {
  static run (dom, firstDataURI, firstWorkbookData) {
    ReactDOM.render(
      <article className="dot-body">
        <MainContext {...{ firstDataURI, firstWorkbookData }}>
        </MainContext>
      </article>
      , dom);
  }
}

window.MarkerWorkbook = MarkerWorkbook;

console.log('loaded')
