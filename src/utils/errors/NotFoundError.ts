import AppError from './AppErrors';
import HTTP_STATUS from '../../constants/HttpStatus';

class NotFoundError extends AppError{
    constructor(message: string){
        super(message, HTTP_STATUS.NOT_FOUND)
    }
}

export default NotFoundError;