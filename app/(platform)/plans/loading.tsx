import { Loader2 } from "lucide-react";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <Loader2 className="h-20 w-20 animate-spin" />
    </div>
  );
};

export default LoadingPage;
