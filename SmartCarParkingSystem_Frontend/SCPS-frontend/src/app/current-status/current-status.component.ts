import { Component, OnInit } from '@angular/core';
import { Slot } from '../shared/slot';
import { SLOTS } from '../shared/slots';
import { StatusService } from '../services/status.service';
import { Observable, Observer, Subscription } from 'rxjs';
import { SITES } from '../shared/sites';
import { Site } from '../shared/site';

@Component({
  selector: 'app-current-status',
  templateUrl: './current-status.component.html',
  styleUrls: ['./current-status.component.scss']
})

export class CurrentStatusComponent implements OnInit {
slots;
totalSlots;
emptySlots;
nearestSlot;
sites: Site[] = SITES;
subs: Subscription;
  constructor(private statusService: StatusService) { }

  ngOnInit() {
  }

onSelection(id) {
  if (this.subs) {
    this.subs.unsubscribe();
  }
  this.totalSlots = null;
  this.emptySlots = null;
  this.slots = null;
  this.nearestSlot = null;
  const initsite = 'initSite' + id.value;
    this.subs = this.statusService.getData(id.value)
    .subscribe((data) => {
      console.log(data);
      this.slots = data;
      this.totalSlots = this.slots.length;
      this.emptySlots = this.slots.filter((slot) => {
        return slot.slotValue === '0';
      });
      this.emptySlots = this.emptySlots.length;
    });
    this.statusService.firstData(initsite);
}
getNearestSlot(): void {
  this.nearestSlot = this.slots.filter((slot) => {
    if (slot.slotValue === '0') {
      return slot;
    }
  })[0];
}

}
