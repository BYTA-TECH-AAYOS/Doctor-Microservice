import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISlotStatus } from 'app/shared/model/doctormicroservice/slot-status.model';

@Component({
  selector: 'jhi-slot-status-detail',
  templateUrl: './slot-status-detail.component.html'
})
export class SlotStatusDetailComponent implements OnInit {
  slotStatus: ISlotStatus;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ slotStatus }) => {
      this.slotStatus = slotStatus;
    });
  }

  previousState() {
    window.history.back();
  }
}
