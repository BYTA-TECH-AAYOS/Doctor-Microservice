import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Doctor } from 'app/shared/model/doctormicroservice/doctor.model';
import { DoctorService } from './doctor.service';
import { DoctorComponent } from './doctor.component';
import { DoctorDetailComponent } from './doctor-detail.component';
import { DoctorUpdateComponent } from './doctor-update.component';
import { DoctorDeletePopupComponent } from './doctor-delete-dialog.component';
import { IDoctor } from 'app/shared/model/doctormicroservice/doctor.model';

@Injectable({ providedIn: 'root' })
export class DoctorResolve implements Resolve<IDoctor> {
  constructor(private service: DoctorService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Doctor> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Doctor>) => response.ok),
        map((doctor: HttpResponse<Doctor>) => doctor.body)
      );
    }
    return of(new Doctor());
  }
}

export const doctorRoute: Routes = [
  {
    path: 'doctor',
    component: DoctorComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'doctor/:id/view',
    component: DoctorDetailComponent,
    resolve: {
      doctor: DoctorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'doctor/new',
    component: DoctorUpdateComponent,
    resolve: {
      doctor: DoctorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctor.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'doctor/:id/edit',
    component: DoctorUpdateComponent,
    resolve: {
      doctor: DoctorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctor.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const doctorPopupRoute: Routes = [
  {
    path: 'doctor/:id/delete',
    component: DoctorDeletePopupComponent,
    resolve: {
      doctor: DoctorResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceDoctor.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
