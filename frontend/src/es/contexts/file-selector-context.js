import { Parcel } from '../libs/parcel';
import FileRead from '../models/file-read';

export default class FileSelectorContext extends Parcel<{}, {}> {
  listen (to) {
    to(null, 'file:open', () => this.open());
  }

  open () {
    this.dispatch('file:open:start');
    new FileRead({
      succeed: result => this.dispatch('file:open:complete', result) ,
      fail: error => this.dispatch('file:open:fail', error)
    }).run()
  }
}
