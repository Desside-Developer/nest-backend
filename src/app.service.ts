import { Injectable } from '@nestjs/common';
import { createConnection, Connection } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  private connection: Connection;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.connection = await createConnection({
      host: 'localhost',
      user: '',
      password: '',
      database: '',
    });
  }

  async query(sql: string, values: any[] = []) {
    const [rows] = await this.connection.execute(sql, values);
    return rows;
  }
}