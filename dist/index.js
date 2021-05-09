"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
function checkYarn() {
    if (!/yarn\.js$/.test(process.env.npm_execpath || '')) {
        console.warn('\u001b[33mThis repository requires Yarn 1.x for scripts to work properly.\u001b[39m\n');
        process.exit(1);
    }
}
function createNextApp() {
    const packages = ['yarn', 'create', 'next-app'];
    mrm_core_1.install(packages);
}
function task() {
    checkYarn();
    createNextApp();
}
task.description = 'Mrm task for next.js';
module.exports = task;
