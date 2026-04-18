import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ccehpokvtkamhkhhhsnt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjZWhwb2t2dGthbWhraGhoc250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMDgxNzcsImV4cCI6MjA4NjU4NDE3N30.d42yRtnCegr5oYIauiXpezR-T9G_E9dNx8qY9ztHJHA";

export const supabase = createClient(supabaseUrl, supabaseKey);
