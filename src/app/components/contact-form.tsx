"use client";

import Link from "next/link";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useTranslation } from "react-i18next";

import { Check, Loader2 } from "lucide-react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { textColor, fontSize, fontWeight, buttonStyles } from "../styles/theme";

export function ContactForm() {
  const { t } = useTranslation("common", { keyPrefix: "jobform" });

  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("validation.name.min"),
    }),
    email: z.string().email({
      message: t("validation.email.invalid"),
    }),
    phone: z
      .string()
      .min(10, {
        message: t("validation.phone.min"),
      })
      .optional(),
    company: z.string().min(1, {
      message: t("validation.company.required"),
    }),
    role: z.string().min(1, {
      message: t("validation.role.required"),
    }),
    jobType: z.string().min(1, {
      message: t("validation.jobType.required"),
    }),
    workModel: z.string().min(1, {
      message: t("validation.workModel.required"),
    }),
    location: z.string().optional(),
    experienceLevel: z.string().min(1, {
      message: t("validation.experienceLevel.required"),
    }),
    salaryRange: z.string().optional(),
    startDate: z.string().min(1, {
      message: t("validation.startDate.required"),
    }),
    description: z.string().min(10, {
      message: t("validation.description.min"),
    }),
    technologies: z.string().optional(),
    benefits: z.string().optional(),
    contactPreference: z.string().min(1, {
      message: t("validation.contactPreference.required"),
    }),
    linkedinProfile: z
      .string()
      .url({
        message: t("validation.linkedinProfile.invalid"),
      })
      .optional(),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: t("validation.termsAccepted.required"),
    }),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      role: "",
      jobType: "fulltime",
      workModel: "remote",
      location: "",
      experienceLevel: "senior",
      salaryRange: "",
      startDate: "flexible",
      description: "",
      technologies: "",
      benefits: "",
      contactPreference: "email",
      linkedinProfile: "",
      termsAccepted: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.error === "RATE_LIMITED") {
          alert("Too many attempts. Please wait a moment before trying again.");
          return;
        }
        throw new Error("Error sending message");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("An error occurred while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3
            className={`${fontSize["2xl"]} ${fontWeight.bold} ${textColor.primary} mb-4`}
          >
            {t("success.title")}
          </h3>
          <p className={`${textColor.secondary} mb-8`}>
            {t("success.message")}
          </p>
          <Link href="/" passHref>
            <Button variant="default" className="bg-blue-600 text-white">
              {t("success.button")}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2
        className={`${fontSize["2xl"]} ${fontWeight.bold} ${textColor.primary} mb-6 text-center`}
      >
        {t("title")}
      </h2>
      <p className={`${textColor.secondary} mb-8 text-center`}>
        {t("subtitle")}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3
              className={`${fontSize.lg} ${fontWeight.semibold} ${textColor.primary} border-b pb-2`}
            >
              {t("sections.personal")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.name.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.name.placeholder")}
                        {...field}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.email.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("fields.email.placeholder")}
                        {...field}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.phone.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.phone.placeholder")}
                        {...field}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.company.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.company.placeholder")}
                        {...field}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedinProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.linkedinProfile.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.linkedinProfile.placeholder")}
                        {...field}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.contactPreference.label")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                          <SelectValue
                            placeholder={t(
                              "fields.contactPreference.placeholder",
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="email">
                          {t("fields.contactPreference.options.email")}
                        </SelectItem>
                        <SelectItem value="phone">
                          {t("fields.contactPreference.options.phone")}
                        </SelectItem>
                        <SelectItem value="whatsapp">
                          {t("fields.contactPreference.options.whatsapp")}
                        </SelectItem>
                        <SelectItem value="linkedin">
                          {t("fields.contactPreference.options.linkedin")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3
              className={`${fontSize.lg} ${fontWeight.semibold} ${textColor.primary} border-b pb-2`}
            >
              {t("sections.jobDetails")}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.role.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.role.placeholder")}
                        {...field}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.jobType.label")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                          <SelectValue
                            placeholder={t("fields.jobType.placeholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fulltime">
                          {t("fields.jobType.options.fulltime")}
                        </SelectItem>
                        <SelectItem value="parttime">
                          {t("fields.jobType.options.parttime")}
                        </SelectItem>
                        <SelectItem value="contract">
                          {t("fields.jobType.options.contract")}
                        </SelectItem>
                        <SelectItem value="freelance">
                          {t("fields.jobType.options.freelance")}
                        </SelectItem>
                        <SelectItem value="internship">
                          {t("fields.jobType.options.internship")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="workModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.workModel.label")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                          <SelectValue
                            placeholder={t("fields.workModel.placeholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="remote">
                          {t("fields.workModel.options.remote")}
                        </SelectItem>
                        <SelectItem value="onsite">
                          {t("fields.workModel.options.onsite")}
                        </SelectItem>
                        <SelectItem value="hybrid">
                          {t("fields.workModel.options.hybrid")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.location.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.location.placeholder")}
                        {...field}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.experienceLevel.label")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                          <SelectValue
                            placeholder={t(
                              "fields.experienceLevel.placeholder",
                            )}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="entry">
                          {t("fields.experienceLevel.options.entry")}
                        </SelectItem>
                        <SelectItem value="junior">
                          {t("fields.experienceLevel.options.junior")}
                        </SelectItem>
                        <SelectItem value="mid">
                          {t("fields.experienceLevel.options.mid")}
                        </SelectItem>
                        <SelectItem value="senior">
                          {t("fields.experienceLevel.options.senior")}
                        </SelectItem>
                        <SelectItem value="lead">
                          {t("fields.experienceLevel.options.lead")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salaryRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.salaryRange.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.salaryRange.placeholder")}
                        {...field}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 dark:text-gray-200">
                      {t("fields.startDate.label")}
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                          <SelectValue
                            placeholder={t("fields.startDate.placeholder")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="immediate">
                          {t("fields.startDate.options.immediate")}
                        </SelectItem>
                        <SelectItem value="2weeks">
                          {t("fields.startDate.options.2weeks")}
                        </SelectItem>
                        <SelectItem value="1month">
                          {t("fields.startDate.options.1month")}
                        </SelectItem>
                        <SelectItem value="3months">
                          {t("fields.startDate.options.3months")}
                        </SelectItem>
                        <SelectItem value="flexible">
                          {t("fields.startDate.options.flexible")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    {t("fields.technologies.label")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("fields.technologies.placeholder")}
                      className="min-h-[80px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    {t("fields.benefits.label")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("fields.benefits.placeholder")}
                      className="min-h-[80px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    {t("fields.description.label")}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("fields.description.placeholder")}
                      className="min-h-[120px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="">
                <div className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal cursor-pointer text-gray-700 dark:text-gray-200">
                      {t("terms")}
                    </FormLabel>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={`w-full ${buttonStyles.primary}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("sending")}
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
