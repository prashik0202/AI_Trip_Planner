"use client";
import React from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { budget, people } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

// formschema
const formSchema = z.object({
  location: z
    .string()
    .min(3, { message: "Enter proper location" })
    .max(20, { message: "Enter less than 20 character" }),
  days: z.coerce
    .number()
    .min(2, { message: "Number of days must be atleast  days" })
    .max(30, { message: "Opps! exceded number of days" }),
  people: z.enum(["solo", "friends", "family", "couple"]),
  budget: z.enum(["low", "medium", "high"]),
});

const GeneratePage = () => {
  const router = useRouter();
  const { toast } = useToast();
  // loading state
  const [loading, setLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    // fetching the post api and send the form data
    try {
      console.log("Loading.....");
      setLoading(true);
      const response = await fetch("/api/google-ai", {
        body: JSON.stringify(values),
        method: "POST",
      });
      setLoading(false);
      toast({
        variant: "default",
        title: "Success!",
        description: "AI has created a tripe plan for you",
      });
      if (response.ok) {
        router.push("/plans");
      }
      console.log(await response.json());
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "AI is facing issue",
      });
    }
  }

  return (
    <div className="w-full lg:w-1/2 md:p-20">
      <div className="flex flex-col justify-start items-center gap-5 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full p-10"
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl font-bold">
                Design your Holiday with AI ✨
              </h1>
              <p className="text-sm md:text-xl">
                Where you can get your trip plan within seconds and you just
                need to pack your bags 🌴🍸
              </p>
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Destination Place"
                      {...field}
                      className={"bg-neutral-200 p-5"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Days</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Number of days"
                      className={"bg-neutral-200 p-5"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className={"bg-neutral-200 p-5"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {budget.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="people"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>People</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className={"bg-neutral-200 p-5"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your trip type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {people.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="flex justify-center"
              disabled={loading}
            >
              {loading ? <span>Loading...</span> : "Generate ✨"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default GeneratePage;
