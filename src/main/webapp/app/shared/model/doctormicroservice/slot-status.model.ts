export interface ISlotStatus {
  id?: number;
  status?: string;
}

export class SlotStatus implements ISlotStatus {
  constructor(public id?: number, public status?: string) {}
}
