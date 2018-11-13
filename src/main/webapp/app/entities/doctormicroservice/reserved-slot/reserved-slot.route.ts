import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ReservedSlot } from 'app/shared/model/doctormicroservice/reserved-slot.model';
import { ReservedSlotService } from './reserved-slot.service';
import { ReservedSlotComponent } from './reserved-slot.component';
import { ReservedSlotDetailComponent } from './reserved-slot-detail.component';
import { ReservedSlotUpdateComponent } from './reserved-slot-update.component';
import { ReservedSlotDeletePopupComponent } from './reserved-slot-delete-dialog.component';
import { IReservedSlot } from 'app/shared/model/doctormicroservice/reserved-slot.model';

@Injectable({ providedIn: 'root' })
export class ReservedSlotResolve implements Resolve<IReservedSlot> {
  constructor(private service: ReservedSlotService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ReservedSlot> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ReservedSlot>) => response.ok),
        map((reservedSlot: HttpResponse<ReservedSlot>) => reservedSlot.body)
      );
    }
    return of(new ReservedSlot());
  }
}

export const reservedSlotRoute: Routes = [
  {
    path: 'reserved-slot',
    component: ReservedSlotComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'doctormicroserviceApp.doctormicroserviceReservedSlot.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'reserved-slot/:id/view',
    component: ReservedSlotDetailComponent,
    resolve: {
      reservedSlot: ReservedSlotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceReservedSlot.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'reserved-slot/new',
    component: ReservedSlotUpdateComponent,
    resolve: {
      reservedSlot: ReservedSlotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceReservedSlot.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'reserved-slot/:id/edit',
    component: ReservedSlotUpdateComponent,
    resolve: {
      reservedSlot: ReservedSlotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceReservedSlot.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const reservedSlotPopupRoute: Routes = [
  {
    path: 'reserved-slot/:id/delete',
    component: ReservedSlotDeletePopupComponent,
    resolve: {
      reservedSlot: ReservedSlotResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceReservedSlot.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
