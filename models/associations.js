import Wallet_transaction from "../models/Wallet_transction.js"
import KYC_Model from "./Kyc.js";
import Plans from "./Plans.js"
import User from "./User.js";

// users table associations
// User.belongsTo(User, {
//     as: 'sponsor',
//     foreignKey: 'sponsor_id'
// })

// User.hasMany(User, {
//     foreignKey: 'sponsor_id',
//     as: "downlines"
// })

User.hasOne(KYC_Model, {
    foreignKey: 'user_id',
})
KYC_Model.belongsTo(User, {
    foreignKey: 'user_id'
})

User.belongsTo(Plans, {
    foreignKey: 'plan_id',
})

Plans.hasMany(User, {
    foreignKey: 'plan_id',
})
