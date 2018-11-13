import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PaymentSettings } from 'app/shared/model/doctormicroservice/payment-settings.model';
import { PaymentSettingsService } from './payment-settings.service';
import { PaymentSettingsComponent } from './payment-settings.component';
import { PaymentSettingsDetailComponent } from './payment-settings-detail.component';
import { PaymentSettingsUpdateComponent } from './payment-settings-update.component';
import { PaymentSettingsDeletePopupComponent } from './payment-settings-delete-dialog.component';
import { IPaymentSettings } from 'app/shared/model/doctormicroservice/payment-settings.model';

@Injectable({ providedIn: 'root' })
export class PaymentSettingsResolve implements Resolve<IPaymentSettings> {
  constructor(private service: PaymentSettingsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaymentSettings> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PaymentSettings>) => response.ok),
        map((paymentSettings: HttpResponse<PaymentSettings>) => paymentSettings.body)
      );
    }
    return of(new PaymentSettings());
  }
}

export const paymentSettingsRoute: Routes = [
  {
    path: 'payment-settings',
    component: PaymentSettingsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'doctormicroserviceApp.doctormicroservicePaymentSettings.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'payment-settings/:id/view',
    component: PaymentSettingsDetailComponent,
    resolve: {
      paymentSettings: PaymentSettingsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroservicePaymentSettings.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'payment-settings/new',
    component: PaymentSettingsUpdateComponent,
    resolve: {
      paymentSettings: PaymentSettingsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroservicePaymentSettings.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'payment-settings/:id/edit',
    component: PaymentSettingsUpdateComponent,
    resolve: {
      paymentSettings: PaymentSettingsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroservicePaymentSettings.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const paymentSettingsPopupRoute: Routes = [
  {
    path: 'payment-settings/:id/delete',
    component: PaymentSettingsDeletePopupComponent,
    resolve: {
      paymentSettings: PaymentSettingsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'doctormicroserviceApp.doctormicroservicePaymentSettings.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
