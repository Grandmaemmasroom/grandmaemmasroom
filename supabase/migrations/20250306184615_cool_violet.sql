/*
  # Update owner_forms table with detailed room information

  1. Changes to existing tables
    - `owner_forms`: Added the following fields:
      - `rent_amount` (integer)
      - `deposit_amount` (integer)
      - `room_size` (integer)
      - `private_bathroom` (boolean)
      - `furnished` (boolean)
      - `available_from` (date)
      - `min_stay` (integer)
      - `max_stay` (integer)
      - `utilities_included` (boolean)
      - `utilities_details` (text)
      - `internet_included` (boolean)
      - `parking_available` (boolean)
      - `parking_cost` (integer)
      - `air_conditioning` (boolean)
      - `pets_allowed` (boolean)
      - `pet_restrictions` (text)
      - `qualifications` (text[])
      - `qualification_details` (text)
      - `currently_employed` (boolean)
      - `years_experience` (integer)
      - `current_employer` (text)
      - `references_available` (boolean)

  2. Security
    - Existing RLS policies are maintained
*/

-- Add new columns to owner_forms table
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'rent_amount') THEN
    ALTER TABLE owner_forms ADD COLUMN rent_amount integer;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'deposit_amount') THEN
    ALTER TABLE owner_forms ADD COLUMN deposit_amount integer;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'room_size') THEN
    ALTER TABLE owner_forms ADD COLUMN room_size integer;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'private_bathroom') THEN
    ALTER TABLE owner_forms ADD COLUMN private_bathroom boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'furnished') THEN
    ALTER TABLE owner_forms ADD COLUMN furnished boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'available_from') THEN
    ALTER TABLE owner_forms ADD COLUMN available_from date;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'min_stay') THEN
    ALTER TABLE owner_forms ADD COLUMN min_stay integer;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'max_stay') THEN
    ALTER TABLE owner_forms ADD COLUMN max_stay integer;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'utilities_included') THEN
    ALTER TABLE owner_forms ADD COLUMN utilities_included boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'utilities_details') THEN
    ALTER TABLE owner_forms ADD COLUMN utilities_details text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'internet_included') THEN
    ALTER TABLE owner_forms ADD COLUMN internet_included boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'parking_available') THEN
    ALTER TABLE owner_forms ADD COLUMN parking_available boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'parking_cost') THEN
    ALTER TABLE owner_forms ADD COLUMN parking_cost integer;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'air_conditioning') THEN
    ALTER TABLE owner_forms ADD COLUMN air_conditioning boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'pets_allowed') THEN
    ALTER TABLE owner_forms ADD COLUMN pets_allowed boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'pet_restrictions') THEN
    ALTER TABLE owner_forms ADD COLUMN pet_restrictions text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'qualifications') THEN
    ALTER TABLE owner_forms ADD COLUMN qualifications text[] DEFAULT '{}';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'qualification_details') THEN
    ALTER TABLE owner_forms ADD COLUMN qualification_details text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'currently_employed') THEN
    ALTER TABLE owner_forms ADD COLUMN currently_employed boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'years_experience') THEN
    ALTER TABLE owner_forms ADD COLUMN years_experience integer;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'current_employer') THEN
    ALTER TABLE owner_forms ADD COLUMN current_employer text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'owner_forms' AND column_name = 'references_available') THEN
    ALTER TABLE owner_forms ADD COLUMN references_available boolean DEFAULT false;
  END IF;
END $$;

-- Add a check constraint to ensure at least one qualification is selected
ALTER TABLE owner_forms DROP CONSTRAINT IF EXISTS owner_forms_qualifications_not_empty;
ALTER TABLE owner_forms ADD CONSTRAINT owner_forms_qualifications_not_empty CHECK (array_length(qualifications, 1) > 0);