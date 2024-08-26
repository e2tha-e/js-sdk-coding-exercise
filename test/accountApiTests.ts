import should from 'should';
import AccountApi from '../src/accountApi';

describe('accountApi', () => {

    it('should log user in', async () => {

        const accountApi = new AccountApi();
        const accountInfo = await accountApi.login('john.doe@test.com', 'password1');

        should(accountInfo).deepEqual({
            accountId: '123',
            name: 'john doe',
            email: 'john.doe@test.com',
        });

    });

    it('should not find user', () => {

        const accountApi = new AccountApi();

        accountApi.login('missing-user@test.com', 'n/a').should.be.rejectedWith("Unknown user");

    });
});
