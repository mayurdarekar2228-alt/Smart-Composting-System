"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
    }
  });
}

const mechanismDemo = document.querySelector("#mechanism-demo");
const mechanismToggle = document.querySelector(".mechanism-toggle");

if (mechanismDemo && mechanismToggle) {
  mechanismToggle.addEventListener("click", () => {
    const isRunning = mechanismToggle.getAttribute("aria-pressed") !== "true";
    mechanismToggle.setAttribute("aria-pressed", String(isRunning));
    mechanismDemo.classList.toggle("is-running", isRunning);
    mechanismToggle.firstChild.textContent = isRunning ? "Stop rotation " : "Rotate bucket ";
  });
}

const bgCanvas = document.querySelector(".bg-animation");

if (bgCanvas instanceof HTMLCanvasElement) {
  const ctx = bgCanvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (ctx) {
    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];
    let rings = [];
    let rafId = 0;
    let lastTime = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    const createScene = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      bgCanvas.width = Math.round(width * dpr);
      bgCanvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(18, Math.min(44, Math.round((width * height) / 36000)));
      nodes = Array.from({ length: count }, (_, idx) => {
        const isOrange = idx % 3 === 0;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: -0.12 - Math.random() * 0.22,
          r: 1.4 + Math.random() * 2.1,
          color: isOrange ? "241, 138, 53" : "131, 185, 138",
          alpha: isOrange ? 0.28 : 0.24,
        };
      });

      rings = [
        { x: width * 0.82, y: height * 0.28, r: Math.min(width, height) * 0.22, speed: 0.00028, angle: 0, dash: [6, 12], color: "131, 185, 138", alpha: 0.14 },
        { x: width * 0.82, y: height * 0.28, r: Math.min(width, height) * 0.15, speed: -0.00042, angle: 1.1, dash: [3, 9], color: "241, 138, 53", alpha: 0.14 },
        { x: width * 0.14, y: height * 0.78, r: Math.min(width, height) * 0.18, speed: 0.00022, angle: 0.5, dash: [8, 16], color: "131, 185, 138", alpha: 0.1 },
      ];
    };

    const drawFrame = (dt) => {
      ctx.clearRect(0, 0, width, height);

      for (const ring of rings) {
        ring.angle += ring.speed * 16 * dt;
        ctx.save();
        ctx.translate(ring.x, ring.y);
        ctx.rotate(ring.angle);
        ctx.setLineDash(ring.dash);
        ctx.strokeStyle = `rgba(${ring.color}, ${ring.alpha})`;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.arc(0, 0, ring.r, 0, Math.PI * 1.65);
        ctx.stroke();
        ctx.restore();
      }

      const linkDist = Math.min(155, Math.max(95, width * 0.11));
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx * dt;
        a.y += a.vy * dt;

        if (pointer.active) {
          const dx = a.x - pointer.x;
          const dy = a.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > 1 && distSq < 16900) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / 130) * 0.35 * dt;
            a.x += (dx / dist) * force;
            a.y += (dy / dist) * force;
          }
        }

        if (a.x < -12) a.x = width + 12;
        if (a.x > width + 12) a.x = -12;
        if (a.y < -12) a.y = height + 12;
        if (a.y > height + 12) a.y = -12;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const lineAlpha = (1 - dist / linkDist) * 0.14;
            ctx.strokeStyle = `rgba(131, 185, 138, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `rgba(${a.color}, ${a.alpha})`;
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const stopLoop = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
      lastTime = 0;
    };

    const startLoop = () => {
      if (reducedMotion.matches || document.hidden || rafId) return;
      const tick = (now) => {
        const dt = lastTime ? Math.min(now - lastTime, 50) / 16.67 : 1;
        lastTime = now;
        drawFrame(dt);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };

    createScene();
    if (!reducedMotion.matches) startLoop();

    window.addEventListener("resize", createScene);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopLoop();
      else startLoop();
    });
    reducedMotion.addEventListener("change", (event) => {
      if (event.matches) {
        stopLoop();
        ctx.clearRect(0, 0, width, height);
      } else {
        startLoop();
      }
    });
    window.addEventListener("pointermove", (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
    }, { passive: true });
    window.addEventListener("pointerleave", () => {
      pointer.active = false;
    });
  }
}
