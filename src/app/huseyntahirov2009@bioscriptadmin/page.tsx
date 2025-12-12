'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, MessageCircle, Users } from "lucide-react";
import { ClientOnlyRandomActivity } from './client-only-random-activity';
import { getSubmissionsDataAction } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';
import type { ContactSubmission, DemoRequest } from '@/lib/data';

type SubmissionsData = {
  contactSubmissions: ContactSubmission[];
  demoRequests: DemoRequest[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<SubmissionsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await getSubmissionsDataAction();
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, []);
  
  const newSubmissionsLast7Days = data?.contactSubmissions.filter(submission => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return new Date(submission.submittedAt) > sevenDaysAgo;
  }).length ?? 0;

  const totalDemoRequests = data?.demoRequests.length ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">İdarəetmə Paneli</h1>
        <p className="text-muted-foreground">
          Admin panelinə xoş gəlmisiniz. Buradan saytın məzmununu idarə edə bilərsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Yeni Müraciətlər</span>
              <MessageCircle className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
            {loading ? <Skeleton className="h-8 w-12 mt-1" /> : <div className="text-3xl font-bold">{newSubmissionsLast7Days}</div>}
            <CardDescription>Son 7 gündə daxil olanlar</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Demo Sorğuları</span>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
             {loading ? <Skeleton className="h-8 w-12 mt-1" /> : <div className="text-3xl font-bold">{totalDemoRequests}</div>}
            <CardDescription>Ümumi demo sorğuları</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Sayt Aktivliyi</span>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </CardTitle>
            <ClientOnlyRandomActivity />
            <CardDescription>Bu ayki təxmini ziyarətçi sayı</CardDescription>
          </CardHeader>
        </Card>
      </div>

       <div>
        <h2 className="text-xl font-semibold mb-4">Sürətli Keçidlər</h2>
        <div className="space-y-2">
            <p>Naviqasiya menyusundan istədiyiniz bölməyə keçid edərək məzmunu idarə etməyə başlaya bilərsiniz.</p>
        </div>
       </div>

    </div>
  );
}
