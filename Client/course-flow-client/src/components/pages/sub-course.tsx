import { Star } from "lucide-react";

function SubCourse({ id }: { id: number }) {
  return (
    <div
      key={id}
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
    >
      <img
        src={`/khoa-hoc-dem-hat-Piano.jpg`}
        alt=""
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold">Course {id}</h3>
        <p className="text-sm text-gray-500">Jane Smith</p>
        <div className="text-yellow-500 flex items-center space-x-1 text-sm">
          <Star size={14} fill="currentColor" /> <span>4.7</span>
        </div>
      </div>
    </div>
  );
}

export default SubCourse;
