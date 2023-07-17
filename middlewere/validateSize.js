const getExtensionFile = ( name ) => {
    const extensionFile = name.split(".")
    const lastIndex = extensionFile.length - 1
    if(extensionFile[lastIndex] == 'jpg' || extensionFile[lastIndex] == 'png') console.log(lastIndex)
    else throw new Error('file harus dalam bentuk jpg atau png')
}

const sizeFile = (name) => {
    if(name.size > 1015200) throw new Error('Maksimal 1mb untuk Ukuran Poto/file')
}

module.exports = {
    validateSizeFile : (file) => {
        sizeFile(file.photoIdCard[0])
        getExtensionFile(file.photoIdCard[0].originalname)
        sizeFile(file.photoYellowCard[0])
        getExtensionFile(file.photoYellowCard[0].originalname)
        sizeFile(file.photoRTRWCertificate[0])
        getExtensionFile(file.photoRTRWCertificate[0].originalname)
        if(file.descriptionOfDeathInHospital){
            sizeFile(file.descriptionOfDeathInHospital[0])
            getExtensionFile(file.descriptionOfDeathInHospital[0].originalname)
        }
    },
    validatefileSingle: (file) => {
        const {originalname} = file
        getExtensionFile(originalname)
        sizeFile(file)
    }
}