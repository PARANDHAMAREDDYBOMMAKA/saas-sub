// lib/supabase/database.types.ts
export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            users: {
                Row: {
                    id: string
                    created_at: string
                    email: string
                    name: string | null
                }
                Insert: {
                    id: string
                    created_at?: string
                    email: string
                    name?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    email?: string
                    name?: string | null
                }
            }
            subscriptions: {
                Row: {
                    id: string
                    user_id: string
                    status: string
                    price_id: string
                    quantity: number
                    cancel_at_period_end: boolean
                    created_at: string
                    current_period_start: string
                    current_period_end: string
                    ended_at: string | null
                    cancel_at: string | null
                    canceled_at: string | null
                    trial_start: string | null
                    trial_end: string | null
                    customer_id: string // Added missing customer_id field
                }
                Insert: {
                    id: string
                    user_id: string
                    status: string
                    price_id: string
                    quantity: number
                    cancel_at_period_end: boolean
                    created_at?: string
                    current_period_start: string
                    current_period_end: string
                    ended_at?: string | null
                    cancel_at?: string | null
                    canceled_at?: string | null
                    trial_start?: string | null
                    trial_end?: string | null
                    customer_id: string // Added missing customer_id field
                }
                Update: {
                    id?: string
                    user_id?: string
                    status?: string
                    price_id?: string
                    quantity?: number
                    cancel_at_period_end?: boolean
                    created_at?: string
                    current_period_start?: string
                    current_period_end?: string
                    ended_at?: string | null
                    cancel_at?: string | null
                    canceled_at?: string | null
                    trial_start?: string | null
                    trial_end?: string | null
                    customer_id?: string // Added missing customer_id field
                }
            }
            prices: {
                Row: {
                    id: string
                    product_id: string
                    active: boolean
                    description: string | null
                    unit_amount: number
                    currency: string
                    type: string
                    interval: string | null
                    interval_count: number | null
                    trial_period_days: number | null
                    metadata: Json | null
                }
                Insert: {
                    id: string
                    product_id: string
                    active: boolean
                    description?: string | null
                    unit_amount: number
                    currency: string
                    type: string
                    interval?: string | null
                    interval_count?: number | null
                    trial_period_days?: number | null
                    metadata?: Json | null
                }
                Update: {
                    id?: string
                    product_id?: string
                    active?: boolean
                    description?: string | null
                    unit_amount?: number
                    currency?: string
                    type?: string
                    interval?: string | null
                    interval_count?: number | null
                    trial_period_days?: number | null
                    metadata?: Json | null
                }
            }
            products: {
                Row: {
                    id: string
                    active: boolean
                    name: string
                    description: string | null
                    image: string | null
                    metadata: Json | null
                }
                Insert: {
                    id: string
                    active: boolean
                    name: string
                    description?: string | null
                    image?: string | null
                    metadata?: Json | null
                }
                Update: {
                    id?: string
                    active?: boolean
                    name?: string
                    description?: string | null
                    image?: string | null
                    metadata?: Json | null
                }
            }
        }
    }
}