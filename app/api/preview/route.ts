import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import type { HomePreview } from '@/app/types'

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .trim()
}

function extractMetaContent(html: string, attribute: 'property' | 'name', value: string) {
  const pattern = new RegExp(
    `<meta[^>]+${attribute}=["']${value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}["'][^>]*content=["']([^"']+)["'][^>]*>`,
    'i',
  )
  const match = pattern.exec(html)
  return match ? decodeHtmlEntities(match[1]) : undefined
}

function extractTitle(html: string) {
  const match = /<title>([^<]+)<\/title>/i.exec(html)
  return match ? decodeHtmlEntities(match[1]) : undefined
}

export async function GET(request: NextRequest) {
  const target = request.nextUrl.searchParams.get('url')
  if (!target) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
  }

  let parsedUrl: URL
  try {
    parsedUrl = new URL(target)
  } catch {
    return NextResponse.json({ error: 'Invalid url parameter' }, { status: 400 })
  }

  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return NextResponse.json({ error: 'Unsupported protocol' }, { status: 400 })
  }

  try {
    const response = await fetch(parsedUrl.toString(), {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:122.0) Gecko/20100101 Firefox/122.0 MustWantsBot/1.0',
        Accept: 'text/html,application/xhtml+xml',
      },
      next: { revalidate: 60 * 60 },
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Unable to fetch url' }, { status: response.status })
    }

    const html = (await response.text()).slice(0, 200_000)

    const preview: HomePreview = {
      title:
        extractMetaContent(html, 'property', 'og:title') ||
        extractMetaContent(html, 'name', 'twitter:title') ||
        extractTitle(html),
      description:
        extractMetaContent(html, 'property', 'og:description') ||
        extractMetaContent(html, 'name', 'description') ||
        extractMetaContent(html, 'name', 'twitter:description'),
      image: extractMetaContent(html, 'property', 'og:image') || extractMetaContent(html, 'name', 'twitter:image'),
      siteName:
        extractMetaContent(html, 'property', 'og:site_name') ||
        extractMetaContent(html, 'name', 'application-name') ||
        parsedUrl.hostname.replace(/^www\./, ''),
    }

    return NextResponse.json({ metadata: preview })
  } catch (error) {
    console.error('Failed to fetch preview metadata', error)
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}