import { useEffect, useState } from 'react'

const parse = () => {
  const [, name = 'home', id] = (window.location.hash.slice(1) || '/').split('/')
  return { name: name || 'home', id }
}

export function useRoute() {
  const [route, setRoute] = useState(parse)
  useEffect(() => {
    const onChange = () => { setRoute(parse()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export const go = (path) => { window.location.hash = path }
