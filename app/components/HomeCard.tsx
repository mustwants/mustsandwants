'use client'
import React from 'react'
import type { Home } from '../types'

export default function HomeCard({ home }: { home: Home }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition">
      <a
        href={home.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 font-semibold break-all"
      >
        {home.url}
      </a>
      {home.notes && <p className="text-sm text-gray-600 mt-1">{home.notes}</p>}
    </div>
  )
}
