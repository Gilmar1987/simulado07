import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user)
            return res.status(401).json({ message: 'Acesso negado' });

        const userRole = (req.user as any).role;
        if (!roles.includes(userRole))
            return res.status(403).json({ message: 'Permissão insuficiente' });

        next();
    };
};
