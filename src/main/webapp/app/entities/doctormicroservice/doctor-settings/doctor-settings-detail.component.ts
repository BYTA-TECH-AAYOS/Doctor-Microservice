import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoctorSettings } from 'app/shared/model/doctormicroservice/doctor-settings.model';

@Component({
  selector: 'jhi-doctor-settings-detail',
  templateUrl: './doctor-settings-detail.component.html'
})
export class DoctorSettingsDetailComponent implements OnInit {
  doctorSettings: IDoctorSettings;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ doctorSettings }) => {
      this.doctorSettings = doctorSettings;
    });
  }

  previousState() {
    window.history.back();
  }
}
