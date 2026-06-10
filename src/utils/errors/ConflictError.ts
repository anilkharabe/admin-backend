import AppError from './AppErrors';
import HTTP_STATUS from '../../constants/HttpStatus';

class ConflictError extends AppError{
    constructor(message: string){
        super(message, HTTP_STATUS.CONFLICT)
    }
}

export default ConflictError;