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
    (0, mrm_core_1.deleteFiles)(['src/pages/index.tsx', 'src/pages/index.less', '.prettierrc']);
}
function addFiles(config) {
    const files = [
        'src/layouts/default/index.tsx',
        'src/pages/home/index/index.tsx',
        'src/pages/home/index/styled.ts',
        'src/hooks/index.ts',
        'src/routes.ts',
        'src/utils/index.ts',
        'src/utils/merge-props.ts',
        'src/utils/merge-list.ts',
        'src/utils/parse-query.ts',
        'src/utils/storage.ts',
        'src/utils/yup.ts',
        'jest.config.js',
        'commitlint.config.js',
        '.umirc.local.ts',
        '.umirc.testing.ts',
        '.umirc.production.ts',
        '.yarnrc',
        '.eslintrc.js',
        'src/app.tsx',
    ];
    files.forEach((file) => {
        (0, mrm_core_1.template)(file, path_1.default.join(__dirname, 'templates', file)).apply().save();
    });
    if (config.platform === 'pc') {
        (0, mrm_core_1.template)('.umirc.ts', path_1.default.join(__dirname, 'templates', '.umirc.pc.ts'))
            .apply()
            .save();
        (0, mrm_core_1.template)('src/utils/toast.ts', path_1.default.join(__dirname, 'templates', 'src/utils/toast.pc.ts'))
            .apply()
            .save();
        (0, mrm_core_1.template)('src/pages/document.ejs', path_1.default.join(__dirname, 'templates', 'src/pages/document.pc.ejs'))
            .apply()
            .save();
        (0, mrm_core_1.template)('src/global.less', path_1.default.join(__dirname, 'templates', 'src/global.pc.less'))
            .apply()
            .save();
    }
    else {
        (0, mrm_core_1.template)('.umirc.ts', path_1.default.join(__dirname, 'templates', '.umirc.mobile.ts'))
            .apply()
            .save();
        (0, mrm_core_1.template)('src/utils/toast.ts', path_1.default.join(__dirname, 'templates', 'src/utils/toast.mobile.ts'))
            .apply()
            .save();
        (0, mrm_core_1.template)('src/pages/document.ejs', path_1.default.join(__dirname, 'templates', 'src/pages/document.mobile.ejs'))
            .apply()
            .save();
        (0, mrm_core_1.template)('src/global.less', path_1.default.join(__dirname, 'templates', 'src/global.mobile.less'))
            .apply()
            .save();
    }
}
function addDirs() {
    (0, mrm_core_1.makeDirs)(['src/services', 'src/components', 'src/enums']);
}
function changeFiles() {
    (0, mrm_core_1.lines)('.prettierignore').add(['dist']).save();
    (0, mrm_core_1.lines)('.nvmrc').add([NodeVersion]).save();
    (0, mrm_core_1.lines)('.prettierrc.js')
        .add([
        "const fabric = require('@umijs/fabric');",
        '',
        'module.exports = {',
        '  ...fabric.prettier,',
        '};',
    ])
        .save();
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
            'commit-msg': 'npx --no-install commitlint --edit $1',
        },
    })
        .save();
}
function installDependencies(config) {
    (0, mrm_core_1.install)([
        'ahooks',
        'styled-components',
        'query-string',
        'dayjs',
        'ts-pattern',
        'yup',
        '@ebay/nice-modal-react',
    ], {
        yarn: true,
        dev: false,
    });
    (0, mrm_core_1.install)([
        '@types/jest',
        '@types/styled-components',
        '@commitlint/config-conventional',
        '@commitlint/cli',
        '@umijs/fabric',
    ], {
        yarn: true,
        dev: true,
    });
    if (config.platform === 'mobile') {
        (0, mrm_core_1.install)(['antd-mobile'], {
            yarn: true,
            dev: false,
        });
    }
}
function changeScripts() {
    const pkg = (0, mrm_core_1.packageJson)();
    const postinstall = pkg.getScript('postinstall');
    const prettier = pkg.getScript('prettier');
    const test = pkg.getScript('test');
    const testCoverage = pkg.getScript('test:coverage');
    pkg
        .removeScript('build')
        .removeScript('postinstall')
        .removeScript('prettier')
        .removeScript('test')
        .removeScript('test:coverage')
        .save();
    pkg
        .setScript('start', 'yarn dev')
        .setScript('dev', 'UMI_ENV=local umi dev')
        .setScript('build:testing', 'UMI_ENV=testing umi build')
        .setScript('build:production', 'UMI_ENV=production umi build')
        .setScript('preinstall', 'npx only-allow yarn')
        .setScript('postinstall', postinstall)
        .setScript('prettier', prettier)
        .setScript('test', test)
        .setScript('test:coverage', testCoverage)
        .save();
}
module.exports = function task(config = { platform: 'mobile' }) {
    checkEnvironment();
    removeFiles();
    addFiles(config);
    addDirs();
    changeFiles();
    installDependencies(config);
    changeScripts();
};
