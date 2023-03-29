const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');

const Clients = sequelize.define('client',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    courseinterest:{
        type:DataTypes.STRING,
        allowNull:false
    },
   isclaimed:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
   }
})

module.exports = Clients;