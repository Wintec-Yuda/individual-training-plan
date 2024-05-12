"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { categoriesList, golongansList } from "@/lib/data";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import coursesInstance from "@/instances/courses";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import { addCourse, editCourse } from "@/store/slices/courses";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  code: z.string({ required_error: "Code is required" }),
  name: z.string({ required_error: "Name is required" }),
  golongans: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  categories: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  duration: z.string({ required_error: "Duration is required" }),
  target: z.string({ required_error: "Target is required" }),
  isActive: z.boolean().optional(),
});

export function CourseForm({ data }: any) {
  const [loading, setLoading] = useState(false);

  const mutableData = { ...data };
  if (data) {
    if (mutableData.categories) {
      mutableData.categories = mutableData.categories.map((label: string) => getCategoryIdByLabel(label));
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: mutableData.code || "",
      name: mutableData.name || "",
      golongans: mutableData.golongans || [],
      categories: mutableData.categories || [],
      duration: mutableData.duration || "",
      target: mutableData.target || "",
      isActive: mutableData.isActive,
    },
  });

  const dispatch = useDispatch();
  const session: any = useSession();

  if (session.status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const token: any = session.data?.token;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    values.categories = values.categories.map((categoryId) => getCategoryLabelById(categoryId));
    try {
      if (data) {
        const response = await coursesInstance.editCourse(values, data.id, token);
        dispatch(editCourse(values));
        successAlert(response.data.message);
      } else {
        const response = await coursesInstance.addCourse(values, token);
        dispatch(addCourse(values));
        successAlert(response.data.message);
      }
    } catch (error: any) {
      errorAlert(error.response.data.message);
    } finally {
      setLoading(false);
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Code</FormLabel>
              <FormControl>
                <Input className="text-black font-semibold" placeholder="Enter course code..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Name</FormLabel>
              <FormControl>
                <Input className="text-black font-semibold" placeholder="Enter course name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="golongans"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-white">Golongan</FormLabel>
              </div>
              <div className="grid grid-cols-5 gap-4">
                {golongansList.map((item: { id: string; label: string }) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="golongans"
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              className="bg-white"
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked ? field.onChange([...field.value, item.id]) : field.onChange(field.value?.filter((value) => value !== item.id));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-white">{item.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-white">Category</FormLabel>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {categoriesList.map((item: { id: string; label: string }) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              className="bg-white"
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked ? field.onChange([...field.value, item.id]) : field.onChange(field.value?.filter((value) => value !== item.id));
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-white">{item.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Duration</FormLabel>
              <FormControl>
                <Input className="text-black font-semibold" placeholder="Enter course duration..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="target"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Target</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter course target..." className="resize-none text-black font-semibold" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-2">
              <div className="space-y-0.5">
                <FormLabel className="text-white">{field.value ? "Active" : "Inactive"}</FormLabel>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-800" type="submit">
            {data ? "Edit Data" : "Add Data"}
          </Button>
        )}
      </form>
    </Form>
  );
}

const getCategoryLabelById = (categoryId: string) => {
  const category = categoriesList.find((category) => category.id === categoryId);
  return category ? category.label : "Unknown";
};

const getCategoryIdByLabel = (label: string) => {
  const category = categoriesList.find((category) => category.label === label);
  return category ? category.id : null;
};
