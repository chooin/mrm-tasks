import { template } from 'mrm-core';
import path from 'path';

function addFiles() {
  const files = [
    'docker-compose.production.yml',
    'docker-compose.testing.yml',
    'Dockerfile',
    'laravel.ini',
  ];

  files.forEach((file) => {
    template(file, path.join(__dirname, 'templates', file)).apply().save();
  });
}

module.exports = function task() {
  addFiles();
};
