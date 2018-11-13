export interface IPaymentSettings {
  id?: number;
  isPaymentEnabled?: boolean;
  amount?: number;
  paymentMethod?: string;
  currency?: string;
  intent?: string;
  noteToPayer?: string;
  paymentGatewayProvider?: string;
  paymentGatewayCredentials?: string;
}

export class PaymentSettings implements IPaymentSettings {
  constructor(
    public id?: number,
    public isPaymentEnabled?: boolean,
    public amount?: number,
    public paymentMethod?: string,
    public currency?: string,
    public intent?: string,
    public noteToPayer?: string,
    public paymentGatewayProvider?: string,
    public paymentGatewayCredentials?: string
  ) {
    this.isPaymentEnabled = this.isPaymentEnabled || false;
  }
}
