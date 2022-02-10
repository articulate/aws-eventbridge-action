module.exports = {
  '*.ts': () => [
    'npm run format',
    'npm run build',
    'npm run package',
    'git add dist',
  ],
};
