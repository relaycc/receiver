import 'styled-components';

export enum FontFamilyEnum {
  Inter = 'Inter, sans-serif',
  Montserrat = 'Montserrat, sans-serif',
}

type FontTypes = keyof typeof FontFamilyEnum;

interface Fonts {
  Inter: FontFamilyEnum.Inter;
  Montserrat: FontFamilyEnum.Montserrat;
}