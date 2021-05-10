"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const dependencies = [
    '@react-navigation/native',
    '@react-navigation/stack',
    'react-native-gesture-handler',
    'react-native-reanimated',
    'react-native-safe-area-context',
    'react-native-screens',
    'react-native-lifecycle',
    'styled-components',
];
const devDependencies = [
    'typescript'
];
function installDependencies() {
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
    mrm_core_1.makeDirs([
        'src'
    ]);
}
module.exports = function task() {
    installDependencies();
    typescript();
    src();
};
module.exports.parameters = {};
module.exports.description = 'Mrm task for react native';
