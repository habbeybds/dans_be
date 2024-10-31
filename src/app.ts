import express, { Application } from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();

// Gunakan middleware CORS
app.use(cors({
    origin: 'http://localhost:3000', // Izinkan hanya dari frontend
    credentials: true, // Jika menggunakan cookie atau autentikasi berbasis sesi
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', jobRoutes);

// Export aplikasi
export default app;
