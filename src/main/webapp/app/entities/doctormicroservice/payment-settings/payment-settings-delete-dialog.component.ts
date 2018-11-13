import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPaymentSettings } from 'app/shared/model/doctormicroservice/payment-settings.model';
import { PaymentSettingsService } from './payment-settings.service';

@Component({
  selector: 'jhi-payment-settings-delete-dialog',
  templateUrl: './payment-settings-delete-dialog.component.html'
})
export class PaymentSettingsDeleteDialogComponent {
  paymentSettings: IPaymentSettings;

  constructor(
    private paymentSettingsService: PaymentSettingsService,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.paymentSettingsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'paymentSettingsListModification',
        content: 'Deleted an paymentSettings'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-payment-settings-delete-popup',
  template: ''
})
export class PaymentSettingsDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ paymentSettings }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PaymentSettingsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.paymentSettings = paymentSettings;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
