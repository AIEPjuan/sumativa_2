const https = require('https');
const fs = require('fs');
const express = require('express');
const cookieParser = require('cookie-parser');

const productosRoutes = require('./src/routes/productosRoutes');
const authRoutes = require('./src/routes/authRoutes');
const checkoutRoutes = require('./src/routes/checkoutRoutes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static('.'));

app.use('/api', productosRoutes);
app.use('/api', authRoutes);
app.use('/api', checkoutRoutes);

const opciones = {
  key: fs.readFileSync('./certs/servidor.key'),
  cert: fs.readFileSync('./certs/servidor.cer')
};

https.createServer(opciones, app).listen(8443, () => {
  console.log('Servidor corriendo en https://localhost:8443');
});