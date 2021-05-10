const express = require('express');
const history = require('connect-history-api-fallback');

const app = express();

app.get('/health', (req, res) => {
  res.send({
    status: 'running'
  });
});
app.use(history({
  verbose: true
}));
app.use(express.static('${dist}'));

app.listen(${port}, '0.0.0.0');
