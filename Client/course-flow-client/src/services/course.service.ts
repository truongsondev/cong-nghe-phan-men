import type { ApiResponse } from "@/dto/response/auth.response.dto";
import { endpoint } from "../constants/shared.constant";
import { EndpointService } from "./endpoint.service";
import type {
  CategoriesResponse,
  CourseEditReponse,
  CourseHomeResponse,
  CourseInstructorResponse,
  CourseNoteWatch,
  CourseReponse,
  CourseWatchResponse,
  Reviews,
} from "@/dto/response/course.response.dto";
class CourseService {
  private static instance: CourseService;

  //singleton pattern
  public static getInstance(): CourseService {
    if (!CourseService.instance) {
      CourseService.instance = new CourseService();
    }

    return CourseService.instance;
  }

  /** get API for all course */
  public getCourseListForInstructor() {
    const endpointService = EndpointService.getInstance();
    const url = endpoint.course.v1.getAll;
    return endpointService.getEndpoint<ApiResponse<CourseInstructorResponse[]>>(
      url
    );
  }

  public getCourse(limit: number) {
    const endpointService = EndpointService.getInstance();
    const url = endpoint.course.v1.getCourse + "/" + limit;

    return endpointService.getEndpoint<ApiResponse<CourseHomeResponse[]>>(url);
  }

  public getCourseForDetail(courseId: string, userId: string) {
    const endpointService = EndpointService.getInstance();
    const url =
      endpoint.course.v1.getCourseForDetail + "/" + courseId + "/" + userId;

    return endpointService.getEndpoint<ApiResponse<CourseReponse | null>>(url);
  }

  public getReviewForCourse(courseId: string) {
    const endpointService = EndpointService.getInstance();
    const url = endpoint.course.v1.getReviewForCourse + "/" + courseId;

    return endpointService.getEndpoint<ApiResponse<Reviews[]>>(url);
  }

  public getCourseForWatch(courseId: string, userId: string) {
    const endpointService = EndpointService.getInstance();
    const url =
      endpoint.course.v1.getCourseForWatch + "/" + courseId + "/" + userId;

    return endpointService.getEndpoint<ApiResponse<CourseWatchResponse | null>>(
      url
    );
  }

  public getAllCategories() {
    const endpointService = EndpointService.getInstance();
    const url = endpoint.course.v1.getAllCategories;
    return endpointService.getEndpoint<ApiResponse<CategoriesResponse[]>>(url);
  }

  public createCourse(data: any) {
    const endpointService = EndpointService.getInstance();
    const url = endpoint.course.v1.createCourse;
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    return endpointService.postEndpoint<ApiResponse<any>>(url, data, config);
  }

  public getCourseForEdit(courseId: string) {
    const endpointService = EndpointService.getInstance();
    const url = `${endpoint.course.v1.getEditCourse}/${courseId}`;
    return endpointService.getEndpoint<ApiResponse<CourseEditReponse>>(url);
  }

  public editCourse(course: any) {
    const endpointService = EndpointService.getInstance();
    const url = `${endpoint.course.v1.editCourse}`;
    return endpointService.putEndpoint<ApiResponse<CourseEditReponse>>(
      url,
      course
    );
  }
  public addReview(
    courseId: string,
    userId: string,
    rating: number,
    comment: string
  ) {
    const endpointService = EndpointService.getInstance();
    const url = `${endpoint.course.v1.reviewCourse}`;
    const body = {
      courseId,
      userId,
      rating,
      comment,
    };
    return endpointService.postEndpoint<ApiResponse<CourseEditReponse>>(
      url,
      body
    );
  }

  public addNote(
    userId: string,
    courseId: string,
    noteData: string,
    noteId: string
  ) {
    const endpointService = EndpointService.getInstance();
    const url = `${endpoint.course.v1.addNote}`;
    const body = {
      courseId,
      userId,
      noteData,
      noteId,
    };
    return endpointService.postEndpoint<ApiResponse<CourseNoteWatch>>(
      url,
      body
    );
  }

  public searchCourse(query: string) {
    const endpointService = EndpointService.getInstance();
    const url = `${endpoint.course.v1.searchCourse}?query=${query}`;
    return endpointService.getEndpoint<ApiResponse<CourseHomeResponse[]>>(url);
  }

  public markLectureCompleted(lessionId: string) {
    const endpointService = EndpointService.getInstance();
    const url = `${endpoint.course.v1.markDoneLecture}`;
    return endpointService.patchEndpoint<ApiResponse<any>>(url, { lessionId });
  }
}

const courseService = CourseService.getInstance();
export default courseService;
