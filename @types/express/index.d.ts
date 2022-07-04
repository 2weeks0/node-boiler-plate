import { IUserDocument } from "../../server/src/models/User";

declare global{
    namespace Express {
        interface Request {
            user: IUserDocument;
            token: string;
        }
    }
}