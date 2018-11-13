import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaymentSettings } from 'app/shared/model/doctormicroservice/payment-settings.model';

@Component({
  selector: 'jhi-payment-settings-detail',
  templateUrl: './payment-settings-detail.component.html'
})
export class PaymentSettingsDetailComponent implements OnInit {
  paymentSettings: IPaymentSettings;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paymentSettings }) => {
      this.paymentSettings = paymentSettings;
    });
  }

  previousState() {
    window.history.back();
  }
}
