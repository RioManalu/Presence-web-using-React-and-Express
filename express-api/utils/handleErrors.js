const handleErrors = (err) => {
    const errObj = {};
    err.errors.map( er => {
            errObj[er.path] = er.message;
        })
    return errObj
}

module.exports = handleErrors