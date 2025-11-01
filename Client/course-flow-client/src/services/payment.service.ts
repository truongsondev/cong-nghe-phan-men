import type { ApiResponse } from "@/dto/response/auth.response.dto";
import { endpoint } from "../constants/shared.constant";
import { EndpointService } from "./endpoint.service";

class PaymentService {
  private static instance: PaymentService;

  //singleton pattern
  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }

    return PaymentService.instance;
  }

  public getCourseListForInstructor() {}

  public createPayment(courseId: string, userId: string, amount: number) {
    const endpointService = EndpointService.getInstance();
    const url = endpoint.payment.v1.createPayment;
    return endpointService.postEndpoint<ApiResponse<string>>(url, {
      courseId,
      userId,
      amount,
    });
  }
}

const paymentService = PaymentService.getInstance();
export default paymentService;
