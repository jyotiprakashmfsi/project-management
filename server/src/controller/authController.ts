import { Response, Request } from "express";
import { AuthService } from "../service/authService";

const authService = new AuthService();

export const signup = async (req: Request, res: Response) => {
  try {
    await authService.createUser(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    const result = await authService.authenticateUser(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    console.log(error);
    if (error.message === "User not found" || error.message === "Invalid password") {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(500).json({ message: error });
  }
};