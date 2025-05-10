"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import BackButton from "../back-button/BackButton";

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
import { Spans } from "@/helpers/span-objects-auth";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { PathPJ } from "@/utils/path";
import { AuthSchema, AuthSchemaType } from "@/validations/shemas";

const LogInComponent = () => {
  const { signInUserPassword } = useAuthStore((state) => state);
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: AuthSchemaType) => {
    try {
      setLoading(true);

      const { error } = await signInUserPassword(values.email, values.password);

      if (error) {
        form.setError("email", {
          message: "Check your email",
        });

        form.setError("password", {
          message: "Check your password",
        });
        toast({
          title: "Error",
          duration: 2000,
          description: "An error occurred during Log in.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        duration: 2000,
        description: "Log in successful.",
        variant: "default",
      });
      router.replace(PathPJ.tutors);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        duration: 2000,
        description: "An error occurred during Log in.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.LogInComponent}
      >
        <div className={styles.LogInComponent_HeaderWrapper}>
          <div className={styles.HeaderWrapper_H1}>
            <h1>Login</h1>
            <BackButton />
          </div>
          <span>{Spans.LoginDesc}</span>
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

        <Button disabled={loading ? true : false} type="submit">
          {loading ? <Loader2 className="animate-spin" /> : "Login"}
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
