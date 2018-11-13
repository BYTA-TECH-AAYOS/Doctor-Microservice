import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReservedSlot } from 'app/shared/model/doctormicroservice/reserved-slot.model';
import { ReservedSlotService } from './reserved-slot.service';

@Component({
  selector: 'jhi-reserved-slot-delete-dialog',
  templateUrl: './reserved-slot-delete-dialog.component.html'
})
export class ReservedSlotDeleteDialogComponent {
  reservedSlot: IReservedSlot;

  constructor(
    private reservedSlotService: ReservedSlotService,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.reservedSlotService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'reservedSlotListModification',
        content: 'Deleted an reservedSlot'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-reserved-slot-delete-popup',
  template: ''
})
export class ReservedSlotDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reservedSlot }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ReservedSlotDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.reservedSlot = reservedSlot;
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
