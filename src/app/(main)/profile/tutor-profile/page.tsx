/* eslint-disable no-console */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import styles from "../profile.module.scss";

import { AvatarProfile } from "@/components/avatar-profile/AvatarProfile";
import { AvatarDialog } from "@/components/dialogs/avatar-dialog/AvatarDialog";
import { ConfirmDeleteDialog } from "@/components/dialogs/confirm-dialog/ConfirmDelete";
import {
  AgeInputForm,
  CityInputForm,
  DegreeSelectForm,
  DescTextAreaForm,
  EducationInputsForm,
  EmailInputForm,
  ExperienceSelectForm,
  FullNameInputsForm,
  GraduationYearInputsForm,
  MiniDescTextAreaForm,
  OnlineSwithForm,
  PhoneInputForm,
  SexInputForm,
  ShowInfoSwithForm,
  SubjectSelectForm,
  WageSelectForm,
} from "@/components/form-components/form-teacher";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Spans } from "@/helpers/span-objects-profile";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/provider/Store-Provider/auth-provider";
import { TeacherQuery } from "@/quaries";
import { ImagesQuery } from "@/quaries/images";
import { getChangedFields } from "@/utils/dirty-fields/dirty-fields";
import { PathPJ } from "@/utils/path";
import {
  ProfileTicherSchema,
  ProfileTicherSchemaType,
} from "@/validations/shemas";
const ProfilePage = () => {
  const form = useForm<ProfileTicherSchemaType>({
    resolver: zodResolver(ProfileTicherSchema),
    defaultValues: {
      full_name: "",
      phone_number: "",
      show_info: false,
      price: undefined,
      experience: "",
      school_subjects: [{ subject: "" }],
      educational_institution: "",
      year_of_end: undefined,
      degree: "",
      city: "",
      online: false,
      mini_description: "",
      description: "",
      age: undefined,
      sex: "",
    },
  });
  const { getSessionUser, updateData } = useAuthStore((state) => state);
  const avatarUrl =
    getSessionUser?.currentUser?.avatarUrl || PathPJ.defaultAvatar;

  const userId = getSessionUser?.user?.id;
  const token = getSessionUser?.session?.access_token;
  const { toast } = useToast();
  const TeacherFunc = () => {
    if (!userId) {
      throw new Error("User ID is missing");
    }
    return TeacherQuery().teachersDetail(userId);
  };

  const FuncRemove = () => {
    try {
      if (!userId || !token || !getSessionUser?.currentUser?.avatarId) {
        throw new Error("User ID is missing");
      }
      return ImagesQuery(token).imagesDelete({
        avatar_id: getSessionUser.currentUser.avatarId,
        for_teacher: true,
        uid: userId,
      });
    } catch (error) {
      console.log("first", error);
    }
  };
  const HandleRemove = async () => {
    await FuncRemove();
    await updateData().then(() => {
      toast({
        title: "Success",
        duration: 2000,
        description: "Avatar removed successfully.",
        variant: "default",
      });
    });
  };

  const { data: teacher } = useQuery({
    queryKey: ["teacher", getSessionUser?.user?.id],
    queryFn: TeacherFunc,
    enabled: !!getSessionUser?.user?.id,
  });

  async function onSubmit(data: z.infer<typeof ProfileTicherSchema>) {
    const changedFields = getChangedFields(data, form.formState.dirtyFields);

    if (
      getSessionUser?.user?.id === undefined ||
      getSessionUser?.session?.access_token === undefined
    )
      return;

    try {
      await TeacherQuery(
        getSessionUser.session.access_token
      ).teachersPartialUpdate(getSessionUser.user.id, changedFields);
      await updateData();
      toast({
        title: "Success",
        duration: 2000,
        description: "Profile updated successfully.",
        variant: "default",
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
            <AvatarProfile avatarUrl={avatarUrl} />
            <AvatarDialog entity={"teacher"} uid={userId} token={token} />
            <ConfirmDeleteDialog onConfirm={HandleRemove} />
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
                  fullname={teacher?.data.full_name}
                />
              </div>
              <div className={styles.ConnectInfo_Inputs}>
                <PhoneInputForm
                  form={form}
                  styles={styles}
                  phone={teacher?.data.phone_number}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ProfilePage_ShowInfo}>
          <h2>{Spans.ShowInfo}</h2>
          <Separator className={styles.ProfilePage_Separator} />

          <div className={styles.ShowInfo_Wrapper}>
            <ShowInfoSwithForm
              form={form}
              styles={styles}
              show_info={teacher?.data.show_info}
            />
          </div>
        </section>

        <section className={styles.ProfilePage_SubjectsInfo}>
          <h2>{Spans.Subjects}</h2>
          <Separator className={styles.ProfilePage_Separator} />

          <div className={styles.SubjectsInfo_Wrapper}>
            <WageSelectForm
              form={form}
              styles={styles}
              wage={teacher?.data.price}
            />
          </div>
          <div className={styles.SubjectsInfo_Wrapper}>
            <ExperienceSelectForm
              form={form}
              styles={styles}
              experience={teacher?.data.experience}
            />
          </div>
          <div className={styles.SubjectsInfo_Wrapper}>
            <SubjectSelectForm
              form={form}
              styles={styles}
              subjects={teacher?.data.school_subjects}
            />
          </div>
        </section>

        <section className={styles.ProfilePage_EducationInfo}>
          <h2>{Spans.Education}</h2>
          <Separator className={styles.ProfilePage_Separator} />

          <div className={styles.EducationInfo_Wrapper}>
            <EducationInputsForm
              form={form}
              styles={styles}
              education={teacher?.data.educational_institution}
            />
          </div>

          <div className={styles.EducationInfo_Wrapper}>
            <DegreeSelectForm
              form={form}
              styles={styles}
              degree={teacher?.data.degree}
            />
          </div>

          <div className={styles.EducationInfo_Wrapper}>
            <GraduationYearInputsForm
              form={form}
              styles={styles}
              greaduation_year={teacher?.data.year_of_end}
            />
          </div>
        </section>

        <section className={styles.ProfilePage_LessonsInfo}>
          <h2>{Spans.Lessons}</h2>
          <Separator className={styles.ProfilePage_Separator} />

          <div className={styles.LessonsInfo_Wrapper}>
            <CityInputForm
              form={form}
              styles={styles}
              city={teacher?.data.city}
            />
          </div>

          <div className={styles.LessonsInfo_Wrapper}>
            <OnlineSwithForm
              form={form}
              styles={styles}
              online={teacher?.data.online ?? false}
            />
          </div>
        </section>

        <section className={styles.ProfilePage_AboutInfo}>
          <h2>{Spans.About}</h2>
          <Separator className={styles.ProfilePage_Separator} />

          <div className={styles.AboutInfo_Wrapper}>
            <MiniDescTextAreaForm
              form={form}
              styles={styles}
              mini_desc={teacher?.data.mini_description}
            />
          </div>

          <div className={styles.AboutInfo_Wrapper}>
            <DescTextAreaForm
              form={form}
              styles={styles}
              desc={teacher?.data.description}
            />
          </div>
        </section>

        <section className={styles.ProfilePage_AdditionalInfo}>
          <h2>{Spans.AdInfo}</h2>
          <Separator className={styles.ProfilePage_Separator} />

          <div className={styles.AdditionalInfo_Wrapper}>
            <AgeInputForm form={form} styles={styles} age={teacher?.data.age} />
          </div>
          <div className={styles.AdditionalInfo_Wrapper}>
            <SexInputForm form={form} styles={styles} sex={teacher?.data.sex} />
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
export default ProfilePage;
