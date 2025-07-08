// middlewares/verifyAdmin.js
import jwt from 'jsonwebtoken';

/**
 * Middleware para verificar se o usuário tem permissão de administrador.
 * Requer que o token JWT contenha a permissão 'podeAcessarDashboardAdministracao'.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 * @param {Function} next - Próximo middleware na cadeia.
 */
export function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho de autorização está presente
  if (!authHeader) {
    return res.status(401).json({ mensagem: 'Token não fornecido.' });
  }

  // Extrai o token do formato 'Bearer <token>'
  const token = authHeader.split(' ')[1];

  try {
    // Verifica e decodifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica se o token decodificado possui a permissão específica de administração
    if (!decoded.permissions || !decoded.permissions.includes('podeAcessarDashboardAdministracao')) {
      return res.status(403).json({ mensagem: 'Acesso negado. Permissão insuficiente.' });
    }

    req.user = decoded; // Anexa o payload decodificado ao objeto de requisição para uso posterior
    next(); // Continua para o próximo middleware/rota
  } catch (err) {
    // Retorna erro se o token for inválido ou expirado
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }
}
