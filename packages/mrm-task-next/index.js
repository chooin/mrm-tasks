"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const path_1 = __importDefault(require("path"));
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
        '.env.development',
        '.env.production',
        '.env.test',
    ];
    files.forEach((file) => {
        mrm_core_1.template(file, path_1.default.join(__dirname, 'templates/.env'))
            .apply({})
            .save();
    });
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
