export interface AlertModalProps {
    title: string
    message?: string
    icon: 'success' | 'error' | 'info' | 'warning' | 'question'
    visible?: boolean
    data?: any
    OnHideAlert?: (params?: any) => void
    OnConfirmAction?: (params?: any) => void
}