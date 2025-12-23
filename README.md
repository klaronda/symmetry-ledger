
  # Symmtery Ledger

  This is a code bundle for Symmtery Ledger. The original project is available at https://www.figma.com/design/PzuHYbpHkH6mYVzZJsFogG/Symmtery-Ledger.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Environment Variables

  Create a `.env.local` file in the root directory with the following variables:

  ```
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```

  Copy `.env.example` to `.env.local` and fill in your Supabase credentials.

  ## Supabase Setup

  - The `leads` table is automatically created via migration
  - Images are stored in the `site-assets` storage bucket
  - Calendly integration updates the `booked_consult` flag when a booking is completed

  ## Calendly Integration

  Update the Calendly URL in `src/components/BookingModal.tsx`:
  - Replace `https://calendly.com/your-calendly-username/meeting` with your actual Calendly link
  