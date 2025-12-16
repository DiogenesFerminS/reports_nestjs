import { Column, Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/common/helpers';

interface HeaderOptions {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

const currentDate: Column = {
  text: DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  width: 150,
  margin: [20, 20],
};

export const headerSection = (options: HeaderOptions): Content => {
  const { showDate = true, showLogo = true, title, subtitle } = options;

  const headerLogo: Content = showLogo ? logo : '';
  const headerDate: Content = showDate ? currentDate : '';

  const headers: Content = {
    stack: [
      {
        text: title ?? '',
        bold: true,
        fontSize: 22,
        alignment: 'center',
        margin: [0, 15, 0, 0],
      },
      {
        text: subtitle ?? '',
        fontSize: 18,
        alignment: 'center',
        margin: [0, 5, 0, 0],
      },
    ],
  };

  return {
    columns: [headerLogo, headers, headerDate],
  };
};
