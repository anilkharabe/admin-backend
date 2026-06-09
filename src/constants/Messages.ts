const MESSAGES = {
    // Success Messages
    SUCCESS: 'Operation completed successfully',
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    FETCHED: 'Resource fetched successfully',

    // Bulk Operations
    BULK_CREATED: 'Resources created successfully',
    BULK_UPDATED: 'Resources updated successfully',
    BULK_DELETED: 'Resources deleted successfully',

    // Validation Errors
    INVALID_REQUEST: 'Invalid request',
    INVALID_PAYLOAD: 'Invalid payload',
    INVALID_ID: 'Invalid ID',
    INVALID_IDS_ARRAY: 'IDs should be an array',
    VALIDATION_FAILED: 'Validation failed',
    REQUIRED_FIELDS_MISSING: 'Required fields are missing',

    // Authentication & Authorization
    UNAUTHORIZED: 'Authentication required',
    INVALID_CREDENTIALS: 'Invalid credentials',
    TOKEN_EXPIRED: 'Token has expired',
    INVALID_TOKEN: 'Invalid token',
    FORBIDDEN: 'You do not have permission to perform this action',

    // Resource Errors
    NOT_FOUND: 'Resource not found',
    ALREADY_EXISTS: 'Resource already exists',
    DUPLICATE_ENTRY: 'Duplicate entry found',

    // Database Errors
    DATABASE_ERROR: 'Database operation failed',
    TRANSACTION_FAILED: 'Transaction failed',

    // Generic Errors
    BAD_REQUEST: 'Bad request',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    SERVICE_UNAVAILABLE: 'Service unavailable',
    SOMETHING_WENT_WRONG: 'Something went wrong',

    // File Operations
    FILE_UPLOADED: 'File uploaded successfully',
    FILE_DELETED: 'File deleted successfully',
    FILE_NOT_FOUND: 'File not found',
    INVALID_FILE: 'Invalid file',

    // User Related
    USER_CREATED: 'User created successfully',
    USER_UPDATED: 'User updated successfully',
    USER_DELETED: 'User deleted successfully',
    USER_NOT_FOUND: 'User not found',

    // Pagination
    NO_RECORDS_FOUND: 'No records found',
    RECORDS_FETCHED: 'Records fetched successfully'
};



Object.freeze(MESSAGES);

export default MESSAGES;