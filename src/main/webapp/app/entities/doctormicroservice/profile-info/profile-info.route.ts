import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProfileInfo } from 'app/shared/model/doctormicroservice/profile-info.model';
import { ProfileInfoService } from './profile-info.service';
import { ProfileInfoComponent } from './profile-info.component';
import { ProfileInfoDetailComponent } from './profile-info-detail.component';
import { ProfileInfoUpdateComponent } from './profile-info-update.component';
import { ProfileInfoDeletePopupComponent } from './profile-info-delete-dialog.component';
import { IProfileInfo } from 'app/shared/model/doctormicroservice/profile-info.model';

@Injectable({ providedIn: 'root' })
export class ProfileInfoResolve implements Resolve<IProfileInfo> {
  constructor(private service: ProfileInfoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProfileInfo> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProfileInfo>) => response.ok),
        map((profileInfo: HttpResponse<ProfileInfo>) => profileInfo.body)
      );
    }
    return of(new ProfileInfo());
  }
}

export const profileInfoRoute: Routes = [
  {
    path: 'profile-info',
    component: ProfileInfoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'doctormicroserviceApp.doctormicroserviceProfileInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'profile-info/:id/view',
    component: ProfileInfoDetailComponent,
    resolve: {
      profileInfo: ProfileInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceProfileInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'profile-info/new',
    component: ProfileInfoUpdateComponent,
    resolve: {
      profileInfo: ProfileInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceProfileInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'profile-info/:id/edit',
    component: ProfileInfoUpdateComponent,
    resolve: {
      profileInfo: ProfileInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceProfileInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const profileInfoPopupRoute: Routes = [
  {
    path: 'profile-info/:id/delete',
    component: ProfileInfoDeletePopupComponent,
    resolve: {
      profileInfo: ProfileInfoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceProfileInfo.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
