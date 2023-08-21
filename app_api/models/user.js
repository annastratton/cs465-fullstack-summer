const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

userSchema.methods = {
    setPassword(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = hashPassword(password, this.salt);
    },

    validPassword(password) {
        const hash = hashPassword(password, this.salt);
        return this.hash === hash;
    },

    generateJwt() {
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 7);
        
        return jwt.sign({
            _id: this._id,
            email: this.email,
            name: this.name,
            exp: parseInt(expiry.getTime() / 1000, 10),
        }, process.env.JWT_SECRET); // NOTE: Ensure you don't keep secrets in the code!
    }
};

function hashPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

mongoose.model('users', userSchema);
