'use client';

import Link from 'next/link';
import type { Mitra } from '@/lib/types';
import { waLink, truncate, tipeBadgeColor } from '@/lib/utils';

export default function CardMitra({ mitra }: { mitra: Mitra }) {
  return (
    <Link
      href={`/mitra/${mitra.id}`}
      className="block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base truncate">
            {mitra.nama_perusahaan}
          </h3>
          <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${tipeBadgeColor(mitra.tipe)}`}>
            {mitra.tipe}
          </span>
        </div>
        {mitra.verified && (
          <span className="text-emerald-500 text-sm shrink-0" title="Terverifikasi">✅</span>
        )}
      </div>

      {mitra.alamat && (
        <p className="mt-2 text-sm text-gray-500 truncate">
          📍 {mitra.alamat}
        </p>
      )}

      {mitra.deskripsi && (
        <p className="mt-1.5 text-sm text-gray-400 line-clamp-2">
          {truncate(mitra.deskripsi, 120)}
        </p>
      )}

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        {mitra.no_telepon && (
          <a
            href={waLink(mitra.no_telepon)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors"
          >
            💬 WA
            <span className="text-xs text-gray-500">{mitra.no_telepon}</span>
          </a>
        )}
        <span className="text-xs text-gray-400 ml-auto">
          {mitra.sumber_data}
        </span>
      </div>
    </Link>
  );
}
