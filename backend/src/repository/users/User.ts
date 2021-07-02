import {StatusCodes} from "http-status-codes";
import {ExtendBaseResponse} from "../../public/responses/BaseResponse";
import {User} from "../../public/models/user/User";

const models = require('../../database/models');

const {OK, INTERNAL_SERVER_ERROR, CREATED} = StatusCodes;


class UserRepository {
    public async createNewUser(userObj: User) {
        try {
            const createdUser = await models.user.create(userObj);
            console.log('createdUser', createdUser);

            return Promise.resolve({
                code: CREATED,
                success: true,
                data: createdUser
            })

        } catch (err) {
            console.log('createNewUser', err.message);
            return Promise.resolve({
                code: INTERNAL_SERVER_ERROR,
                success: false,
                message: err.message
            })
        }
    }

    public async findUserById(userId: number) {
        try {
            const user = await models.user.findByPk(userId);
            return {
                code: OK,
                success: true,
                data: user
            }
        } catch (err) {
            console.log(err);
            return Promise.resolve({
                code: INTERNAL_SERVER_ERROR,
                success: false
            })
        }
    }

    public async findUserByEmail(email: string): Promise<ExtendBaseResponse> {
        try {
            const user = await models.user.findOne({
                where: {
                    email
                },
            });
            return Promise.resolve({
                code: OK,
                success: true,
                data: user
            })
        } catch (err) {
            return Promise.resolve({
                code: INTERNAL_SERVER_ERROR,
                success: false,
                message: err.message
            })
        }
    }
}

export const userRepo = new UserRepository();