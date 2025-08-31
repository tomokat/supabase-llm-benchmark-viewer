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
      llm_usage_benchmark: {
        Row: {
          id: string
          execution_id: string
          input: Json
          output: Json | null
          latency_ms: number | null
          run_id: string | null
          model: string | null
          scenario_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          execution_id: string
          input: Json
          output?: Json | null
          latency_ms?: number | null
          run_id?: string | null
          model?: string | null
          scenario_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          execution_id?: string
          input?: Json
          output?: Json | null
          latency_ms?: number | null
          run_id?: string | null
          model?: string | null
          scenario_name?: string | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

export type LlmUsageBenchmark = Database['public']['Tables']['llm_usage_benchmark']['Row'];