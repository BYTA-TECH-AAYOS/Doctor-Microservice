export interface IProfileInfo {
  id?: number;
  profileName?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  imageContentType?: string;
  image?: any;
}

export class ProfileInfo implements IProfileInfo {
  constructor(
    public id?: number,
    public profileName?: string,
    public phoneNumber?: string,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public imageContentType?: string,
    public image?: any
  ) {}
}
