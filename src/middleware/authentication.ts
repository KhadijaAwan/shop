import jwt from "jsonwebtoken"

export const dynamic = "force-dynamic";

const AuthenticatedUser = async (request: any) => {
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token)
        return false;

    console.log(token);

    try {
        const getAuthenticatedUser = jwt.verify(token, "default_secret_key");
        if (getAuthenticatedUser) {
            return getAuthenticatedUser;
        }

    } catch (error) {
        console.log(error);
    }
}

export default AuthenticatedUser;