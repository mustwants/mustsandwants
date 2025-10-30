'use client'
import { useState } from 'react'

interface InvitePartnerModalProps {
  visible: boolean
  onClose: () => void
  onInvite: (email: string) => void
}

export default function InvitePartnerModal({
  visible,
  onClose,
  onInvite,
}: InvitePartnerModalProps) {
  const [email, setEmail] = useState('')

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-80 space-y-4">
        <h2 className="text-xl font-bold text-mwBlack text-center">Invite a Partner</h2>
        <input
          type="email"
          placeholder="Partner’s email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-mwAqua outline-none"
        />
        <div className="flex justify-between gap-2">
          <button
            onClick={() => {
              onInvite(email)
              setEmail('')
            }}
            className="flex-1 bg-mwAqua text-white font-semibold rounded-lg py-2 hover:opacity-90"
          >
            Send Invite
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-400 rounded-lg py-2 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
