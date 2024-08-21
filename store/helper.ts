import { v4 as uuidv4 } from 'uuid';

export type MessageTipsLocation = 'top' | "start top" | "end top" | "center" | "start center" | "end center" | "bottom" | "start bottom" | "end bottom"

export type MessageTips = {
  key: string
  text: string
  color: string
  visible: boolean
  showCloseIcon: boolean
  timeout: number
  location: MessageTipsLocation
}

export const getDefaultMessageConfig = (): MessageTips => {
  return {
    key: uuidv4(),
    text: '',
    color: '',
    visible: true,
    showCloseIcon: true,
    timeout: 2000,
    location: 'top'
  }
}

export type GlobalStore = {
  snackbarQueue: MessageTips[]
}
