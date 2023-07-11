const getExtensionFile = ( name) => {
    const extensionFile = name.split(".")
    const lastIndex = extensionFile.length - 1
    if(extensionFile[lastIndex] == 'jpg' || extensionFile[lastIndex] == 'jpg') console.log(lastIndex)
    else throw new Error('file harus dalam bentuk jpg atau png')
}

module.exports = {
    validateSizeFile : (file) => {
        const message = 'Maksimal 2mb untuk Ukuran Poto '
        if(file.photoIdCard[0].size > 20715200 ) throw new Error(message + 'KTP')
        if(file.photoYellowCard[0].size > 20715200) throw new Error(message + 'kartu Kuning')
        if(file.photoRTRWCertificate[0].size > 20715200) throw new Error(message + 'Surat Keterangan RT/RW')
        if(file.descriptionOfDeathInHospital) {
            if(file.descriptionOfDeathInHospital[0].size > 20715200) throw new Error(message + 'Keterangan Meinggal di RS')
        }
    },
    validatefileSingle: (file) => {
        const {originalname} = file
        getExtensionFile(originalname)
        console.log(getExtensionFile(originalname))
        if(file.size > 2715200 ) throw new Error('ukuran file lebih dari 2MB')
    }
}