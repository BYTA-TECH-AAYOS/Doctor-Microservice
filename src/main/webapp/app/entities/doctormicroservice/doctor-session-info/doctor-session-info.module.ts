import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoctormicroserviceSharedModule } from 'app/shared';
import {
  DoctorSessionInfoComponent,
  DoctorSessionInfoDetailComponent,
  DoctorSessionInfoUpdateComponent,
  DoctorSessionInfoDeletePopupComponent,
  DoctorSessionInfoDeleteDialogComponent,
  doctorSessionInfoRoute,
  doctorSessionInfoPopupRoute
} from './';

const ENTITY_STATES = [...doctorSessionInfoRoute, ...doctorSessionInfoPopupRoute];

@NgModule({
  imports: [DoctormicroserviceSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DoctorSessionInfoComponent,
    DoctorSessionInfoDetailComponent,
    DoctorSessionInfoUpdateComponent,
    DoctorSessionInfoDeleteDialogComponent,
    DoctorSessionInfoDeletePopupComponent
  ],
  entryComponents: [
    DoctorSessionInfoComponent,
    DoctorSessionInfoUpdateComponent,
    DoctorSessionInfoDeleteDialogComponent,
    DoctorSessionInfoDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoctormicroserviceDoctorSessionInfoModule {}
