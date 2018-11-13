import { IDoctorSessionInfo } from 'app/shared/model/doctormicroservice/doctor-session-info.model';
import { IReservedSlot } from 'app/shared/model/doctormicroservice/reserved-slot.model';

export interface IDoctor {
  id?: number;
  specialisation?: string;
  location?: string;
  profileInfoId?: number;
  contactInfoId?: number;
  doctorSettingsId?: number;
  workspaceId?: number;
  doctorSessionInfos?: IDoctorSessionInfo[];
  reservedSlots?: IReservedSlot[];
}

export class Doctor implements IDoctor {
  constructor(
    public id?: number,
    public specialisation?: string,
    public location?: string,
    public profileInfoId?: number,
    public contactInfoId?: number,
    public doctorSettingsId?: number,
    public workspaceId?: number,
    public doctorSessionInfos?: IDoctorSessionInfo[],
    public reservedSlots?: IReservedSlot[]
  ) {}
}
