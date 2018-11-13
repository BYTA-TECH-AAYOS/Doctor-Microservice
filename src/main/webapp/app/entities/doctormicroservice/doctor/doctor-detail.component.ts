import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDoctor } from 'app/shared/model/doctormicroservice/doctor.model';

@Component({
  selector: 'jhi-doctor-detail',
  templateUrl: './doctor-detail.component.html'
})
export class DoctorDetailComponent implements OnInit {
  doctor: IDoctor;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ doctor }) => {
      this.doctor = doctor;
    });
  }

  previousState() {
    window.history.back();
  }
}
