import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DoctorSessionInfo } from 'app/shared/model/doctormicroservice/doctor-session-info.model';
import { DoctorSessionInfoService } from './doctor-session-info.service';
import { DoctorSessionInfoComponent } from './doctor-session-info.component';
import { DoctorSessionInfoDetailComponent } from './doctor-session-info-detail.component';
import { DoctorSessionInfoUpdateComponent } from './doctor-session-info-update.component';
import { DoctorSessionInfoDeletePopupComponent } from './doctor-session-info-delete-dialog.component';
import { IDoctorSessionInfo } from 'app/shared/model/doctormicroservice/doctor-session-info.model';

@Injectable({ providedIn: 'root' })
export class DoctorSessionInfoResolve implements Resolve<IDoctorSessionInfo> {
  constructor(private service: DoctorSessionInfoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DoctorSessionInfo> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DoctorSessionInfo>) => response.ok),
        map((doctorSessionInfo: HttpResponse<DoctorSessionInfo>) => doctorSessionInfo.body)
      );
    }
    return of(new DoctorSessionInfo());
  }
}

export const doctorSessionInfoRoute: Routes = [
  {
    path: 'doctor-session-info',
    component: DoctorSessionInfoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctorSessionInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'doctor-session-info/:id/view',
    component: DoctorSessionInfoDetailComponent,
    resolve: {
      doctorSessionInfo: DoctorSessionInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctorSessionInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'doctor-session-info/new',
    component: DoctorSessionInfoUpdateComponent,
    resolve: {
      doctorSessionInfo: DoctorSessionInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctorSessionInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'doctor-session-info/:id/edit',
    component: DoctorSessionInfoUpdateComponent,
    resolve: {
      doctorSessionInfo: DoctorSessionInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctorSessionInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const doctorSessionInfoPopupRoute: Routes = [
  {
    path: 'doctor-session-info/:id/delete',
    component: DoctorSessionInfoDeletePopupComponent,
    resolve: {
      doctorSessionInfo: DoctorSessionInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctorSessionInfo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
