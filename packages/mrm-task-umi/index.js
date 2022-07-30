"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const semver_1 = __importDefault(require("semver"));
const kleur_1 = __importDefault(require("kleur"));
const path_1 = __importDefault(require("path"));
const NodeVersion = '16';
function checkEnvironment() {
    const currentNodeVersion = semver_1.default.clean(process.version);
    if (semver_1.default.lte(currentNodeVersion, `${NodeVersion}.0.0`)) {
        console.log(`${kleur_1.default.red('error')} @: expected node version "${NodeVersion}.x". Got "${currentNodeVersion}"`);
        process.exit(1);
    }
}
function removeFiles() {
    (0, mrm_core_1.deleteFiles)([
        'src/layouts/index.tsx',
        'src/layouts/index.less',
        'src/pages/index.tsx',
        'src/pages/docs.tsx',
        'src/assets/yay.jpg',
    ]);
}
function addFiles() {
    const files = [
        'src/layouts/default/index.tsx',
        'src/pages/home/index/index.tsx',
        'src/pages/home/index/styled.ts',
        'src/pages/document.ejs',
        'src/hooks/index.ts',
        'src/routes.ts',
        'src/utils/index.ts',
        'src/utils/merge-props.ts',
        'src/utils/merge-list.ts',
        'src/utils/parse-query.ts',
        'src/utils/storage.ts',
        'src/utils/toast.ts',
        'src/utils/yup.ts',
        'jest.config.js',
        'commitlint.config.js',
        '.umirc.local.ts',
        '.umirc.testing.ts',
        '.umirc.production.ts',
        '.umirc.ts',
        'src/app.tsx',
        'src/global.less',
    ];
    files.forEach((file) => {
        (0, mrm_core_1.template)(file, path_1.default.join(__dirname, 'templates', file)).apply().save();
    });
}
function addDirs() {
    (0, mrm_core_1.makeDirs)(['src/services', 'src/components', 'src/enums']);
}
function changeFiles() {
    (0, mrm_core_1.lines)('.prettierignore').add(['dist']).save();
    (0, mrm_core_1.lines)('.nvmrc').add([NodeVersion]).save();
    (0, mrm_core_1.lines)('typings.d.ts')
        .add([
        '',
        '// global variables',
        'declare const APP_NAME: string;',
        "declare const APP_ENV: 'production' | 'testing' | 'local';",
        'declare const API_URL: string;',
    ])
        .save();
    (0, mrm_core_1.json)('package.json')
        .merge({
        engines: {
            node: `${NodeVersion}.x`,
        },
        gitHooks: {
            'commit-msg': 'yarn commitlint --edit $1',
        },
        'lint-staged': {
            '*.{js,jsx,ts,tsx,css,less}': ['umi lint'],
        },
    })
        .save();
}
function installDependencies() {
    (0, mrm_core_1.install)([
        'ahooks',
        'styled-components',
        'antd-mobile',
        'antd-mobile-icons',
        'query-string',
        'dayjs',
        'ts-pattern',
        'yup',
        '@ebay/nice-modal-react',
        'rc-field-form',
    ], {
        pnpm: true,
        dev: false,
    });
    (0, mrm_core_1.install)([
        '@types/jest',
        '@types/styled-components',
        '@commitlint/config-conventional',
        '@commitlint/cli',
        '@umijs/lint',
    ], {
        pnpm: true,
        dev: true,
    });
}
function changeScripts() {
    const pkg = (0, mrm_core_1.packageJson)();
    const postinstall = pkg.getScript('postinstall');
    pkg
        .removeScript('dev')
        .removeScript('build')
        .removeScript('postinstall')
        .removeScript('start')
        .save();
    pkg
        .setScript('start', 'pnpm dev')
        .setScript('dev', 'UMI_ENV=local umi dev')
        .setScript('build:testing', 'UMI_ENV=testing umi build')
        .setScript('build:production', 'UMI_ENV=production umi build')
        .setScript('preinstall', 'npx only-allow pnpm')
        .setScript('postinstall', postinstall)
        .save();
}
module.exports = function task() {
    checkEnvironment();
    removeFiles();
    addFiles();
    addDirs();
    changeFiles();
    installDependencies();
    changeScripts();
};
