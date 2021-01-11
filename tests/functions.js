
const users = [
    {
        name: 'Nikole',
        password: '1234'
    },
    {
        name: 'lili',
        password: '12345'
    }
];

function logIn(user) {
    if (users.find(currUser =>{ currUser.name == user.name & currUser.password == user.password}).length)
        return true;
    return false;
}

// module.exports = funct