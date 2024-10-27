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
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { FaPlus, FaReply } from "react-icons/fa";
import { useRef } from "react";
import { usePostReplyMutation } from "../api/reply.api";

const schema = z.object({
  content: z.string().min(1, { message: "post content is required" }),
});

type props = {
  userId: number;
  commentId: number;
};

const AddReplyDrawer = ({ userId, commentId }: props) => {
  const { mutateAsync } = usePostReplyMutation();
  const querryclient = useQueryClient();
  const ref = useRef<HTMLButtonElement | null>(null);

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
        userId,
        commentId,
      });
      await querryclient.refetchQueries({ queryKey: ["get-comments"] });
      await querryclient.refetchQueries({ queryKey: ["get-reply"] });
      reset();
      ref.current?.click();
    } catch (error) {
      console.log("error in reply submission: ", error);
    }
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant={"link"} size="sm" className="mb-3 self-start">
            <FaReply className="mr-3" />
            Reply
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Add reply</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <form>
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

export default AddReplyDrawer;