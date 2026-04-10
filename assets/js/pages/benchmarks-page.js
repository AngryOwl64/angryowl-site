import { initSiteChrome } from "../core/site.js";
import { benchmarkProfiles } from "../data/benchmark-data.js";

initSiteChrome();

const chartRoot = document.getElementById("benchmark-chart");
const tableBody = document.querySelector("#benchmark-table tbody");
const profileTitle = document.getElementById("profile-title");
const metricDescription = document.getElementById("metric-description");
const latencyStrip = document.getElementById("latency-strip");
const profileButtons = document.querySelectorAll("[data-profile]");
const metricButtons = document.querySelectorAll("[data-metric]");

let currentProfile = "steady";
let currentMetric = "execution";

function formatValue(value, unit) {
    const fixed = Number.isInteger(value) ? value.toString() : value.toFixed(1);
    return `${fixed} ${unit}`;
}

function render() {
    const profile = benchmarkProfiles[currentProfile];
    const metric = profile.metrics[currentMetric];
    const maxValue = Math.max(...metric.rows.flatMap((row) => [row.cpp, row.java]));

    profileTitle.textContent = profile.label;
    metricDescription.textContent = profile.description;
    chartRoot.innerHTML = "";
    tableBody.innerHTML = "";
    latencyStrip.innerHTML = "";

    metric.rows.forEach((row) => {
        const card = document.createElement("article");
        card.className = "chart-card";
        card.innerHTML = `
            <div class="bar-label-row">
                <strong>${row.label}</strong>
                <span>${formatValue(row.cpp, metric.unit)} vs ${formatValue(row.java, metric.unit)}</span>
            </div>
            <div class="bar-group">
                <div class="bar-label-row"><span>C++</span><span>${formatValue(row.cpp, metric.unit)}</span></div>
                <div class="bar-track"><div class="bar-fill cpp" data-width="${(row.cpp / maxValue) * 100}%"></div></div>
            </div>
            <div class="bar-group">
                <div class="bar-label-row"><span>Java</span><span>${formatValue(row.java, metric.unit)}</span></div>
                <div class="bar-track"><div class="bar-fill java" data-width="${(row.java / maxValue) * 100}%"></div></div>
            </div>
        `;
        chartRoot.appendChild(card);

        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${row.label}</td>
            <td>${formatValue(row.cpp, metric.unit)}</td>
            <td>${formatValue(row.java, metric.unit)}</td>
        `;
        tableBody.appendChild(tableRow);
    });

    const maxLatency = Math.max(...profile.latency.flatMap((row) => [row.cpp, row.java]));
    profile.latency.forEach((row) => {
        const block = document.createElement("article");
        block.className = "latency-row";
        block.innerHTML = `
            <div class="bar-label-row"><strong>${row.label}</strong><span>${row.cpp} / ${row.java}</span></div>
            <div class="bar-group">
                <div class="bar-label-row"><span>C++</span><span>${row.cpp} ms</span></div>
                <div class="latency-meter"><div class="latency-fill cpp" data-width="${(row.cpp / maxLatency) * 100}%"></div></div>
            </div>
            <div class="bar-group">
                <div class="bar-label-row"><span>Java</span><span>${row.java} ms</span></div>
                <div class="latency-meter"><div class="latency-fill java" data-width="${(row.java / maxLatency) * 100}%"></div></div>
            </div>
        `;
        latencyStrip.appendChild(block);
    });

    requestAnimationFrame(() => {
        document.querySelectorAll("[data-width]").forEach((bar) => {
            bar.style.width = bar.dataset.width;
        });
    });
}

profileButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentProfile = button.dataset.profile;
        profileButtons.forEach((candidate) => {
            candidate.classList.toggle("is-active", candidate === button);
        });
        render();
    });
});

metricButtons.forEach((button) => {
    button.addEventListener("click", () => {
        currentMetric = button.dataset.metric;
        metricButtons.forEach((candidate) => {
            candidate.classList.toggle("is-active", candidate === button);
        });
        render();
    });
});

render();
