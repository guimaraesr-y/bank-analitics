
export interface SenderBrokerInterface {

  send(queue: string, message: Buffer): Promise<void>;

}
