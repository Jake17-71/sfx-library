// Common utility types

// DOM selectors
export type Selector = string

// Timer types
export type Timer = ReturnType<typeof setTimeout> | null

// Nullable types
export type Nullable<T> = T | null

// Optional types
export type Optional<T> = T | undefined

// State classes base
export interface StateClasses {
  [key: string]: string
}

// Theme types
export type Theme = 'light' | 'dark'

// Breakpoint types
export type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide'

// Animation duration types
export type AnimationDuration = number

// Delay types
export type Delay = number

// Element queries
export type ElementQuery<T extends Element> = T | null

// Collection queries
export type ElementCollection<T extends Element> = NodeListOf<T>

// Event handler types
export type EventHandler<E extends Event = Event> = (event: E) => void

// Callback types
export type Callback = () => void
export type CallbackWithParam<T> = (param: T) => void

// Config types
export interface BaseConfig {
  [key: string]: unknown
}

// Dimensions types
export interface Dimensions {
  width: number
  height: number
}

// Position types
export interface Position {
  x: number
  y: number
}

// Coordinates types
export interface Coordinates {
  top: number
  right: number
  bottom: number
  left: number
}