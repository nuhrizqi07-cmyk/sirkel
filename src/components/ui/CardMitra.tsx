'use client';

import Link from 'next/link';
import type { Mitra } from '@/lib/types';
import { waLink, truncate, tipeBadgeColor } from '@/lib/utils';

export default function CardMitra({ mitra }: { mitra: Mitra }) {
  return (
    <Link
      href={`/mitra/${mitra.id}`}
      className="block rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-gray-900">
            {mitra.nama_perusahaan}
          </h3>
          <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${tipeBadgeColor(mitra.tipe)}`}>
            {mitra.tipe}
          </span>
        </div>
        {mitra.verified && (
          <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600" title="Terverifikasi">
            Verified
          </span>
        )}
      </div>

      {mitra.alamat && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {mitra.alamat}
        </p>
      )}

      {mitra.deskripsi && (
        <p className="mt-1.5 line-clamp-2 text-sm text-gray-400">
          {truncate(mitra.deskripsi, 120)}
        </p>
      )}

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
        {mitra.no_telepon && (
          <a
            href={waLink(mitra.no_telepon)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100 sm:w-auto"
          >
            Chat WhatsApp
            <span className="truncate text-xs text-gray-500">{mitra.no_telepon}</span>
          </a>
        )}
        <span className="text-xs text-gray-400 sm:ml-auto">
          {mitra.sumber_data}
        </span>
      </div>
    </Link>
  );
}
