import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SlotStatus } from 'app/shared/model/doctormicroservice/slot-status.model';
import { SlotStatusService } from './slot-status.service';
import { SlotStatusComponent } from './slot-status.component';
import { SlotStatusDetailComponent } from './slot-status-detail.component';
import { SlotStatusUpdateComponent } from './slot-status-update.component';
import { SlotStatusDeletePopupComponent } from './slot-status-delete-dialog.component';
import { ISlotStatus } from 'app/shared/model/doctormicroservice/slot-status.model';

@Injectable({ providedIn: 'root' })
export class SlotStatusResolve implements Resolve<ISlotStatus> {
  constructor(private service: SlotStatusService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SlotStatus> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SlotStatus>) => response.ok),
        map((slotStatus: HttpResponse<SlotStatus>) => slotStatus.body)
      );
    }
    return of(new SlotStatus());
  }
}

export const slotStatusRoute: Routes = [
  {
    path: 'slot-status',
    component: SlotStatusComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'doctormicroserviceApp.doctormicroserviceSlotStatus.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'slot-status/:id/view',
    component: SlotStatusDetailComponent,
    resolve: {
      slotStatus: SlotStatusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceSlotStatus.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'slot-status/new',
    component: SlotStatusUpdateComponent,
    resolve: {
      slotStatus: SlotStatusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceSlotStatus.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'slot-status/:id/edit',
    component: SlotStatusUpdateComponent,
    resolve: {
      slotStatus: SlotStatusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceSlotStatus.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const slotStatusPopupRoute: Routes = [
  {
    path: 'slot-status/:id/delete',
    component: SlotStatusDeletePopupComponent,
    resolve: {
      slotStatus: SlotStatusResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroserviceSlotStatus.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
