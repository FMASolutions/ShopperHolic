import { CustomerLogin } from '../../security/customerLogin';
import { SupplierLogin } from '../../security/supplierLogin';

export class UserDetailed{
    userID: number = 0;
    userRoleTypeID: number = 0;
    username: string = "";
    emailAddress: string = "";
    password: string = ""; //Plain text password only to be used for when updating the users password.
    knownAs: string = "";
    customerLogins: CustomerLogin[] = [];
    supplierLogins: SupplierLogin[] = [];
}