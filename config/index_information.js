module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: 'smarg123smarg',
    DB: "vehicleCounting",
    dialect: "mysql",
    timezone:'+05:30',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },   
};

