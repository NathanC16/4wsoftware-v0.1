import jwt from 'jsonwebtoken';

function getTokenFromHeader(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  return parts[1];
}

export function verifyAdmin(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido ou mal formatado.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.permissions || !decoded.permissions.includes('podeAcessarDashboardAdministracao')) {
      return res.status(403).json({ mensagem: 'Acesso negado. Permissão insuficiente.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Erro de autenticação:', err);
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }
}

export function protegerAdmin(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido ou mal formatado.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ mensagem: 'Acesso negado. Permissão insuficiente.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Erro de autenticação:', err);
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }
}
