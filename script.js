const benchmarkData = {
    execution: {
        title: "Execution time",
        description: "Lower is better. Equivalent implementations usually favor C++ when allocation pressure and native optimization matter.",
        unit: "ms",
        rows: [
            { label: "Order matching loop", cpp: 8.4, java: 12.1 },
            { label: "Image transform batch", cpp: 43, java: 66 },
            { label: "Physics step x1000", cpp: 13.8, java: 19.5 }
        ]
    },
    memory: {
        title: "Memory usage",
        description: "Lower is better. C++ often keeps working sets smaller because layouts can be denser and runtime overhead is lower.",
        unit: "MB",
        rows: [
            { label: "Market data cache", cpp: 92, java: 156 },
            { label: "1M entity simulation", cpp: 128, java: 214 },
            { label: "CLI tool steady-state", cpp: 18, java: 64 }
        ]
    },
    startup: {
        title: "Startup time",
        description: "Lower is better. Native binaries usually have a visible advantage for short-lived tools and cold starts.",
        unit: "ms",
        rows: [
            { label: "CLI utility cold boot", cpp: 17, java: 215 },
            { label: "REST worker cold boot", cpp: 41, java: 690 },
            { label: "Plugin helper process", cpp: 24, java: 312 }
        ]
    }
};

const recommendations = {
    "game-engine": {
        language: "C++",
        className: "recommendation-badge-cpp",
        title: "Choose C++ for a game engine",
        copy: "Native graphics APIs, tight memory control, and frame-time determinism make C++ the default fit for engine internals.",
        reasons: [
            "Direct access to rendering, platform, and input APIs.",
            "Custom allocators and contiguous data structures suit ECS and asset pipelines.",
            "GC pauses are far less acceptable in real-time rendering loops."
        ],
        tradeoff: "Trade-off: you gain control, but you also take on more responsibility for correctness, tooling, and memory safety."
    },
    embedded: {
        language: "C++",
        className: "recommendation-badge-cpp",
        title: "Choose C++ for an embedded system",
        copy: "Embedded targets reward small binaries, deterministic execution, and direct control over memory and hardware access.",
        reasons: [
            "RAM and flash budgets are usually too tight for a general-purpose managed runtime.",
            "Low-level register and device interaction fits native code naturally.",
            "Startup time and power constraints often require minimal runtime overhead."
        ],
        tradeoff: "Trade-off: embedded C++ demands discipline around safety, testing, and hardware-specific portability."
    },
    hft: {
        language: "C++",
        className: "recommendation-badge-cpp",
        title: "Choose C++ for high-frequency trading",
        copy: "When teams optimize for jitter and predictable tail latency, C++ offers the clearest path to controlling the full cost model.",
        reasons: [
            "Allocation and ownership can be engineered out of the hot path.",
            "CPU cache behavior and data layout can be tuned directly.",
            "GC-related pauses and runtime warm-up complexity are avoided."
        ],
        tradeoff: "Trade-off: development is harder, and correctness bugs in low-level code can be extremely costly."
    },
    "web-backend": {
        language: "Java",
        className: "recommendation-badge-java",
        title: "Choose Java for a web backend",
        copy: "For most enterprise and API-heavy services, Java's ecosystem, tooling, and team productivity usually outweigh the benefits of lower-level control.",
        reasons: [
            "Frameworks, observability tooling, and libraries are exceptionally mature.",
            "Managed memory reduces whole classes of ownership and lifetime bugs.",
            "Operational consistency matters more than squeezing out every millisecond."
        ],
        tradeoff: "Trade-off: if your service becomes extremely latency-sensitive or runtime-heavy, C++ may still be worth evaluating for specific components."
    },
    "desktop-tool": {
        language: "C++",
        className: "recommendation-badge-cpp",
        title: "Choose C++ for a desktop or CLI tool when startup matters",
        copy: "If the tool should feel instant, ship as a single native binary, and stay lean in memory, C++ is usually the better fit.",
        reasons: [
            "Cold-start times are typically much lower for native executables.",
            "Packaging is simple when you want a direct binary without a JVM dependency.",
            "Memory footprint stays lower for short-lived or utility-style tools."
        ],
        tradeoff: "Trade-off: if the tool grows into a large cross-platform business app, Java may become easier to maintain."
    }
};

function setupNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const links = document.querySelector(".nav-links");

    if (!toggle || !links) {
        return;
    }

    toggle.addEventListener("click", () => {
        const isOpen = links.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            links.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

function setupRevealAnimations() {
    const items = document.querySelectorAll(".reveal");

    if (!items.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -30px 0px"
        }
    );

    items.forEach((item) => observer.observe(item));
}

function setupScrollSpy() {
    const links = document.querySelectorAll(".nav-links a");
    const sections = Array.from(links)
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (!sections.length || !links.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const id = entry.target.id;
                links.forEach((link) => {
                    const isMatch = link.getAttribute("href") === `#${id}`;
                    link.classList.toggle("is-active", isMatch);
                });
            });
        },
        {
            threshold: 0.45
        }
    );

    sections.forEach((section) => observer.observe(section));
}

function formatValue(value, unit) {
    const display = Number.isInteger(value) ? value.toString() : value.toFixed(1);
    return `${display} ${unit}`;
}

function createChartRow(row, maxValue, unit) {
    const wrapper = document.createElement("article");
    wrapper.className = "chart-row";

    const cppWidth = `${(row.cpp / maxValue) * 100}%`;
    const javaWidth = `${(row.java / maxValue) * 100}%`;

    wrapper.innerHTML = `
        <div class="chart-row-label">
            <strong>${row.label}</strong>
            <span>${formatValue(row.cpp, unit)} vs ${formatValue(row.java, unit)}</span>
        </div>
        <div class="chart-bars">
            <div class="chart-bar-track">
                <div class="chart-bar-meta">
                    <span>C++</span>
                    <span>${formatValue(row.cpp, unit)}</span>
                </div>
                <div class="chart-bar">
                    <div class="chart-bar-fill cpp" data-width="${cppWidth}"></div>
                </div>
            </div>
            <div class="chart-bar-track">
                <div class="chart-bar-meta">
                    <span>Java</span>
                    <span>${formatValue(row.java, unit)}</span>
                </div>
                <div class="chart-bar">
                    <div class="chart-bar-fill java" data-width="${javaWidth}"></div>
                </div>
            </div>
        </div>
    `;

    return wrapper;
}

function setupBenchmarkChart() {
    const chartRoot = document.getElementById("benchmark-chart");
    const title = document.getElementById("benchmark-title");
    const description = document.getElementById("benchmark-description");
    const buttons = document.querySelectorAll(".metric-button");

    if (!chartRoot || !title || !description || !buttons.length) {
        return;
    }

    const render = (metricKey) => {
        const metric = benchmarkData[metricKey];

        if (!metric) {
            return;
        }

        title.textContent = metric.title;
        description.textContent = metric.description;
        chartRoot.innerHTML = "";

        const maxValue = Math.max(...metric.rows.flatMap((row) => [row.cpp, row.java]));
        metric.rows.forEach((row) => {
            chartRoot.appendChild(createChartRow(row, maxValue, metric.unit));
        });

        requestAnimationFrame(() => {
            chartRoot.querySelectorAll(".chart-bar-fill").forEach((bar) => {
                bar.style.width = bar.dataset.width;
            });
        });
    };

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const metricKey = button.dataset.metric;
            buttons.forEach((candidate) => {
                const active = candidate === button;
                candidate.classList.toggle("is-active", active);
                candidate.setAttribute("aria-pressed", String(active));
            });
            render(metricKey);
        });
    });

    render("execution");
}

function setupRecommendationTool() {
    const select = document.getElementById("use-case-select");
    const button = document.getElementById("run-selector");
    const output = document.getElementById("recommendation-output");

    if (!select || !button || !output) {
        return;
    }

    const render = (key) => {
        const choice = recommendations[key];

        if (!choice) {
            return;
        }

        const reasonItems = choice.reasons.map((reason) => `<li>${reason}</li>`).join("");

        output.innerHTML = `
            <p class="recommendation-label">Recommendation</p>
            <div class="recommendation-head">
                <span class="recommendation-badge ${choice.className}">${choice.language}</span>
                <h3>${choice.title}</h3>
            </div>
            <p class="recommendation-copy">${choice.copy}</p>
            <ul class="bullet-list">${reasonItems}</ul>
            <p class="recommendation-tradeoff">${choice.tradeoff}</p>
        `;
    };

    button.addEventListener("click", () => {
        render(select.value);
    });

    select.addEventListener("change", () => {
        render(select.value);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupRevealAnimations();
    setupScrollSpy();
    setupBenchmarkChart();
    setupRecommendationTool();
});
