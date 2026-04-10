import { initSiteChrome } from "../core/site.js";
import { useCaseRecommendations } from "../data/decision-data.js";

initSiteChrome();

const recommendationOutput = document.getElementById("recommendation-output");
const weightedOutput = document.getElementById("weighted-output");
const pressureOutput = document.getElementById("pressure-output");
const useCaseSelect = document.getElementById("use-case-select");
const pressureSlider = document.getElementById("pressure-slider");

document.getElementById("run-selector").addEventListener("click", () => {
    renderRecommendation(useCaseSelect.value);
});

document.getElementById("run-weighted").addEventListener("click", renderWeightedDecision);
pressureSlider.addEventListener("input", renderPressureSimulation);

function renderRecommendation(key) {
    const entry = useCaseRecommendations[key];
    if (!entry) {
        return;
    }

    const reasonList = entry.reasons.map((reason) => `<li>${reason}</li>`).join("");
    recommendationOutput.innerHTML = `
        <div class="result-block">
            <div class="result-title">${entry.language}</div>
            <strong>${entry.title}</strong>
            <p>${entry.summary}</p>
            <ul class="result-list">${reasonList}</ul>
            <p>${entry.tradeoff}</p>
        </div>
    `;
}

function renderWeightedDecision() {
    const latency = Number(document.getElementById("weight-latency").value);
    const productivity = Number(document.getElementById("weight-productivity").value);
    const footprint = Number(document.getElementById("weight-footprint").value);
    const ecosystem = Number(document.getElementById("weight-ecosystem").value);

    const cppScore = latency * 1.4 + footprint * 1.2 + ecosystem * 0.3 + productivity * 0.2;
    const javaScore = productivity * 1.4 + ecosystem * 1.3 + latency * 0.5 + footprint * 0.4;
    const winner = cppScore >= javaScore ? "C++" : "Java";

    weightedOutput.innerHTML = `
        <div class="result-block">
            <div class="result-title">${winner}</div>
            <strong>Weighted decision summary</strong>
            <p>C++ score: ${cppScore.toFixed(1)}</p>
            <p>Java score: ${javaScore.toFixed(1)}</p>
            <p>${winner === "C++"
                ? "Your priorities emphasize latency and memory behavior strongly enough that native control wins."
                : "Your priorities emphasize productivity and ecosystem leverage strongly enough that Java wins."}</p>
        </div>
    `;
}

function renderPressureSimulation() {
    const pressure = Number(pressureSlider.value);
    const cppP99 = 4 + pressure * 0.08;
    const javaP99 = 6 + pressure * 0.22;
    const cppHitchRisk = Math.min(100, 12 + pressure * 0.55);
    const javaHitchRisk = Math.min(100, 20 + pressure * 0.95);

    pressureOutput.innerHTML = `
        <div class="result-block">
            <div class="result-title">PRESSURE = ${pressure}</div>
            <div class="sim-grid">
                <div class="sim-row">
                    <strong>C++ simulated p99:</strong> ${cppP99.toFixed(1)} ms
                    <div class="sim-bar"><div class="sim-bar-fill cpp" style="width:${cppHitchRisk}%"></div></div>
                </div>
                <div class="sim-row">
                    <strong>Java simulated p99:</strong> ${javaP99.toFixed(1)} ms
                    <div class="sim-bar"><div class="sim-bar-fill java" style="width:${javaHitchRisk}%"></div></div>
                </div>
            </div>
            <p>Interpretation: as transient allocation pressure rises, managed runtimes usually need more discipline to avoid visible jitter.</p>
        </div>
    `;
}

renderRecommendation(useCaseSelect.value);
renderWeightedDecision();
renderPressureSimulation();
