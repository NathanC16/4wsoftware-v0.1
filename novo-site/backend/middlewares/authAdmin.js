// middlewares/authAdmin.js
import jwt from 'jsonwebtoken';

/**
 * Extrai o token JWT do cabeçalho de autorização da requisição.
 * Espera o formato 'Bearer <token>'.
 * @param {Object} req - Objeto de requisição do Express.
 * @returns {string|null} O token JWT ou null se não for encontrado ou estiver mal formatado.
 */
function getTokenFromHeader(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
  return parts[1];
}

/**
 * Middleware para verificar se o usuário tem permissão de administrador.
 * Requer que o token JWT contenha a permissão 'podeAcessarDashboardAdministracao'.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 * @param {Function} next - Próximo middleware na cadeia.
 */
export function verifyAdmin(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido ou mal formatado.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Verifica se o token decodificado possui as permissões necessárias
    if (!decoded.permissions || !decoded.permissions.includes('podeAcessarDashboardAdministracao')) {
      return res.status(403).json({ mensagem: 'Acesso negado. Permissão insuficiente.' });
    }
    req.user = decoded; // Anexa o payload decodificado ao objeto de requisição
    next();
  } catch (err) {
    console.error('Erro de autenticação em verifyAdmin:', err);
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }
}

/**
 * Middleware para proteger rotas que exigem a role 'admin'.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 * @param {Function} next - Próximo middleware na cadeia.
 */
export function protegerAdmin(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido ou mal formatado.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Verifica se a role no token decodificado é 'admin'
    if (decoded.role !== 'admin') {
      return res.status(403).json({ mensagem: 'Acesso negado. Permissão insuficiente.' });
    }
    req.user = decoded; // Anexa o payload decodificado ao objeto de requisição
    next();
  } catch (err) {
    console.error('Erro de autenticação em protegerAdmin:', err);
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }
}
