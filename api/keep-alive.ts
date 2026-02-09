import { createClient } from '@supabase/supabase-js';

/**
 * External keep-alive for Supabase free tier.
 * Supabase pauses projects after ~7 days of inactivity. Internal pg_cron doesn't count
 * because it runs inside the DB. This API route is invoked by Vercel Cron from outside,
 * making a real HTTP/database request that Supabase counts as activity.
 */

export const config = {
  maxDuration: 10,
};

function jsonResponse(body: object, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function GET(_req: Request): Promise<Response> {
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return jsonResponse(
      { ok: false, error: 'Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment' },
      500
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from('leads').select('id').limit(1);
    if (error) throw error;

    return jsonResponse({
      ok: true,
      message: 'Supabase keep-alive ping succeeded',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Keep-alive error:', err);
    return jsonResponse(
      { ok: false, error: err instanceof Error ? err.message : 'Unknown error' },
      500
    );
  }
}
