import type { NewsArticle } from '../types/news'

const WORDS_PER_MINUTE = 220

const toTitleCase = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

const normalizeTag = (value: string) => {
  if (!value) return 'Update'
  return toTitleCase(value.replace(/[_-]+/g, ' '))
}

const formatArticleDate = (value: string) => {
  const parsedDate = new Date(value)
  if (Number.isNaN(parsedDate.getTime())) {
    return value || 'N/A'
  }

  return parsedDate
    .toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    .toUpperCase()
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

const estimateReadTime = (value: string) => {
  const words = value.split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  return `${minutes} min read`
}

const getFirstTagText = (item: Element, tagName: string) =>
  item.getElementsByTagName(tagName)[0]?.textContent?.trim() ?? ''

export const parseParagraphFeed = (xml: string, limit: number) => {
  const parser = new DOMParser()
  const xmlDocument = parser.parseFromString(xml, 'text/xml')

  if (xmlDocument.querySelector('parsererror')) {
    return []
  }

  const items = Array.from(xmlDocument.querySelectorAll('item')).slice(0, limit)

  return items
    .map<NewsArticle | null>((item, index) => {
      const title = getFirstTagText(item, 'title')
      const link = getFirstTagText(item, 'link')
      const guid = getFirstTagText(item, 'guid')
      const pubDate = getFirstTagText(item, 'pubDate')
      const description = getFirstTagText(item, 'description')
      const contentEncoded = getFirstTagText(item, 'content:encoded')
      const category = item.getElementsByTagName('category')[0]?.textContent?.trim() ?? ''
      const enclosureUrl = item.querySelector('enclosure')?.getAttribute('url')?.trim()

      if (!title || !link) {
        return null
      }

      return {
        id: guid || `${link}-${index}`,
        title,
        link,
        date: formatArticleDate(pubDate),
        tag: normalizeTag(category),
        readTime: estimateReadTime(stripHtml(contentEncoded || description)),
        image: enclosureUrl || undefined,
      }
    })
    .filter((article): article is NewsArticle => article !== null)
}
