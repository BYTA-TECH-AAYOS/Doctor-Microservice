import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IProfileInfo } from 'app/shared/model/doctormicroservice/profile-info.model';

@Component({
  selector: 'jhi-profile-info-detail',
  templateUrl: './profile-info-detail.component.html'
})
export class ProfileInfoDetailComponent implements OnInit {
  profileInfo: IProfileInfo;

  constructor(private dataUtils: JhiDataUtils, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
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
  previousState() {
    window.history.back();
  }
}
