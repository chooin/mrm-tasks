import { template } from 'mrm-core';
import path from 'path';

function addFiles() {
  const files = [
    'build-production.sh',
    'build-testing.sh',
    'docker-compose.production.yml',
    'docker-compose.testing.yml',
    'Dockerfile',
    'Makefile',
    'laravel.ini',
  ];

  files.forEach((file) => {
    template(file, path.join(__dirname, 'templates', file)).apply().save();
  });
}

module.exports = function task() {
  addFiles();
};
