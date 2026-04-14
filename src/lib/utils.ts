import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount / 100)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function planCanAccess(userPlan: string, requiredPlan: string): boolean {
  const planOrder = { free: 0, pro: 1, agency: 2 }
  const userLevel = planOrder[userPlan as keyof typeof planOrder] ?? 0
  const requiredLevel = planOrder[requiredPlan as keyof typeof planOrder] ?? 0
  return userLevel >= requiredLevel
}
