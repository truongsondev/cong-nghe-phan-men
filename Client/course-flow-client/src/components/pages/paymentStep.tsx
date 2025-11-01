import {
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaCreditCard,
  FaUniversity,
} from "react-icons/fa";
import { maskCard, maskExpiry } from "../utils/format";
interface PaymentStepProps {
  agreed: boolean;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
  cardName: string;
  setCardName: React.Dispatch<React.SetStateAction<string>>;
  cardNumber: string;
  setCardNumber: React.Dispatch<React.SetStateAction<string>>;
  expiry: string;
  setExpiry: React.Dispatch<React.SetStateAction<string>>;
  cvv: string;
  setCvv: React.Dispatch<React.SetStateAction<string>>;
  isCardNumberValid: boolean;
  isExpiryValid: boolean;
  isCvvValid: boolean;
  bank: string;
  setBank: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<string>>;
}
export default function PaymentStep({
  agreed,
  setAgreed,
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  expiry,
  setExpiry,
  cvv,
  setCvv,
  isCardNumberValid,
  isExpiryValid,
  isCvvValid,
  bank,
  setBank,
  setStep,
  method,
  setMethod,
}: PaymentStepProps) {
  return (
    <div className="space-y-6">
      {/* Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <button
          onClick={() => setMethod("card")}
          className={`p-4 rounded-2xl border flex items-center justify-center gap-2 transition ${
            method === "card"
              ? "border-blue-600 ring-2 ring-blue-100 bg-white"
              : "border-gray-200 bg-white/60"
          }`}
        >
          <FaCreditCard /> Thẻ tín dụng
        </button>
        <button
          onClick={() => setMethod("bank")}
          className={`p-4 rounded-2xl border flex items-center justify-center gap-2 transition ${
            method === "bank"
              ? "border-blue-600 ring-2 ring-blue-100 bg-white"
              : "border-gray-200 bg-white/60"
          }`}
        >
          <FaUniversity /> Ngân hàng nội địa
        </button>
        <button
          onClick={() => setMethod("paypal")}
          className={`p-4 rounded-2xl border flex items-center justify-center gap-2 transition ${
            method === "paypal"
              ? "border-blue-600 ring-2 ring-blue-100 bg-white"
              : "border-gray-200 bg-white/60"
          }`}
        >
          <FaCcPaypal /> PayPal
        </button>
      </div>

      {/* Forms */}
      {method === "card" && (
        <div className="rounded-2xl border p-4 bg-white shadow-sm pointer-events-none opacity-60">
          <span className="text-red-500">
            This payment method is not working.
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Tên in trên thẻ</label>
              <input
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="NGUYEN VAN A"
                className="mt-1 w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Số thẻ</label>
              <div className="relative">
                <input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(maskCard(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  className={`mt-1 w-full rounded-xl border p-3 pr-12 focus:outline-none focus:ring-2 ${
                    cardNumber && !isCardNumberValid
                      ? "border-red-400 focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 flex gap-1">
                  <FaCcVisa size={26} /> <FaCcMastercard size={26} />
                </div>
              </div>
              {cardNumber && !isCardNumberValid && (
                <p className="text-xs text-red-500 mt-1">
                  Số thẻ không hợp lệ.
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Ngày hết hạn</label>
              <input
                value={expiry}
                onChange={(e) => setExpiry(maskExpiry(e.target.value))}
                placeholder="MM/YY"
                className={`mt-1 w-full rounded-xl border p-3 focus:outline-none focus:ring-2 ${
                  expiry && !isExpiryValid
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {expiry && !isExpiryValid && (
                <p className="text-xs text-red-500 mt-1">Định dạng MM/YY.</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">CVV</label>
              <input
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/[^\d]/g, "").slice(0, 3))
                }
                placeholder="123"
                className={`mt-1 w-full rounded-xl border p-3 focus:outline-none focus:ring-2 ${
                  cvv && !isCvvValid
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {cvv && !isCvvValid && (
                <p className="text-xs text-red-500 mt-1">
                  CVV 3 số mặt sau thẻ.
                </p>
              )}
            </div>
          </div>
          <div className="flex items-start gap-2 mt-4">
            <input
              id="agree"
              type="checkbox"
              className="mt-1"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="agree" className="text-sm text-gray-600">
              Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.
            </label>
          </div>
        </div>
      )}

      {method === "bank" && (
        <div className="rounded-2xl border p-4 bg-white shadow-sm">
          <label className="text-sm font-medium">Chọn ngân hàng</label>
          <select
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="mt-1 w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>VN pay</option>
          </select>
          <p className="text-sm text-gray-500 mt-2">
            Sau khi bấm thanh toán, bạn sẽ được chuyển đến cổng thanh toán của
            ngân hàng để xác thực giao dịch.
          </p>
          <div className="flex items-start gap-2 mt-4">
            <input
              id="agree2"
              type="checkbox"
              className="mt-1"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="agree2" className="text-sm text-gray-600">
              Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.
            </label>
          </div>
        </div>
      )}

      {method === "paypal" && (
        <div className="rounded-2xl border p-4 bg-white shadow-sm pointer-events-none opacity-60">
          <span className="text-red-500">
            This payment method is not working.
          </span>
          <p className="text-sm text-gray-600">
            Bạn sẽ được chuyển đến PayPal để hoàn tất thanh toán an toàn.
          </p>
          <div className="flex items-start gap-2 mt-4">
            <input
              id="agree3"
              type="checkbox"
              className="mt-1"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="agree3" className="text-sm text-gray-600">
              Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => setStep(1)}
          className="px-5 py-3 rounded-xl border border-gray-300 hover:bg-gray-50"
        >
          Quay lại
        </button>
        <button
          onClick={() => setStep(3)}
          disabled={!agreed || (method === "card" && !isCardNumberValid)}
          className={`px-5 py-3 rounded-xl text-white transition shadow ${
            agreed
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Xem lại & xác nhận
        </button>
      </div>
    </div>
  );
}
