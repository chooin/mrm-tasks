"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
function typescript() {
    const tsconfig = mrm_core_1.json('tsconfig.json');
    const packages = [
        'typescript'
    ];
    tsconfig.merge({
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
    });
    mrm_core_1.install(packages);
}
module.exports = function task({}) {
    typescript();
};
module.exports.parameters = {};
module.exports.description = 'Mrm task for react native';
