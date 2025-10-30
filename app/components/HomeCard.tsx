'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'
import type { Home } from '../types'

interface HomeCardProps {
  home: Home
  position: number
}

export default function HomeCard({ home, position }: HomeCardProps) {
  const displayUrl = useMemo(() => {
    try {
      const parsed = new URL(home.url)
      return parsed.hostname.replace(/^www\./, '')
    } catch {
      return home.url
    }
  }, [home.url])

  const title = home.preview?.title?.trim() || home.notes?.trim() || home.url
  const description = home.preview?.description || home.notes

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/90 shadow-sm transition hover:-translate-y-1 hover:border-mwAqua hover:shadow-lg">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
        {/* Rank bubble */}
        <div className="flex flex-shrink-0 flex-col items-center gap-1 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-mwAqua bg-white font-heading text-lg font-semibold text-mwBlack shadow-sm">
            {position}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
            Rank
          </span>
        </div>

        {/* Thumbnail */}
        {home.preview?.image && (
          <div className="relative h-40 w-full overflow-hidden rounded-xl bg-gray-100 sm:h-32 sm:w-48">
            <Image
              src={home.preview.image}
              alt={home.preview.title ?? `Preview of ${displayUrl}`}
              fill
              sizes="(max-width: 640px) 100vw, 192px"
              className="object-cover transition duration-300 group-hover:scale-105"
              unoptimized
            />
          </div>
        )}

        {/* Text content */}
        <div className="flex-1 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <a
              href={home.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-left font-heading text-xl font-semibold text-mwBlack underline-offset-4 transition hover:text-mwAqua hover:underline"
            >
              {title}
            </a>
            <span className="mt-1 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-500">
              {home.preview?.siteName || displayUrl}
            </span>
          </div>

          {description && (
            <p className="text-sm leading-relaxed text-gray-600">{description}</p>
          )}

          {home.notes && home.preview?.description && home.preview.description !== home.notes && (
            <div className="rounded-lg border border-dashed border-mwAqua/60 bg-mwAqua/5 p-3 text-sm text-gray-700">
              <p className="font-semibold text-mwBlack">Your notes</p>
              <p>{home.notes}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
