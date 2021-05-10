"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const path_1 = __importDefault(require("path"));
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
function dependency() {
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
        'templates/src/pages/home/index/index.tsx',
        'templates/src/pages/home/index/styled.ts',
        'templates/src/routes/routes.tsx',
        'templates/src/routes/routes.tsx',
    ];
    files.forEach((file) => {
        mrm_core_1.template(file.replace(/templates\//, ''), path_1.default.join(__dirname, file))
            .apply({})
            .save();
    });
}
module.exports = function task() {
    dependency();
    typescript();
    src();
};
module.exports.parameters = {};
module.exports.description = 'Mrm task for react native';
