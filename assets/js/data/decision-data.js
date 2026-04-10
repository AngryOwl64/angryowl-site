export const useCaseRecommendations = {
    "game-engine": {
        language: "C++",
        title: "Choose C++ for a game engine",
        summary: "Engine internals care about frame pacing, graphics APIs, memory arenas, and deterministic performance under pressure.",
        reasons: [
            "Direct rendering and platform integration are standard native tasks.",
            "Custom allocators and contiguous ECS-style storage fit C++ naturally.",
            "GC jitter is a poor match for real-time render loops."
        ],
        tradeoff: "Trade-off: more control means more responsibility for tooling, correctness, and memory discipline."
    },
    embedded: {
        language: "C++",
        title: "Choose C++ for an embedded system",
        summary: "Constrained memory, small binaries, fast boot, and hardware access all push toward native code.",
        reasons: [
            "Many embedded targets cannot afford a general-purpose managed runtime.",
            "Register-level and device-level interaction fits native languages better.",
            "Binary size and startup budget are usually stricter than business apps."
        ],
        tradeoff: "Trade-off: embedded C++ requires careful testing and defensive engineering."
    },
    hft: {
        language: "C++",
        title: "Choose C++ for high-frequency trading",
        summary: "The main concern is predictable tail latency and hardware-efficient data handling, not framework comfort.",
        reasons: [
            "Allocation behavior can be engineered out of hot paths.",
            "Cache locality and branch behavior can be tuned more directly.",
            "Teams can avoid managed-runtime pauses in the most sensitive path."
        ],
        tradeoff: "Trade-off: the engineering difficulty and correctness burden are both high."
    },
    "web-backend": {
        language: "Java",
        title: "Choose Java for a web backend",
        summary: "Most business backends benefit more from ecosystem maturity, observability, and developer throughput than from bare-metal control.",
        reasons: [
            "Frameworks and libraries for services are exceptionally mature.",
            "Managed memory removes ownership complexity from everyday work.",
            "Operational consistency and hiring are easier in the JVM ecosystem."
        ],
        tradeoff: "Trade-off: extreme latency-sensitive subcomponents may still be worth implementing in C++."
    },
    "desktop-tool": {
        language: "C++",
        title: "Choose C++ for a desktop or CLI tool when startup matters",
        summary: "Native tools feel instant, package cleanly, and often stay much leaner in memory.",
        reasons: [
            "Cold-start behavior is usually much better than a JVM-based utility.",
            "You can ship a direct executable without a runtime dependency.",
            "Short-lived processes make startup cost impossible to hide."
        ],
        tradeoff: "Trade-off: larger business-oriented desktop apps may still be easier to maintain in Java."
    }
};
