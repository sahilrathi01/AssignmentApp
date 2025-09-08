import {LEADS} from '../data/leads';
import {Lead} from '../types';

export async function fetchLeadsForQuery(query: string): Promise<Lead[]> {
  // Simulate network + lightweight filtering
  await new Promise(r => setTimeout(r, 500));
  const q = query.toLowerCase();
  const filtered = LEADS.filter(
    l =>
      l.name.toLowerCase().includes(q) ||
      (l.location.address || '').toLowerCase().includes(q),
  );
  return filtered.length ? filtered : LEADS;
}
