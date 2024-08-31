module.exports = function Users(mongoose) {
    let usersschema = new mongoose.Schema({
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Please enter a valid email']
        },
        mobileno: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        hobby: {
            type: Array,
            required: true
        }
    });
    let users = mongoose.model('users', usersschema);
    return users;
}