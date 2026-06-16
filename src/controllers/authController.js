const jwt = require('jsonwebtoken');

const SECRET = 'mi_clave_secreta_segura';

const login = (req, res) => {
  const { usuario, contrasena } = req.body;

  if (usuario === 'admin' && contrasena === '1234') {
    const token = jwt.sign({ usuario }, SECRET, { expiresIn: '1h' });

    res.cookie('session', token, { httpOnly: true });

    res.json({ mensaje: 'Login exitoso', token });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
};

module.exports = { login };