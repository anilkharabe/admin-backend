import BaseRepository from "./BaseRepository";
import UserModel from '../models/User.Model';

class UserRepository extends BaseRepository{
    constructor(){
        super(UserModel)
    }

    async findByEmail(email: string){
        return await UserModel.findOne({email})
    }
}

export default UserRepository;