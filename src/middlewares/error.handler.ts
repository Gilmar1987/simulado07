import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";


export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('[Error Log]:', err.message || err);

    if (err instanceof ZodError) {
        return res.status(400).json({
            message: 'Validation Error',
            errors: err.issues.map((issue: any) => ({
                path: issue.path.join('.'),
                message: issue.message
            }))
        });
    }

    // Erro de regra de negócio ou outros erros personalizados
    if (err.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid ID format'
        });
    }

    // Erro de Banco de Dados ou outros erros inesperados
    if (err.code === 11000) {
        return res.status(409).json({
            message: 'Duplicate field value entered'
        });
    }
    // Erros de regra de negócio
    const conflictMessages = ['User already exists', 'Email already exists', 'Movie already exists'];
    const notFoundMessages = ['User not found', 'Movie not found'];

    if (conflictMessages.includes(err.message) || err.statusCode === 409)
        return res.status(409).json({ message: err.message });

    if (notFoundMessages.includes(err.message))
        return res.status(404).json({ message: err.message });




    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    });


};