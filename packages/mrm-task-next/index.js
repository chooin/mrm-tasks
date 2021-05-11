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
        'axios',
    ];
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
        'src/client/configs/index.ts',
        'src/client/pages/home/index/index.tsx',
        'src/client/pages/home/index/styled.ts',
        'src/client/pages/layout/index.tsx',
        'src/client/pages/layout/styled.ts',
        'src/server/configs/index.ts',
        'src/shared/typings/axios.d.ts',
        'src/shared/utils/check-yarn.js',
        'Dockerfile',
    ];
    mrm_core_1.copyFiles(path_1.default.resolve(__dirname, 'templates'), files, { overwrite: false });
    mrm_core_1.makeDirs([
        'src/client/utils',
        'src/server/utils',
    ]);
}
function script() {
    const pkg = mrm_core_1.packageJson();
    pkg
        .setScript('preinstall', 'node ./scripts/check-yarn.js')
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
