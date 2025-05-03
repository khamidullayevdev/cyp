import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qmnjuxylghuaonfrdcuu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtbmp1eHlsZ2h1YW9uZnJkY3V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NDU2MTgsImV4cCI6MjA2MTQyMTYxOH0.sxTKnONudlg2ejq78tU2osgozJykUQExjNDTav04e1I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 