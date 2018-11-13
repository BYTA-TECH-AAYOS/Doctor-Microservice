import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISlotStatus } from 'app/shared/model/doctormicroservice/slot-status.model';
import { SlotStatusService } from './slot-status.service';

@Component({
  selector: 'jhi-slot-status-delete-dialog',
  templateUrl: './slot-status-delete-dialog.component.html'
})
export class SlotStatusDeleteDialogComponent {
  slotStatus: ISlotStatus;

  constructor(private slotStatusService: SlotStatusService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.slotStatusService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'slotStatusListModification',
        content: 'Deleted an slotStatus'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-slot-status-delete-popup',
  template: ''
})
export class SlotStatusDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ slotStatus }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SlotStatusDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.slotStatus = slotStatus;
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
