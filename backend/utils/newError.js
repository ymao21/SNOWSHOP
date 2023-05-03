const newError = (message, status, title, errors) => {
    const err = new Error();
    err.message = message;
    err.status = status;
    err.title = title;
    err.errors = errors;

    return err;
}

module.exports = {newError};
