import { useState } from "react";
import {
  FaPlayCircle,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaFileAlt,
} from "react-icons/fa";
import ReactPlayer from "react-player";

const sections = [
  {
    title: "Introduction",
    lectures: [
      {
        title: "Welcome",
        duration: "05:30",
        url: "https://youtu.be/P_QWKPJwFOE",
        resources: ["welcome.pdf"],
      },
      {
        title: "How to use this course",
        duration: "08:10",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        resources: ["guide.pdf"],
      },
      {
        title: "Course overview",
        duration: "06:20",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        resources: [],
      },
    ],
  },
  {
    title: "Chapter 1: Basics",
    lectures: [
      {
        title: "Setup environment",
        duration: "07:45",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        resources: ["setup.zip"],
      },
      {
        title: "Hello World App",
        duration: "10:12",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        resources: [],
      },
    ],
  },
];

export default function CourseWatch() {
  const flatLectures = sections.flatMap((s) => s.lectures);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [note, setNote] = useState("");

  const currentVideo = flatLectures[currentIndex];

  const progress = Math.round((completed.length / flatLectures.length) * 100);

  const markCompleted = () => {
    if (!completed.includes(currentIndex)) {
      setCompleted([...completed, currentIndex]);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const goNext = () => {
    if (currentIndex < flatLectures.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Video Player */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Progress bar */}
        <div className="mb-3">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{progress}% progress</p>
        </div>

        <div className="bg-black rounded-lg overflow-hidden">
          <ReactPlayer
            url={currentVideo.url}
            width="100%"
            height="620px"
            controls
            playbackRate={playbackRate}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() =>
                setPlaybackRate(
                  playbackRate === 1 ? 1.5 : playbackRate === 1.5 ? 2 : 1
                )
              }
            >
              {playbackRate}x
            </button>
            <button
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={markCompleted}
            >
              <FaCheckCircle className="inline mr-1" /> Make Done!
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

        {/* Video Title & Description */}
        <h1 className="text-2xl font-bold mt-4">{currentVideo.title}</h1>
        <p className="text-gray-600 mt-2">
          This is short description of the video content. It provides an
          overview of what you will learn in this section.
        </p>

        {/* Resources */}
        {currentVideo.resources.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Included file</h3>
            <ul className="list-disc ml-6 mt-2">
              {currentVideo.resources.map((res, idx) => (
                <li key={idx}>
                  <a href={`#`} className="text-blue-600 flex items-center">
                    <FaFileAlt className="mr-2" /> {res}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Notes */}
        <div className="mt-6">
          <h3 className="font-semibold">Note</h3>
          <textarea
            className="w-full border rounded p-2 mt-2"
            rows={4}
            placeholder="Viết ghi chú ở đây..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        {/* Q&A */}
        <div className="mt-6">
          <h3 className="font-semibold">Q&A</h3>
          <p className="text-sm text-gray-500">this is function Q&A</p>
        </div>
      </div>

      {/* Course Content */}
      <div className="w-full md:w-96 border-l border-gray-200 bg-white overflow-y-auto p-4">
        <h2 className="text-lg font-semibold mb-4">Content course</h2>
        {sections.map((section, idx) => (
          <div key={idx} className="mb-4">
            <h3 className="font-medium text-gray-800">{section.title}</h3>
            <div className="mt-2">
              {section.lectures.map((lecture, lidx) => {
                const flatIndex =
                  sections
                    .slice(0, idx)
                    .reduce((acc, s) => acc + s.lectures.length, 0) + lidx;
                return (
                  <div
                    key={lidx}
                    onClick={() => setCurrentIndex(flatIndex)}
                    className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-100 ${
                      flatIndex === currentIndex ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-center">
                      <FaPlayCircle className="text-blue-500 mr-2" />
                      <span className="text-sm">{lecture.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {completed.includes(flatIndex) && (
                        <FaCheckCircle className="text-green-500" />
                      )}
                      <span className="text-xs text-gray-500">
                        {lecture.duration}
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
