import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PersistEntriesService } from "src/record-persistence/domain/services/persist-entries.service";
import { StatementRecord } from "src/statement-parser/domain/entity/statement-record";

@Injectable()
export class PersistEntriesServiceImpl implements PersistEntriesService {

  constructor(
    private readonly configService: ConfigService
  ) { }

  async persistEntries(entries: Array<StatementRecord>): Promise<void> {
    const url = this.getApiEndpoint();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.getAuthorizationHeader() || '',
      },
      body: JSON.stringify(entries)
    });

    if (!response.ok) { // TODO: Handle user errors or server errors
      throw new Error(
        `Failed to send entries to API. Status: ${response.status}: ${await response.text()}`
      );
    }
  }

  private getAuthorizationHeader(): string | undefined {
    const token = this.configService.get<string>('WORKER_TOKEN');
    return token ? `Bearer ${token}` : undefined;
  }

  private getApiEndpoint(): string {
    const baseUrl = this.configService.get<string>('API_BASE_URL')!;
    return `${baseUrl}/transactions/operations`;
  }

}
