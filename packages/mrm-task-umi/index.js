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
    ];
    const devDependencies = [
        'cross-env',
        '@types/styled-components',
        // eslint
        'eslint',
        'eslint-plugin-import',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-react',
        'eslint-plugin-react-hooks',
        '@typescript-eslint/eslint-plugin',
        'eslint-config-airbnb-typescript',
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
        'src/pages/home/layout/index.tsx',
        'src/pages/home/layout/styled.ts',
        'src/pages/home/index/index.tsx',
        'src/pages/home/index/styled.ts',
        'src/hooks/index.ts',
        'src/routes.ts',
        'src/404.tsx',
        'src/document.ejs',
        'scripts/check-yarn.js',
        'Dockerfile',
        'typings.d.ts',
        '.eslintrc.js',
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
        '.umirc.dev.ts',
        '.umirc.prod.ts',
        '.umirc.ts',
    ];
    files.forEach((file) => {
        mrm_core_1.template(file, path_1.default.join(__dirname, 'templates', file))
            .apply()
            .save();
    });
}
function script() {
    const pkg = mrm_core_1.packageJson();
    pkg
        .setScript('preinstall', 'node scripts/check-yarn.js')
        .setScript('start', 'cross-env UMI_ENV=dev umi dev')
        .setScript('build:dev', 'cross-env UMI_ENV=dev umi build')
        .setScript('build:production', 'cross-env UMI_ENV=production umi build')
        .removeScript('build')
        .save();
}
module.exports = function task() {
    src();
    environment();
    dependency();
    script();
};
