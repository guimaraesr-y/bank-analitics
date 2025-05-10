
export interface SenderBrokerService {

  send(queue: string, message: Buffer): Promise<void>;

}
