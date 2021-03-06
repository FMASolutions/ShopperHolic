//Note; Implemented as UserProfileDTO in security of Infrastructure layer.
export class UserAccount
{
    userID: number = 0;
    userRoleTypeID: number = 0;
    username: string = "";
    emailAddress: string = "";
    password: string = ""; //Plain text password only to be used for when updating the users password.
    knownAs: string = "";
}