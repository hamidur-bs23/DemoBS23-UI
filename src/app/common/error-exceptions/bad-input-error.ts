import { AppError } from "./app-error";

export class BadInputError extends AppError{

    constructor(originalError: any) {
        super(originalError);
        
    }
}