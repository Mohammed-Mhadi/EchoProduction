DROP TABLE IF EXISTS subscription_audit CASCADE;
DROP TABLE IF EXISTS user_audit CASCADE;
DROP TABLE IF EXISTS otp_verifications CASCADE;
DROP TABLE IF EXISTS schedules CASCADE;
DROP TABLE IF EXISTS media CASCADE;
DROP TABLE IF EXISTS ai_generations CASCADE;
DROP TABLE IF EXISTS ads CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS devices CASCADE;
DROP TABLE IF EXISTS markets CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop ENUM types
DROP TYPE IF EXISTS subscription_status_enum;
DROP TYPE IF EXISTS media_type_enum;
DROP TYPE IF EXISTS ai_generation_status_enum;
DROP TYPE IF EXISTS user_role_enum;
DROP TYPE IF EXISTS device_status_enum;

-- ENUM Types
CREATE TYPE subscription_status_enum AS ENUM ('active', 'pending', 'expired', 'cancelled', 'none');
CREATE TYPE media_type_enum AS ENUM ('image', 'video');
CREATE TYPE ai_generation_status_enum AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE user_role_enum AS ENUM ('user', 'admin', 'manager');
CREATE TYPE device_status_enum AS ENUM ('active', 'inactive', 'maintenance');

-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  phone VARCHAR(20) UNIQUE NOT NULL CHECK (phone ~ '^\+?[0-9]{8,15}$'),
  email VARCHAR(100) UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  role user_role_enum NOT NULL DEFAULT 'user',
  profile_image TEXT,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MARKETS
CREATE TABLE markets (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  name VARCHAR(100) NOT NULL,
  location TEXT,
  contact_info TEXT CHECK (contact_info ~ '^\+?[0-9]{8,15}$'),
  image TEXT,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_markets_owner_id ON markets(owner_id);

-- DEVICES
CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  market_id INTEGER NOT NULL REFERENCES markets(id) ON DELETE RESTRICT,
  name VARCHAR(100) NOT NULL,
  location TEXT,
  status device_status_enum NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_devices_market_id ON devices(market_id);

-- SUBSCRIPTIONS
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  market_id INTEGER REFERENCES markets(id) ON DELETE RESTRICT,
  customer_id VARCHAR(100),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL CHECK (end_date > start_date),
  status subscription_status_enum NOT NULL DEFAULT 'pending',
  paid_amount NUMERIC(10,2) NOT NULL CHECK (paid_amount >= 0),
  video_quota INTEGER NOT NULL DEFAULT 0 CHECK (video_quota >= 0),
  used_videos INTEGER NOT NULL DEFAULT 0 CHECK (used_videos <= video_quota),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- ADS
CREATE TABLE ads (
  id SERIAL PRIMARY KEY,
  market_id INTEGER NOT NULL REFERENCES markets(id) ON DELETE RESTRICT,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_ads_market_id ON ads(market_id);

-- AI GENERATIONS
CREATE TABLE ai_generations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  subscription_id INTEGER NOT NULL REFERENCES subscriptions(id) ON DELETE RESTRICT,
  input_image TEXT CHECK (input_video IS NULL),
  input_video TEXT CHECK (input_image IS NULL),
  output_url TEXT NOT NULL,
  status ai_generation_status_enum NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CHECK (input_image IS NULL <> input_video IS NULL)
);
CREATE INDEX idx_ai_generations_user_id ON ai_generations(user_id);

-- MEDIA
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  ad_id INTEGER NOT NULL REFERENCES ads(id) ON DELETE RESTRICT,
  type media_type_enum NOT NULL,
  url TEXT NOT NULL,
  cdn_path TEXT NOT NULL,
  is_ai_generated BOOLEAN DEFAULT FALSE,
  ai_generation_id INTEGER REFERENCES ai_generations(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_media_ad_id ON media(ad_id);

-- SCHEDULES
CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  ad_id INTEGER NOT NULL REFERENCES ads(id) ON DELETE RESTRICT,
  device_id INTEGER NOT NULL REFERENCES devices(id) ON DELETE RESTRICT,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL CHECK (end_time > start_time),
  repeat_rule VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_schedules_device_time ON schedules(device_id, start_time, end_time);

-- OTP VERIFICATIONS
CREATE TABLE otp_verifications (
  id SERIAL PRIMARY KEY,
  phone_number VARCHAR(20) NOT NULL CHECK (phone_number ~ '^\+?[0-9]{8,15}$'),
  otp_hash TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_otp_phone ON otp_verifications(phone_number);

-- AUDIT TABLES
CREATE TABLE user_audit (
  audit_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  changed_field VARCHAR(50),
  old_value TEXT,
  new_value TEXT,
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscription_audit (
  audit_id SERIAL PRIMARY KEY,
  subscription_id INTEGER NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  old_status subscription_status_enum,
  new_status subscription_status_enum,
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
