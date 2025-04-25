"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import BackButton from "../back-button/BackButton";
import { Spans } from "../span-objects";

import styles from "./SignUpComponent.module.scss";

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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth-provider";
import { PathPJ } from "@/utils/path";
import { AuthSchema, AuthSchemaType } from "@/validations/shemas";

const SignUpComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const signUpUserPassword = useAuthStore((state) => state.signUpUserPassword);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      isTeacher: "teacher",
    },
  });

  const onSubmit = async (values: AuthSchemaType) => {
    try {
      setLoading(true);
      if (values.username === undefined || values.isTeacher === undefined) {
        return;
      }

      const { error } = await signUpUserPassword(
        values.username,
        values.email,
        values.password,
        values.isTeacher
      );

      if (error) {
        form.setError("username", {
          message: "Check your username",
        });
        form.setError("email", {
          message: "Check your email",
        });

        form.setError("password", {
          message: "Check your password",
        });
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          duration: 2000,
          description: "This user may already be registered!",
        });
        return;
      }

      toast({
        title: "Success",
        duration: 2000,
        description: "Sign Up successful.",
        variant: "default",
      });

      router.replace(
        values.isTeacher == "teacher"
          ? PathPJ.tutorProfile
          : PathPJ.studentProfile
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.SignUpComponent}
      >
        <div className={styles.SignUpComponent_HeaderWrapper}>
          <div className={styles.HeaderWrapper_H1}>
            <h1>Sign Up</h1>
            <BackButton />
          </div>
          <span className={styles.HeaderWrapper_span}>{Spans.SignDesc}</span>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>{Spans.Name}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@gmail.com" {...field} />
              </FormControl>
              <FormDescription> {Spans.Email}</FormDescription>
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

        <FormField
          control={form.control}
          name="isTeacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who are you?</FormLabel>
              <FormControl>
                <Tabs
                  defaultValue="teacher"
                  onValueChange={(value) => {
                    field.onChange(value === "teacher" ? "teacher" : "student");
                  }}
                >
                  <TabsList className="w-full">
                    <TabsTrigger
                      value="teacher"
                      className={`w-full ${
                        field.value === "teacher" ? "active" : ""
                      }`}
                    >
                      Teacher
                    </TabsTrigger>
                    <TabsTrigger
                      value="student"
                      className={`w-full ${
                        field.value === "student" ? "active" : ""
                      }`}
                    >
                      Student
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading ? true : false} type="submit">
          {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpComponent;
