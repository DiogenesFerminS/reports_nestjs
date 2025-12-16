import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entity/employee.entity';
import { Country } from 'src/countries/entity/countries.entity';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService],
  imports: [PrinterModule, TypeOrmModule.forFeature([Employee, Country])],
})
export class BasicReportsModule {}
