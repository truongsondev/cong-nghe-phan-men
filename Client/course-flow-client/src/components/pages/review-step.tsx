import { FaShieldAlt } from "react-icons/fa";
import { currency } from "../utils/format";
import type { CourseReponse } from "@/dto/response/course.response.dto";

interface ReviewStepProps {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  course: CourseReponse | null;

  handlePay: () => void;
  canPay: boolean;
  isPaying: boolean;
  total: number;
}

export default function ReviewStep({
  setStep,

  course,
  handlePay,
  canPay,
  isPaying,
  total,
}: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border p-4 bg-white shadow-sm">
        <h4 className="font-semibold mb-3">Tóm tắt đơn hàng</h4>
        <ul className="text-sm text-gray-700 ml-5 space-y-1 list-disc">
          <li>Khóa học: {course?.title}</li>
          <li>Giảng viên: {course?.instructorName ?? "Đang cập nhật"}</li>
          <li>
            Giá:{" "}
            {course?.price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4 border">
        <div className="flex items-center gap-2 text-gray-700">
          <FaShieldAlt />
          <span className="text-sm">Thanh toán bảo mật chuẩn PCI DSS</span>
        </div>
        <div className="text-sm">Hỗ trợ 24/7</div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep(2)}
          className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-50"
        >
          Quay lại
        </button>
        <button
          onClick={handlePay}
          disabled={!canPay || isPaying}
          className={`px-6 py-3 rounded-xl text-white shadow transition ${
            canPay
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isPaying ? "Đang xử lý..." : `Thanh toán ${currency(total)}`}
        </button>
      </div>
    </div>
  );
}
