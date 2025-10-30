const mongoose = require('mongoose')
const dbPassword = process.env.MONGODB_PASSWORD;
const dbURI = `mongodb+srv://thth9525:1535313@cluster0.cpubpvd.mongodb.net/db.net/Loc8r`;
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connected error ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected ');
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through
${msg}`);
        callback();
    });
};


// For nodemon restarts
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

require('./locations');