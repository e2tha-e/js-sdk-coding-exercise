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

            if (db[email + ':' + password]) {
                resolve({
                    accountId: '123',
                    name: 'john',
                    email,
                });
            }

            throw 'Unknown user';

        });
    }

}
