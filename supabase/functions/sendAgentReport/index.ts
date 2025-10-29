// Deno Edge Function: sendAgentReport
// Uses Resend API to email agent report PDF

import { serve } from "https://deno.land/std@0.182.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Resend } from "https://esm.sh/resend@1.2.0"
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts"

serve(async (req) => {
  try {
    const { user_id, agent_email } = await req.json()
    if (!user_id || !agent_email) throw new Error("Missing parameters")

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    )

    const { data: user } = await supabase
      .from("users")
      .select("id, name, email, partner_id")
      .eq("id", user_id)
      .single()

    const { data: homes } = await supabase
      .from("user_homes")
      .select("url, notes, rank")
      .eq("user_id", user_id)
      .order("rank")

    const { data: desires } = await supabase
      .from("user_desires")
      .select("title, importance")
      .eq("user_id", user_id)

    // --- Render simple HTML for PDF ---
    const html = `
      <html>
        <head>
          <style>
            body { font-family: Roboto, sans-serif; padding: 24px; }
            h1 { color: #74E4B8; }
            h2 { color: #8ABA4E; border-bottom: 1px solid #eee; padding-bottom: 4px; }
            .must { background:#8ABA4E20; padding:4px 8px; border-radius:6px; }
            .want { background:#D1EE0020; padding:4px 8px; border-radius:6px; }
          </style>
        </head>
        <body>
          <h1>Home Buyer Desires & Professionals</h1>
          <h2>Buyer</h2>
          <p>${user.name} (${user.email})</p>

          <h2>My Ranked Homes</h2>
          <ol>
            ${homes.map(
              (h: any) =>
                `<li><a href="${h.url}">${h.url}</a><br>${h.notes ?? ""}</li>`
            ).join("")}
          </ol>

          <h2>My Buying Priorities</h2>
          <ul>
            ${desires.map(
              (d: any) =>
                `<li class="${
                  d.importance >= 4 ? "must" : "want"
                }">${d.title}</li>`
            ).join("")}
          </ul>
        </body>
      </html>
    `

    // --- Convert HTML to PDF (via Puppeteer) ---
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: "networkidle0" })
    const pdf = await page.pdf({ format: "A4" })
    await browser.close()

    // --- Send Email via Resend ---
    const resend = new Resend(Deno.env.get("RESEND_API_KEY")!)
    await resend.emails.send({
      from: "MustWants Reports <reports@mustwants.com>",
      to: agent_email,
      subject: "Client Home Preferences & Ranked List",
      html: `<p>Hello,</p><p>Your client has shared their ranked homes and buying priorities via MustWants.</p><p>Report attached.</p>`,
      attachments: [{ filename: "MustWants_Report.pdf", content: pdf }],
    })

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
