import type {
  CourseNoteWatch,
  CourseWatchResponse,
} from "@/dto/response/course.response.dto";
import { passStringToJson } from "@/lib/utils";
import courseService from "@/services/course.service";
import {
  FaPlayCircle,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaFileAlt,
} from "react-icons/fa";

import { useParams } from "react-router";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";

export default function CourseWatch() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [course, setCourse] = useState<CourseWatchResponse | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [progress, setProgress] = useState<number>(0);
  const [note, setNote] = useState<CourseNoteWatch>({
    id: "",
    note: "",
    createdAt: "",
  });

  const flatLectures = useMemo(() => {
    if (!course?.sessions) return [];
    return course.sessions.flatMap((s) => s.lessons);
  }, [course]);

  const currentVideo = flatLectures[currentIndex];

  const markCompleted = () => {
    try {
      if (!completed.includes(currentIndex)) {
        setCompleted([...completed, currentIndex]);
      }
      courseService.markLectureCompleted(flatLectures[currentIndex].id || "");
    } catch (error) {
      toast.error("Error when marking lecture as completed.");
    }
  };

  const handleAddNote = async () => {
    try {
      const res = await courseService.addNote(
        user?.id || "",
        id || "",
        note.note,
        note.id || ""
      );
      if (res.data?.success) {
        toast.success("Note saved successfully.");
        setNote(res.data.data);
      }
    } catch (error) {
      toast.error("Error when write note.");
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goNext = () => {
    if (currentIndex < flatLectures.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userString = localStorage.getItem("user");
      const userJson = passStringToJson(userString);

      if (!id || !userJson) {
        toast.error("User data is invalid or missing. Please sign in again.");
        return;
      }

      try {
        const res = await courseService.getCourseForWatch(id, userJson.id);
        if (res.data?.data) {
          setCourse(res.data.data);
          setNote(res.data.data.note || { id: "", note: "", createdAt: "" });
          const completedLectures = res.data.data.sessions.flatMap(
            (s) => s.lessons
          );
          const progressCount = completedLectures.filter(
            (lesson) => lesson.lessionStatus
          ).length;
          setProgress((progressCount / completedLectures.length) * 100 || 0);
          const completedIndexes = completedLectures
            .map((lesson, index) => (lesson.lessionStatus ? index : -1))
            .filter((index) => index !== -1);
          setCompleted(completedIndexes);
        } else {
          toast.error("Không thể tải dữ liệu khóa học.");
        }
      } catch (error) {
        toast.error("Lỗi khi tải khóa học.");
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-3">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{
                width: `${progress ?? 0}%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {progress.toFixed(1) ?? 0}% completed
          </p>
        </div>

        <div className="bg-black rounded-lg overflow-hidden">
          {currentVideo ? (
            <div className="relative w-full pt-[56.25%] bg-black rounded-lg overflow-hidden">
              <video
                key={currentVideo?.id}
                src={currentVideo?.videoUrl || ""}
                controls
                className="absolute top-0 left-0 w-full h-full object-contain bg-black"
                onEnded={markCompleted}
                onLoadedMetadata={(e) => {
                  (e.currentTarget as HTMLVideoElement).playbackRate =
                    playbackRate;
                }}
              />
            </div>
          ) : (
            <div className="text-white text-center py-40">
              No video available.
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={() => markCompleted()}
            >
              <FaCheckCircle className="inline mr-1" /> Mark as Done
            </button>
          </div>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={goPrev}
              disabled={currentIndex === 0}
            >
              <FaArrowLeft />
            </button>
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={goNext}
              disabled={currentIndex === flatLectures.length - 1}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {currentVideo && (
          <>
            <h1 className="text-2xl font-bold mt-4">{currentVideo.title}</h1>
            <p className="text-gray-600 mt-2">
              {course?.description || "No description available."}
            </p>

            {currentVideo.docUrl && (
              <div className="mt-4">
                <h3 className="font-semibold">Tài liệu đi kèm</h3>
                <a
                  href={currentVideo.docUrl}
                  className="text-blue-600 flex items-center mt-1"
                  target="_blank"
                >
                  <FaFileAlt className="mr-2" /> {currentVideo.docUrl}
                </a>
              </div>
            )}
          </>
        )}

        <div className="mt-6">
          <h3 className="font-semibold">Note</h3>
          <textarea
            className="w-full border rounded p-2 mt-2"
            rows={4}
            placeholder="Write note in here..."
            value={note.note}
            onChange={(e) => setNote({ ...note, note: e.target.value })}
          />
          <button
            onClick={() => handleAddNote()}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save note
          </button>
        </div>
      </div>

      <div className="w-full md:w-96 border-l border-gray-200 bg-white overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Course content</h2>
        {course?.sessions?.map((section, sIdx) => (
          <div key={section.id} className="mb-4">
            <h3 className="font-medium text-gray-800">{section.title}</h3>
            <div className="mt-2">
              {section.lessons.map((lesson, lIdx) => {
                const flatIndex =
                  course.sessions
                    .slice(0, sIdx)
                    .reduce((acc, s) => acc + s.lessons.length, 0) + lIdx;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => setCurrentIndex(flatIndex)}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 ${
                      flatIndex === currentIndex ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <FaPlayCircle className="text-blue-500 mr-2" />
                      <span className="text-sm">{lesson.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {completed.includes(flatIndex) && (
                        <FaCheckCircle className="text-green-500" />
                      )}
                      <span className="text-xs text-gray-500">
                        {lesson.duration ? `${lesson.duration}m` : "--"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
