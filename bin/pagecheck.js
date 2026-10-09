// pagecheck.js: the rules a script can check on a rendered page. `uihub check <url>` evaluates this in a headless tab
// (camofox) and reads back one JSON string. Each check names the rule it holds (principles/, the Operator's FIT-RULES).
(() => {
  const SKIP = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "svg", "SVG", "path", "PATH", "HEAD", "META", "LINK"]);
  const all = [...document.body.querySelectorAll("*")].filter(e => !SKIP.has(e.tagName) && !e.closest("svg"));
  const memo = new Map(), S = e => { let s = memo.get(e); if (!s) memo.set(e, s = getComputedStyle(e)); return s; };
  const px = v => parseFloat(v) || 0;
  const clear = c => !c || c === "transparent" || /rgba\([^)]*,\s*0\)$/.test(c);
  const shown = e => { const r = e.getBoundingClientRect(), s = S(e); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && +s.opacity > 0; };
  const where = e => { const out = []; for (let n = e, i = 0; n && n.nodeType === 1 && n !== document.body && i < 4; n = n.parentElement, i++) {
      let s = n.tagName.toLowerCase(); if (n.id) { out.unshift(s + "#" + n.id); break; }
      const c = [...n.classList].filter(c => !/^(css-|sc-|_)/.test(c) && c.length < 30).slice(0, 2); if (c.length) s += "." + c.join(".");
      out.unshift(s); } return out.join(" > "); };
  const full = e => (e.innerText || e.textContent || "").trim().replace(/\s+/g, " "), text = e => full(e).slice(0, 60);
  const sample = (list, f) => list.slice(0, 5).map(f);
  const vis = all.filter(shown);

  // rule 7 + FIT-RULES "no box in a box": a framed block (border on all four sides, or a shadow) inside another
  const NOT_BOX = new Set(["INPUT", "TEXTAREA", "SELECT", "BUTTON", "IMG", "VIDEO", "CANVAS", "IFRAME", "PRE", "CODE", "TABLE", "THEAD", "TBODY", "TR", "TD", "TH", "HR"]);
  const framed = e => { if (NOT_BOX.has(e.tagName)) return false; const r = e.getBoundingClientRect(); if (r.width < 120 || r.height < 48) return false;
    const s = S(e), sides = ["Top", "Right", "Bottom", "Left"].every(k => px(s[`border${k}Width`]) >= 1 && s[`border${k}Style`] !== "none" && !clear(s[`border${k}Color`]));
    return sides || (s.boxShadow && s.boxShadow !== "none" && !/inset/.test(s.boxShadow)); };
  const boxes = new Set(vis.filter(framed)), nested = [];
  for (const b of boxes) for (let p = b.parentElement; p && p !== document.body; p = p.parentElement) if (boxes.has(p)) { nested.push([b, p]); break; }

  // FIT-RULES "at most three type sizes per band": bands are [data-band], else the children of <main> (one wrapper deep)
  let bands = [...document.querySelectorAll("[data-band]")].filter(shown);
  if (!bands.length) { const m = document.querySelector("main") || document.body; bands = [...m.children].filter(shown);
    if (bands.length === 1) bands = [...bands[0].children].filter(shown); }
  bands = bands.filter(b => { const r = b.getBoundingClientRect(); return r.width >= 200 && r.height >= 40; });
  const typeBands = bands.map(b => { const sizes = new Set();
    for (const e of [b, ...b.querySelectorAll("*")]) if (shown(e) && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) sizes.add(Math.round(px(S(e).fontSize) * 2) / 2);
    return { band: where(b), head: text(b).slice(0, 40), sizes: [...sizes].sort((a, b) => a - b) }; }).filter(b => b.sizes.length > 3);

  // rule 14 "real icons": characters that draw as emoji (emoji presentation, or any emoji with VS16); ❯ ★ ✓ → are type
  const EMOJI = /\p{Emoji_Presentation}|\p{Emoji}\uFE0F/u;
  const emoji = []; const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = tw.nextNode());) { const m = n.textContent.match(EMOJI); if (m && n.parentElement && shown(n.parentElement) && !n.parentElement.closest("code,pre,script,style")) emoji.push([m[0], n.parentElement]); }

  // rule 14: no left accent lines (one coloured side, an inset bar shadow, or a thin absolute ::before bar)
  const accent = vis.filter(e => { const s = S(e), r = e.getBoundingClientRect(); if (r.height < 14) return false;
    const L = px(s.borderLeftWidth) >= 2 && s.borderLeftStyle !== "none" && !clear(s.borderLeftColor) && px(s.borderTopWidth) < 1 && px(s.borderRightWidth) < 1 && px(s.borderBottomWidth) < 1;
    const inset = /inset\s+[2-8]px\s+0px\s+0px/.test(s.boxShadow);
    const b = getComputedStyle(e, "::before"), bar = b.content !== "none" && b.position === "absolute" && px(b.width) >= 2 && px(b.width) <= 6 && px(b.height) >= 16 && !clear(b.backgroundColor);
    return L || inset || bar; });

  // rule 14 "one set of tokens": colour literals written inline (a style attribute with a hex, rgb or hsl colour)
  const inline = all.filter(e => /#[0-9a-f]{3,8}\b|\b(rgba?|hsla?|oklch)\(/i.test(e.getAttribute("style") || ""));
  const palette = new Set(); for (const e of vis) { const s = S(e); for (const c of [s.color, s.backgroundColor, s.borderTopColor]) if (!clear(c)) palette.add(c); }

  // a11y: something that looks clickable (pointer) but is not a control, a link or a role (the "clickable div")
  const ROLE = /^(button|link|tab|menuitem\w*|option|checkbox|radio|switch|treeitem|row|gridcell|slider|combobox)$/;
  const CTRL = new Set(["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA", "LABEL", "SUMMARY", "OPTION", "VIDEO", "AUDIO"]);
  const pointer = vis.filter(e => S(e).cursor === "pointer" && !CTRL.has(e.tagName) && !ROLE.test(e.getAttribute("role") || "") && !e.hasAttribute("tabindex")
    && !e.closest("a,button,label,summary,[role=button],[role=link],[tabindex]") && !(e.parentElement && S(e.parentElement).cursor === "pointer"));

  // rule 13 "motion has a job": keyframe animation on the page needs a prefers-reduced-motion rule
  let reducedRules = 0, unreadable = 0; const scan = rules => { for (const r of rules) { if (r.media && /prefers-reduced-motion/.test(r.media.mediaText)) reducedRules++; if (r.cssRules) scan(r.cssRules); } };
  for (const sh of document.styleSheets) { try { scan(sh.cssRules); } catch (e) { unreadable++; } }
  const animated = vis.filter(e => { const s = S(e); return s.animationName !== "none" && px(s.animationDuration) > 0; });

  // rule 9 + FIT-RULES "empty = one line": an empty message with its icon or picture taller than about two lines
  const EMPTY = /^(no |nothing\b|empty\b|none yet|0 results|you have no|there (are|is) no)/i, tall = [];
  const tw2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = tw2.nextNode());) { const t = n.textContent.trim(); if (!EMPTY.test(t) || t.length > 60 || !n.parentElement || !shown(n.parentElement) || full(n.parentElement).length > t.length + 12 || n.parentElement.closest("th,thead,li,code,pre,td:not([colspan])")) continue;
    // the empty state is the largest box around the message that holds no other words (its icon, picture or padding)
    let box = n.parentElement; while (box.parentElement && box.parentElement !== document.body && full(box.parentElement).length <= t.length + 12) box = box.parentElement;
    const lh = px(S(n.parentElement).lineHeight) || px(S(n.parentElement).fontSize) * 1.3, h = box.getBoundingClientRect().height;
    if (h > lh * 2.6) tall.push([t.slice(0, 50), box, Math.round(h), Math.round(lh)]); }

  const broken = [...document.images].filter(i => i.complete && !i.naturalWidth && shown(i)).map(i => i.getAttribute("src"));
  return JSON.stringify({
    url: location.href, title: document.title, viewport: [innerWidth, innerHeight], elements: vis.length, bands: bands.length,
    box_in_box: { n: nested.length, samples: sample(nested, ([b, p]) => `${where(b)}  in  ${where(p)}`) },
    type_sizes: { n: typeBands.length, samples: typeBands.slice(0, 5).map(b => `${b.band} "${b.head}": ${b.sizes.join(", ")} px`) },
    emoji: { n: emoji.length, samples: sample(emoji, ([c, e]) => `${c} in ${where(e)} "${text(e).slice(0, 30)}"`) },
    accent: { n: accent.length, samples: sample(accent, e => `${where(e)} "${text(e).slice(0, 30)}"`) },
    inline_colours: { n: inline.length, samples: sample(inline, e => `${where(e)}: ${(e.getAttribute("style") || "").slice(0, 60)}`) },
    pointer_no_role: { n: pointer.length, samples: sample(pointer, e => `${where(e)} "${text(e).slice(0, 30)}"`) },
    motion: { animated: animated.length, reduced_rules: reducedRules, unreadable_sheets: unreadable, samples: sample(animated, e => `${where(e)}: ${S(e).animationName}`) },
    empty_tall: { n: tall.length, samples: sample(tall, ([t, e, h, lh]) => `"${t}" in ${where(e)}: ${h} px tall, a line is ${lh}`) },
    broken_images: { n: broken.length, samples: broken.slice(0, 5) },
    palette: palette.size,
  });
})()
