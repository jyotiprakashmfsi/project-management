import { UserRepository } from "../repository/userRepository";
import { UserUpdateData } from "../types/user";
import { sequelize } from "../db/config";
import { getLocalTimeString } from "../helper/date";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getAllUsers() {
        return await this.userRepository.getAllUsers();
    }

    async getUserById(userId: string) {
        return await this.userRepository.getUserById(userId);
    }

    async updateUser(userId: string, updateData: UserUpdateData) {
        const currentTime = getLocalTimeString(new Date());
        
        if (updateData.dob) {
            updateData.dob = getLocalTimeString(new Date(updateData.dob));
        }

        return await this.userRepository.updateUser(userId, updateData);
    }

    async deleteUser(userId: string) {
        const result = await sequelize.query(
            'DELETE FROM Users WHERE id = ?',
            {
                replacements: [userId],
                type: sequelize.QueryTypes.DELETE
            }
        );
        return result;
    }
}
