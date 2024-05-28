const jwt = require('jsonwebtoken');


const crearToken = (email_user) => {

    const token = jwt.sign( { email: email_user }, process.env.TOKEN_SECRET_KEY)
    return token
};

const comprobarToken = (token) => {

    try {
        const verificado = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        return verificado

    } catch (error) {
        console.error('Error al verificar el token:', error)
        return false
    }
};


module.exports = { crearToken, comprobarToken };