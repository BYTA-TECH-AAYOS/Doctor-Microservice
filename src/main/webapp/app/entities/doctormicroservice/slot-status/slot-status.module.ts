import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoctormicroserviceSharedModule } from 'app/shared';
import {
  SlotStatusComponent,
  SlotStatusDetailComponent,
  SlotStatusUpdateComponent,
  SlotStatusDeletePopupComponent,
  SlotStatusDeleteDialogComponent,
  slotStatusRoute,
  slotStatusPopupRoute
} from './';

const ENTITY_STATES = [...slotStatusRoute, ...slotStatusPopupRoute];

@NgModule({
  imports: [DoctormicroserviceSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SlotStatusComponent,
    SlotStatusDetailComponent,
    SlotStatusUpdateComponent,
    SlotStatusDeleteDialogComponent,
    SlotStatusDeletePopupComponent
  ],
  entryComponents: [SlotStatusComponent, SlotStatusUpdateComponent, SlotStatusDeleteDialogComponent, SlotStatusDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoctormicroserviceSlotStatusModule {}
