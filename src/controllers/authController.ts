import { Request, Response, NextFunction } from "express";
import { validateUser, generateToken } from "../services/authService";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await validateUser(username, password);

    if (!user) {
      res.status(401).json({ message: "Kredensial tidak valid" });
      return;
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
