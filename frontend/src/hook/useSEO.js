// src/hooks/useSEO.js
import { useEffect } from 'react';

function setOrUpdateMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

function setCanonical(href) {
  if (!href) return;
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function useSEO({ title, description, keywords, canonical, jsonLd }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) setOrUpdateMeta('meta[name="description"]', { name: 'description', content: description });
    if (keywords) setOrUpdateMeta('meta[name="keywords"]', { name: 'keywords', content: keywords });
    if (canonical) setCanonical(canonical);

    const id = 'ld-json-primary';
    let script = document.getElementById(id);
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, keywords, canonical, jsonLd]);
}
