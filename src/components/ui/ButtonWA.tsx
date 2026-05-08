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
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-600 sm:w-auto"
    >
      <span>WhatsApp</span>
      <span className="truncate text-sm font-normal opacity-80">{phone}</span>
    </a>
  );
}

export function ButtonTel({ phone }: { phone: string }) {
  return (
    <a
      href={`tel:${phone}`}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 px-5 py-3 font-medium text-gray-800 transition-colors hover:bg-gray-200 sm:w-auto"
    >
      <span>Telepon</span>
    </a>
  );
}
