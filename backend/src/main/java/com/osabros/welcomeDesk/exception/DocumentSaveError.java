package com.osabros.welcomeDesk.exception;

public class DocumentSaveError extends Exception {
    public DocumentSaveError() {
    }

    public DocumentSaveError(String message) {
        super(message);
    }

    public DocumentSaveError(String message, Throwable cause) {
        super(message, cause);
    }

    public DocumentSaveError(Throwable cause) {
        super(cause);
    }

    public DocumentSaveError(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}