export default function IDMan (klass) {
  return class IDMan extends klass {
    static store:any = {};

    id:number;

    get myName () {
      return this.constructor.toString().match(/function[ ]+([a-zA-Z0-9_]+)/)[1];
    }

    constructor () {
      super();

      if (!IDMan.store[this.myName]) {
        IDMan.store[this.myName] = 0;
      }
      this.id = IDMan.store[this.myName] += 1;
    }
  }
}