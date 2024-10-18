import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import z from "zod";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type JobsType =
  | {
      id: number;
      createdAt: Date | null;
      recruiterId: number;
      title: string;
      companyId: number;
      description: string;
      location: string;
      requirements: string;
      isOpen: boolean;
    }
  | undefined;

type PropsType = {
  user?: any;
  job: JobsType;
  applied: boolean;
  refetch: () => void;
  companyName: string;
};

const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

const JobDrawer = ({ applied, job, refetch, user, companyName }: PropsType) => {
  // const {} = useForm({
  //   resolver: zodResolver({}),
  // });

  const {} = useForm({
    resolver: zodResolver(),
  });

  return (
    <>
      <Drawer open={applied ? false : undefined}>
        <DrawerTrigger asChild>
          <Button
            variant={"blue"}
            disabled={!job?.isOpen || applied}
            size="sm"
            className="self-center"
          >
            apply now
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                apply for {job?.title} at {companyName}
              </DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <form action="">
              <Input
                type="text"
                placeholder="Years of experience (comma seperated)"
                className="flex-1"
              />
            </form>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default JobDrawer;
