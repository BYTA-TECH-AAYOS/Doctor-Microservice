import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReservedSlot } from 'app/shared/model/doctormicroservice/reserved-slot.model';

@Component({
  selector: 'jhi-reserved-slot-detail',
  templateUrl: './reserved-slot-detail.component.html'
})
export class ReservedSlotDetailComponent implements OnInit {
  reservedSlot: IReservedSlot;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reservedSlot }) => {
      this.reservedSlot = reservedSlot;
    });
  }

  previousState() {
    window.history.back();
  }
}
