const convertToBase64 = (file) => {
    return `data:${file.mimetype};base64,${file.data.tostring("base64")}`
}

module.exports = convertToBase64