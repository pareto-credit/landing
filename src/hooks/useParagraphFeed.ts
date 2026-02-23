import { useEffect, useState } from 'react'
import { FALLBACK_NEWS_ARTICLES, PARAGRAPH_RSS_URL } from '../data/news'
import type { NewsArticle } from '../types/news'
import { parseParagraphFeed } from '../utils/rss'

interface UseParagraphFeedResult {
  articles: NewsArticle[]
  isLoading: boolean
  isUsingFallback: boolean
}

const REQUEST_TIMEOUT_MS = 10_000

const isAbortError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === 'AbortError'

export const useParagraphFeed = (limit = 3): UseParagraphFeedResult => {
  const [articles, setArticles] = useState<NewsArticle[]>(() => FALLBACK_NEWS_ARTICLES.slice(0, limit))
  const [isLoading, setIsLoading] = useState(true)
  const [isUsingFallback, setIsUsingFallback] = useState(true)

  useEffect(() => {
    const abortController = new AbortController()
    const timeoutId = window.setTimeout(() => abortController.abort(), REQUEST_TIMEOUT_MS)

    const fetchArticles = async () => {
      try {
        const response = await fetch(PARAGRAPH_RSS_URL, {
          signal: abortController.signal,
          headers: {
            Accept: 'application/rss+xml, text/xml, application/xml',
          },
        })

        if (!response.ok) {
          throw new Error(`RSS request failed: ${response.status}`)
        }

        const xml = await response.text()
        const parsedArticles = parseParagraphFeed(xml, limit)

        if (parsedArticles.length === 0) {
          throw new Error('RSS parsing returned zero valid articles')
        }

        setArticles(parsedArticles)
        setIsUsingFallback(false)
      } catch (error) {
        if (isAbortError(error)) return
        setArticles(FALLBACK_NEWS_ARTICLES.slice(0, limit))
        setIsUsingFallback(true)
      } finally {
        window.clearTimeout(timeoutId)
        setIsLoading(false)
      }
    }

    void fetchArticles()

    return () => {
      window.clearTimeout(timeoutId)
      abortController.abort()
    }
  }, [limit])

  return {
    articles,
    isLoading,
    isUsingFallback,
  }
}
