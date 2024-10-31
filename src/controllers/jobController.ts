import axios from "axios";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const getJobList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { description, location, full_time, page = 1 } = req.query;

  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Tidak berizin" });
      return;
    }

    const secretKey = process.env.JWT_SECRET || 'your_jwt_secret';
    jwt.verify(token, secretKey);

    // Ambil data dari API eksternal berdasarkan halaman
    let jobs = [];
    try {
      const response = await axios.get(
        "https://dev6.dansmultipro.com/api/recruitment/positions.json",
        {
          params: { page }
        }
      );

      // Ambil data pekerjaan dari API eksternal
      jobs = response.data;

      // Filter untuk menghilangkan elemen null
      jobs = jobs.filter((job: any) => job !== null);

      // Lakukan filtering berdasarkan parameter query
      if (description) {
        const descLower = (description as string).toLowerCase();
        jobs = jobs.filter((job: any) =>
          job.title.toLowerCase().includes(descLower) ||
          job.description.toLowerCase().includes(descLower)
        );
      }

      if (location) {
        const locLower = (location as string).toLowerCase();
        jobs = jobs.filter((job: any) =>
          job.location.toLowerCase().includes(locLower)
        );
      }

      if (full_time) {
        const isFullTime = full_time === 'true';
        jobs = jobs.filter((job: any) => 
          isFullTime ? job.type.toLowerCase() === "full time" : job.type.toLowerCase() !== "full time"
        );
      }

      // Kirim respons dengan data yang sudah difilter
      res.json({
        currentPage: Number(page),
        totalItems: jobs.length,
        jobs
      });
    } catch (error: any) {
      // Jika ada error dari API eksternal, kembalikan respons dengan totalItems: 0 dan jobs: []
      console.error("Error dari API eksternal:", error.message);
      res.json({
        currentPage: Number(page),
        totalItems: 0,
        jobs: []
      });
    }
  } catch (error) {
    console.error(error);
    next(error); // Panggil next untuk middleware error handler
  }
};

export const getJobDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Tidak berizin" });
      return;
    }

    const secretKey = process.env.JWT_SECRET || 'your_jwt_secret';
    jwt.verify(token, secretKey);

    const response = await axios.get(
      `https://dev6.dansmultipro.com/api/recruitment/positions/${id}`
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    next(error); // Panggil next untuk middleware error handler
  }
};
