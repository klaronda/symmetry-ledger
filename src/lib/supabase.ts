import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for leads table
export interface Lead {
  id?: string;
  email: string;
  name: string;
  business_type?: string;
  backlog_status?: string;
  accounts_count?: string;
  pain_points?: string[];
  budget_range?: string;
  additional_notes?: string;
  booked_consult?: boolean;
  calendly_event_id?: string;
  calendly_invitee_uri?: string;
  created_at?: string;
  updated_at?: string;
}

export interface LeadInsert {
  email: string;
  name: string;
  business_type?: string;
  backlog_status?: string;
  accounts_count?: string;
  pain_points?: string[];
  budget_range?: string;
  additional_notes?: string;
  booked_consult?: boolean;
  calendly_event_id?: string;
  calendly_invitee_uri?: string;
}

