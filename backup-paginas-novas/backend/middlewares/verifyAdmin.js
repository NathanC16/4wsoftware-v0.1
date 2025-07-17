import jwt from 'jsonwebtoken';

export function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.permissions || !decoded.permissions.includes('podeAcessarDashboardAdministracao')) {
      return res.status(403).json({ mensagem: 'Acesso negado. Permissão insuficiente.' });
    }

    req.user = decoded; // deixa o payload no req pra usar depois
    next();
  } catch (err) {
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }
}
