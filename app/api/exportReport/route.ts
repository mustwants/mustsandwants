import { NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

export async function POST(req: Request) {
  const { user_id, agent_email } = await req.json()

  if (!user_id || !agent_email)
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 })

  const response = await fetch(`${supabaseUrl}/functions/v1/sendAgentReport`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${supabaseServiceKey}`,
    },
    body: JSON.stringify({ user_id, agent_email }),
  })

  const data = await response.json()
  return NextResponse.json(data)
}
