export interface IDoctorSettings {
  id?: number;
  approvalType?: string;
  isMailNotificationsEnabled?: boolean;
  isSMSNotificationsEnabled?: boolean;
  paymentSettingsId?: number;
}

export class DoctorSettings implements IDoctorSettings {
  constructor(
    public id?: number,
    public approvalType?: string,
    public isMailNotificationsEnabled?: boolean,
    public isSMSNotificationsEnabled?: boolean,
    public paymentSettingsId?: number
  ) {
    this.isMailNotificationsEnabled = this.isMailNotificationsEnabled || false;
    this.isSMSNotificationsEnabled = this.isSMSNotificationsEnabled || false;
  }
}
