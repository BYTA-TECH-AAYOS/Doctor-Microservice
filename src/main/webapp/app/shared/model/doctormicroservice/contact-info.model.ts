export interface IContactInfo {
  id?: number;
  websiteURL?: string;
  facebookURL?: string;
  twitterURL?: string;
}

export class ContactInfo implements IContactInfo {
  constructor(public id?: number, public websiteURL?: string, public facebookURL?: string, public twitterURL?: string) {}
}
