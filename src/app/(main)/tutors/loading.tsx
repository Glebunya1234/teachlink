import { Loader2 } from "lucide-react";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen ">
      <Loader2 className="animate-spin" />
    </div>
  );
};
export default Loading;
