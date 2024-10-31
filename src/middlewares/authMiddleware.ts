import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1]; // Mendapatkan token dari header Authorization

  if (!token) {
    res.status(401).json({ message: 'Tidak berizin, token tidak ditemukan' });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'your_jwt_secret'; // Gunakan secret key dari environment variable
        
    const decoded = jwt.verify(token, secretKey);
    
    // Simpan informasi pengguna di req.user (jika diperlukan)
    (req as any).user = decoded;

    next(); // Lanjutkan ke route selanjutnya jika token valid
  } catch (err) {
    res.status(401).json({ message: 'Token tidak valid' });
  }
};
