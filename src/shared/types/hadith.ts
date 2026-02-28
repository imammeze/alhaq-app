export interface HadithBook {
  name: string;
  id: string;
  available: number;
}

export interface HadithBooksResponse {
  code: number;
  message: string;
  data: HadithBook[];
  error: boolean;
}

export interface HadithItem {
  number: number;
  arab: string;
  id: string;
}

export interface HadithDetailData {
  name: string;
  id: string;
  available: number;
  requested: number;
  hadiths: HadithItem[];
}

export interface HadithRangeResponse {
  code: number;
  message: string;
  data: HadithDetailData;
  error: boolean;
}
