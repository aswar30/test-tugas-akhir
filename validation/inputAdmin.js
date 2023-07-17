const Joi = require('joi')
const errorMessage = (data) => {
    if(!data.error) return ''
    else throw new Error(data.error.message)
}

module.exports = {
    
}