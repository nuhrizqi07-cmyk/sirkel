/** Format phone number to wa.me link */
export function waLink(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '');
  // Indonesia: replace leading 0 with 62
  if (cleaned.startsWith('0')) {
    return `https://wa.me/62${cleaned.slice(1)}`;
  }
  return `https://wa.me/${cleaned}`;
}

/** Truncate text */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max) + '...';
}

/** Format date relative */
export function timeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return 'baru saja';
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} hari lalu`;
  return `${Math.floor(diff / 2592000)} bulan lalu`;
}

/** Badge color for tipe */
export function tipeBadgeColor(tipe: string): string {
  const map: Record<string, string> = {
    produsen: 'bg-emerald-100 text-emerald-800',
    distributor: 'bg-amber-100 text-amber-800',
    keduanya: 'bg-blue-100 text-blue-800',
  };
  return map[tipe] || 'bg-gray-100 text-gray-800';
}
