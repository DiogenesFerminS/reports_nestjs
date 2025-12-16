import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { Country } from 'src/countries/entity/countries.entity';
import { footerSection } from './sections/footer.section';

interface ReportOptions {
  title?: string;
  subtitle?: string;
  countries: Country[];
}

export const getCountriesReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { countries, subtitle, title } = options;

  return {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries Report',
      subtitle: subtitle ?? 'List of countries',
    }),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    content: [
      {
        // layout: 'lightHorizontalLines',
        layout: 'customLayout01',
        table: {
          headerRows: 1,
          widths: [60, 60, 60, '*', '*', '*'],
          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.continent!,
              country.local_name!,
            ]),
          ],
        },
      },
      {
        text: 'Totals Countries',
        margin: [10, 40, 0, 10],
        fontSize: 18,
        bold: true,
      },
      {
        layout: 'noBorders',
        table: {
          headerRows: 1,
          widths: [50, 50, 70, '*', '*', '*'],
          body: [
            [
              {},
              {
                text: 'Totals of countries',
                bold: true,
                colSpan: 2,
              },
              {},
              {
                text: countries.length.toString(),
                bold: true,
              },
              {},
              {},
            ],
          ],
        },
      },
    ],
  };
};
