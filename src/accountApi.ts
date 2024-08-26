import AccountClient from './accountClient';

/**
 *
 */
export default class AccountApi {

    /**
     *
     */
    constructor() {

        (<any>this).accountClient = new AccountClient();

    }

    /**
     *
     * @param {String} email
     * @param {String} password
     * @returns {Promise<Object>} The account object.
     *
     */
    async login(email, password): Promise<Object> {

        return await (<any>this).accountClient.login(email, password);

    }

}
