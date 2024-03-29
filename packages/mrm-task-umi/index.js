"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const semver_1 = __importDefault(require("semver"));
const kleur_1 = __importDefault(require("kleur"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const mrm_core_1 = require("mrm-core");
const NodeVersion = '20';
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
        'src/assets',
    ]);
}
function addFiles() {
    const files = [
        'src/components/.gitkeep',
        'src/constants/.gitkeep',
        'src/enums/.gitkeep',
        'src/hooks/index.ts',
        'src/hooks/use-query.ts',
        'src/hooks/use-history.ts',
        'src/layouts/default/index.tsx',
        'src/pages/home/index/index.tsx',
        'src/pages/home/index/styled.ts',
        'src/services/.gitkeep',
        'src/utils/index.ts',
        'src/utils/merge-props.ts',
        'src/utils/merge-list.ts',
        'src/utils/storage.ts',
        'src/utils/toast.ts',
        'src/routes.ts',
        'src/app.tsx',
        'src/global.less',
        '.umirc.local.ts',
        '.umirc.testing.ts',
        '.umirc.production.ts',
        '.umirc.ts',
        '.eslintrc.js',
        '.stylelintrc.js',
    ];
    files.forEach((file) => {
        (0, mrm_core_1.template)(file, path_1.default.join(__dirname, 'templates', file)).apply().save();
    });
}
function changeFiles() {
    (0, mrm_core_1.lines)('.nvmrc').add([NodeVersion]).save();
    (0, mrm_core_1.lines)('typings.d.ts')
        .remove("import 'umi/typings';")
        .add([
        "import '@umijs/max/typings';",
        '',
        '// global variables',
        'declare global {',
        '  const APP_NAME: string;',
        "  const APP_ENV: 'production' | 'testing' | 'local';",
        '  const API_URL: string;',
        '}',
    ])
        .save();
    (0, mrm_core_1.json)('package.json')
        .merge({
        engines: {
            node: `${NodeVersion}.x`,
        },
    })
        .save();
    (0, mrm_core_1.lines)('.gitignore')
        .remove(['/.umirc.local.ts'])
        .add(['!.umirc.local.ts'])
        .save();
    (0, mrm_core_1.lines)('.prettierignore').add(['package.json', '.umirc.*']).save();
}
function uninstallDependencies() {
    (0, child_process_1.execSync)('pnpm remove umi');
}
function installDependencies() {
    (0, mrm_core_1.install)([
        'ahooks',
        'styled-components',
        'query-string',
        'dayjs',
        'ts-pattern',
        'yup',
        '@ebay/nice-modal-react',
        '@umijs/max',
        'axios',
    ], {
        pnpm: true,
        dev: false,
    });
    (0, mrm_core_1.install)(['@types/styled-components', '@types/node'], {
        pnpm: true,
        dev: true,
    });
}
function shell() {
    (0, child_process_1.execSync)('pnpx @umijs/max g prettier');
    (0, child_process_1.execSync)('pnpx @umijs/max g precommit');
}
function changeScripts() {
    const pkg = (0, mrm_core_1.packageJson)();
    pkg
        .removeScript('dev')
        .removeScript('build')
        .removeScript('postinstall')
        .removeScript('setup')
        .removeScript('start')
        .save();
    pkg
        .setScript('start', 'pnpm dev')
        .setScript('dev', 'UMI_ENV=local max dev')
        .setScript('build:testing', 'UMI_ENV=testing max build')
        .setScript('build:production', 'UMI_ENV=production max build')
        .setScript('preinstall', 'npx only-allow pnpm')
        .setScript('postinstall', 'max setup')
        .setScript('setup', 'max setup')
        .save();
}
module.exports = async function task() {
    checkEnvironment();
    uninstallDependencies();
    removeFiles();
    addFiles();
    changeFiles();
    installDependencies();
    changeScripts();
    shell();
};
