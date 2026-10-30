import { useEffect } from 'react'

/* privacy-first page-view counter, stored locally (no third-party calls) */
export default function useAnalytics(pathname) {
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem('nira_analytics_v1') || '{"views":{},"total":0}')
      raw.views[pathname] = (raw.views[pathname] || 0) + 1
      raw.total = (raw.total || 0) + 1
      raw.last = new Date().toISOString()
      localStorage.setItem('nira_analytics_v1', JSON.stringify(raw))
    } catch {}
  }, [pathname])
}
