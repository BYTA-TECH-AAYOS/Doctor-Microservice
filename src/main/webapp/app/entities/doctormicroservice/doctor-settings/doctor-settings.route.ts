import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DoctorSettings } from 'app/shared/model/doctormicroservice/doctor-settings.model';
import { DoctorSettingsService } from './doctor-settings.service';
import { DoctorSettingsComponent } from './doctor-settings.component';
import { DoctorSettingsDetailComponent } from './doctor-settings-detail.component';
import { DoctorSettingsUpdateComponent } from './doctor-settings-update.component';
import { DoctorSettingsDeletePopupComponent } from './doctor-settings-delete-dialog.component';
import { IDoctorSettings } from 'app/shared/model/doctormicroservice/doctor-settings.model';

@Injectable({ providedIn: 'root' })
export class DoctorSettingsResolve implements Resolve<IDoctorSettings> {
  constructor(private service: DoctorSettingsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DoctorSettings> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DoctorSettings>) => response.ok),
        map((doctorSettings: HttpResponse<DoctorSettings>) => doctorSettings.body)
      );
    }
    return of(new DoctorSettings());
  }
}

export const doctorSettingsRoute: Routes = [
  {
    path: 'doctor-settings',
    component: DoctorSettingsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctorSettings.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'doctor-settings/:id/view',
    component: DoctorSettingsDetailComponent,
    resolve: {
      doctorSettings: DoctorSettingsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctorSettings.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'doctor-settings/new',
    component: DoctorSettingsUpdateComponent,
    resolve: {
      doctorSettings: DoctorSettingsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctorSettings.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'doctor-settings/:id/edit',
    component: DoctorSettingsUpdateComponent,
    resolve: {
      doctorSettings: DoctorSettingsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctorSettings.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const doctorSettingsPopupRoute: Routes = [
  {
    path: 'doctor-settings/:id/delete',
    component: DoctorSettingsDeletePopupComponent,
    resolve: {
      doctorSettings: DoctorSettingsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctorSettings.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
