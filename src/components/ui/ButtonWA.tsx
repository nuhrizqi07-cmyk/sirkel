'use client';

export function ButtonWA({ phone }: { phone: string }) {
  const cleaned = phone.replace(/[^0-9]/g, '');
  const wa = cleaned.startsWith('0')
    ? `https://wa.me/62${cleaned.slice(1)}`
    : `https://wa.me/${cleaned}`;

  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors"
    >
      <span>💬</span>
      <span>WhatsApp</span>
      <span className="text-sm font-normal opacity-80">{phone}</span>
    </a>
  );
}

export function ButtonTel({ phone }: { phone: string }) {
  return (
    <a
      href={`tel:${phone}`}
      className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium px-5 py-2.5 rounded-xl transition-colors"
    >
      <span>📞</span>
      <span>Telepon</span>
    </a>
  );
}
