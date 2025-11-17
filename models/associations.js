import User from "./User.js"
import Wallet_transaction from "../models/Wallet_transction.js"
import Plans from "./Plans.js"

// users table associations
User.belongsTo(User, {
    as: 'sponsor',
    foreignKey: 'sponsor_id'
})

User.hasMany(User, {
    foreignKey: 'sponsor_id',
    as: "downlines"
})

Wallet_transaction.hasMany(User, {
    foreignKey: 'id',
    as: 'wallet_transactions'
})

Wallet_transaction.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
})


Plans.belongsTo(User, {
    foreignKey: "id",
    as: "plan_users"
});
Plans.hasOne(User, {
    foreignKey: "plan_id",
    as: "user_plans"
})