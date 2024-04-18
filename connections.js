const mongoose = require('mongoose');
//Set up default mongoose connection




async function ConnectMongoDB(url) {
    return mongoose.connect(url);
}

module.exports = {
    ConnectMongoDB
}