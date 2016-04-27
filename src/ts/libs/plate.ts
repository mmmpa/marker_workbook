import * as _ from 'lodash';

export default class Plate {
  protected _raw;

  constructor(protected _name:string) {
    this._initialize();
  }

  private _initialize() {
    let raw = window.localStorage.getItem(this._name);
    this._raw = raw ? JSON.parse(raw) : {};
  }

  reload() {
    this._initialize();
  }

  save() {
    window.localStorage.setItem(this._name, JSON.stringify(this._raw));
  }

  read(key:string) {
    if (this['get_' + key]) {
      return this['get_' + key]();
    } else {
      return this.readRaw(key);
    }
  }

  readRaw(key:string) {
    return this._raw[key];
  }

  write(key:string, value, save = true) {
    if (this['set_' + key]) {
      this['set_' + key](value)
    } else {
      this.writeRaw(key, value, save)
    }
  }

  writeRaw(key:string, value, save = true) {
    this._raw[key] = value;
    save && this.save();
  }

  writeOnce(keyValue) {
    _.forEach(keyValue, (v, k)=> {
      this.write(k, v, false);
    });

    this.save();
  }

  readOnce(...keys) {
    return _.reduce(keys, (a, key)=> {
      a[key] = this.read(key);
      return a;
    }, {});
  }
}