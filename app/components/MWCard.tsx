import React from 'react'

export default function MWCard({
  title,
  subtitle,
  children,
}: {
  title?: string
  subtitle?: string
  children?: React.ReactNode
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
      {title && <h2 className="text-xl font-heading text-mwAqua mb-1">{title}</h2>}
      {subtitle && <p className="text-sm text-mwBlack/70 mb-3">{subtitle}</p>}
      <div className="text-mwBlack font-body">{children}</div>
    </div>
  )
}
