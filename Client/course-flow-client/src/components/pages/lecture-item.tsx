import { FaPlayCircle } from "react-icons/fa";
import { formatDuration } from "../utils/util";

function LectureItem({ title, duration }: { title: string; duration: number }) {
  const newDuration = formatDuration(duration);
  return (
    <div className="flex items-center justify-between py-1 text-sm text-gray-700">
      <div className="flex items-center">
        <FaPlayCircle className="text-blue-500 mr-2" />
        <span>{title}</span>
      </div>
      <span className="text-gray-500">{newDuration}</span>
    </div>
  );
}
export default LectureItem;
