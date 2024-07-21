import * as jwt from "jsonwebtoken";

const data = {
    extensions: "codecache",
    publisher: "fgrreloaded",
    name: "CodeCache",
};

let generatedToken: any = null;

export const generateToken = () => {
    if (generatedToken) {
        return generatedToken;
    }
    const token = jwt.sign(data, "C293EAbwBB49KAsK349TOxt04HgmKAwng_ypSjGlt_Q");
    generatedToken = token;
    return token;
};
