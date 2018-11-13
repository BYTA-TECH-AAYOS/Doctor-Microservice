import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IPaymentSettings } from 'app/shared/model/doctormicroservice/payment-settings.model';
import { PaymentSettingsService } from './payment-settings.service';

@Component({
  selector: 'jhi-payment-settings-update',
  templateUrl: './payment-settings-update.component.html'
})
export class PaymentSettingsUpdateComponent implements OnInit {
  paymentSettings: IPaymentSettings;
  isSaving: boolean;

  constructor(private paymentSettingsService: PaymentSettingsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ paymentSettings }) => {
      this.paymentSettings = paymentSettings;
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.paymentSettings.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentSettingsService.update(this.paymentSettings));
    } else {
      this.subscribeToSaveResponse(this.paymentSettingsService.create(this.paymentSettings));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentSettings>>) {
    result.subscribe((res: HttpResponse<IPaymentSettings>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }
}
