import { initSiteChrome, rotateMessages, startClock } from "../core/site.js";

initSiteChrome();
startClock();
rotateMessages(".js-rotating-status", [
    "Reminder: average speed is not the same as predictable latency.",
    "Reminder: Java is not bad, it just optimizes for different constraints.",
    "Reminder: the ugly design is intentional, the engineering claims should not be.",
    "Reminder: choose the cost model that matches the workload."
]);
