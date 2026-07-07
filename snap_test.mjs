/**
 * FloatingChatButton snap direction test
 * Drags to left half → verifies left snap, then right half → right snap
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:4173/zh';
const MARGIN = 20;
const BTN = 56;
const VIEWPORT = { width: 390, height: 844 };

async function getBtnRect(page) {
  return page.evaluate(() => {
    const b = document.querySelector('button.fcb-btn');
    if (!b) return null;
    const r = b.getBoundingClientRect();
    return { left: r.left, top: r.top, right: r.right, bottom: r.bottom,
             cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
  });
}

async function getSavedSide(page) {
  return page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('fcb_pos_v2') ?? 'null')?.side ?? null; }
    catch { return null; }
  });
}

async function drag(page, fromX, fromY, toX, toY) {
  await page.mouse.move(fromX, fromY);
  await page.mouse.down();
  const STEPS = 15;
  for (let i = 1; i <= STEPS; i++) {
    const x = fromX + (toX - fromX) * (i / STEPS);
    const y = fromY + (toY - fromY) * (i / STEPS);
    await page.mouse.move(x, y);
    await page.waitForTimeout(8);
  }
  await page.mouse.up();
  await page.waitForTimeout(700); // wait for snap animation
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({
    viewport: VIEWPORT,
    hasTouch: false,
  });
  const page = await ctx.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('  [browser error]', msg.text());
  });

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Scroll to #categories to trigger IntersectionObserver → show button
  await page.evaluate(() => {
    const el = document.getElementById('categories');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(600);

  const btn = page.locator('button.fcb-btn');
  await btn.waitFor({ state: 'attached', timeout: 5000 });
  await page.waitForTimeout(300);

  // Debug: check button state
  const initialState = await page.evaluate(() => {
    const b = document.querySelector('button.fcb-btn');
    if (!b) return { found: false };
    const r = b.getBoundingClientRect();
    const wrapper = b.parentElement;
    return {
      found: true,
      rect: { left: Math.round(r.left), top: Math.round(r.top), w: Math.round(r.width) },
      wrapperOpacity: wrapper?.style.opacity,
      wrapperPointerEvents: wrapper?.style.pointerEvents,
    };
  });
  console.log('Initial button state:', JSON.stringify(initialState));

  // If button wrapper still has opacity=0, scroll a bit more
  if (initialState.wrapperOpacity === '0' || initialState.wrapperPointerEvents === 'none') {
    console.log('Button not shown yet, scrolling further...');
    await page.evaluate(() => window.scrollBy(0, 400));
    await page.waitForTimeout(500);
  }

  // ── TEST 1: drag to LEFT quarter ──────────────────────────────────────
  console.log('\n[TEST 1] Drag to left quarter → expect LEFT snap');
  {
    const rect = await getBtnRect(page);
    if (!rect) { console.log('  ❌ Button not found'); } else {
      console.log(`  Button at: left=${rect.left.toFixed(0)}, top=${rect.top.toFixed(0)}, cx=${rect.cx.toFixed(0)}`);

      const targetX = Math.round(VIEWPORT.width * 0.25);
      const targetY = rect.cy;

      console.log(`  Dragging from (${Math.round(rect.cx)}, ${Math.round(rect.cy)}) to (${targetX}, ${Math.round(targetY)})`);
      await drag(page, rect.cx, rect.cy, targetX, targetY);

      const newRect = await getBtnRect(page);
      const savedSide = await getSavedSide(page);
      const snappedLeft = newRect && newRect.left <= MARGIN + 5;

      console.log(`  After snap: left=${newRect?.left.toFixed(0) ?? 'N/A'} (expected ≈${MARGIN})`);
      console.log(`  Saved side: '${savedSide}' (expected 'left')`);
      console.log(`  LEFT snap position: ${snappedLeft ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`  localStorage side:  ${savedSide === 'left' ? '✅ PASS' : '❌ FAIL'}`);
    }
  }

  // ── TEST 2: drag to RIGHT quarter ─────────────────────────────────────
  console.log('\n[TEST 2] Drag to right quarter → expect RIGHT snap');
  {
    const rect = await getBtnRect(page);
    if (!rect) { console.log('  ❌ Button not found'); } else {
      console.log(`  Button at: left=${rect.left.toFixed(0)}, cx=${rect.cx.toFixed(0)}`);

      const targetX = Math.round(VIEWPORT.width * 0.75);
      const targetY = rect.cy;
      const expectedRight = VIEWPORT.width - BTN - MARGIN;

      console.log(`  Dragging from (${Math.round(rect.cx)}, ${Math.round(rect.cy)}) to (${targetX}, ${Math.round(targetY)})`);
      await drag(page, rect.cx, rect.cy, targetX, targetY);

      const newRect = await getBtnRect(page);
      const savedSide = await getSavedSide(page);
      const snappedRight = newRect && Math.abs(newRect.left - expectedRight) <= 5;

      console.log(`  After snap: left=${newRect?.left.toFixed(0) ?? 'N/A'} (expected ≈${expectedRight})`);
      console.log(`  Saved side: '${savedSide}' (expected 'right')`);
      console.log(`  RIGHT snap position: ${snappedRight ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`  localStorage side:   ${savedSide === 'right' ? '✅ PASS' : '❌ FAIL'}`);
    }
  }

  await browser.close();
  console.log('\nDone.');
})();
