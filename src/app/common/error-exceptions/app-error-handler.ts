import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler{
    handleError(error: any): void {
        alert('Unexpected error occurred!');
        console.log("Unexpected Error - ", error.originalError);
    }
}