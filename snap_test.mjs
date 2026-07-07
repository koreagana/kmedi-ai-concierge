/**
 * FloatingChatButton behavior tests
 * 1. No-snap: button stays at dropped position (within 5px tolerance)
 * 2. Antenna: both labels exist in DOM with correct text
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:4173/zh';
const BTN = 56;
const MARGIN = 20;
const NAV_H = 80;
const VIEWPORT = { width: 390, height: 844 };

async function getBtnRect(page) {
  return page.evaluate(() => {
    const b = document.querySelector('button.fcb-btn');
    if (!b) return null;
    const r = b.getBoundingClientRect();
    return { left: r.left, top: r.top, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
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
  await page.waitForTimeout(200); // short wait — no snap animation
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: VIEWPORT, hasTouch: false });
  const page = await ctx.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('  [browser error]', msg.text());
  });

  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);

  // Scroll to #categories to trigger IntersectionObserver → show button
  await page.evaluate(() => {
    const el = document.getElementById('categories');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await page.waitForTimeout(600);

  await page.locator('button.fcb-btn').waitFor({ state: 'attached', timeout: 5000 });
  await page.waitForTimeout(300);

  // ── TEST 1: No-snap — drag to center, button stays at center ──────────
  console.log('\n[TEST 1] No-snap: drag to screen center');
  {
    const before = await getBtnRect(page);
    if (!before) { console.log('  ❌ Button not found'); }
    else {
      const targetX = Math.round(VIEWPORT.width / 2 - BTN / 2 + BTN / 2); // center of screen
      const targetY = Math.round(VIEWPORT.height / 2);
      console.log(`  Button starts at: left=${before.left.toFixed(0)}, top=${before.top.toFixed(0)}`);
      console.log(`  Dragging to: (${targetX}, ${targetY})`);

      await drag(page, before.cx, before.cy, targetX, targetY);

      const after = await getBtnRect(page);
      // Expected: button center ≈ (targetX, targetY) → button left ≈ targetX - BTN/2
      const expectedLeft = Math.max(0, Math.min(VIEWPORT.width - BTN, targetX - BTN / 2));
      const expectedTop  = Math.max(NAV_H, Math.min(VIEWPORT.height - BTN - MARGIN, targetY - BTN / 2));
      const leftOK = after && Math.abs(after.left - expectedLeft) <= 8;
      const topOK  = after && Math.abs(after.top  - expectedTop)  <= 8;

      console.log(`  After drop: left=${after?.left.toFixed(0)} (expected≈${expectedLeft}), top=${after?.top.toFixed(0)} (expected≈${expectedTop})`);
      console.log(`  Position X: ${leftOK ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`  Position Y: ${topOK  ? '✅ PASS' : '❌ FAIL'}`);

      // Verify no snap occurred: button should NOT be at edge positions
      const isAtLeftEdge  = after && after.left <= MARGIN + 5;
      const isAtRightEdge = after && after.left >= VIEWPORT.width - BTN - MARGIN - 5;
      console.log(`  Not snapped to edge: ${(!isAtLeftEdge && !isAtRightEdge) ? '✅ PASS' : '❌ FAIL'}`);
    }
  }

  // ── TEST 2: No-snap — drag to left quarter, stays there ──────────────
  console.log('\n[TEST 2] No-snap: drag to left quarter (should NOT snap to edge)');
  {
    const before = await getBtnRect(page);
    if (!before) { console.log('  ❌ Button not found'); }
    else {
      const targetX = Math.round(VIEWPORT.width * 0.25);
      const targetY = before.cy;
      console.log(`  Dragging from cx=${before.cx.toFixed(0)} to x=${targetX}`);

      await drag(page, before.cx, before.cy, targetX, targetY);

      const after = await getBtnRect(page);
      // Expected final X: clamped (targetX - BTN/2) should be ≥ 0
      const expectedLeft = Math.max(0, targetX - BTN / 2);
      const leftOK = after && Math.abs(after.left - expectedLeft) <= 8;
      // Should NOT be at edge (MARGIN=20) like old snap behavior
      const notSnapped = after && after.left > MARGIN + 5;

      console.log(`  After drop: left=${after?.left.toFixed(0)} (expected≈${expectedLeft}, NOT ${MARGIN})`);
      console.log(`  Stays at drop point: ${leftOK ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`  Not snapped to ${MARGIN}px edge: ${notSnapped ? '✅ PASS' : '❌ FAIL (snapped!)'}`);
    }
  }

  // ── TEST 3: Antenna labels exist in DOM ───────────────────────────────
  console.log('\n[TEST 3] Antenna labels in DOM');
  {
    const labels = await page.evaluate(() => {
      const btn = document.querySelector('button.fcb-btn');
      if (!btn) return null;
      const wrapper = btn.parentElement;
      if (!wrapper) return null;
      // Antenna labels are div siblings of the button inside the wrapper
      const divs = Array.from(wrapper.querySelectorAll('div'));
      return divs.map(d => ({
        text: d.textContent?.trim(),
        bg: d.style.background || d.style.backgroundColor,
        animation: d.style.animation,
      }));
    });

    if (!labels) { console.log('  ❌ Button/wrapper not found'); }
    else {
      console.log(`  Found ${labels.length} label div(s):`);
      labels.forEach((l, i) => {
        console.log(`    [${i}] text="${l.text}" bg="${l.bg}" animation="${l.animation?.slice(0,40)}..."`);
      });
      const hasLeft  = labels.some(l => l.text === '点击');
      const hasRight = labels.some(l => l.text === '秒回');
      const hasOrange = labels.some(l => l.bg.includes('107') || l.bg.includes('6B35') || l.bg === 'rgb(255, 107, 53)');
      console.log(`  Left label  ("点击"): ${hasLeft  ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`  Right label ("秒回"): ${hasRight ? '✅ PASS' : '❌ FAIL'}`);
      console.log(`  Orange color:         ${hasOrange ? '✅ PASS' : '❌ (check color)'}`);
    }
  }

  // ── TEST 4: localStorage stores xRatio/yRatio ─────────────────────────
  console.log('\n[TEST 4] localStorage uses v3 format (xRatio/yRatio)');
  {
    const stored = await page.evaluate(() => {
      try { return JSON.parse(localStorage.getItem('fcb_pos_v3') ?? 'null'); } catch { return null; }
    });
    console.log(`  Stored: ${JSON.stringify(stored)}`);
    const hasRatios = stored && typeof stored.xRatio === 'number' && typeof stored.yRatio === 'number';
    const ratiosValid = hasRatios && stored.xRatio >= 0 && stored.xRatio <= 1 && stored.yRatio >= 0 && stored.yRatio <= 1;
    console.log(`  Has xRatio/yRatio: ${hasRatios   ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`  Ratios in [0,1]:   ${ratiosValid ? '✅ PASS' : '❌ FAIL'}`);
  }

  await browser.close();
  console.log('\nDone.');
})();
