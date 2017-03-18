import { Parcel } from '../libs/parcel';
import FileHandler from '../models/file-handler';

export default class FileSelectorContext extends Parcel<{}, {}> {
  listen (to) {
    to(null, 'file:open', file => this.open());
  }

  open () {
    this.dispatch('file:open:start');
    const fileHandler = new FileHandler(file => this.dispatch('file:set', file));
    const $fileListener = $('<input type="file"/>');
    $fileListener.bind('change', fileHandler.inputHandler);
    $fileListener.trigger('click');
  }
}
