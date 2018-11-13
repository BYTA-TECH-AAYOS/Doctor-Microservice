import { Moment } from 'moment';

export interface IReservedSlot {
  id?: number;
  date?: Moment;
  startTime?: Moment;
  endTime?: Moment;
  doctorId?: number;
  slotStatusId?: number;
}

export class ReservedSlot implements IReservedSlot {
  constructor(
    public id?: number,
    public date?: Moment,
    public startTime?: Moment,
    public endTime?: Moment,
    public doctorId?: number,
    public slotStatusId?: number
  ) {}
}
