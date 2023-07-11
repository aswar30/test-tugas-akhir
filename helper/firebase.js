const firebase = require('firebase/app')
firebase.initializeApp({
    apiKey : process.env.apiKey,
    authDomain : process.env.authDomain,
    projectId : process.env.projectId,
    storageBucket : process.env.storageBucket,
    messagingSenderId : process.env.messagingSenderId,
    appId : process.env.appId
})
const {getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } = require('firebase/storage')

const storage = getStorage()
const metaData = {
    contentType : 'image/jpeg'
}

const  uploadImage = async (files) => {
    const storageRef =  ref(storage, 'berkas-kelengkapan/' + new Date().getTime() + files.originalname)
    const uploadTask = await uploadBytesResumable(storageRef, files.buffer, metaData)
    const downloadURL = await getDownloadURL(uploadTask.ref)
    return downloadURL
}
module.exports = {
    saveImage: async (files) => {
        let urlDescriptionOfDeathInHospital
        const urlIdCard = await uploadImage(files.photoIdCard[0])
        const urlYellowCard = await uploadImage(files.photoYellowCard[0])
        const urlRTRWCertificate = await uploadImage(files.photoRTRWCertificate[0])
        const urlFamilyCard = await uploadImage(files.familyCard[0])
        const urlIdcardOfHeirs = await uploadImage(files.idcardOfHeirs[0])
        if(files.descriptionOfDeathInHospital) urlDescriptionOfDeathInHospital = await uploadImage(files.descriptionOfDeathInHospital[0])
        return {
            urlIdCard,
            urlYellowCard,
            urlRTRWCertificate,
            urlFamilyCard,
            urlIdcardOfHeirs,
            urlDescriptionOfDeathInHospital
        }
    },
    saveSingleImage: async (files) => {
        const urlGrounds = await uploadImage(files)
        return urlGrounds
    },
    deleteImage: async (urlImage) => {
        const desertref = ref(storage, urlImage)
        await deleteObject(desertref)
    }
}