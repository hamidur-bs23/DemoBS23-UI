import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";

import { AppError } from "../common/error-exceptions/app-error";
import { BadInputError } from "../common/error-exceptions/bad-input-error";
import { ForbiddenError } from "../common/error-exceptions/Forbidden-error";
import { NotFoundError } from "../common/error-exceptions/not-found-error";
import { UnauthorizedError } from "../common/error-exceptions/unauthorized-error";

@Injectable()
export class AppToastrService {

    constructor(private toastrService: ToastrService) {
    }

    showSuccess(errorMsg: string, errorTitle: string) {
        this.toastrService.success(`${errorMsg}`, `${errorTitle}`);
    }

    showInfo(errorMsg: string, errorTitle: string) {
        this.toastrService.info(`${errorMsg}`, `${errorTitle}`);
    }

    showWarning(errorMsg: string, errorTitle: string) {
        this.toastrService.warning(`${errorMsg}`, `${errorTitle}`);
    }

    showError(errorMsg: string, errorTitle: string) {
        this.toastrService.error(`${errorMsg}`, `${errorTitle}`);
    }


    showErrorBasedOnAppErrorInstance(err: AppError, _errorMsg?: string, _errorTitle?: string) {
        
        if (err instanceof BadInputError) {
            const errorMsg = _errorMsg ? _errorMsg : "Bad Input Error Message";
            const errorTitle = _errorTitle ? _errorTitle : "Bad Input Error Title"

            console.log("Bad Input Error - ", err.originalError);
            return this.toastrService.error(errorMsg, errorTitle);

        } else if (err instanceof NotFoundError) {
            const errorMsg = _errorMsg ? _errorMsg : "Not Found Error Message";
            const errorTitle = _errorTitle ? _errorTitle : "Not Found Error Title"

            console.log("Not Found Error - ", err.originalError);
            return this.toastrService.error(errorMsg, errorTitle);
            
        } else if (err instanceof UnauthorizedError) {
            const errorMsg = _errorMsg ? _errorMsg : "Unauthorized Error Message";
            const errorTitle = _errorTitle ? _errorTitle : "Unauthorized Error Title"

            console.log("Unauthorized Error - ", err.originalError);
            return this.toastrService.error(errorMsg, errorTitle);
            
        } else if (err instanceof ForbiddenError) {
            const errorMsg = _errorMsg ? _errorMsg : "Forbidden Error Message";
            const errorTitle = _errorTitle ? _errorTitle : "Forbidden Error Title"

            console.log("Forbidden Error - ", err.originalError);
            return this.toastrService.error(errorMsg, errorTitle);
        } else {
            const errorMsg = _errorMsg ? _errorMsg : "Unknown Error Message";
            const errorTitle = _errorTitle ? _errorTitle : "Unknown Error Title"

            console.log("Unknown Error - ", err.originalError);
            return this.toastrService.error(errorMsg, errorTitle);
        }
    }

}