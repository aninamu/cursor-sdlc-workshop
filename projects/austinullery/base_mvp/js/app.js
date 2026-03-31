import { createStubConnector } from "./connectors/contract.js";

const views = {
  dashboard: document.getElementById("view-dashboard"),
  energy: document.getElementById("view-energy"),
  security: document.getElementById("view-security"),
  climate: document.getElementById("view-climate"),
  assistant: document.getElementById("view-assistant"),
  settings: document.getElementById("view-settings"),
};

const navButtons = document.querySelectorAll("[data-nav]");

let demo = null;

function showView(name) {
  Object.entries(views).forEach(([key, el]) => {
    el.hidden = key !== name;
  });
  navButtons.forEach((btn) => {
    btn.setAttribute("aria-current", btn.dataset.nav === name ? "page" : "false");
  });
}

function renderDashboard() {
  const { moduleStatus, feed, assistantPrompts } = demo;
  document.getElementById("card-energy-summary").textContent = moduleStatus.energy.summary;
  document.getElementById("card-security-summary").textContent = moduleStatus.security.summary;
  document.getElementById("card-climate-summary").textContent = moduleStatus.climate.summary;

  const feedEl = document.getElementById("feed-list");
  feedEl.replaceChildren();
  feed.forEach((item) => {
    const li = document.createElement("li");
    const t = document.createElement("span");
    t.className = "feed-time";
    t.textContent = item.time;
    const m = document.createElement("span");
    m.textContent = item.text;
    li.append(t, " ", m);
    feedEl.append(li);
  });

  const chips = document.getElementById("dashboard-chips");
  chips.replaceChildren();
  assistantPrompts.forEach((text) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.textContent = text;
    b.addEventListener("click", () => {
      showView("assistant");
      sendAssistantMessage(text);
    });
    chips.append(b);
  });
}

function renderEnergyChart() {
  const series = demo.energy.dailyUsageByHourKwh;
  const peak = demo.energy.peakHour;
  const max = Math.max(...series, 0.001);
  const bars = document.getElementById("energy-bars");
  bars.replaceChildren();
  series.forEach((v, hour) => {
    const pct = (v / max) * 100;
    const wrap = document.createElement("div");
    wrap.className = "bar-wrap";
    wrap.title = `${hour}:00 — ${v.toFixed(2)} kWh (demo)`;
    const bar = document.createElement("div");
    bar.className = "bar" + (hour === peak ? " bar--peak" : "");
    bar.style.height = `${pct}%`;
    wrap.append(bar);
    bars.append(wrap);
  });
  document.getElementById("energy-insight").textContent = demo.energy.insight;
  document.getElementById("energy-total").textContent = String(demo.energy.totalKwhToday);
  document.getElementById("energy-peak-label").textContent = `${peak}:00–${peak + 1}:00`;
}

function renderPeakStrip() {
  const series = demo.energy.dailyUsageByHourKwh;
  const max = Math.max(...series, 0.001);
  const strip = document.getElementById("peak-strip");
  strip.replaceChildren();
  series.forEach((v, h) => {
    const cell = document.createElement("div");
    cell.className = "heatmap-cell";
    const intensity = v / max;
    cell.style.opacity = String(0.25 + intensity * 0.75);
    cell.title = `${h}:00`;
    strip.append(cell);
  });
}

const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");

function appendChat(role, text) {
  const row = document.createElement("div");
  row.className = `chat-msg chat-msg--${role}`;
  row.textContent = text;
  chatLog.append(row);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function answerAssistant(question) {
  const q = question.toLowerCase();
  const { energy, moduleStatus } = demo;

  if (q.includes("how much energy") || q.includes("energy today")) {
    return `Today’s demo total is about ${energy.totalKwhToday} kWh. That matches the number on the Energy view.`;
  }
  if (q.includes("peak") || q.includes("when")) {
    return `Peak usage in the demo data is around ${energy.peakHour}:00–${energy.peakHour + 1}:00 (${energy.insight})`;
  }
  if (q.includes("security") && q.includes("connect")) {
    return `Security would connect to cameras and motion sensors later. For now: "${moduleStatus.security.detail}"`;
  }
  if (q.includes("summarize") || q.includes("dashboard")) {
    return `Demo snapshot: Energy ${moduleStatus.energy.summary}; Security ${moduleStatus.security.summary}; Climate ${moduleStatus.climate.summary}. All placeholder.`;
  }
  return `I only have demo answers for a few prompts. Try the chips above, or ask about energy today, peak time, or security connections.`;
}

function sendAssistantMessage(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  appendChat("user", trimmed);
  appendChat("assistant", answerAssistant(trimmed));
}

function wireNav() {
  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => showView(btn.dataset.nav));
  });
  document.getElementById("form-chat").addEventListener("submit", (e) => {
    e.preventDefault();
    sendAssistantMessage(chatInput.value);
    chatInput.value = "";
  });
  document.querySelectorAll("[data-assistant-prompt]").forEach((btn) => {
    btn.addEventListener("click", () => sendAssistantMessage(btn.dataset.assistantPrompt));
  });
}

async function init() {
  createStubConnector();
  const res = await fetch("./data/demo.json");
  if (!res.ok) throw new Error("Could not load demo.json — use a local server (see README).");
  demo = await res.json();

  document.getElementById("demo-banner").textContent = demo.disclaimer;

  wireNav();
  renderDashboard();
  renderEnergyChart();
  renderPeakStrip();

  showView("dashboard");
  appendChat(
    "assistant",
    "Hi — I’m a Phase 1 stub. Ask about today’s demo energy, peak hours, or tap a suggested question."
  );
}

init().catch((err) => {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<p class="error-banner" role="alert">${err.message}</p>`
  );
});
