import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoctorSessionInfo } from 'app/shared/model/doctormicroservice/doctor-session-info.model';

@Component({
  selector: 'jhi-doctor-session-info-detail',
  templateUrl: './doctor-session-info-detail.component.html'
})
export class DoctorSessionInfoDetailComponent implements OnInit {
  doctorSessionInfo: IDoctorSessionInfo;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ doctorSessionInfo }) => {
      this.doctorSessionInfo = doctorSessionInfo;
    });
  }

  previousState() {
    window.history.back();
  }
}
