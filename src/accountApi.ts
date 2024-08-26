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
     * @param {Boolean} password
     * @returns {Object} The account object.
     *
     */
    async login(email, password) {
        (<any>this).accountClient.login(email, password);
    }

}
