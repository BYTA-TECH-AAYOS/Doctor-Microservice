import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDoctorSettings } from 'app/shared/model/doctormicroservice/doctor-settings.model';
import { DoctorSettingsService } from './doctor-settings.service';

@Component({
  selector: 'jhi-doctor-settings-delete-dialog',
  templateUrl: './doctor-settings-delete-dialog.component.html'
})
export class DoctorSettingsDeleteDialogComponent {
  doctorSettings: IDoctorSettings;

  constructor(
    private doctorSettingsService: DoctorSettingsService,
    public activeModal: NgbActiveModal,
    private eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.doctorSettingsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'doctorSettingsListModification',
        content: 'Deleted an doctorSettings'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-doctor-settings-delete-popup',
  template: ''
})
export class DoctorSettingsDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ doctorSettings }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DoctorSettingsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.doctorSettings = doctorSettings;
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
