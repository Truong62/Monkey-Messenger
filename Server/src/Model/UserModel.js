const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String },
        gamil: { type: String },
        password: { type: String },
        avatar: String,
        address: String,
        phone: { type: String },
        birthday: { type: Date }
    },
    {
        timestamps: true,
    }
);

UserSchema.plugin(mongoose_delete, { overrideMethods: "all" });

const User = mongoose.model("User", UserSchema);

module.exports = User;