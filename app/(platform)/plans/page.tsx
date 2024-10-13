"use client";
import React from "react";
import database from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { ExternalLinkIcon, StepBack } from "lucide-react";
import Link from "next/link";

const page = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const userId = user?.id;

  const [loading, setLoading] = React.useState<boolean>(false);
  const [item, setItem] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const collection_ref = collection(database, "plans");
      const q = query(collection_ref, where("userId", "==", userId));
      const doc_refs = await getDocs(q);
      const data = doc_refs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data().trip.tripDetails,
      }));

      console.log(data);
      setItem(data);
      setLoading(false);
    };
    if (isLoaded) {
      fetchItems();
    }
  }, [userId, isLoaded]);

  function budgetBackground(budget: string) {
    if (budget === "High") return "bg-yellow-400";
    else if (budget === "Medium") return "bg-emerald-400";
    return "bg-sky-400";
  }

  return (
    <div className="p-10 md:p-32 h-full">
      <div className="flex justify-start gap-10">
        <h1 className="text-4xl">Your AI Generated Trips</h1>
        <Button asChild>
          <Link href={"/generate"}>
            <StepBack className="h-4 w-4 mr-3" />
            Generate
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10">
        {loading && (
          <>
            <Skeleton className="h-[250px] w-full rounded-xl bg-neutral-200" />
            <Skeleton className="h-[250px] w-full rounded-xl bg-neutral-200" />
          </>
        )}
        {item &&
          item.map((trip, index) => (
            <Card
              className="shadow-xl bg-gradient-to-br from-green-100 to-yellow-100"
              key={index}
            >
              <CardHeader>
                <CardTitle className="text-3xl">✨ {trip.location}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1">
                <h1 className="text-md text-neutral-700">
                  Duration : {trip.duration}
                </h1>
                <h1 className="text-md text-neutral-700">
                  People : {trip.travelers}
                </h1>
              </CardContent>
              <CardFooter className="flex justify-between gap-3 items-center">
                <span
                  className={`${budgetBackground(
                    trip.budget
                  )} py-1 px-3 w-fit rounded-full`}
                >
                  {trip.budget}
                </span>
                <Button variant={"ghost"} className="hover:bg-inherit" asChild>
                  <Link href={`/plans/${trip.id}`}>
                    Open
                    <ExternalLinkIcon className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default page;
