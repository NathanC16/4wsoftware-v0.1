// middlewares/autenticacaoSimples.js

const TOKEN_SECRETO_SIMPLES = 'meu-token-secreto-123'; // Em um app real, use process.env

/**
 * Middleware de autenticação simples.
 * Verifica um token estático no cabeçalho X-Auth-Token.
 */
const autenticacaoSimples = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res.status(401).json({ mensagem: 'Token de autenticação não fornecido.' });
  }

  if (token !== TOKEN_SECRETO_SIMPLES) {
    return res.status(403).json({ mensagem: 'Token inválido.' });
  }

  // Se o token for válido, continua para a próxima rota
  next();
};

export default autenticacaoSimples;