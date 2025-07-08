// backend/middlewares/authorize.js
import jwt from 'jsonwebtoken';

/**
 * Middleware genérico para verificar permissões baseadas em um array de permissões necessárias.
 * Anexa o payload decodificado do JWT em `req.user`.
 * @param {Array<string>} permissoesNecessarias - Um array de strings, onde cada string é uma permissão exigida.
 * @returns {Function} Um middleware Express.
 */
export function authorize(permissoesNecessarias = []) {
  return function (req, res, next) {
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
      req.user = decoded; // Anexa o payload decodificado ao objeto de requisição

      // Verifica se o usuário possui TODAS as permissões exigidas
      const temPermissao = permissoesNecessarias.every(p =>
        decoded.permissions?.includes(p)
      );

      if (!temPermissao) {
        return res.status(403).json({ mensagem: 'Acesso negado. Permissão insuficiente.' });
      }

      next(); // Continua para o próximo middleware/rota
    } catch (err) {
      // Retorna erro se o token for inválido ou expirado
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }
  };
}

/**
 * Middleware genérico para verificar se o usuário possui uma role (papel) específica.
 * Anexa o payload decodificado do JWT em `req.user`.
 * @param {string} role - A role específica exigida (ex: 'admin', 'suporte', 'rh').
 * @returns {Function} Um middleware Express.
 */
export function authorizeRole(role) {
  return function (req, res, next) {
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
      req.user = decoded; // Anexa o payload decodificado ao objeto de requisição

      // Verifica se a role no token decodificado corresponde à role exigida
      if (decoded.role !== role) {
        return res.status(403).json({ mensagem: 'Acesso negado. Role insuficiente.' });
      }

      next(); // Continua para o próximo middleware/rota
    } catch (err) {
      // Retorna erro se o token for inválido ou expirado
      return res.status(401).json({ mensagem: 'Token inválido.' });
    }
  };
}
