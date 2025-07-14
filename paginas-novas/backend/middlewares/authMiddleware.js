import jwt from 'jsonwebtoken';

// Middleware para verificar token JWT com mensagem mais clara e suporte async
export function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) 
      return res.status(401).json({ mensagem: 'Token não fornecido' });

    const token = authHeader.split(' ')[1];
    if (!token) 
      return res.status(401).json({ mensagem: 'Token mal formatado' });

    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user; // Payload decodificado do token
    next();
  } catch (err) {
    console.error('Erro no middleware authenticateToken:', err);
    return res.status(403).json({ mensagem: 'Token inválido ou expirado' });
  }
}

// Middleware pra checar permissões do usuário
export function authorizePermissions(requiredPermissions = []) {
  return (req, res, next) => {
    const userPermissions = req.user?.permissions || [];

    // Se nenhuma permissão é exigida, libera geral (easy)
    if (requiredPermissions.length === 0) return next();

    // Aqui exige que o usuário tenha todas as permissões pedidas
    const hasAllPermissions = requiredPermissions.every(p => userPermissions.includes(p));

    if (!hasAllPermissions) {
      return res.status(403).json({ mensagem: 'Permissão negada' });
    }

    next();
  };
}
// Middleware para verificar se o usuário é admin