import {Parcel} from "../libs/parcel";
import {AppState} from "../constants/constants";
import FileHandler from "../models/file-handler";

export default class FileSelectorContext extends Parcel {
  componentWillReceiveProps(props) {
    console.log('selector', props)
  }

  listen(to) {
    to(null, 'file:open', (file)=> this.open());
  }

  open() {
    this.dispatch('file:open:start');
    let fileHandler = new FileHandler((file)=> this.dispatch('file:set', file));
    let $fileListener = $('<input type="file"/>');
    $fileListener.bind('change', fileHandler.inputHandler);
    $fileListener.trigger('click');
  }
}