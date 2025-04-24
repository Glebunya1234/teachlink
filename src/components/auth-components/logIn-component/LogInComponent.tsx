"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import styles from "./LogInComponent.module.scss";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/provider/AuthProvider";
import useUserSession from "@/store/user-session";
import { PathPJ } from "@/utils/path";
import { AuthSchema, AuthSchemaType } from "@/validations/shemas";

const LogInComponent = () => {
  const { getSessionUser } = useUserSession();
  const { signInUserPassword, updateData } = useAuth();
  const router = useRouter();
  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: AuthSchemaType) => {
    const { error } = await signInUserPassword(values.email, values.password);
    if (error) {
      form.setError("email", {
        message: "Check your email",
      });

      form.setError("password", {
        message: "Check your password",
      });

      return;
    }

    const user = await updateData();
    
    
    if (!user || !user.role) {
      return;
    }

    router.replace(
      getSessionUser?.role === "tutors"
        ? PathPJ.tutorProfile
        : PathPJ.studentProfile
    );
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.LogInComponent}
      >
        <div className={styles.LogInComponent_HeaderWrapper}>
          <h1 className={styles.HeaderWrapper_H1}>Login</h1>
          <span className={styles.HeaderWrapper_span}>
            Enter your email below to login to your account
          </span>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@gmail.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={styles.LogInComponent_Button}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LogInComponent;
