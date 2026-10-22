// Tiny DOM helpers shared by all screens.
export function h(tag, attrs = {}, ...kids) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const k of kids.flat()) if (k != null && k !== false) el.append(k.nodeType ? k : document.createTextNode(String(k)));
  return el;
}

export const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// A small speaker button that reads text aloud with the narrator voice.
export function speakBtn(app, text, label = 'Hear it') {
  return h(
    'button',
    {
      class: 'speak-btn',
      'aria-label': label,
      title: label,
      onclick: (e) => {
        e.stopPropagation();
        app.audio.unlock();
        app.voice.say(text);
      },
    },
    '🔊'
  );
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function confetti(host, n = 40) {
  const layer = h('div', { class: 'confetti' });
  const colors = ['#f59e0b', '#00f0ff', '#f43f5e', '#10b981', '#a78bfa', '#fde047'];
  for (let i = 0; i < n; i++) {
    layer.append(
      h('i', {
        style: {
          left: Math.random() * 100 + '%',
          background: colors[i % colors.length],
          animationDelay: Math.random() * 0.3 + 's',
          animationDuration: 0.9 + Math.random() * 0.8 + 's',
          transform: `rotate(${Math.random() * 360}deg)`,
        },
      })
    );
  }
  host.append(layer);
  setTimeout(() => layer.remove(), 2000);
}
