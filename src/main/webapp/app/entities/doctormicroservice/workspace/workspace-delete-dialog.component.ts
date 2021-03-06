import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWorkspace } from 'app/shared/model/doctormicroservice/workspace.model';
import { WorkspaceService } from './workspace.service';

@Component({
  selector: 'jhi-workspace-delete-dialog',
  templateUrl: './workspace-delete-dialog.component.html'
})
export class WorkspaceDeleteDialogComponent {
  workspace: IWorkspace;

  constructor(private workspaceService: WorkspaceService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.workspaceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'workspaceListModification',
        content: 'Deleted an workspace'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-workspace-delete-popup',
  template: ''
})
export class WorkspaceDeletePopupComponent implements OnInit, OnDestroy {
  private ngbModalRef: NgbModalRef;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ workspace }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(WorkspaceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.workspace = workspace;
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
