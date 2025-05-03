import { Injectable } from "@nestjs/common"
import { DataSource } from "typeorm"
import { User } from "./users/infra/entities/user.entity"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class DatabaseService {

  private dataSource: DataSource

  constructor(private config: ConfigService) {
    this.dataSource = new DataSource({
      type: 'postgres',
      url: this.config.get('DATABASE_URL'),
      synchronize: true,
      logging: false,
      entities: [User],
    })
  }

  async onModuleInit() {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize()
    }
  }

  getDataSource(): DataSource {
    return this.dataSource
  }

}
