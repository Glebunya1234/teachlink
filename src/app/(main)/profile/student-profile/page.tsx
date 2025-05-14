"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import styles from "../profile.module.scss";

import { AvatarEditor } from "@/components/avatar-editor/AvatarEditor";
import {
  AgeInputForm,
  CityInputForm,
  EmailInputForm,
  FullNameInputsForm,
  PhoneInputForm,
  SexInputForm,
} from "@/components/form-components/form-student";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Spans } from "@/helpers/span-objects-profile";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { StudentQuery } from "@/quaries";
import { PathPJ } from "@/utils/path";
import {
  ProfileStudentSchema,
  ProfileStudentSchemaType,
} from "@/validations/shemas";

const ProfileStudentPage = () => {
  const form = useForm<ProfileStudentSchemaType>({
    resolver: zodResolver(ProfileStudentSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
      city: "",
      age: undefined,
      sex: "",
    },
  });

  const { getSessionUser, updateData } = useAuthStore((state) => state);
  const avatarUrl =
    getSessionUser?.currentUser?.avatarUrl || PathPJ.defaultAvatar;
  const { toast } = useToast();
  const userId = getSessionUser?.user?.id;
  const Func = () => {
    if (!userId) {
      throw new Error("User ID is missing");
    }
    return StudentQuery().studentsDetail(userId);
  };
  const { data: student } = useQuery({
    queryKey: ["student", getSessionUser?.user?.id],
    queryFn: Func,
    enabled: !!getSessionUser?.user?.id,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getChangedFields<T>(data: T, dirtyFields: any): Partial<T> {
    return Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key as keyof T] = data[key as keyof T];
      return acc;
    }, {} as Partial<T>);
  }

  async function onSubmit(data: z.infer<typeof ProfileStudentSchema>) {
    const changedFields = getChangedFields(data, form.formState.dirtyFields);
    if (
      getSessionUser?.user?.id === undefined ||
      getSessionUser?.session?.access_token === undefined
    )
      return;

    try {
      await StudentQuery(
        getSessionUser.session.access_token
      ).studentsPartialUpdate(getSessionUser.user.id, changedFields);

      await updateData().then(() => {
        toast({
          title: "Success",
          duration: 2000,
          description: "Profile updated successfully.",
          variant: "default",
        });
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Failed to update profile.",
        duration: 2000,
        description: `${error?.response?.data || "Please try again later"}`,
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={styles.ProfilePage}
      >
        <section className={styles.ProfilePage_BannerInfo}>
          <h1>{Spans.Banner}</h1>
        </section>

        <section className={styles.ProfilePage_ConnectInfo}>
          <h2>{Spans.Connect}</h2>
          <Separator className={styles.ProfilePage_Separator} />
          <div className={styles.ConnectInfo_Container}>
            <AvatarEditor
              avatarUrl={avatarUrl}
              entity={"student"}
              uid={userId}
            />
            <div className={styles.ConnectInfo_Wrapper}>
              <div className={styles.ConnectInfo_Inputs}>
                <EmailInputForm
                  styles={styles}
                  email={getSessionUser?.user?.email}
                />
              </div>
              <div className={styles.ConnectInfo_Inputs}>
                <FullNameInputsForm
                  form={form}
                  styles={styles}
                  fullname={student?.data.full_name}
                />
              </div>
              <div className={styles.ConnectInfo_Inputs}>
                <PhoneInputForm
                  form={form}
                  styles={styles}
                  phone={student?.data.phone_number}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ProfilePage_LessonsInfo}>
          <h2>{Spans.Lessons}</h2>
          <Separator className={styles.ProfilePage_Separator} />

          <div className={styles.LessonsInfo_Wrapper}>
            <CityInputForm
              form={form}
              styles={styles}
              city={student?.data.city}
            />
          </div>
        </section>

        <section className={styles.ProfilePage_AdditionalInfo}>
          <h2>{Spans.AdInfo}</h2>
          <Separator className={styles.ProfilePage_Separator} />

          <div className={styles.AdditionalInfo_Wrapper}>
            <AgeInputForm form={form} styles={styles} age={student?.data.age} />
          </div>
          <div className={styles.AdditionalInfo_Wrapper}>
            <SexInputForm form={form} styles={styles} sex={student?.data.sex} />
          </div>
        </section>
        <section className={styles.ProfilePage_Buttons}>
          <Button
            variant="default"
            type="submit"
            className={styles.ProfilePage_SaveButton}
          >
            Save
          </Button>
        </section>
      </form>
    </Form>
  );
};
export default ProfileStudentPage;
