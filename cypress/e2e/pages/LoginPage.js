import BasePage from "./BasePage";
const routes = require('../config/routes');
import { ENDPOINT_PREFIX } from "../config/constants";

class LoginPage extends BasePage{

    get passwordInput() { return cy.get('input[id="password"]'); }
    get signInBtn() { return cy.get('button[type="submit"]'); }
    get alertMsg() { return cy.get('#account-login .alert'); }
    get userNameInput(){return cy.get('input[id="username"]')}

    open() {
        //cy.visit('?route=account/login');   //Prefixes the baseUrl
        //cy.visit(Cypress.env('URL'));   //loads the URL from env object in cypress.config.js
        return super.open(ENDPOINT_PREFIX + routes.LOGIN_ENDPOINT)
    }

    openRegistrationPage() {
        this.open();
        this.continueBtn.click();
    }

    loginWithUI(email, password) {
        this.open();
        this.userNameInput.type(email)
        this.passwordInput.type(password)
        this.signInBtn.click()

    }

}


export default new LoginPage();

