class StateMachine<S> {
  _state:S = null;
  getState:()=>S;

  listeners:{
    onEnter:{
      (state:any):Function[],
    },
    onExit:{
      (state:any):Function[],
    },
    onFromTo:{
      (fromState:any):{
        (toState:any):Function[]
      }
    }
  };

  constructor(getState:()=>S, initialState?:any) {
    this.getState = getState;
    this._state = initialState || this.getState();
  }

  get state():S {
    return this._state;
  }

  is(s:S) {
    return this._state === s;
  }

  find(name:string, s:any, s2?:any):Function[] {
    if (!s2) {
      if (!this.listeners[name][s]) {
        this.listeners[name][s] = [];
      }

      return this.listeners[name][s]
    }

    if (!this.listeners[name][s2]) {
      this.listeners[name][s2] = {};
    }

    if (!this.listeners[name][s2][s]) {
      this.listeners[name][s2][s] = [];
    }

    return this.listeners[name][s2][s]
  }

  onEnter(s:S, f:(s?:S)=>void):void {
    this.find('onEnter', s).push(f);
  }

  onExit(s:S, f:(s?:S)=>void):void {
    this.find('onExit', s).push(f);
  }

  onFromTo(from:S, to:S, f:(s?:S)=>void):void {
    this.find('onFromTo', from, to).push(f);
  }

  transact(to?:S) {
    let next = to || this.getState();
    let now = this.state;

    if (next === now) {
      return;
    }

    this.fromTo(now, next);
    this.exit(now);
    this.enter(next);

    this._state = to;
  }

  fromTo(f:S, t:S) {
    this.find('onFromTo', f, t).forEach((f)=> f(this.state));
  }

  exit(s:S) {
    this.find('onExit', s).forEach((f)=> f(this.state));
  }

  enter(s:S) {
    this.find('onEnter', s).forEach((f)=> f(this.state));
  }
}