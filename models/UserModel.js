const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const SendEmail = require("../utils/SendEmail");
const { RandomNumber } = require("../utils/RandomNumber");

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            validate: [validator.isEmail, "Provide a valid Email"],
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, "Email address is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: {
                validator: (value) =>
                    validator.isStrongPassword(value, {
                        minLength: 6,
                        minLowercase: 3,
                        minNumbers: 1,
                        minUppercase: 1,
                        minSymbols: 1,
                    }),
                message: "Password {VALUE} is not strong enough.",
            },
        },
        confirmPassword: {
            type: String,
            required: [true, "Please re-type your password"],
            validate: {
                validator: function (value) {
                    return value === this.password;
                },
                message: "Passwords don't match!",
            },
        },
        firstName: {
            type: String,
            required: [true, "Please provide a first name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"],
        },
        lastName: {
            type: String,
            required: [true, "Please provide a first name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"],
        },
        mobile: {
            type: String,
            required: [true, "User phone number required"],
            validate: {
                validator: function (v) {
                    let numberRegex =
                        /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
                    return numberRegex.test(v);
                },
                message: ({ value }) => `${value} is not a valid phone number!`,
            },
        },
        role: {
            type: String,
            enum: ["buyer", "manager", "admin"],
            default: "buyer",
        },
        avatar: {
            type: String,
        },
        status: {
            type: String,
            enum: ["inactive", "active", "blocked"],
            default: "active",
        },
        confirmationCode: String,
        confirmationCodeExpires: Date,
        codeStatus: Number,
    },
    { timestamps: true, versionKey: false }
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        //  only run if password is modified, otherwise it will change every time we save the user!
        return next();
    }

    // generate hashed password
    this.password = bcrypt.hashSync(this.password);
    this.confirmPassword = undefined;

    // generate confirmation code
    this.confirmationCode = RandomNumber();

    const date = new Date();
    date.setDate(date.getDate() + 1);
    this.confirmationCodeExpires = date;

    this.codeStatus = 0;

    next();
});

userSchema.post("save", function (doc) {
    const to = doc.email;
    const subject = "Verify Your Account";
    const text = `Your verification code - ${doc.confirmationCode}`;

    SendEmail(to, subject, text);
});

const User = mongoose.model("users", userSchema);

module.exports = User;
