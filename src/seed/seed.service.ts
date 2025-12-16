import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employees/entity/employee.entity';
import { Repository } from 'typeorm';
import { employees } from './data/employees.data';
import { Country } from 'src/countries/entity/countries.entity';
import { countries } from './data/countries.data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}
  async loadSeed() {
    await this.employeeRepository.deleteAll();
    await this.countryRepository.deleteAll();

    const seedEmployee = employees.map((employee) => {
      return this.employeeRepository.create({
        hours_per_day: employee.hoursPerDay,
        name: employee.fullName,
        position: employee.position,
        start_date: new Date(employee.startDate),
        work_schedule: employee.schedule,
        work_time: employee.startTime,
      });
    });

    const seedCountry = countries.map((country) => {
      return this.countryRepository.create(country);
    });

    try {
      await this.employeeRepository.save(seedEmployee);
      await this.countryRepository.save(seedCountry);
      return 'Seed Executed';
    } catch {
      throw new BadRequestException('Seed Failed');
    }
  }

  async getAll() {
    return {
      employees: await this.employeeRepository.find(),
      countries: await this.countryRepository.find(),
    };
  }
}
