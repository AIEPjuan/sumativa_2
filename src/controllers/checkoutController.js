const jwt = require('jsonwebtoken');

const SECRET = 'mi_clave_secreta_segura';

const checkout = (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, SECRET);

    const { carro } = req.body;

    if (!carro || !Array.isArray(carro)) {
      return res.status(400).json({ error: 'Carro inválido' });
    }

    res.json({
      mensaje: 'Pago aprobado por Transbank',
      usuario: decoded.usuario,
      productos: carro
    });

  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = { checkout };
