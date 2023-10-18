export const createError = (errStatus, message) => {
    const error = new Error()
    error.errStatus = errStatus
    error.message = message
    return error
}