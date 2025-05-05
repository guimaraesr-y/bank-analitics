
export interface MoneyInterface {
  amount: number;
  currency?: string;
}

export class Money extends Number implements MoneyInterface {
  
  constructor(
    public amount: number,
    public currency: string | undefined = undefined
  ) {
    super(amount);
  }

}
