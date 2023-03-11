export class LoginData {
    username?: string;
    refreshToken?: string;
    exp?: number;
    tokenIndex?: number
    
    constructor(username?: string, refreshToken?: string, exp?: number, tokenIndex?: number) {
        this.username = username;
        this.refreshToken = refreshToken;
        this.exp = exp;
        this.tokenIndex = tokenIndex;
    }
}

export class AuthData {
    loginData: LoginData = new LoginData();
    jwt?: string;

    constructor(loginData: LoginData, jwt?: string) {
        this.loginData = loginData;
        this.jwt = jwt;
    }
}

export type JwtData = {
    username: string;
    scopes: string[];
    exp: number;
}

export function isRefreshTokenExpired(loginData: LoginData): boolean {
    if (!loginData.exp) {
        return true;
    }
    const now = new Date().getTime() / 1000;
    return loginData.exp < now;
}

export function isJwtExpired() {
    return 9
}

export class LoginParams {
    username?: string;
    password?: string;

    constructor(username?:string, password?:string) {
        this.username = username;
        this.password = password;
    }

    validate(): boolean {
        if (this.username != "" && this.password != "") {
            return true;
        }
        return false;
    }
}
