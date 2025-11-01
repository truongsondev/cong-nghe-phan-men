import type {
  ApiResponse,
  imageKitResponse,
  SignInResponse,
  SignUpResponse,
  TTLResponse,
} from "@/dto/response/auth.response.dto";
import { endpoint } from "../constants/shared.constant";
import { EndpointService } from "./endpoint.service";
import type { authRequest } from "@/dto/request/auth.request.dto";
class AuthenService {
  private static instance: AuthenService;

  //singleton pattern
  public static getInstance(): AuthenService {
    if (!AuthenService.instance) {
      AuthenService.instance = new AuthenService();
    }
    return AuthenService.instance;
  }

  public async login(data: authRequest) {
    const endpointService = EndpointService.getInstance();
    const url = endpoint.auth.v1.signin;
    return await endpointService.postEndpoint<ApiResponse<SignInResponse>>(
      url,
      data
    );
  }

  public async register(data: authRequest) {
    const endpointService = EndpointService.getInstance();
    const url = endpoint.auth.v1.signup;
    return await endpointService.postEndpoint<ApiResponse<SignUpResponse>>(
      url,
      data
    );
  }

  public async verifyOtp(data: { email: string; otp: string }) {
    const endpointService = EndpointService.getInstance();
    const url = endpoint.auth.v1.verifyOtp;
    return await endpointService.postEndpoint(url, data);
  }

  public async getTTL(emailToken: string) {
    const endpointService = EndpointService.getInstance();
    const url = `${endpoint.auth.v1.getTtl}?emailToken=${emailToken}`;
    console.log(url);
    return await endpointService.getEndpoint<ApiResponse<TTLResponse>>(url);
  }

  public async getSignedUrl() {
    const endpointService = EndpointService.getInstance();
    const url = endpoint.auth.v1.getSignatureUrl;
    return await endpointService.getEndpoint<ApiResponse<imageKitResponse>>(
      url
    );
  }

  public async checkRole(userId: string) {
    const endpointService = EndpointService.getInstance();
    const url = endpoint.auth.v1.checkRole;
    return await endpointService.postEndpoint<ApiResponse<string>>(url, userId);
  }
}

const authenService = AuthenService.getInstance();
export default authenService;
