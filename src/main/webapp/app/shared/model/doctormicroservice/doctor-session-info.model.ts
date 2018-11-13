import { Moment } from 'moment';

export interface IDoctorSessionInfo {
  id?: number;
  date?: Moment;
  startTime?: Moment;
  endTime?: Moment;
  interval?: Moment;
  doctorId?: number;
}

export class DoctorSessionInfo implements IDoctorSessionInfo {
  constructor(
    public id?: number,
    public date?: Moment,
    public startTime?: Moment,
    public endTime?: Moment,
    public interval?: Moment,
    public doctorId?: number
  ) {}
}
