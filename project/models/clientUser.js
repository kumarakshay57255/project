const {DataTypes} = require('sequelize');
const sequelize = require('../utils/database');
const User = require('../models/Users');
const Client = require('../models/Client')

const clientUser = sequelize.define('clientUser',{
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:User ,
            key: 'id'
          }
      
    },
   clientId:{
    type:DataTypes.INTEGER,
    allowNull:false,
    references: {
        model:Client ,
        key: 'id'
      }
    
   }
})



module.exports = clientUser;