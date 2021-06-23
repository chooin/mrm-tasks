if (!/yarn\.js$/.test(process.env.npm_execpath || '')) {
  console.warn(
    '请通过 yarn install 安装项目依赖',
  );
  process.exit(1);
}
