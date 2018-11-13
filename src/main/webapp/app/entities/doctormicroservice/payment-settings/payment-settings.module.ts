import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoctormicroserviceSharedModule } from 'app/shared';
import {
  PaymentSettingsComponent,
  PaymentSettingsDetailComponent,
  PaymentSettingsUpdateComponent,
  PaymentSettingsDeletePopupComponent,
  PaymentSettingsDeleteDialogComponent,
  paymentSettingsRoute,
  paymentSettingsPopupRoute
} from './';

const ENTITY_STATES = [...paymentSettingsRoute, ...paymentSettingsPopupRoute];

@NgModule({
  imports: [DoctormicroserviceSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PaymentSettingsComponent,
    PaymentSettingsDetailComponent,
    PaymentSettingsUpdateComponent,
    PaymentSettingsDeleteDialogComponent,
    PaymentSettingsDeletePopupComponent
  ],
  entryComponents: [
    PaymentSettingsComponent,
    PaymentSettingsUpdateComponent,
    PaymentSettingsDeleteDialogComponent,
    PaymentSettingsDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoctormicroservicePaymentSettingsModule {}
