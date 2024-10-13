import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { AnimatedBeamDemo } from "./_component/animatedBeam";
import Link from "next/link";

const page = () => {
  return (
    <div className="p-5 md:p-10 lg:p-32 flex flex-col justify-center items-center gap-5">
      <h1 className="text-5xl md:text-6xl lg:text-8xl text-purple-400">
        TravelAI
      </h1>
      <h2 className="text-3xl md:text-4xl lg:text-5xl">
        Welcome to Your AI Travel Planner
      </h2>
      <p className="text-md text-muted-foreground text-center">
        Our AI-powered travel planner takes the hassle out of organizing your
        next vacation. <br />
        Just enter your destination, budget, number of people, and trip
        duration,
        <br /> and let our intelligent system craft the perfect itinerary for
        you!
      </p>
      {/* <AnimatedBeamDemo /> */}
      <Button className="mt-5 w-full md:w-fit" size={"lg"} asChild>
        <Link href={"/generate"} className="flex justify-between items-center">
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default page;
