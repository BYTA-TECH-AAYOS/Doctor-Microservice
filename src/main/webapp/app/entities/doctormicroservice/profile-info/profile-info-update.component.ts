import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IProfileInfo } from 'app/shared/model/doctormicroservice/profile-info.model';
import { ProfileInfoService } from './profile-info.service';

@Component({
  selector: 'jhi-profile-info-update',
  templateUrl: './profile-info-update.component.html'
})
export class ProfileInfoUpdateComponent implements OnInit {
  profileInfo: IProfileInfo;
  isSaving: boolean;

  constructor(
    private dataUtils: JhiDataUtils,
    private profileInfoService: ProfileInfoService,
    private elementRef: ElementRef,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ profileInfo }) => {
      this.profileInfo = profileInfo;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, entity, field, isImage) {
    this.dataUtils.setFileData(event, entity, field, isImage);
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.dataUtils.clearInputImage(this.profileInfo, this.elementRef, field, fieldContentType, idInput);
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.profileInfo.id !== undefined) {
      this.subscribeToSaveResponse(this.profileInfoService.update(this.profileInfo));
    } else {
      this.subscribeToSaveResponse(this.profileInfoService.create(this.profileInfo));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IProfileInfo>>) {
    result.subscribe((res: HttpResponse<IProfileInfo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }
}
