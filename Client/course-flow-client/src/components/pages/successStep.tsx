import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function SuccessStep() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const responseCode = searchParams.get("vnp_ResponseCode");
  const txnRef = searchParams.get("vnp_TxnRef");

  const isSuccess = responseCode === "00";

  return (
    <div className="text-center py-16 px-4">
      <div
        className={`inline-flex w-20 h-20 items-center justify-center rounded-full text-4xl ${
          isSuccess
            ? "bg-emerald-100 text-emerald-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {isSuccess ? <FaCheckCircle /> : <FaTimesCircle />}
      </div>

      <h3 className="text-2xl font-bold mt-6">
        {isSuccess
          ? "Thanh toán thành công!"
          : "Thanh toán thất bại hoặc bị hủy"}
      </h3>

      <p className="text-gray-600 mt-2">
        Mã giao dịch:{" "}
        <span className="font-mono bg-gray-100 px-2 py-1 rounded">
          {txnRef || "Không xác định"}
        </span>
      </p>

      {isSuccess && (
        <p className="max-w-md mx-auto text-gray-600 text-sm mt-3">
          Cảm ơn bạn đã tin tưởng đăng ký khóa học. Bạn có thể bắt đầu học ngay
          hoặc xem lại chi tiết đơn hàng trong trang tài khoản.
        </p>
      )}

      <div className="flex items-center justify-center gap-4 mt-8">
        {isSuccess ? (
          <>
            <button
              onClick={() => navigate("/my-courses")}
              className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              My course
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
            >
              Return Home
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/courses")}
            className="px-5 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            Quay lại cửa hàng
          </button>
        )}
      </div>
    </div>
  );
}
