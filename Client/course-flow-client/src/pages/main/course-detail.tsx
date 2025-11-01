import { Star, Users, Clock } from "lucide-react";
import LectureItem from "@/components/pages/lecture-item";
import SubCourse from "@/components/pages/sub-course";
import { useEffect, useState } from "react";
import type { Reviews } from "@/dto/response/course.response.dto";
import { useNavigate, useParams } from "react-router";
import courseService from "@/services/course.service";
import { passStringToJson } from "@/lib/utils";
import { toast } from "sonner";
import { formatDuration } from "@/components/utils/util";
import { useCourse } from "@/contexts/course-context";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { course, setCourse } = useCourse();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const navigate = useNavigate();

  const fetchCourseAndReviews = async (courseId: string, userId: string) => {
    const res = await courseService.getCourseForDetail(courseId, userId);
    setCourse(res.data.data);

    const reviewRes = await courseService.getReviewForCourse(courseId);
    setReviews(reviewRes.data.data);
  };

  useEffect(() => {
    (async () => {
      try {
        const user = localStorage.getItem("user");
        const userObj = passStringToJson(user);
        if (!userObj) {
          toast.error("User data is invalid or missing. Please sign in again.");
          return;
        }
        if (!id) return;
        await fetchCourseAndReviews(id, userObj.id);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [id]);

  const handleSubmitReview = async () => {
    if (!reviewText.trim()) {
      toast.warning("Please write something before submitting.");
      return;
    }
    try {
      const user = localStorage.getItem("user");
      const userObj = passStringToJson(user);
      if (!userObj) {
        toast.error("User not found. Please sign in again.");
        return;
      }
      await courseService.addReview(
        id! || "",
        userObj.id || "",
        rating || 5,
        reviewText || ""
      );

      await fetchCourseAndReviews(id!, userObj.id);

      toast.success("Review submitted successfully!");
      setShowReviewForm(false);
      setReviewText("");
      setRating(5);
    } catch (err) {
      toast.error("Failed to submit review.");
    }
  };

  const handleLearning = () => {
    navigate(`/course/${course?.id}/watch`);
  };

  const handlePayment = () => {
    navigate(`/payment/${course?.id}`);
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight">
            {course?.title || "title"}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            {course?.description || "description"}
          </p>

          <div className="flex flex-wrap gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
              <span className="text-gray-800 font-semibold ml-1">
                {course?.avgRating || 5}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>{course?.studentCount || 0} students</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>
                {formatDuration(course?.totalDuration || 0) || 0} total
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Created by{" "}
            <span className="text-blue-600 font-medium hover:underline cursor-pointer">
              {course?.instructorName || "user"}
            </span>
          </p>

          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
            {course?.videoUrl ? (
              <video
                key={course.videoUrl}
                className="w-full h-full object-cover"
                src={course.videoUrl}
                controls
                controlsList="nodownload"
                preload="metadata"
                poster={course.thumbnailUrl}
              >
                Trình duyệt của bạn không hỗ trợ video.
              </video>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No preview available
              </div>
            )}
          </div>
        </div>

        <aside className="border rounded-2xl p-6 shadow-lg bg-white space-y-6">
          <img
            src={course?.thumbnailUrl}
            alt="Course Thumbnail"
            className="w-full h-48 object-cover rounded-xl"
          />

          <div className="text-3xl font-bold text-gray-900">
            ${course?.price || 0}
          </div>

          {!course?.isEnrolled && (
            <button
              onClick={() => handlePayment()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition"
            >
              Enroll Now
            </button>
          )}
          {course?.isEnrolled && (
            <button
              onClick={() => handleLearning()}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow hover:from-blue-700 hover:to-indigo-700 transition"
            >
              Learn now
            </button>
          )}

          <ul className="text-sm text-gray-600 space-y-2">
            <li>✅ Lifetime access</li>
            <li>✅ Certificate of completion</li>
            <li>✅ Access on mobile and TV</li>
          </ul>
        </aside>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        <div className="border rounded-2xl overflow-hidden divide-y">
          {course &&
            course?.sessions.map((session) => (
              <details className="p-4 group" key={session.id}>
                <summary className="cursor-pointer font-semibold group-hover:text-blue-600">
                  {session.title} ({session.lessons.length} lectures)
                </summary>
                <ul className="mt-3 pl-4 text-sm text-gray-600 space-y-2">
                  {session.lessons.map((item, index) => (
                    <LectureItem
                      key={index}
                      title={item.title}
                      duration={item.duration}
                    />
                  ))}
                </ul>
              </details>
            ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Requirements</h2>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          {course &&
            course.requirements.map((requirement, index) => (
              <li key={index} className="text-gray-700">
                {requirement}
              </li>
            ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Description</h2>
        <p className="text-gray-600 leading-relaxed">
          {course?.description || "description"}
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
        {reviews && reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-800">
                    {review.user?.full_name || "Anonymous"}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                {review.comment && (
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">No reviews yet.</p>
        )}

        {course?.isEnrolled && (
          <div className="mt-8">
            {!showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow hover:bg-blue-700 transition"
              >
                Write a Review
              </button>
            )}

            {showReviewForm && (
              <div className="border rounded-2xl p-6 mt-4 space-y-4 bg-gray-50">
                <div>
                  <label className="block font-medium mb-1">Your Rating:</label>
                  <div className="flex gap-1 text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={22}
                        className="cursor-pointer"
                        fill={star <= rating ? "currentColor" : "none"}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">
                    Your Comment:
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review..."
                    className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                    rows={4}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSubmitReview}
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="bg-gray-300 text-gray-800 px-5 py-2 rounded-xl font-semibold hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <SubCourse key={id} id={id} />
          ))}
        </div>
      </section>
    </div>
  );
}
