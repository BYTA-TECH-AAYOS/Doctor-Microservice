import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IWorkspace } from 'app/shared/model/doctormicroservice/workspace.model';
import { WorkspaceService } from './workspace.service';

@Component({
  selector: 'jhi-workspace-update',
  templateUrl: './workspace-update.component.html'
})
export class WorkspaceUpdateComponent implements OnInit {
  workspace: IWorkspace;
  isSaving: boolean;

  constructor(private workspaceService: WorkspaceService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ workspace }) => {
      this.workspace = workspace;
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.workspace.id !== undefined) {
      this.subscribeToSaveResponse(this.workspaceService.update(this.workspace));
    } else {
      this.subscribeToSaveResponse(this.workspaceService.create(this.workspace));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IWorkspace>>) {
    result.subscribe((res: HttpResponse<IWorkspace>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }
}
