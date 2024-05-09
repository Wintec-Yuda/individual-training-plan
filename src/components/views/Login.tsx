"use client";

import { useState } from "react";
import AuthLayout from "../templates/Auth";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { errorAlert, successAlert } from "@/utils/sweetalert";

const formSchema = z.object({
  userPrincipalName: z.string(),
});

const LoginView = () => {
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
    <AuthLayout title="Individual Training Plan">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="userPrincipalName"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>User principal name</FormLabel>
                  <FormControl>
                    <Input type="text" className="text-slate-950 font-semibold" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {loading ? (
            <Button disabled className="mt-3">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </Button>
          ) : (
            <Button type="submit" className="mt-3 bg-emerald-500 hover:bg-emerald-700">
              Login
            </Button>
          )}
        </form>
      </Form>
    </AuthLayout>
  );
};

export default LoginView;
