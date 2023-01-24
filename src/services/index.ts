import axios from '../utils/axios';
import AuthService from "./AuthService";
import AccountService from "./AccountService"


const authService = new AuthService(axios);

const accountService = new AccountService(axios);

export { authService, accountService } 