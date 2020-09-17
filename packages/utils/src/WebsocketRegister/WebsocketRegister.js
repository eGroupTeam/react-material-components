/**
 * To handle global websocket connections.
 *
 * Example .
 * ```javascript
 * const mySocket = WebsocketRegister.register("mySocket", "websocket");
 * mySocket.onopen = onopen
 * mySocket.onmessage = onmessage
 * mySocket.onclose = WebsocketRegister.unregister('mySocket');
 * ```
 */
class WebsocketRegister {
  constructor() {
    this.websockets = {};
  }

  _checkNameIsExist(name) {
    if (typeof this.websockets[name] === 'undefined') {
      return false;
    }
    return true;
  }

  register(name, url) {
    if (!this._checkNameIsExist(name)) {
      this.websockets[name] = new WebSocket(url);
      console.log(`${name} register success.`);
      return this.websockets[name];
    } else {
      console.warn(`${name} is registered.`);
    }
  }

  unregister(name) {
    if (this._checkNameIsExist(name)) {
      this.websockets[name] = undefined;
      console.log(`${name} unregister success.`);
    } else {
      console.warn(`${name} is not registered.`);
    }
  }

  unregisterAll() {
    for (const key in this.websockets) {
      if (this.websockets.hasOwnProperty(key)) {
        const element = this.websockets[key];
        if (element) {
          element.close();
        }
      }
    }
  }

  get(name) {
    if (this._checkNameIsExist(name)) {
      return this.websockets[name];
    }
    return undefined;
  }
}

const Instance = new WebsocketRegister();

export default Instance;
