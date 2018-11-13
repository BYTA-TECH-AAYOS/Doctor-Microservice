import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoctormicroserviceSharedModule } from 'app/shared';
import {
  DoctorSettingsComponent,
  DoctorSettingsDetailComponent,
  DoctorSettingsUpdateComponent,
  DoctorSettingsDeletePopupComponent,
  DoctorSettingsDeleteDialogComponent,
  doctorSettingsRoute,
  doctorSettingsPopupRoute
} from './';

const ENTITY_STATES = [...doctorSettingsRoute, ...doctorSettingsPopupRoute];

@NgModule({
  imports: [DoctormicroserviceSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DoctorSettingsComponent,
    DoctorSettingsDetailComponent,
    DoctorSettingsUpdateComponent,
    DoctorSettingsDeleteDialogComponent,
    DoctorSettingsDeletePopupComponent
  ],
  entryComponents: [
    DoctorSettingsComponent,
    DoctorSettingsUpdateComponent,
    DoctorSettingsDeleteDialogComponent,
    DoctorSettingsDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoctormicroserviceDoctorSettingsModule {}
