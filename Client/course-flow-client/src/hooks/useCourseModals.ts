import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { ACTION } from "@/constants/action";

export const useCourseModals = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const action = searchParams.get("action") as ACTION | null;
  const courseId = searchParams.get("id") ?? null;

  const openModal = (type: ACTION, id?: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("action", type);
    if (id) newParams.set("courseId", id);
    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  const closeModal = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("action");
    newParams.delete("courseId");
    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  return { action, courseId, openModal, closeModal };
};
