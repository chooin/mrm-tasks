"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const path_1 = __importDefault(require("path"));
function dependency() {
    const unDependencies = [
        'react',
        'react-dom',
    ];
    mrm_core_1.uninstall(unDependencies, {
        yarn: true,
    });
    const dependencies = [
        'react',
        'react-dom',
        '@umijs/hooks',
        'query-string',
        'styled-components',
        'antd-mobile',
        'dayjs',
        'axios',
    ];
    const devDependencies = [
        'cross-env',
        '@types/styled-components',
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
function src() {
    mrm_core_1.deleteFiles([
        'src/pages/index.tsx',
        'src/pages/index.less',
    ]);
    const files = [
        'src/pages/home/index/index.tsx',
        'src/pages/home/index/styled.ts',
        'src/404.tsx',
        'src/document.ejs',
        'src/vendor/axios.ts',
        'scripts/check-yarn.js',
        'routes.ts',
        'app.tsx',
        '.dockerignore',
        'Dockerfile',
    ];
    files.forEach((file) => {
        mrm_core_1.template(file, path_1.default.join(__dirname, 'templates', file))
            .apply()
            .save();
    });
    mrm_core_1.makeDirs([
        'src/services',
        'src/components',
    ]);
}
function environment() {
    const files = [
        '.umirc.development.ts',
        '.umirc.production.ts',
        '.umirc.ts',
    ];
    files.forEach((file) => {
        mrm_core_1.template(file, path_1.default.join(__dirname, 'templates', file))
            .apply()
            .save();
    });
    mrm_core_1.lines('typings.d.ts')
        .add('declare const API_URL: string;')
        .save();
}
function script() {
    const pkg = mrm_core_1.packageJson();
    pkg
        .setScript('preinstall', 'node scripts/check-yarn.js')
        .setScript('start', 'cross-env UMI_ENV=development umi dev')
        .setScript('build:development', 'cross-env UMI_ENV=development umi build')
        .setScript('build:production', 'cross-env UMI_ENV=production umi build')
        .removeScript('build')
        .save();
}
module.exports = function task() {
    environment();
    dependency();
    script();
    src();
};
