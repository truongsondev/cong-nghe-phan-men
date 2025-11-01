import type { CourseReponse } from "@/dto/response/course.response.dto";
interface AccountStepProps {
  name: string;
  email: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isEmailValid: boolean;
  canContinueAccount: boolean;
  timeLeft: string;
  basePrice: number;
  course: CourseReponse | null;
}

export default function AccountStep({
  name,
  email,
  setName,
  setEmail,
  isEmailValid,

  canContinueAccount,
  setStep,
}: AccountStepProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Họ và tên</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
            className="mt-1 w-full rounded-xl border border-gray-300 bg-white/60 backdrop-blur p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email nhận hoá đơn</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ban@vidu.com"
            className={`mt-1 w-full rounded-xl border p-3 focus:outline-none focus:ring-2 ${
              email && !isEmailValid
                ? "border-red-400 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {email && !isEmailValid && (
            <p className="text-xs text-red-500 mt-1">Email không hợp lệ.</p>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          disabled={!canContinueAccount}
          onClick={() => setStep(2)}
          className={`px-5 py-3 rounded-xl text-white transition shadow ${
            canContinueAccount
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
