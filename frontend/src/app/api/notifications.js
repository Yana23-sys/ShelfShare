import axios from 'axios'

const api = axios.create({
  baseURL: 'https://p01--shelfshare-be--4cxwyhlvb2mb.code.run/api',
})

export const getUnseenNotificationsByUserId = (userId) => {
  return api.get(`/notifications?userId=${userId}&seen=false`)
      .then(response => {
        return response.data})
      .catch(error => {
        console.error('Error getting notifications from api:', error)
        throw error
      })
}

export const markNotificationAsSeen = (notificationId) => {
  return api.patch(`/notifications/${notificationId}`, {seen: true})
      .then(response => {
        return response.data})
      .catch(error => {
        console.error('Error marking notification as seen from api:', error)
        throw error
      })
}