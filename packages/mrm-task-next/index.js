"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const dependencies = [
    'styled-components'
];
function installDependencies() {
    mrm_core_1.install(dependencies, {
        yarn: true,
        dev: false
    });
}
function environment() {
    const files = [
        'templates/environment/.env.development',
        'templates/environment/.env.production',
        'templates/environment/.env.test',
    ];
    mrm_core_1.copyFiles(__dirname, files);
}
function typescript() {
    const tsconfig = mrm_core_1.json('tsconfig.json');
    tsconfig.save();
}
function next() {
}
module.exports = function task({}) {
    installDependencies();
    environment();
    typescript();
    next();
};
module.exports.parameters = {};
module.exports.description = 'Mrm task for next.js';
