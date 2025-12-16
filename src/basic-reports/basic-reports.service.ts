import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Country } from 'src/countries/entity/countries.entity';
import { Employee } from 'src/employees/entity/employee.entity';
import { PrinterService } from 'src/printer/printer.service';
import {
  getCountriesReport,
  getEmploymentLetter,
  getEmploymentLetterById,
  getHelloWorldReport,
} from 'src/reports';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class BasicReportsService {
  constructor(
    private printerService: PrinterService,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}
  generatePdf() {
    const docDefinition: TDocumentDefinitions = getHelloWorldReport({
      name: 'User',
    });

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  employmentLetter() {
    const docDefinition: TDocumentDefinitions = getEmploymentLetter();

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async employmentLetterById(id: string) {
    const employee = await this.employeeRepository.findOneBy({ id });

    if (!employee) {
      throw new NotFoundException({
        ok: false,
        message: `User with id ${id} not found`,
      });
    }

    const docDefinition: TDocumentDefinitions = getEmploymentLetterById({
      employeeName: employee.name,
      employeeHours: employee.hours_per_day,
      employeePosition: employee.position,
      employeeWorkSchedule: employee.work_schedule,
      employeeStartDate: employee.start_date,
      employerCompany: 'FERMIN COMPANY',
      employerName: 'Diogenes Fermin',
      employerPosition: 'Gerente',
    });

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCountries() {
    const countries = await this.countryRepository.find({
      where: { local_name: Not(IsNull()), continent: Not(IsNull()) },
    });

    const docDefinition: TDocumentDefinitions = getCountriesReport({
      countries,
    });

    return this.printerService.createPdf(docDefinition);
  }

  async getCountriesById(id: number) {
    const countries = await this.countryRepository.find({
      where: { local_name: Not(IsNull()), continent: Not(IsNull()), id: id },
    });

    const docDefinition: TDocumentDefinitions = getCountriesReport({
      countries,
    });

    return this.printerService.createPdf(docDefinition);
  }
}
