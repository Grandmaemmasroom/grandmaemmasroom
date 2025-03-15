/*
  # Add qualifications to owner_forms table

  1. Changes
    - Add qualifications column to owner_forms table
    - Add validation to ensure at least one qualification is selected

  2. Technical Details
    - Uses text[] array type to store multiple qualifications
    - Adds constraint to ensure array is not empty
    - Maintains existing RLS policies
*/

-- Add qualifications column to owner_forms table
ALTER TABLE owner_forms 
ADD COLUMN IF NOT EXISTS qualifications text[] NOT NULL DEFAULT '{}';

-- Add constraint to ensure at least one qualification is selected
ALTER TABLE owner_forms
ADD CONSTRAINT owner_forms_qualifications_not_empty 
CHECK (array_length(qualifications, 1) > 0);

-- Update RLS policies to include new column
CREATE POLICY "Users can read own qualifications"
  ON owner_forms
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = email);