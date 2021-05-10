"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const path_1 = __importDefault(require("path"));
function dependency() {
    const dependencies = [
        '@react-navigation/native',
        '@react-navigation/stack',
        'react-native-gesture-handler',
        'react-native-reanimated',
        'react-native-safe-area-context',
        'react-native-screens',
        'react-native-lifecycle',
        'styled-components',
        'axios',
    ];
    const devDependencies = [
        'typescript'
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
function typescript() {
    const tsconfig = mrm_core_1.json('tsconfig.json');
    tsconfig
        .merge({
        compilerOptions: {
            jsx: 'react',
            experimentalDecorators: true,
            allowJs: true,
            esModuleInterop: true,
            baseUrl: '.',
            paths: {
                '@/*': ['./src/*']
            }
        },
        include: ['src/**/*'],
        exclude: ['node_modules', 'ios', 'android']
    })
        .save();
}
function src() {
    const files = [
        'src/pages/home/index/index.tsx',
        'src/pages/home/index/styled.ts',
        'src/routes/index.tsx',
        'src/routes/routes.tsx',
    ];
    mrm_core_1.makeDirs([
        'src/pages/home/index',
        'src/routes',
    ]);
    mrm_core_1.copyFiles(path_1.default.resolve(__dirname, 'templates'), files, { overwrite: false });
}
function script() {
    const pkg = mrm_core_1.packageJson();
    pkg
        .setScript('install', 'npx pod-install')
        .save();
}
module.exports = function task() {
    dependency();
    typescript();
    src();
    script();
};
module.exports.parameters = {};
module.exports.description = 'Mrm task for react native';
