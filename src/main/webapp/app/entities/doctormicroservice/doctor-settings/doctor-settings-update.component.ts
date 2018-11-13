import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDoctorSettings } from 'app/shared/model/doctormicroservice/doctor-settings.model';
import { DoctorSettingsService } from './doctor-settings.service';
import { IPaymentSettings } from 'app/shared/model/doctormicroservice/payment-settings.model';
import { PaymentSettingsService } from 'app/entities/doctormicroservice/payment-settings';

@Component({
  selector: 'jhi-doctor-settings-update',
  templateUrl: './doctor-settings-update.component.html'
})
export class DoctorSettingsUpdateComponent implements OnInit {
  doctorSettings: IDoctorSettings;
  isSaving: boolean;

  paymentsettings: IPaymentSettings[];

  constructor(
    private jhiAlertService: JhiAlertService,
    private doctorSettingsService: DoctorSettingsService,
    private paymentSettingsService: PaymentSettingsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ doctorSettings }) => {
      this.doctorSettings = doctorSettings;
    });
    this.paymentSettingsService.query({ filter: 'doctorsettings-is-null' }).subscribe(
      (res: HttpResponse<IPaymentSettings[]>) => {
        if (!this.doctorSettings.paymentSettingsId) {
          this.paymentsettings = res.body;
        } else {
          this.paymentSettingsService.find(this.doctorSettings.paymentSettingsId).subscribe(
            (subRes: HttpResponse<IPaymentSettings>) => {
              this.paymentsettings = [subRes.body].concat(res.body);
            },
            (subRes: HttpErrorResponse) => this.onError(subRes.message)
          );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.doctorSettings.id !== undefined) {
      this.subscribeToSaveResponse(this.doctorSettingsService.update(this.doctorSettings));
    } else {
      this.subscribeToSaveResponse(this.doctorSettingsService.create(this.doctorSettings));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IDoctorSettings>>) {
    result.subscribe((res: HttpResponse<IDoctorSettings>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackPaymentSettingsById(index: number, item: IPaymentSettings) {
    return item.id;
  }
}
