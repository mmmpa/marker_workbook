

export default class KeyControl {
  downStore:any = {};
  binding:any = {}
  public hook:(name:string, e:KeyboardEvent)=>void;
  private killer:any;

  constructor({killer}:{killer?} = {}) {
    this.onDown = this.onDown.bind(this);
    this.onUp = this.onUp.bind(this);

    $(window).bind('keydown', this.onDown);
    $(window).bind('keyup', this.onUp);

    this.killer = killer || {}
  }

  bind(keyName, callbackName, callback:(e:KeyboardEvent)=>void) {
    if (!this.binding[keyName]) {
      this.binding[keyName] = {}
    }
    this.binding[keyName][callbackName] = callback;
  }

  unbind(keyName, callbackName){
    this.binding[keyName][callbackName] = null;
  }

  dispose() {
    $(window).unbind('keydown', this.onDown);
    $(window).unbind('keyup', this.onUp);
  }

  onDown(e:KeyboardEvent) {
    this.down(e.code);
    this.down(e.keyIdentifier);
    this.check(e);
  }

  onUp(e:KeyboardEvent) {
    this.up(e.code);
    this.up(e.keyIdentifier);
    this.strike(null, e);
  }

  down(code) {
    this.downStore[code] = true;
  }

  up(code) {
    this.downStore[code] = false;
  }

  isDown(code) {
    return this.downStore[code];
  }

  check(e:KeyboardEvent) {
    let string = 'on';

    if (e.altKey) {
      string += 'Alt'
    }

    if (e.ctrlKey) {
      string += 'Control'
    }

    if (e.shiftKey) {
      string += 'Shift'
    }

    string += e.code.replace('Key', '');

    this.strike(string, e);
  }

  strike(name:string, e:KeyboardEvent) {
    if (this.killer && this.killer[name]) {
      e.preventDefault();
    }
    this.hook && this.hook(name, e)
    if (this.binding[name]) {
      for (let k in this.binding[name]) {
        this.binding[name][k](e);
      }
    }
  }
}
