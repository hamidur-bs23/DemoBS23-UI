export class AppError {
    originalError: any;
    constructor(originalError: any) {
        this.originalError = originalError;
        //console.log("Original Error - ", originalError);
    }
}