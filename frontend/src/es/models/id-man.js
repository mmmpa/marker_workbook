export default class IDMan {
  static store:any = {};

  id:number;

  get myName () {
    return this.constructor.toString().match(/function[ ]+([a-zA-Z0-9_]+)/)[1];
  }

  constructor () {
    if (!IDMan.store[this.myName]) {
      IDMan.store[this.myName] = 0;
    }
    this.id = IDMan.store[this.myName] += 1;
  }
}
