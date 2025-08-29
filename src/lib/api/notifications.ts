import api from '../api';
export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'feature' | 'billing' | 'success' | 'info';
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

export const NotificationsAPI = {
  getNotifications: async (): Promise<Notification[]> => {
    const { data } = await api.get('/api/notifications');
    return data;
  },

  markAsRead: async (notificationId: string): Promise<Notification> => {
    const { data } = await api.patch(`/api/notifications/${notificationId}/read`);
    return data;
  },

  markAllAsRead: async (): Promise<{ success: boolean }> => {
    const { data } = await api.patch('/api/notifications/mark-all-read');
    return data;
  },
};
