import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDoctor } from 'app/shared/model/doctormicroservice/doctor.model';
import { DoctorService } from './doctor.service';
import { IProfileInfo } from 'app/shared/model/doctormicroservice/profile-info.model';
import { ProfileInfoService } from 'app/entities/doctormicroservice/profile-info';
import { IContactInfo } from 'app/shared/model/doctormicroservice/contact-info.model';
import { ContactInfoService } from 'app/entities/doctormicroservice/contact-info';
import { IDoctorSettings } from 'app/shared/model/doctormicroservice/doctor-settings.model';
import { DoctorSettingsService } from 'app/entities/doctormicroservice/doctor-settings';
import { IWorkspace } from 'app/shared/model/doctormicroservice/workspace.model';
import { WorkspaceService } from 'app/entities/doctormicroservice/workspace';

@Component({
  selector: 'jhi-doctor-update',
  templateUrl: './doctor-update.component.html'
})
export class DoctorUpdateComponent implements OnInit {
  doctor: IDoctor;
  isSaving: boolean;

  profileinfos: IProfileInfo[];

  contactinfos: IContactInfo[];

  doctorsettings: IDoctorSettings[];

  workspaces: IWorkspace[];

  constructor(
    private jhiAlertService: JhiAlertService,
    private doctorService: DoctorService,
    private profileInfoService: ProfileInfoService,
    private contactInfoService: ContactInfoService,
    private doctorSettingsService: DoctorSettingsService,
    private workspaceService: WorkspaceService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ doctor }) => {
      this.doctor = doctor;
    });
    this.profileInfoService.query({ filter: 'doctor-is-null' }).subscribe(
      (res: HttpResponse<IProfileInfo[]>) => {
        if (!this.doctor.profileInfoId) {
          this.profileinfos = res.body;
        } else {
          this.profileInfoService.find(this.doctor.profileInfoId).subscribe(
            (subRes: HttpResponse<IProfileInfo>) => {
              this.profileinfos = [subRes.body].concat(res.body);
            },
            (subRes: HttpErrorResponse) => this.onError(subRes.message)
          );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.contactInfoService.query({ filter: 'doctor-is-null' }).subscribe(
      (res: HttpResponse<IContactInfo[]>) => {
        if (!this.doctor.contactInfoId) {
          this.contactinfos = res.body;
        } else {
          this.contactInfoService.find(this.doctor.contactInfoId).subscribe(
            (subRes: HttpResponse<IContactInfo>) => {
              this.contactinfos = [subRes.body].concat(res.body);
            },
            (subRes: HttpErrorResponse) => this.onError(subRes.message)
          );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.doctorSettingsService.query({ filter: 'doctor-is-null' }).subscribe(
      (res: HttpResponse<IDoctorSettings[]>) => {
        if (!this.doctor.doctorSettingsId) {
          this.doctorsettings = res.body;
        } else {
          this.doctorSettingsService.find(this.doctor.doctorSettingsId).subscribe(
            (subRes: HttpResponse<IDoctorSettings>) => {
              this.doctorsettings = [subRes.body].concat(res.body);
            },
            (subRes: HttpErrorResponse) => this.onError(subRes.message)
          );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.workspaceService.query({ filter: 'doctor-is-null' }).subscribe(
      (res: HttpResponse<IWorkspace[]>) => {
        if (!this.doctor.workspaceId) {
          this.workspaces = res.body;
        } else {
          this.workspaceService.find(this.doctor.workspaceId).subscribe(
            (subRes: HttpResponse<IWorkspace>) => {
              this.workspaces = [subRes.body].concat(res.body);
            },
            (subRes: HttpErrorResponse) => this.onError(subRes.message)
          );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    if (this.doctor.id !== undefined) {
      this.subscribeToSaveResponse(this.doctorService.update(this.doctor));
    } else {
      this.subscribeToSaveResponse(this.doctorService.create(this.doctor));
    }
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<IDoctor>>) {
    result.subscribe((res: HttpResponse<IDoctor>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  private onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackProfileInfoById(index: number, item: IProfileInfo) {
    return item.id;
  }

  trackContactInfoById(index: number, item: IContactInfo) {
    return item.id;
  }

  trackDoctorSettingsById(index: number, item: IDoctorSettings) {
    return item.id;
  }

  trackWorkspaceById(index: number, item: IWorkspace) {
    return item.id;
  }
}
