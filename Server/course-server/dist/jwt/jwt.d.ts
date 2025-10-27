declare class JWTClient {
    createTokenPair: (privateKey: string, payload: object) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    verifyToken: (token: string, secretOrPublicKey: string) => Promise<any>;
}
export default JWTClient;
