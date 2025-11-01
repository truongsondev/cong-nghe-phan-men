import axios, { type AxiosResponse } from "axios";
import { toast } from "sonner";
export class EndpointService {
  private static instance: EndpointService;

  private constructor() {}

  // Singleton pattern
  public static getInstance(): EndpointService {
    if (!EndpointService.instance) {
      EndpointService.instance = new EndpointService();
    }
    return EndpointService.instance;
  }

  // Generic request handler
  private async request<T>(requestFunc: () => Promise<T>): Promise<T> {
    try {
      return await requestFunc();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // GET request
  public getEndpoint<T>(
    endpoint: string,
    option?: any
  ): Promise<AxiosResponse<T>> {
    return this.request(() => axios.get<T>(endpoint, option));
  }

  // POST request
  public postEndpoint<T = any>(
    endpoint: string,
    data: any,
    option?: any
  ): Promise<AxiosResponse<T>> {
    return this.request(() => axios.post<T>(endpoint, data, option));
  }

  // PUT request
  public putEndpoint<T>(
    endpoint: string,
    data: any,
    option?: any
  ): Promise<AxiosResponse<T>> {
    return this.request(() => axios.put<T>(endpoint, data, option));
  }

  // PATCH request
  public patchEndpoint<T>(
    endpoint: string,
    data: any,
    option?: any
  ): Promise<AxiosResponse<T>> {
    return this.request(() => axios.patch<T>(endpoint, data, option));
  }

  // DELETE request
  public deleteEndpoint<T>(
    endpoint: string,
    option?: any
  ): Promise<AxiosResponse<T>> {
    return this.request(() => axios.delete<T>(endpoint, option));
  }

  //show error message
  public showErrorMessage(message: string): void {
    toast.error(message);
  }

  // handler for errors
  public handleError(error: any): void {
    if (axios.isAxiosError(error)) {
      this.showErrorMessage(
        error.response?.data?.message || "An error occurred"
      );
    } else {
      this.showErrorMessage("An error occurred");
    }
    return error;
  }
}
