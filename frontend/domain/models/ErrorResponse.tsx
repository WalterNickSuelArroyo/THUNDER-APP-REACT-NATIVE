interface ErrorResponse {
    statusCode: number,
    error?: string,
    message: string | string[],
}

const defaultErrorResponse: ErrorResponse = {
    statusCode: 500,
    error: "Error desconocido",
    message: "ha ocurrido un error desconocido, intenta de nuevo",
}

export { ErrorResponse, defaultErrorResponse }