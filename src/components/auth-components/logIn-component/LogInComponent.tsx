"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import { Spans } from "../span-objects";

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
import { useAuthStore } from "@/store/auth-provider";
import { PathPJ } from "@/utils/path";
import { AuthSchema, AuthSchemaType } from "@/validations/shemas";

const LogInComponent = () => {
  const { signInUserPassword } = useAuthStore();
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

    router.replace(PathPJ.tutors);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.LogInComponent}
      >
        <div className={styles.LogInComponent_HeaderWrapper}>
          <h1 className={styles.HeaderWrapper_H1}>Login</h1>
          <span className={styles.HeaderWrapper_span}>{Spans.LoginDesc}</span>
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
              <FormDescription>{Spans.Email}</FormDescription>
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
              <FormDescription>{Spans.Password}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className={styles.LogInComponent_Button}>
          Login
        </Button>

        <div className={styles.LogInComponent_FooterWrapper}>
          <span>Don't have an account?</span>
          <Button
            asChild
            variant="link"
            className={styles.FooterWrapper_Button}
          >
            <Link href={PathPJ.signup}>Sign Up</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LogInComponent;
