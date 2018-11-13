import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoctormicroserviceSharedModule } from 'app/shared';
import {
  ReservedSlotComponent,
  ReservedSlotDetailComponent,
  ReservedSlotUpdateComponent,
  ReservedSlotDeletePopupComponent,
  ReservedSlotDeleteDialogComponent,
  reservedSlotRoute,
  reservedSlotPopupRoute
} from './';

const ENTITY_STATES = [...reservedSlotRoute, ...reservedSlotPopupRoute];

@NgModule({
  imports: [DoctormicroserviceSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ReservedSlotComponent,
    ReservedSlotDetailComponent,
    ReservedSlotUpdateComponent,
    ReservedSlotDeleteDialogComponent,
    ReservedSlotDeletePopupComponent
  ],
  entryComponents: [
    ReservedSlotComponent,
    ReservedSlotUpdateComponent,
    ReservedSlotDeleteDialogComponent,
    ReservedSlotDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoctormicroserviceReservedSlotModule {}
