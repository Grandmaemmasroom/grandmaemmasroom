/*
  # Create tables for client and owner forms

  1. New Tables
    - `client_forms`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `location` (text)
      - `care_needs` (text[])
      - `custom_care_needs` (text)
      - `tier` (text)
      - `created_at` (timestamptz)
      - `status` (text)

    - `owner_forms`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `address` (text)
      - `tier` (text)
      - `details` (text)
      - `created_at` (timestamptz)
      - `status` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to read their own data
    - Add policies for anon users to insert data
*/

-- Create client_forms table
CREATE TABLE IF NOT EXISTS client_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  location text NOT NULL,
  care_needs text[] DEFAULT '{}',
  custom_care_needs text,
  tier text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

-- Create owner_forms table
CREATE TABLE IF NOT EXISTS owner_forms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  tier text NOT NULL,
  details text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE client_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE owner_forms ENABLE ROW LEVEL SECURITY;

-- Policies for client_forms
CREATE POLICY "Allow anonymous submissions"
  ON client_forms
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read own submissions"
  ON client_forms
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = email);

-- Policies for owner_forms
CREATE POLICY "Allow anonymous submissions"
  ON owner_forms
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can read own submissions"
  ON owner_forms
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = email);