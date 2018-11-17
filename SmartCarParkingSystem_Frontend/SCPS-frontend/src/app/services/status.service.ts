import { Injectable } from '@angular/core';
import { Slot } from '../shared/slot';
import { SLOTS } from '../shared/slots';
import { catchError, map } from 'rxjs/operators';
import { Observable, Observer } from 'rxjs';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private socket: Socket) { }
 getData(id: string) {
   const temp: string = 'currentData' + id;
    return this.socket
        .fromEvent(temp)
        .pipe(map( data => data ));
}

firstData(site: string) {
  this.socket.emit(site);
}
}
