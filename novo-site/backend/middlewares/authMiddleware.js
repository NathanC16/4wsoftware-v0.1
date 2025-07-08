// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

/**
 * Middleware para autenticar requisições usando um token JWT.
 * Verifica a presença e a validade do token no cabeçalho 'Authorization'.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 * @param {Function} next - Próximo middleware na cadeia.
 */
export function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    // Verifica se o cabeçalho de autorização está presente
    if (!authHeader) 
      return res.status(401).json({ mensagem: 'Token não fornecido.' });

    // Extrai o token do formato 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    if (!token) 
      return res.status(401).json({ mensagem: 'Token mal formatado.' });

    // Verifica e decodifica o token usando o segredo JWT
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Anexa o payload decodificado (informações do usuário) ao objeto de requisição
    next(); // Continua para o próximo middleware/rota
  } catch (err) {
    console.error('Erro no middleware authenticateToken:', err);
    // Retorna erro se o token for inválido ou expirado
    return res.status(403).json({ mensagem: 'Token inválido ou expirado.' });
  }
}

/**
 * Middleware para autorizar o acesso com base nas permissões do usuário.
 * @param {Array<string>} requiredPermissions - Array de strings com as permissões necessárias.
 * @returns {Function} Um middleware que verifica as permissões.
 */
export function authorizePermissions(requiredPermissions = []) {
  return (req, res, next) => {
    // Obtém as permissões do usuário do objeto req.user (definido por authenticateToken)
    const userPermissions = req.user?.permissions || [];

    // Se nenhuma permissão for exigida, permite o acesso
    if (requiredPermissions.length === 0) return next();

    // Verifica se o usuário possui TODAS as permissões necessárias
    const hasAllPermissions = requiredPermissions.every(p => userPermissions.includes(p));

    if (!hasAllPermissions) {
      return res.status(403).json({ mensagem: 'Permissão negada.' });
    }

    next(); // Continua para o próximo middleware/rota
  };
}
