import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { timeAgo } from "@/lib/utils"; // create a timeAgo function in utils

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/api/auth/signin");

  const notifications = await prisma.notification.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2"><Bell /> Notifications</h1>
      
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No notifications yet.</p>
        ) : (
          notifications.map((notif) => (
            <Card key={notif.id} className={`glass-card border-white/10 ${!notif.isRead ? 'bg-blue-600/10' : ''}`}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm">{notif.content}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(notif.createdAt).toLocaleString()}</p>
                </div>
                {!notif.isRead && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
