import type { FunctionComponent } from "react";
import { Card } from "../ui/card";

interface SliderPageProps {}

const SliderPage: FunctionComponent<SliderPageProps> = () => {
  return (
    <Card className="w-full p-4 flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2">
        <div className="mb-3">
          <span className="opacity-70 text-sm">Learning Path/</span>
          <span className="opacity-70 text-sm bg-[#F3F1EF] ml-1">
            Product Manager
          </span>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Be a Good Product Manager
          </h2>
          <p className="text-left opacity-80 text-sm md:text-base">
            A product manager is a professional responsible for overseeing the
            development and success of a product from conception to launch and
            beyond. They act as
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 hidden justify-center md:flex">
        <img
          src="/slider.png"
          alt="slider"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </Card>
  );
};

export default SliderPage;
