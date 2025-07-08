// middlewares/simpleAuthMiddleware.js

/**
 * Middleware de autenticação simples.
 * Atualmente, este middleware apenas chama `next()`, permitindo que a requisição continue.
 * Pode ser estendido para incluir lógica de autenticação básica, como verificação de API keys ou tokens simples.
 * @param {Object} req - Objeto de requisição do Express.
 * @param {Object} res - Objeto de resposta do Express.
 * @param {Function} next - Próximo middleware na cadeia.
 */
export default function simpleAuthMiddleware(req, res, next) {
  // Lógica de autenticação simples pode ser adicionada aqui.
  // Por exemplo, verificar um cabeçalho 'X-API-Key'.
  
  // Por enquanto, apenas passa para o próximo middleware/rota sem realizar autenticação.
  next();
}
