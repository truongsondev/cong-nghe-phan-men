import AccountStep from "@/components/pages/account-step-payment";
import PaymentStep from "@/components/pages/paymentStep";
import ReviewStep from "@/components/pages/review-step";
import Step from "@/components/pages/step";
import SuccessStep from "@/components/pages/successStep";
import { currency } from "@/components/utils/format";
import { useEffect, useMemo, useState } from "react";
import { FaShieldAlt } from "react-icons/fa";

// ======= MOCK COURSE DATA =======
const course = {
  id: "react-pro-001",
  title: "ReactJS Từ Cơ Bản Đến Nâng Cao",
  description:
    "Nắm vững React, Hooks, Routing, tối ưu hiệu năng và triển khai dự án thực tế.",
  thumbnail:
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop",
  price: 999000,
  salePrice: 499000,
  features: [
    "Truy cập trọn đời",
    "Cập nhật bài học miễn phí",
    "Chứng chỉ hoàn thành",
  ],
};

const COUPONS = {
  UDEMY20: 0.2,
  HELLO10: 0.1,
};

export default function CheckoutPagePro() {
  const [step, setStep] = useState(1); // 1: Account, 2: Payment, 3: Review, 4: Success
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [method, setMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [bank, setBank] = useState("Vietcombank");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState<number | null>(null);

  const [agreed, setAgreed] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Countdown
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);
  useEffect(() => {
    const id = setInterval(
      () => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)),
      1000
    );
    return () => clearInterval(id);
  }, []);
  const timeLeft = useMemo(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, [secondsLeft]);

  const basePrice = course.salePrice ?? course.price;
  const discount = couponApplied ? Math.round(basePrice * couponApplied) : 0;
  const total = Math.max(basePrice - discount, 0);

  const isEmailValid = /.+@.+\..+/.test(email);
  const isCardNumberValid = /^(\d{4} \d{4} \d{4} \d{4})$/.test(cardNumber);
  const isExpiryValid = /^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry);
  const isCvvValid = /^(\d{3})$/.test(cvv);

  const canPay =
    agreed &&
    ((method === "card" &&
      isCardNumberValid &&
      isExpiryValid &&
      isCvvValid &&
      cardName.length > 2) ||
      method === "bank" ||
      method === "paypal");

  function applyCoupon() {
    const key = coupon.trim().toUpperCase();
    if (key in COUPONS) {
setCouponApplied(COUPONS[key as keyof typeof COUPONS]);
    } else {
      setCouponApplied(null);
      alert("Mã giảm giá không hợp lệ");
    }
  }

  function handlePay() {
    if (!canPay) return;
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setOrderId("CF" + Math.random().toString(36).slice(2, 10).toUpperCase());
      setStep(4);
    }, 1200);
  }
  const canContinueAccount = name.length > 1 && isEmailValid;
  return (
    <div className="p-6 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Main content with steps */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stepper */}
          <div className="rounded-2xl border bg-white/80 backdrop-blur p-4 shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              <Step
                index={1}
                title="Tài khoản"
                active={step === 1}
                done={step > 1}
              />
              <Step
                index={2}
                title="Thanh toán"
                active={step === 2}
                done={step > 2}
              />
              <Step
                index={3}
                title="Xem lại"
                active={step === 3}
                done={step > 3}
              />
            </div>
            <div className="h-1 mt-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${(Math.min(step, 3) - 1) * 50 + 1}%` }}
              />
            </div>
          </div>

          {/* Card */}
          <div className="rounded-2xl border bg-white p-6 shadow-md">
            {step === 1 && (
              <AccountStep
                name={name}
                email={email}
                setName={setName}
                setEmail={setEmail}
                isEmailValid={isEmailValid}
                canContinueAccount={canContinueAccount}
                timeLeft={timeLeft}
                basePrice={basePrice}
                setStep={setStep}
                course={course}
              />
            )}
            {step === 2 && (
              <PaymentStep
                agreed={agreed}
                setAgreed={setAgreed}
                cardName={cardName}
                setCardName={setCardName}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                expiry={expiry}
                setExpiry={setExpiry}
                cvv={cvv}
                setCvv={setCvv}
                isCardNumberValid={isCardNumberValid}
                isExpiryValid={isExpiryValid}
                isCvvValid={isCvvValid}
                bank={bank}
                setBank={setBank}
                setStep={setStep}
                method={method}
                setMethod={setMethod}
/>
            )}
            {step === 3 && (
              <ReviewStep
                coupon={coupon}
                setCoupon={setCoupon}
                couponApplied={couponApplied}
                course={course}
                handlePay={handlePay}
                setStep={setStep}
                canPay={canPay}
                isPaying={isPaying}
                total={total}
                applyCoupon={applyCoupon}
              />
            )}
            {step === 4 && <SuccessStep orderId={orderId} email={email} />}
          </div>
        </div>

        {/* RIGHT: Order summary sticky */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-6 space-y-4">
            <div className="rounded-2xl border bg-white overflow-hidden shadow-md">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-end gap-2 mt-3">
                  <div className="text-2xl font-bold text-blue-600">
                    {currency(basePrice)}
                  </div>
                  {course.salePrice && (
                    <div className="text-sm text-gray-500 line-through">
                      {currency(course.price)}
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>{currency(basePrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giảm giá</span>
                    <span className="text-emerald-600">
                      - {currency(discount)}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-gray-800">
                    <span>Thành tiền</span>
                    <span>{currency(total)}</span>
                  </div>
                </div>

                {step < 4 && (
                  <button
                    onClick={() => (step < 3 ? setStep(step + 1) : handlePay())}
                    className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:from-blue-700 hover:to-indigo-700"
                  >
                    {step < 3 ? "Tiếp tục" : `Thanh toán ${currency(total)}`}
                  </button>
                )}

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500">
<FaShieldAlt /> Bảo mật bởi 256-bit SSL
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <h4 className="font-semibold mb-2">Cam kết</h4>
              <ul className="text-sm text-gray-600 space-y-1 list-disc ml-5">
                <li>Hoàn tiền trong 7 ngày nếu không hài lòng</li>
                <li>Hỗ trợ kỹ thuật trong quá trình học</li>
                <li>Cộng đồng học viên riêng tư</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}