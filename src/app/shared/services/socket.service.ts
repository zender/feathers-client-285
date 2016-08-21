import { Injectable } from '@angular/core';

declare const io;
declare const feathers;

@Injectable()
export class SocketService {

  private _app: any;

  private url: string = 'http://localhost:3030'

  private token: string= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItaWQtMSIsInVzZXJuYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmRlIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE0NzE3ODk1MDgsImV4cCI6MTQ4MDQyOTUwOCwiaXNzIjoiZmVhdGhlcnMifQ.YJnyNZpS9ATNFLEeHgqAnun3VRyBRdYrbrOyWdN27fQ';

  constructor() {
    localStorage.setItem('jwt', this.token);

    let socket: any = io(this.url);

    this._app = feathers()
        .configure(feathers.socketio(socket))
        .configure(feathers.hooks())
        .configure(feathers.authentication({ storage: localStorage, tokenKey: 'jwt'}))
      ;

    this._app.set('token', this.token);
  }


  getResource(service: string): any {
    return this._app.service(service);
  }
}