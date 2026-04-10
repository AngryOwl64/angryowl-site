export const benchmarkProfiles = {
    steady: {
        label: "Steady load",
        description: "Lower is better. Native code usually keeps a lead when the workload is continuous and allocation patterns stay controlled.",
        metrics: {
            execution: {
                unit: "ms",
                rows: [
                    { label: "Order matching loop", cpp: 8.4, java: 12.1 },
                    { label: "Image transform batch", cpp: 43, java: 66 },
                    { label: "Physics step x1000", cpp: 13.8, java: 19.5 }
                ]
            },
            memory: {
                unit: "MB",
                rows: [
                    { label: "Market data cache", cpp: 92, java: 156 },
                    { label: "1M entity simulation", cpp: 128, java: 214 },
                    { label: "CLI tool steady-state", cpp: 18, java: 64 }
                ]
            },
            startup: {
                unit: "ms",
                rows: [
                    { label: "CLI utility cold boot", cpp: 17, java: 215 },
                    { label: "Plugin helper process", cpp: 24, java: 312 },
                    { label: "Native service worker", cpp: 41, java: 690 }
                ]
            }
        },
        latency: [
            { label: "p95 request latency", cpp: 2.3, java: 4.8 },
            { label: "p99 request latency", cpp: 3.6, java: 8.9 },
            { label: "worst observed spike", cpp: 6.1, java: 22.4 }
        ]
    },
    bursty: {
        label: "Burst load",
        description: "Lower is better. Bursty allocation and traffic patterns tend to exaggerate the differences in jitter and memory behavior.",
        metrics: {
            execution: {
                unit: "ms",
                rows: [
                    { label: "Order book burst", cpp: 9.8, java: 16.9 },
                    { label: "Telemetry parse burst", cpp: 56, java: 89 },
                    { label: "Asset import spike", cpp: 74, java: 118 }
                ]
            },
            memory: {
                unit: "MB",
                rows: [
                    { label: "Burst event cache", cpp: 104, java: 194 },
                    { label: "Transient object storm", cpp: 146, java: 268 },
                    { label: "Tooling helper process", cpp: 20, java: 72 }
                ]
            },
            startup: {
                unit: "ms",
                rows: [
                    { label: "Burst worker cold boot", cpp: 26, java: 340 },
                    { label: "Scheduler helper launch", cpp: 18, java: 251 },
                    { label: "Realtime plugin start", cpp: 29, java: 402 }
                ]
            }
        },
        latency: [
            { label: "p95 request latency", cpp: 3.1, java: 7.9 },
            { label: "p99 request latency", cpp: 4.8, java: 15.7 },
            { label: "worst observed spike", cpp: 8.6, java: 41.3 }
        ]
    },
    cold: {
        label: "Cold start",
        description: "Lower is better. When processes start frequently, native boot time and runtime footprint become impossible to ignore.",
        metrics: {
            execution: {
                unit: "ms",
                rows: [
                    { label: "Short-lived file scan", cpp: 22, java: 181 },
                    { label: "CLI config transform", cpp: 18, java: 144 },
                    { label: "One-shot plugin command", cpp: 27, java: 233 }
                ]
            },
            memory: {
                unit: "MB",
                rows: [
                    { label: "Initial process image", cpp: 14, java: 57 },
                    { label: "Peak during launch", cpp: 28, java: 96 },
                    { label: "Idle after boot", cpp: 16, java: 61 }
                ]
            },
            startup: {
                unit: "ms",
                rows: [
                    { label: "Cold CLI launch", cpp: 15, java: 198 },
                    { label: "API worker cold launch", cpp: 43, java: 712 },
                    { label: "GUI helper launch", cpp: 35, java: 480 }
                ]
            }
        },
        latency: [
            { label: "time to first response", cpp: 17, java: 210 },
            { label: "time to warm path", cpp: 31, java: 340 },
            { label: "max cold-start stall", cpp: 48, java: 790 }
        ]
    }
};
