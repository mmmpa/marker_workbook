export default class KeyControl {
  downStore:any = {};
  public hook:(name:string, e:JQueryKeyEventObject)=>void;

  constructor() {
    $(window).keydown((e:JQueryKeyEventObject)=> {
      this.down(e.code);
      this.down(e.keyIdentifier);
      this.check(e);
    });

    $(window).keyup((e:JQueryKeyEventObject)=> {
      this.up(e.code);
      this.up(e.keyIdentifier);
      this.strike(null, e);
    });
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

  check(e:JQueryKeyEventObject) {
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

  strike(name:string, e:JQueryKeyEventObject) {
    this.hook && this.hook(name, e)
  }
}
