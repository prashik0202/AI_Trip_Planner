import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

interface PlanCardProps {
  location: string;
  duration: string;
  travelers: string;
  budget: string;
  id: string;
}

const PlanCard = ({ trip }: { trip: PlanCardProps }) => {
  function budgetBackground(budget: string) {
    if (budget === "High") return "bg-yellow-400";
    else if (budget === "Medium") return "bg-emerald-400";
    return "bg-neutral-400";
  }

  return (
    <Card className="shadow-xl bg-gradient-to-br from-green-100 to-yellow-100">
      <CardHeader>
        <CardTitle className="text-3xl">✨ {trip.location}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <h1 className="text-md text-neutral-700">Duration : {trip.duration}</h1>
        <h1 className="text-md text-neutral-700">People : {trip.travelers}</h1>
      </CardContent>
      <CardFooter className="flex justify-between gap-3 items-center">
        <span
          className={`${budgetBackground(
            trip.budget
          )} py-1 px-3 w-fit rounded-full font-bold text-sm`}
        >
          {trip.budget}
        </span>
        <Button variant={"default"} className="font-bold" asChild>
          <Link href={`/plans/${trip.id}`}>
            Open
            <ExternalLinkIcon className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlanCard;
