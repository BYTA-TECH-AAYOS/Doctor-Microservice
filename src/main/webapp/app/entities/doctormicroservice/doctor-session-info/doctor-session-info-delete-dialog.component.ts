import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDoctorSessionInfo } from 'app/shared/model/doctormicroservice/doctor-session-info.model';
import { DoctorSessionInfoService } from './doctor-session-info.service';

@Component({
  selector: 'jhi-doctor-session-info-delete-dialog',
  templateUrl: './doctor-session-info-delete-dialog.component.html'
})
export class DoctorSessionInfoDeleteDialogComponent {
  doctorSessionInfo: IDoctorSessionInfo;

  constructor(
    private doctorSessionInfoService: DoctorSessionInfoService,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.doctorSessionInfoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'doctorSessionInfoListModification',
        content: 'Deleted an doctorSessionInfo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-doctor-session-info-delete-popup',
  template: ''
})
export class DoctorSessionInfoDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ doctorSessionInfo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DoctorSessionInfoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.doctorSessionInfo = doctorSessionInfo;
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
