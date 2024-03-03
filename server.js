const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use('/api', createProxyMiddleware({ target: 'https://localhost:44374', changeOrigin: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor proxy rodando na porta ${PORT}`);
});
