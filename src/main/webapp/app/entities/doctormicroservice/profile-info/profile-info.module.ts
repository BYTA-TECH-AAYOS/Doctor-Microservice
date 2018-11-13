import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DoctormicroserviceSharedModule } from 'app/shared';
import {
  ProfileInfoComponent,
  ProfileInfoDetailComponent,
  ProfileInfoUpdateComponent,
  ProfileInfoDeletePopupComponent,
  ProfileInfoDeleteDialogComponent,
  profileInfoRoute,
  profileInfoPopupRoute
} from './';

const ENTITY_STATES = [...profileInfoRoute, ...profileInfoPopupRoute];

@NgModule({
  imports: [DoctormicroserviceSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ProfileInfoComponent,
    ProfileInfoDetailComponent,
    ProfileInfoUpdateComponent,
    ProfileInfoDeleteDialogComponent,
    ProfileInfoDeletePopupComponent
  ],
  entryComponents: [ProfileInfoComponent, ProfileInfoUpdateComponent, ProfileInfoDeleteDialogComponent, ProfileInfoDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoctormicroserviceProfileInfoModule {}
