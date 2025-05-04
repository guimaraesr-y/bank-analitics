
export interface BrokerInterface {

  connect(): Promise<void>;
  consume(queue: string, onMessage: (msg: Buffer) => Promise<void>): Promise<void>;
  ack(message: any): Promise<void>;
  nack(message: any, requeue?: boolean): Promise<void>;

}
