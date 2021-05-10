"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
function typescript() {
    const tsconfig = mrm_core_1.json('tsconfig.json');
    const packages = [
        'typescript'
    ];
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
    mrm_core_1.install(packages, {
        dev: true
    });
}
function src() {
    mrm_core_1.makeDirs([
        'src'
    ]);
    const packages = [
        '@react-navigation/native',
        '@react-navigation/stack',
        'react-native-gesture-handler',
        'react-native-reanimated',
        'react-native-safe-area-context',
        'react-native-screens',
        'react-native-lifecycle',
        'styled-components',
    ];
    mrm_core_1.install(packages);
}
module.exports = function task({}) {
    typescript();
    src();
};
module.exports.parameters = {};
module.exports.description = 'Mrm task for react native';
