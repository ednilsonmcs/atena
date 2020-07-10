module.exports = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '32312095',
    database: 'staging_area',
    timezone: '-03:00',
    define: {
        timestamps: true,
        underscored: true,
    }
}

// Gloogle Cloud
// module.exports = {
//     dialect: 'mysql',
//     host: '35.199.97.0',
//     username: 'root',
//     password: 'partenon',
//     database: 'staging_area',
//     timezone: '-03:00',
//     define: {
//         timestamps: true,
//         underscored: true,
//     }
// }