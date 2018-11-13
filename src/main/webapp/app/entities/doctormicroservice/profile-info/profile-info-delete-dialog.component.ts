import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfileInfo } from 'app/shared/model/doctormicroservice/profile-info.model';
import { ProfileInfoService } from './profile-info.service';

@Component({
  selector: 'jhi-profile-info-delete-dialog',
  templateUrl: './profile-info-delete-dialog.component.html'
})
export class ProfileInfoDeleteDialogComponent {
  profileInfo: IProfileInfo;

  constructor(private profileInfoService: ProfileInfoService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.profileInfoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'profileInfoListModification',
        content: 'Deleted an profileInfo'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-profile-info-delete-popup',
  template: ''
})
export class ProfileInfoDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ profileInfo }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ProfileInfoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.profileInfo = profileInfo;
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
