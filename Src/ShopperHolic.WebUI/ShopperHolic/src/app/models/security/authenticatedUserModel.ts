import { UserClaim } from './userClaim';

export class AuthenticatedUserModel {
    username: string = "";
    bearerToken: string = "";
    refreshToken: string = "";
    isAuthenticated: boolean = false;
    userClaims: UserClaim[] = [];
}