import {Component, OnInit} from '@angular/core';
import {RestService} from '../shared/services/rest.service';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'messages-rest',
  providers: [],
  template: `
    <form (ngSubmit)="addMessage(message.value)">

      <input
         #message
        autofocus>

      <button type="submit">Add message</button>
    </form>

    <ul>
        <li *ngFor="let message of messages">{{ message }}</li>
    </ul>
  `
})
export class MessagesRest implements OnInit {

  messages: String[] = [];

  constructor(private restService: RestService) {}

  ngOnInit() {
    Observable.fromPromise(this.restService.getResource('messages').find())
      .subscribe((res: any) => {
        res.data.forEach(item => this.messages.push(item.message));
      });
  }

  addMessage(message: string): boolean {
    this.restService.getResource('messages')
      .create({'message': message})
      .then((res) => this.messages.push(res.message))
      .catch(err => console.log(err))
    ;

    return false;
  }

}
