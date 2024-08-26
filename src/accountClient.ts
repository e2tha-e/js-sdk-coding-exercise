const db = {
    'john.doe@test.com:password1': {
        accountId: '123',
        name: 'john doe',
        email: 'john.doe@test.com',
    },
};

export default class AccountClient {

    async login(email, password) {

        return new Promise((resolve, reject) => {
            const loginStr = email + ':' + password;

            if (db[loginStr]) {
                // Selecting the fields to return as opposed to returning the entire db object.
                // This is to avoid returning sensitive data.
                const { accountId, name, email } = db[loginStr];

                resolve({ accountId, name, email });
            }

            throw 'Unknown user';

        });

    }

}
