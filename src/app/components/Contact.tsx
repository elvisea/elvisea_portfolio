'use client'

import { useState } from "react"
import Link from "next/link"

import { useTranslation } from "react-i18next"

import { Check, Loader2, ArrowRight, Mail, Phone, MapPin } from "lucide-react"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import {
  sectionStyles,
  sectionHeader,
  cardStyles,
  textColor,
  fontSize,
  fontWeight,
  buttonStyles
} from "../styles/theme"

export function Contact() {
  const { t } = useTranslation()

  const PHONE_NUMBER = '5541992190528';
  const EMAIL_CONTACT = process.env.EMAIL_CONTACT || "contato@bytefulcode.tech";

  const cards = t("contact.cards", { returnObjects: true }) as { title: string, subtitle: string, icon: string }[]

  return (
    <section
      aria-label="Contato"
      role="region"
      itemScope
      itemType="https://schema.org/ContactPage"
      id="contact"
      className={sectionStyles.gradient}
    >
      <div className="container mx-auto px-4">
        <div className={sectionHeader.wrapper}>
          <div className={sectionHeader.badge}>
            {t("contact.badge")}
          </div>
          <h2 className={sectionHeader.title}>
            {t("contact.title")}
          </h2>
          <p className={`${sectionHeader.subtitle} mb-12`}>
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cartões de Contato */}
            <div className={`${cardStyles.default} p-8 text-center flex flex-col items-center`}>
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`${fontSize.xl} ${fontWeight.semibold} ${textColor.primary} mb-2`}>{cards[0].title}</h3>
              <p className={`${textColor.secondary} mb-4`}>{cards[0].subtitle}</p>
              <a
                href={`mailto:${EMAIL_CONTACT}`}
                className={`${textColor.accent} ${fontWeight.medium} hover:underline`}
              >
                {EMAIL_CONTACT}
              </a>
            </div>

            <div className={`${cardStyles.default} p-8 text-center flex flex-col items-center`}>
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`${fontSize.xl} ${fontWeight.semibold} ${textColor.primary} mb-2`}>{cards[1].title}</h3>
              <p className={`${textColor.secondary} mb-4`}>{cards[1].subtitle}</p>
              <a
                href={`https://wa.me/${PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${textColor.accent} ${fontWeight.medium} hover:underline`}
              >
                (41) 99219-0528
              </a>
            </div>

            <div className={`${cardStyles.default} p-8 text-center flex flex-col items-center`}>
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className={`${fontSize.xl} ${fontWeight.semibold} ${textColor.primary} mb-2`}>{cards[2].title}</h3>
              <p className={`${textColor.secondary} mb-4`}>{cards[2].subtitle}</p>
              <span className={`${textColor.accent} ${fontWeight.medium}`}>
                Curitiba, PR - Brasil
              </span>
            </div>
          </div>

          {/* Formulário CTA */}
          <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-xl overflow-hidden">
            <div className="p-8 sm:p-10 text-center">
              <h3 className={`${fontSize["2xl"]} ${fontWeight.bold} text-white mb-4`}>
                {t("contact.cta.title")}
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                {t("contact.cta.subtitle")}
              </p>
              <Link href="/contato" passHref>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 group w-full sm:w-auto px-6 sm:px-8"
                >
                  <span className="truncate">{t("contact.cta.button")}</span>
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Componente do formulário completo que será usado na página separada
export function ContactForm() {
  const { t } = useTranslation()

  const formSchema = z.object({
    name: z.string({ message: "Name is required" }).min(2, {
      message: "Name must be at least 2 characters"
    }),
    email: z.string({ message: "Email is required" }).email({
      message: "Invalid email"
    }),
    phone: z.string({ message: "Phone is required" }).min(10, {
      message: "Phone must be at least 10 characters"
    }).optional(),
    company: z.string().optional(),
    projectType: z.string(),
    budget: z.string(),
    timeline: z.string(),
    description: z.string({ message: "Description is required" }).min(10, {
      message: "Description must be at least 10 characters"
    }),
    contactPreference: z.string(),
    services: z.array(z.string()).refine((value) => value.length > 0, {
      message: "Select at least one service",
    }),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms of service and privacy policy",
    }),
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
      contactPreference: "email",
      services: [],
      termsAccepted: false,
    },

  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const data = await response.json()

        if (data.error === 'RATE_LIMITED') {
          alert('Muitas tentativas. Por favor, aguarde um momento antes de tentar novamente.')
          return
        }

        throw new Error('Erro ao enviar mensagem')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className={`${fontSize["2xl"]} ${fontWeight.bold} ${textColor.primary} mb-4`}>
            {t("form.success.title")}
          </h3>
          <p className={`${textColor.secondary} mb-8`}>
            {t("form.success.subtitle")}
          </p>
          <Link href="/" passHref>
            <Button
              variant="default"
              className="bg-blue-600 text-white"
            >
              {t("form.success.goBack")}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">{t("form.name.title")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.name.placeholder")}
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
                  <FormLabel className="text-gray-700 dark:text-gray-200">{t("form.email.title")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("form.email.placeholder")}
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
                  <FormLabel className="text-gray-700 dark:text-gray-200">{t("form.phone.title")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.phone.placeholder")}
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
                  <FormLabel className="text-gray-700 dark:text-gray-200">{t("form.company.title")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("form.company.placeholder")}
                      {...field}
                      className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">{t("form.project.title")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        <SelectValue placeholder={t("form.project.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="website">{t("form.project.website")}</SelectItem>
                      <SelectItem value="webapp">{t("form.project.webapp")}</SelectItem>
                      <SelectItem value="mobile">{t("form.project.mobile")}</SelectItem>
                      <SelectItem value="ecommerce">{t("form.project.ecommerce")}</SelectItem>
                      <SelectItem value="other">{t("form.project.other")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">{t("form.budget.title")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        <SelectValue placeholder={t("form.budget.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="under5k">{t("form.budget.under5k")}</SelectItem>
                      <SelectItem value="5k-15k">{t("form.budget.5k-15k")}</SelectItem>
                      <SelectItem value="15k-30k">{t("form.budget.15k-30k")}</SelectItem>
                      <SelectItem value="30k-50k">{t("form.budget.30k-50k")}</SelectItem>
                      <SelectItem value="over50k">{t("form.budget.over50k")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">{t("form.timeline.title")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        <SelectValue placeholder={t("form.timeline.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="urgent">{t("form.timeline.urgent")}</SelectItem>
                      <SelectItem value="1-2months">{t("form.timeline.1-2months")}</SelectItem>
                      <SelectItem value="3-6months">{t("form.timeline.3-6months")}</SelectItem>
                      <SelectItem value="6months+">{t("form.timeline.6months+")}</SelectItem>
                      <SelectItem value="flexible">{t("form.timeline.flexible")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="services"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-gray-700 dark:text-gray-200">{t("form.services.title")}</FormLabel>
                  <FormDescription className="text-gray-500 dark:text-gray-400">
                    {t("form.services.placeholder")}
                  </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: "design", label: t("form.services.design") },
                    { id: "frontend", label: t("form.services.frontend") },
                    { id: "backend", label: t("form.services.backend") },
                    { id: "mobile", label: t("form.services.mobile") },
                    { id: "landing", label: t("form.services.landing") },
                    { id: "institutional", label: t("form.services.institutional") },
                    { id: "seo", label: t("form.services.seo") },
                    { id: "maintenance", label: t("form.services.maintenance") }
                  ].map((service) => {
                    return (
                      <FormField
                        key={service.id}
                        control={form.control}
                        name="services"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={service.id}
                              className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-3 bg-gray-50 dark:bg-gray-700"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(service.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, service.id])
                                      : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== service.id
                                        )
                                      )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer text-gray-700 dark:text-gray-200">
                                {service.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    )
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 dark:text-gray-200">{t("form.description.title")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("form.description.placeholder")}
                    className="min-h-[120px] bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                    {...field}
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
              <FormItem className="space-y-3">
                <FormLabel className="text-gray-700 dark:text-gray-200">{t("form.preference.title")}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="email" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-gray-700 dark:text-gray-200">
                        {t("form.preference.email")}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="phone" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-gray-700 dark:text-gray-200">
                        {t("form.preference.phone")}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="whatsapp" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer text-gray-700 dark:text-gray-200">
                        {t("form.preference.whatsapp")}
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      {t("form.terms")}
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
                {t("form.sending")}
              </>
            ) : (
              t("form.button")
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
} 