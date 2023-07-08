
module.exports = {
    validateSizeFile : (file) => {
        const message = 'Maksimal 2mb untuk Ukuran Poto '
        if(file.photoIdCard[0].size > 20715200 ) throw new Error(message + 'KTP')
        if(file.photoYellowCard[0].size > 20715200) throw new Error(message + 'kartu Kuning')
        if(file.photoRTRWCertificate[0].size > 20715200) throw new Error(message + 'Surat Keterangan RT/RW')
        if(file.descriptionOfDeathInHospital) {
            if(file.descriptionOfDeathInHospital[0].size > 20715200) throw new Error(message + 'Keterangan Meinggal di RS')
        }
    }
}