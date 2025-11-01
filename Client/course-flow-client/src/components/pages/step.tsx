import { FaCheckCircle } from "react-icons/fa";

interface StepProps {
  index: number;
  active: boolean;
  done: boolean;
  title: string;
}

export default function Step({ index, active, done, title }: StepProps) {
  return (
    <div className="flex items-center">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 ${
          done
            ? "bg-green-500 text-white border-green-500"
            : active
            ? "bg-blue-600 text-white border-blue-600 shadow"
            : "bg-white text-gray-600 border-gray-300"
        }`}
      >
        {done ? <FaCheckCircle /> : index}
      </div>
      <div className="ml-2 text-sm font-medium">{title}</div>
    </div>
  );
}
