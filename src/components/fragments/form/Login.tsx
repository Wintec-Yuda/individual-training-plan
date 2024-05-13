"use client"; 

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { errorAlert, successAlert } from "@/utils/sweetalert";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  userPrincipalName: z.string(),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userPrincipalName: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        userPrincipalName: data.userPrincipalName,
      });

      if (res?.ok) {
        successAlert("Success to login");
        router.push("/dashboard");
      } else {
        errorAlert("Failed to login");
      }
    } catch {
      errorAlert("Failed to login");
    } finally {
      setLoading(false);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4 ">
        <FormField
          control={form.control}
          name="userPrincipalName"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>SAM Account Name</FormLabel>
                <FormControl>
                  <Input type="text" className="font-semibold" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {loading ? (
          <Button disabled className="mt-3 text-lg bg-emerald-700">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </Button>
        ) : (
          <Button type="submit" className="mt-3 text-lg bg-emerald-500 hover:bg-emerald-700">
            Login
          </Button>
        )}
      </form>
    </Form>
  );
};

export default LoginForm;
