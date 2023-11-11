import { Module } from '@nestjs/common';
import { MySqlDatabaseModule } from './mysql/mysql.module';

@Module({
  imports: [MySqlDatabaseModule],
})
export class DatabaseModule {}
