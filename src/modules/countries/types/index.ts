export interface CountryData {
  id: number;
  name: string;
  code: string;
  region: string | null;
  currency: string | null;
  currencySymbol: string | null;
  repCount?: number;
  isActive: boolean;
}
