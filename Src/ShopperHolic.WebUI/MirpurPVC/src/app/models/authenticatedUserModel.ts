import {UserClaim} from './userClaim';

export class AuthenticatedUserModel {
    username: string = "";
    bearerToken: string = "";
    isAuthenticated: boolean = false;
    claims: UserClaim[] = [];
}