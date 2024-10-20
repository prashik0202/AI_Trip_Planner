import React from "react";
import database from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import { StepBack } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import PlanCard from "./_compoents/PlanCard";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const PlansPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  let plans = [];
  if (user) {
    const collection_ref = collection(database, "plans");
    const q = query(collection_ref, where("userId", "==", user.id));
    const doc_refs = await getDocs(q);
    plans = doc_refs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data().trip.tripDetails,
    }));
  }

  console.log(plans);
  const item = plans;
  console.log(item);

  return (
    <div className="p-4 md:p-32 h-full">
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
        {item &&
          item.map((trip, index) => <PlanCard key={index} trip={trip} />)}
      </div>
    </div>
  );
};

export default PlansPage;
