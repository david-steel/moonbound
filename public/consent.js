/* Sneeze It cookie consent gate. Canonical copy: ~/.claude/ref/sneeze-consent.js (SOP 2026-11-02).
 * Nothing that tracks may load until the visitor clicks Accept.
 * Usage: include this script first in the page head, then register every tracker as a loader:
 *   SneezeConsent.onAccept(function(){ ...GTM / gtag / fbq / HubSpot / LinkedIn code... });
 * Safe to inline: this file must never contain a closing script tag.
 * - Google Consent Mode v2 defaults are set to denied before any Google tag can run.
 * - Accept and Reject have equal weight. Choice is stored for 180 days (localStorage + cookie).
 * - Global Privacy Control (navigator.globalPrivacyControl) counts as Reject; no banner shown.
 * - A small "Cookie settings" link stays on the page so the choice can be changed.
 * - Withdrawing consent reloads the page so loaded trackers are gone.
 */
(function (w, d) {
  if (w.SneezeConsent) return;
  var KEY = 'sz_consent', DAYS = 180, queue = [], ran = false;
  w.dataLayer = w.dataLayer || [];
  w.gtag = w.gtag || function () { w.dataLayer.push(arguments); };
  w.gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', functionality_storage: 'granted', security_storage: 'granted', wait_for_update: 500 });

  function read() {
    try { var v = w.localStorage.getItem(KEY); if (v) { var o = JSON.parse(v); if (o && o.exp > Date.now()) return o.v; } } catch (e) {}
    var m = d.cookie.match(/(?:^|; )sz_consent=(granted|denied)/);
    if (m) return m[1];
    if (w.navigator && w.navigator.globalPrivacyControl) return 'denied';
    return null;
  }
  function save(v) {
    try { w.localStorage.setItem(KEY, JSON.stringify({ v: v, exp: Date.now() + DAYS * 864e5 })); } catch (e) {}
    d.cookie = KEY + '=' + v + '; Max-Age=' + DAYS * 86400 + '; Path=/; SameSite=Lax' + (location.protocol === 'https:' ? '; Secure' : '');
  }
  function grant() {
    w.gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
    ran = true;
    var q = queue.splice(0); for (var i = 0; i < q.length; i++) { try { q[i](); } catch (e) { if (w.console) console.error('[consent] loader failed', e); } }
  }

  var css = '#sz-cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483646;max-width:560px;margin:0 auto;background:#fff;color:#1a1a1a;border:1px solid #ddd;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.18);padding:16px 18px;font:14px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}'
    + '#sz-cc p{margin:0 0 12px}#sz-cc .b{display:flex;gap:10px}#sz-cc button{flex:1;min-height:44px;border-radius:8px;font:600 14px system-ui,-apple-system,sans-serif;cursor:pointer;border:1.5px solid #1a1a1a;background:#fff;color:#1a1a1a}'
    + '#sz-cc button:focus-visible,#sz-cs:focus-visible{outline:3px solid #2563eb;outline-offset:2px}'
    + '#sz-cs{position:fixed;left:10px;bottom:10px;z-index:2147483645;background:rgba(255,255,255,.92);border:1px solid #ccc;border-radius:6px;padding:4px 8px;font:12px system-ui,-apple-system,sans-serif;color:#444;cursor:pointer}';

  function el(tag, attrs, text) { var e = d.createElement(tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (text) e.textContent = text; return e; }
  function mount(fn) { if (d.body) fn(); else d.addEventListener('DOMContentLoaded', fn); }
  function style() { if (!d.getElementById('sz-cc-css')) { var s = el('style', { id: 'sz-cc-css' }); s.textContent = css; d.head.appendChild(s); } }

  function settingsLink() {
    mount(function () {
      if (d.getElementById('sz-cs')) return;
      style();
      var b = el('button', { id: 'sz-cs', type: 'button', 'aria-label': 'Cookie settings' }, 'Cookie settings');
      b.onclick = function () { b.remove(); banner(); };
      d.body.appendChild(b);
    });
  }
  function banner() {
    mount(function () {
      if (d.getElementById('sz-cc')) return;
      style();
      var box = el('div', { id: 'sz-cc', role: 'dialog', 'aria-live': 'polite', 'aria-label': 'Cookie choices' });
      box.appendChild(el('p', {}, 'We use cookies and similar tools to measure our ads and improve this site. They only run if you accept.'));
      var row = el('div', { 'class': 'b' });
      var rej = el('button', { type: 'button' }, 'Reject');
      var acc = el('button', { type: 'button' }, 'Accept');
      rej.onclick = function () { var had = read() === 'granted'; save('denied'); box.remove(); settingsLink(); if (had && ran) location.reload(); };
      acc.onclick = function () { save('granted'); box.remove(); settingsLink(); if (!ran) grant(); };
      row.appendChild(rej); row.appendChild(acc); box.appendChild(row); d.body.appendChild(box);
    });
  }

  w.SneezeConsent = {
    onAccept: function (fn) { if (ran) { try { fn(); } catch (e) {} } else queue.push(fn); },
    status: read,
    open: function () { var s = d.getElementById('sz-cs'); if (s) s.remove(); banner(); }
  };

  var state = read();
  if (state === 'granted') { mount(grant); settingsLink(); }
  else if (state === 'denied') settingsLink();
  else banner();
})(window, document);
