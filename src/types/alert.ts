// Alert types
export type AlertType = 'success' | 'error' | 'info' | 'warning'

// Alert message
export type Message = string

// Alert selectors
export interface AlertSelectors {
  alert: string
  closeButton: string
}

// Alert configuration
export interface AlertConfig {
  autoCloseDelay: number
  animationDuration: number
}

// Alert state classes
export interface AlertStateClasses {
  isVisible: string
}

// Alert icons
export interface AlertIcons {
  success: string
  error: string
  info: string
  warning: string
  close: string
}