import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IDoctorSessionInfo } from 'app/shared/model/doctormicroservice/doctor-session-info.model';
import { DoctorSessionInfoService } from './doctor-session-info.service';
import { IDoctor } from 'app/shared/model/doctormicroservice/doctor.model';
import { DoctorService } from 'app/entities/doctormicroservice/doctor';

@Component({
  selector: 'jhi-doctor-session-info-update',
  templateUrl: './doctor-session-info-update.component.html'
})
export class DoctorSessionInfoUpdateComponent implements OnInit {
  doctorSessionInfo: IDoctorSessionInfo;
  isSaving: boolean;

  doctors: IDoctor[];
  dateDp: any;
  startTime: string;
  endTime: string;
  interval: string;

  constructor(
    private jhiAlertService: JhiAlertService,
    private doctorSessionInfoService: DoctorSessionInfoService,
    private doctorService: DoctorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ doctorSessionInfo }) => {
      this.doctorSessionInfo = doctorSessionInfo;
      this.startTime = this.doctorSessionInfo.startTime != null ? this.doctorSessionInfo.startTime.format(DATE_TIME_FORMAT) : null;
      this.endTime = this.doctorSessionInfo.endTime != null ? this.doctorSessionInfo.endTime.format(DATE_TIME_FORMAT) : null;
      this.interval = this.doctorSessionInfo.interval != null ? this.doctorSessionInfo.interval.format(DATE_TIME_FORMAT) : null;
    });
    this.doctorService.query().subscribe(
      (res: HttpResponse<IDoctor[]>) => {
        this.doctors = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    this.doctorSessionInfo.startTime = this.startTime != null ? moment(this.startTime, DATE_TIME_FORMAT) : null;
    this.doctorSessionInfo.endTime = this.endTime != null ? moment(this.endTime, DATE_TIME_FORMAT) : null;
    this.doctorSessionInfo.interval = this.interval != null ? moment(this.interval, DATE_TIME_FORMAT) : null;
    if (this.doctorSessionInfo.id !== undefined) {
      this.subscribeToSaveResponse(this.doctorSessionInfoService.update(this.doctorSessionInfo));
    } else {
      this.subscribeToSaveResponse(this.doctorSessionInfoService.create(this.doctorSessionInfo));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IDoctorSessionInfo>>) {
    result.subscribe((res: HttpResponse<IDoctorSessionInfo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
