const WIDGET_SCRIPT_ID = 'omnidimension-web-widget';
const SCRIPT_BASE = 'https://omnidim.io/web_widget.js';

/** Loads Omnidimension chat/widget once when a secret key is provided at build time. */
export function loadOmnidimWidget(secretKey: string): void {
  const key = secretKey.trim();
  if (!key || document.getElementById(WIDGET_SCRIPT_ID)) return;
  const s = document.createElement('script');
  s.id = WIDGET_SCRIPT_ID;
  s.async = true;
  s.src = `${SCRIPT_BASE}?secret_key=${encodeURIComponent(key)}`;
  document.body.append(s);
}
