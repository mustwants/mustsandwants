export interface HomePreview {
  title?: string
  description?: string
  image?: string
  siteName?: string
}

export interface Home {
  id: string
  url: string
  notes?: string
  tags?: string[]
  rank: number
  preview?: HomePreview
}
