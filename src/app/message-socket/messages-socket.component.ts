import {Component, OnInit} from '@angular/core';
import {RestService} from '../shared/services/rest.service';
import {Observable} from 'rxjs/Rx';
import {SocketService} from '../shared/services/socket.service';

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
export class MessagesSocket implements OnInit {

  messages: String[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    Observable.fromPromise(this.socketService.getResource('messages').find())
      .subscribe((res: any) => {
        res.data.forEach(item => this.messages.push(item.message));
      });
  }

  addMessage(message: string): boolean {
    this.socketService.getResource('messages')
      .create({'message': message})
      .then((res) => this.messages.push(res.message))
      .catch(err => console.log(err))
    ;

    return false;
  }

}
