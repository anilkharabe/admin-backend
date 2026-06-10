import AppError from './AppErrors';
import HTTP_STATUS from '../../constants/HttpStatus';

class ValidationError extends AppError{
    constructor(message: string){
        super(message, HTTP_STATUS.BAD_REQUEST)
    }
}

export default ValidationError;