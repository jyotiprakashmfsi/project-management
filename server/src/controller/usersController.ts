import { Response, Request } from "express";
import { UserService } from "../service/userService";

const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const update = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await userService.updateUser(id, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await userService.deleteUser(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};