import axios from 'axios'

const api = axios.create({
  baseURL: 'https://p01--shelfshare-be--4cxwyhlvb2mb.code.run/api',
})


export const getAllSwapsByUserId = (userId) => {
  return api.get(`/swaps?user_id=${userId}`)
      .then(response => {
        return response.data.swaps})
      .catch(error => {
        console.error('Error getting swaps from api:', error)
        throw error
    })
}

export const createSwap = ({ sender, receiver, senderBook, receiverBook }) => {
  return api.post('/swaps', {sender, receiver, sender_book: senderBook, receiver_book: receiverBook})
      .then(response => {
        return response.data.swap})
      .catch(error => {
        console.error('Error creating swap:', error)
        throw error
    })
}

export const updateSwap = ({ swapId, status }) => {
  return api.patch(`/swaps/${swapId}`, {status})
      .then(() => console.log('Updated swap successfully from api!'))
      .catch(error => {
        console.error('Error updating swap:', error)
        throw error
    })
}