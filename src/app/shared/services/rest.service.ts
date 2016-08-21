import { Injectable } from '@angular/core';
const superagent = require('superagent');

declare const feathers;

@Injectable()
export class RestService {

  private _app: any;

  private url: string = 'http://localhost:3030'

  private token: string= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzZXItaWQtMSIsInVzZXJuYW1lIjoidXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmRlIiwicm9sZXMiOlsiVVNFUiJdLCJpYXQiOjE0NzE3ODk1MDgsImV4cCI6MTQ4MDQyOTUwOCwiaXNzIjoiZmVhdGhlcnMifQ.YJnyNZpS9ATNFLEeHgqAnun3VRyBRdYrbrOyWdN27fQ';

  constructor() {

    localStorage.setItem('jwt', this.token);

    this._app = feathers()
      .configure(feathers.rest(this.url).superagent(superagent))
      .configure(feathers.hooks())
      .configure(feathers.authentication({ storage: localStorage, tokenKey: 'jwt'}))
    ;

    // This is not working !!!
    // this._app.mixins.push(function(service) {
    //   service.before((hook) => {
    //     hook.params = {
    //       'token': localStorage.getItem('jwt')
    //     };
    //
    //     return hook;
    //   });
    // });

    //Why token is set from here??? It should be taken from localStotage
    this._app.set('token', this.token);
  }

  getResource(service: string): any {
    return this._app.service(service);
  }
}