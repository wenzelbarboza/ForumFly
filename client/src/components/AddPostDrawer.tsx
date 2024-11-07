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
import { FieldValues, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { useCreatePostMutation } from "../api/post.api";
import { useQueryClient } from "@tanstack/react-query";
import { FaPlus } from "react-icons/fa";
import { useRef } from "react";
import { useUserStore } from "../zustand/UserStore";

const schema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  content: z.string().min(1, { message: "post content is required" }),
});

type props = {
  userId: number;
};

const AddPostDrawer = ({ userId }: props) => {
  const { mutateAsync } = useCreatePostMutation();
  const querryclient = useQueryClient();
  const ref = useRef<HTMLButtonElement | null>(null);
  const userStore = useUserStore();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log(data);
      await mutateAsync({
        content: data.content,
        title: data.title,
        userId,
        photoUrl: userStore.user?.photoUrl as string,
      });
      await querryclient.refetchQueries({ queryKey: ["get-post"] });
      reset();
      ref.current?.click();
    } catch (error) {
      console.log("error in post submission: ", error);
    }
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant={"blue"}
            size="sm"
            className="text-white mb-3 self-start"
          >
            <FaPlus className="mr-2" />
            Add post
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>create post</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <form>
              <Input
                type="text"
                placeholder="title"
                className="flex-1 mb-3"
                {...register("title")}
              />
              <Textarea
                placeholder="write your post here"
                className="flex-1 mb-3"
                {...register("content")}
              />
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                variant="blue"
                className="w-full text-white mb-3"
              >
                Submit
              </Button>
            </form>
            <DrawerFooter className="w-full p-0">
              {errors.title && <p>{errors.title.message as string}</p>}
              {errors.content && <p>{errors.content.message as string}</p>}
              <DrawerClose asChild className="w-full">
                <Button ref={ref} variant="destructive" className="w-full mb-3">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddPostDrawer;
