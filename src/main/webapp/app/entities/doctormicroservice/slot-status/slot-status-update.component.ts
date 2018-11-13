import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ISlotStatus } from 'app/shared/model/doctormicroservice/slot-status.model';
import { SlotStatusService } from './slot-status.service';

@Component({
  selector: 'jhi-slot-status-update',
  templateUrl: './slot-status-update.component.html'
})
export class SlotStatusUpdateComponent implements OnInit {
  slotStatus: ISlotStatus;
  isSaving: boolean;

  constructor(private slotStatusService: SlotStatusService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ slotStatus }) => {
      this.slotStatus = slotStatus;
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.slotStatus.id !== undefined) {
      this.subscribeToSaveResponse(this.slotStatusService.update(this.slotStatus));
    } else {
      this.subscribeToSaveResponse(this.slotStatusService.create(this.slotStatus));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<ISlotStatus>>) {
    result.subscribe((res: HttpResponse<ISlotStatus>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }
}
