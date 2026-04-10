import { initSiteChrome, rotateMessages, startClock } from "../core/site.js";

initSiteChrome();
startClock();
rotateMessages(".js-rotating-status", [
    "Reminder: average speed is not the same as predictable latency.",
    "Reminder: Java is not bad, it just optimizes for different constraints.",
    "Reminder: choose the cost model that matches the workload.",
    "Reminder: malloc is not a design philosophy.",
    "Reminder: a clean benchmark is more useful than a loud opinion."
]);
