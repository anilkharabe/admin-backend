import UserRepository from "../repositories/UserRepository";
import ConflictError from '../utils/errors/ConflictError';
import NotFoundError from '../utils/errors/NotFoundError';
import MESSAGES from "../constants/Messages";

/**
 * Bussiness logic
 */

class UserService{
    public userRepository: UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }

    /**
     * create new User
     * @param {*} - User Data
     * @returns 
     */
    async createUser(UserData: any){
        const existingUser = await this.userRepository.findByEmail(UserData.email);
        console.log("existingUser", existingUser);
        if(existingUser){
            // throw new Error('User with this email is already created');
            throw new ConflictError(MESSAGES.ALREADY_EXISTS);
        }

        const savedUser = await this.userRepository.create(UserData);
        console.log('savedUser',savedUser)
        return savedUser;
    }


    async getAllUsers(filter: any={}, options: any={}){
        const users = await this.userRepository.findAll(filter, options);
        return users;
    }

    async getUserById(id: string){
        const user = await this.userRepository.findById(id);
        if(!user){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
        return user;
    }

    async getUserByEmail(email: string){
        const user = await this.userRepository.findByEmail(email);
        if(!user){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
        return user;
    }

    async updateUser(id: string, updatedData:any){
        const user = await this.userRepository.updateById(id, updatedData);
        if(!user){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
        return user;
    }

    async deletUser(id: string){
        const user = await this.userRepository.deleteById(id);
        if(!user){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
    }
}

export default UserService;