"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const path_1 = __importDefault(require("path"));
function dependency() {
    const dependencies = [
        'styled-components',
        'react-query',
        'axios',
    ];
    const devDependencies = [
        '@types/react',
        '@types/styled-components',
        'typescript',
        'babel-plugin-module-resolver',
    ];
    mrm_core_1.install(dependencies, {
        yarn: true,
        dev: false
    });
    mrm_core_1.install(devDependencies, {
        yarn: true,
        dev: true
    });
}
function environment() {
    const files = [
        '.env.development',
        '.env.production',
        '.env.test',
    ];
    files.forEach((file) => {
        mrm_core_1.template(file, path_1.default.join(__dirname, 'templates', file))
            .apply()
            .save();
    });
}
function typescript() {
    const tsconfig = mrm_core_1.json('tsconfig.json');
    tsconfig.save();
}
function src() {
    const files = [
        'src/client/config/index.ts',
        'src/client/pages/home/index/index.tsx',
        'src/client/pages/home/index/styled.ts',
        'src/client/pages/layout/index.tsx',
        'src/client/pages/layout/styled.ts',
        'src/server/config/index.ts',
        'src/shared/typings/axios.d.ts',
        'Dockerfile',
        'scripts/check-yarn.js',
        'babel.config.js',
        'tsconfig.json',
    ];
    files.forEach((file) => {
        mrm_core_1.template(file, path_1.default.join(__dirname, 'templates', file))
            .apply()
            .save();
    });
    mrm_core_1.makeDirs([
        'src/client/utils',
        'src/server/utils',
    ]);
}
function script() {
    const pkg = mrm_core_1.packageJson();
    pkg
        .setScript('preinstall', 'node scripts/check-yarn.js')
        .save();
}
module.exports = function task({}) {
    dependency();
    environment();
    typescript();
    src();
    script();
};
module.exports.parameters = {};
module.exports.description = 'Mrm task for next.js';
