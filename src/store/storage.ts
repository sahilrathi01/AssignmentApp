import AsyncStorage from '@react-native-async-storage/async-storage';
import {Lead, OCRFields} from '../types';

const KEYS = {
  DECLINED: 'declined_leads',
  OCR_LAST: 'ocr_last_fields',
};

export async function saveDeclined(lead: Lead) {
  const json = await AsyncStorage.getItem(KEYS.DECLINED);
  const list: Lead[] = json ? JSON.parse(json) : [];
  const exists = list.find(l => l.id === lead.id);
  if (!exists) list.push(lead);
  await AsyncStorage.setItem(KEYS.DECLINED, JSON.stringify(list));
}

export async function getDeclined(): Promise<Lead[]> {
  const json = await AsyncStorage.getItem(KEYS.DECLINED);
  return json ? JSON.parse(json) : [];
}

export async function saveOCR(fields: OCRFields) {
  await AsyncStorage.setItem(KEYS.OCR_LAST, JSON.stringify(fields));
}

export async function getOCR(): Promise<OCRFields | null> {
  const json = await AsyncStorage.getItem(KEYS.OCR_LAST);
  return json ? JSON.parse(json) : null;
}
