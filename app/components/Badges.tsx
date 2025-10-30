'use client'
import Image from 'next/image'

export default function Badges() {
  return (
    <div className="flex justify-center gap-6 mt-6 flex-wrap">
      <Image
        src="/mwbadgemilvet.png"
        alt="Military Veteran Badge"
        width={100}
        height={100}
        className="w-24 h-24 object-contain hover:scale-105 transition"
      />
      <Image
        src="/mwbadgemilaffil.png"
        alt="Military Affiliation Badge"
        width={100}
        height={100}
        className="w-24 h-24 object-contain hover:scale-105 transition"
      />
      <Image
        src="/mwbadgelender.png"
        alt="Lender Badge"
        width={100}
        height={100}
        className="w-24 h-24 object-contain hover:scale-105 transition"
      />
    </div>
  )
}
