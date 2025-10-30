'use client'
import React, { useState } from 'react'
import Image from 'next/image'

interface InvitePartnerModalProps {
  visible: boolean
  onClose: () => void
  onInvite: (email: string) => void
}

export default function InvitePartnerModal({ visible, onClose, onInvite }: InvitePartnerModalProps) {
  const [email, setEmail] = useState('')

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white w-11/12 max-w-md rounded-2xl shadow-xl p-6 sm:p-8 text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/mwlogomustwants.png"
            alt="MustWants Logo"
            width={60}
            height={60}
            className="opacity-90"
            priority
          />
        </div>

        <h2 className="text-xl font-bold text-mwBlack mb-2">Invite a Partner</h2>
        <p className="text-gray-600 text-sm mb-4">
          Enter your partner’s email to collaborate on your home list.
        </p>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="partner@email.com"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-2 focus:ring-mwAqua focus:outline-none"
        />

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              if (email.trim()) {
                onInvite(email)
                setEmail('')
              }
            }}
            className="bg-mwLime text-mwBlack font-semibold px-5 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            Send Invite
          </button>
          <button
            onClick={onClose}
            className="border border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <Image
            src="/mwbadgemilaffil.png"
            alt="MustWants Military Badge"
            width={100}
            height={100}
            className="w-20 h-20 object-contain opacity-90"
          />
        </div>
      </div>
    </div>
  )
}
