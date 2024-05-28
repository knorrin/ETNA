export interface Comment {
  author: 'Бот' | 'Клиент'
  text: string
}

export interface Dialog {
  dialogId: number
  startDate: string
  lastMessageDate: string
  company: string
  employee: string
  comments: Comment[]
}
