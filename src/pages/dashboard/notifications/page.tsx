import * as React from "react"
import { formatDistanceToNow } from "date-fns"
import { Bell } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { NotificationsAPI } from "@/lib/api/notifications"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Notification {
  _id: string
  title: string
  message: string
  type: "feature" | "billing" | "success" | "info"
  read: boolean
  createdAt: string
  updatedAt: string
}

const QUERY_KEY = {
  notifications: ['notifications'],
} as const

const getNotificationStyle = (type: Notification["type"]) => {
  switch (type) {
    case "feature":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "billing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "success":
      return "bg-green-100 text-green-800 border-green-200"
    case "info":
      return "bg-blue-100 text-blue-800 border-blue-200"
  }
}

export default function Page() {
  const [selectedNotification, setSelectedNotification] = React.useState<Notification | null>(null)
  const queryClient = useQueryClient()

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: QUERY_KEY.notifications,
    queryFn: NotificationsAPI.getNotifications,
  })

  const { mutate: markAsReadMutation } = useMutation({
    mutationFn: NotificationsAPI.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.notifications })
    },
  })

  const { mutate: markAllAsReadMutation } = useMutation({
    mutationFn: NotificationsAPI.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.notifications })
    },
  })

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification)
    if (!notification.read) {
      markAsReadMutation(notification._id)
    }
  }

  const markAllAsRead = () => {
    markAllAsReadMutation()
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            Stay updated with your account activity
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell>
                  <div className="flex items-center justify-center py-4">
                    Loading notifications...
                  </div>
                </TableCell>
              </TableRow>
            ) : notifications.length === 0 ? (
              <TableRow>
                <TableCell>
                  <div className="flex items-center justify-center py-4">
                    No notifications
                  </div>
                </TableCell>
              </TableRow>
            ) : notifications.map((notification) => (
              <TableRow
                key={notification._id}
                className={!notification.read ? "bg-muted/50" : ""}
                onClick={() => handleNotificationClick(notification)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-2 ${
                      !notification.read ? "bg-primary/10 text-primary" : "bg-muted"
                    }`}>
                      <Bell className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className={
                          !notification.read 
                            ? "font-medium text-primary" 
                            : "font-medium"
                        }>
                          {notification.title}
                        </p>
                        <Badge 
                          variant="outline"
                          className={getNotificationStyle(notification.type)}
                        >
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog 
        open={!!selectedNotification} 
        onOpenChange={() => setSelectedNotification(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedNotification?.title}
              {selectedNotification && (
                <Badge 
                  variant="outline"
                  className={getNotificationStyle(selectedNotification.type)}
                >
                  {selectedNotification.type}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription className="pt-4">
              {selectedNotification?.message}
              <p className="mt-4 text-sm text-muted-foreground">
                {selectedNotification && formatDistanceToNow(
                  new Date(selectedNotification.createdAt), 
                  { addSuffix: true }
                )}
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
