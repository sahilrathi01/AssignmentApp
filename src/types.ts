export type Lead = {
  id: string;
  name: string;
  location: {lat: number; lng: number; address?: string};
  matchScore: number; // 0-100
};

export type OCRFields = {
  name: string;
  idNumber: string;
  dob: string; // DD/MM/YYYY
  confidences: {name: number; idNumber: number; dob: number};
};
