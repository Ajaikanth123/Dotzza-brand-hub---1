# Backend

This project uses **Supabase** as the backend (database + storage).
No custom server — all backend logic runs through the Supabase JS SDK in the frontend.

## Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run `supabase/schema.sql`
3. Go to Storage → New bucket → name it `assets`, set to **Public**
4. Copy your project URL and anon key into `frontend/app.js`:
   ```js
   const SUPABASE_URL = 'https://your-project.supabase.co';
   const SUPABASE_KEY = 'your-anon-key';
   ```

## Tables

| Table | Purpose |
|---|---|
| `imports` | Stores uploaded assets (logo, colors, etc.) per section |
| `hidden_cards` | Tracks which UI cards the user has deleted |
| `sub_brands` | Custom sub-brand entries |

## Storage

| Bucket | Purpose |
|---|---|
| `assets` | Uploaded image files (SVG, PNG, JPG) |
