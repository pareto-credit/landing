import { useEffect, useState } from 'react'
import type { LegalDocumentConfig } from '../data/legalDocuments'

interface UseLegalDocumentResult {
  content: string | null
  isLoading: boolean
  hasError: boolean
}

export const useLegalDocument = (config: LegalDocumentConfig): UseLegalDocumentResult => {
  const [content, setContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()

    const fetchDocument = async () => {
      try {
        setIsLoading(true)
        setHasError(false)

        const response = await fetch(config.sourceUrl, { signal: abortController.signal })
        if (!response.ok) {
          throw new Error(`Failed to fetch legal document: ${response.status}`)
        }

        const html = await response.text()
        const parser = new DOMParser()
        const documentNode = parser.parseFromString(html, 'text/html')
        const section = documentNode.querySelector(config.sectionSelector)

        if (!section) {
          throw new Error('Failed to parse legal section from source document')
        }

        setContent(section.outerHTML)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setHasError(true)
        setContent(null)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchDocument()

    return () => abortController.abort()
  }, [config])

  return {
    content,
    isLoading,
    hasError,
  }
}
