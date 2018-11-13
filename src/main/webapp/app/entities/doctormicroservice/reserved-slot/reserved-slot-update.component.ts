import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IReservedSlot } from 'app/shared/model/doctormicroservice/reserved-slot.model';
import { ReservedSlotService } from './reserved-slot.service';
import { IDoctor } from 'app/shared/model/doctormicroservice/doctor.model';
import { DoctorService } from 'app/entities/doctormicroservice/doctor';
import { ISlotStatus } from 'app/shared/model/doctormicroservice/slot-status.model';
import { SlotStatusService } from 'app/entities/doctormicroservice/slot-status';

@Component({
  selector: 'jhi-reserved-slot-update',
  templateUrl: './reserved-slot-update.component.html'
})
export class ReservedSlotUpdateComponent implements OnInit {
  reservedSlot: IReservedSlot;
  isSaving: boolean;

  doctors: IDoctor[];

  slotstatuses: ISlotStatus[];
  dateDp: any;
  startTime: string;
  endTime: string;

  constructor(
    private jhiAlertService: JhiAlertService,
    private reservedSlotService: ReservedSlotService,
    private doctorService: DoctorService,
    private slotStatusService: SlotStatusService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ reservedSlot }) => {
      this.reservedSlot = reservedSlot;
      this.startTime = this.reservedSlot.startTime != null ? this.reservedSlot.startTime.format(DATE_TIME_FORMAT) : null;
      this.endTime = this.reservedSlot.endTime != null ? this.reservedSlot.endTime.format(DATE_TIME_FORMAT) : null;
    });
    this.doctorService.query().subscribe(
      (res: HttpResponse<IDoctor[]>) => {
        this.doctors = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.slotStatusService.query().subscribe(
      (res: HttpResponse<ISlotStatus[]>) => {
        this.slotstatuses = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    this.reservedSlot.startTime = this.startTime != null ? moment(this.startTime, DATE_TIME_FORMAT) : null;
    this.reservedSlot.endTime = this.endTime != null ? moment(this.endTime, DATE_TIME_FORMAT) : null;
    if (this.reservedSlot.id !== undefined) {
      this.subscribeToSaveResponse(this.reservedSlotService.update(this.reservedSlot));
    } else {
      this.subscribeToSaveResponse(this.reservedSlotService.create(this.reservedSlot));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IReservedSlot>>) {
    result.subscribe((res: HttpResponse<IReservedSlot>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDoctorById(index: number, item: IDoctor) {
    return item.id;
  }

  trackSlotStatusById(index: number, item: ISlotStatus) {
    return item.id;
  }
}
