// backend/middlewares/authorize.js
import jwt from 'jsonwebtoken';

/**
 * Middleware genérico para verificar permissões.
 * @param {Array} permissoesNecessarias - Permissões mínimas exigidas para acessar a rota.
 */
export function authorize(permissoesNecessarias = []) {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ mensagem: 'Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      // Verifica se tem pelo menos uma permissão exigida
      const temPermissao = permissoesNecessarias.every(p =>
        decoded.permissions?.includes(p)
      );

      if (!temPermissao) {
        return res.status(403).json({ mensagem: 'Acesso negado. Permissão insuficiente.' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }
  };
}

/**
 * Middleware genérico para checar se é um tipo específico de usuário (role).
 * Ex: admin, suporte, rh...
 */
export function authorizeRole(role) {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ mensagem: 'Token não fornecido.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (decoded.role !== role) {
        return res.status(403).json({ mensagem: 'Acesso negado. Role insuficiente.' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }
  };
}
