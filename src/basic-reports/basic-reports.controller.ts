import { Controller, Get, Param, ParseUUIDPipe, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import type { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  getPdf(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.generatePdf();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola-mundo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola-mundo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:id')
  async employmentLetterById(
    @Res() response: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(id);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries')
  async getCountries(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.getCountries();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries/:id')
  async getCountriesById(@Res() response: Response, @Param('id') id: number) {
    const pdfDoc = await this.basicReportsService.getCountriesById(id);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
