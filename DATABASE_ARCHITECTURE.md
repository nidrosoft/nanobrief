# NanoBrief Database Architecture

## Overview

This document outlines the complete database schema for NanoBrief, an AI-powered project brief generation platform. The architecture is designed for Supabase (PostgreSQL) with Row Level Security (RLS) policies.

---

## Table of Contents

1. [Core Tables](#core-tables)
2. [Authentication & Users](#authentication--users)
3. [Briefs & Content](#briefs--content)
4. [Subscriptions & Billing](#subscriptions--billing)
5. [Usage & Analytics](#usage--analytics)
6. [Sharing & Collaboration](#sharing--collaboration)
7. [Entity Relationship Diagram](#entity-relationship-diagram)
8. [RLS Policies](#rls-policies)

---

## Core Tables

### 1. `users` (extends Supabase auth.users)

Stores user profile and onboarding data.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, FK → auth.users.id | User's unique identifier |
| `email` | `text` | NOT NULL, UNIQUE | User's email address |
| `full_name` | `text` | | User's full name |
| `avatar_url` | `text` | | Profile picture URL (Supabase Storage) |
| `role` | `text` | | Job title/role (e.g., "Project Manager") |
| `company_name` | `text` | | User's company/organization |
| `company_size` | `text` | | solo, small, medium, large, enterprise |
| `primary_industry` | `text` | | marketing, design, video, content, events, consulting |
| `goals` | `text[]` | | Array of user goals from onboarding |
| `onboarding_completed` | `boolean` | DEFAULT false | Has user completed onboarding? |
| `created_at` | `timestamptz` | DEFAULT now() | Account creation timestamp |
| `updated_at` | `timestamptz` | DEFAULT now() | Last profile update |

**Onboarding Goals Options:**
- `save-time` - Save time on brief creation
- `consistency` - Create consistent briefs
- `client-intake` - Streamline client intake
- `collaboration` - Improve team collaboration
- `professionalism` - Look more professional

---

### 2. `industries`

Reference table for supported industries.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `text` | PK | Industry slug (e.g., "marketing") |
| `name` | `text` | NOT NULL | Display name |
| `description` | `text` | | Short description |
| `icon` | `text` | | Icon name for UI |
| `icon_color` | `text` | | Hex color code |
| `question_count` | `integer` | | Number of questions in questionnaire |
| `is_active` | `boolean` | DEFAULT true | Is industry available? |
| `sort_order` | `integer` | | Display order |

**Seed Data:**
- marketing (30 questions)
- design (33 questions)
- video (39 questions)
- content (34 questions)
- events (41 questions)
- consulting (40 questions)
- architecture (60 questions)
- pr (66 questions)
- legal (71 questions)
- custom (dynamic)

---

### 3. `briefs`

Main table storing all generated briefs.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Brief unique identifier |
| `user_id` | `uuid` | FK → users.id, NOT NULL | Owner of the brief |
| `title` | `text` | NOT NULL | Brief title/name |
| `industry_id` | `text` | FK → industries.id | Industry type |
| `client_name` | `text` | | Client/company name |
| `status` | `text` | DEFAULT 'draft' | draft, generating, completed, archived |
| `is_custom` | `boolean` | DEFAULT false | Is this a custom brief? |
| `share_token` | `text` | UNIQUE | Public share URL token |
| `is_public` | `boolean` | DEFAULT false | Is brief publicly shareable? |
| `created_at` | `timestamptz` | DEFAULT now() | Creation timestamp |
| `updated_at` | `timestamptz` | DEFAULT now() | Last update timestamp |
| `generated_at` | `timestamptz` | | When AI generation completed |

---

### 4. `brief_sections`

Stores the sections within each brief (AI-generated content).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Section unique identifier |
| `brief_id` | `uuid` | FK → briefs.id, NOT NULL | Parent brief |
| `title` | `text` | NOT NULL | Section title (e.g., "Executive Summary") |
| `content` | `text` | | AI-generated content (markdown) |
| `sort_order` | `integer` | DEFAULT 0 | Display order within brief |
| `is_regenerated` | `boolean` | DEFAULT false | Has section been regenerated? |
| `created_at` | `timestamptz` | DEFAULT now() | Creation timestamp |
| `updated_at` | `timestamptz` | DEFAULT now() | Last update |

---

### 5. `brief_answers`

Stores user's questionnaire answers for each brief.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Answer unique identifier |
| `brief_id` | `uuid` | FK → briefs.id, NOT NULL | Parent brief |
| `question_id` | `text` | NOT NULL | Question identifier (e.g., "project_type") |
| `question_text` | `text` | | The question asked |
| `answer_text` | `text` | | Text answer |
| `answer_array` | `text[]` | | Array answer (for multiselect) |
| `answer_date` | `date` | | Date answer |
| `section_title` | `text` | | Which section this question belongs to |
| `created_at` | `timestamptz` | DEFAULT now() | When answered |

---

### 6. `custom_brief_templates`

Stores custom brief templates created by users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Template unique identifier |
| `user_id` | `uuid` | FK → users.id, NOT NULL | Template owner |
| `name` | `text` | NOT NULL | Template name |
| `description` | `text` | | Template description |
| `sections` | `jsonb` | NOT NULL | Array of sections with fields |
| `is_public` | `boolean` | DEFAULT false | Can others use this template? |
| `use_count` | `integer` | DEFAULT 0 | Times template has been used |
| `created_at` | `timestamptz` | DEFAULT now() | Creation timestamp |
| `updated_at` | `timestamptz` | DEFAULT now() | Last update |

**`sections` JSONB Structure:**
```json
[
  {
    "id": "section-1",
    "title": "Project Basics",
    "fields": [
      {
        "id": "field-1",
        "type": "text",
        "label": "Project Name",
        "placeholder": "Enter project name...",
        "required": true,
        "options": null
      },
      {
        "id": "field-2",
        "type": "select",
        "label": "Project Type",
        "placeholder": "Select type...",
        "required": true,
        "options": ["Option 1", "Option 2", "Option 3"]
      }
    ]
  }
]
```

**Supported Field Types:**
- `text` - Short text input
- `textarea` - Long text area
- `number` - Numeric input
- `price` - Currency input
- `date` - Date picker
- `daterange` - Start/end date
- `select` - Single dropdown
- `multiselect` - Multiple choice
- `link` - URL input
- `email` - Email input
- `phone` - Phone input
- `file` - File upload
- `image` - Image upload

---

## Subscriptions & Billing

### 7. `subscription_plans`

Reference table for available plans.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `text` | PK | Plan identifier (free, pro, enterprise) |
| `name` | `text` | NOT NULL | Display name |
| `description` | `text` | | Plan description |
| `price_monthly` | `decimal(10,2)` | | Monthly price in USD |
| `price_yearly` | `decimal(10,2)` | | Yearly price in USD |
| `briefs_per_month` | `integer` | | Monthly brief limit (NULL = unlimited) |
| `features` | `text[]` | | Array of feature descriptions |
| `is_active` | `boolean` | DEFAULT true | Is plan available? |
| `stripe_price_id_monthly` | `text` | | Stripe price ID for monthly |
| `stripe_price_id_yearly` | `text` | | Stripe price ID for yearly |

**Seed Data:**
| Plan | Price | Briefs/Month | Features |
|------|-------|--------------|----------|
| free | $0 | 5 | 6 industries, basic templates, email support |
| pro | $19/mo | Unlimited | All industries, advanced AI, priority support, PDF export, team collaboration |
| enterprise | Custom | Unlimited | Everything in Pro + SSO, custom integrations, dedicated manager, SLA |

---

### 8. `user_subscriptions`

Tracks user subscription status.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Subscription record ID |
| `user_id` | `uuid` | FK → users.id, UNIQUE, NOT NULL | User |
| `plan_id` | `text` | FK → subscription_plans.id, DEFAULT 'free' | Current plan |
| `status` | `text` | DEFAULT 'active' | active, canceled, past_due, trialing |
| `billing_cycle` | `text` | DEFAULT 'monthly' | monthly, yearly |
| `current_period_start` | `timestamptz` | | Billing period start |
| `current_period_end` | `timestamptz` | | Billing period end |
| `cancel_at_period_end` | `boolean` | DEFAULT false | Will cancel at period end? |
| `stripe_customer_id` | `text` | | Stripe customer ID |
| `stripe_subscription_id` | `text` | | Stripe subscription ID |
| `created_at` | `timestamptz` | DEFAULT now() | When subscription started |
| `updated_at` | `timestamptz` | DEFAULT now() | Last update |

---

### 9. `payment_methods`

Stores user payment methods.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Payment method ID |
| `user_id` | `uuid` | FK → users.id, NOT NULL | Owner |
| `stripe_payment_method_id` | `text` | NOT NULL | Stripe PM ID |
| `card_brand` | `text` | | visa, mastercard, amex, etc. |
| `card_last4` | `text` | | Last 4 digits |
| `card_exp_month` | `integer` | | Expiration month |
| `card_exp_year` | `integer` | | Expiration year |
| `is_default` | `boolean` | DEFAULT false | Is default payment method? |
| `created_at` | `timestamptz` | DEFAULT now() | When added |

---

### 10. `invoices`

Billing history.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Invoice ID |
| `user_id` | `uuid` | FK → users.id, NOT NULL | User |
| `stripe_invoice_id` | `text` | | Stripe invoice ID |
| `amount` | `decimal(10,2)` | NOT NULL | Amount in USD |
| `currency` | `text` | DEFAULT 'usd' | Currency code |
| `status` | `text` | | paid, open, void, uncollectible |
| `invoice_pdf_url` | `text` | | URL to PDF invoice |
| `period_start` | `timestamptz` | | Billing period start |
| `period_end` | `timestamptz` | | Billing period end |
| `paid_at` | `timestamptz` | | When payment was received |
| `created_at` | `timestamptz` | DEFAULT now() | Invoice creation date |

---

## Usage & Analytics

### 11. `usage_credits`

Tracks monthly brief usage for free tier limits.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Record ID |
| `user_id` | `uuid` | FK → users.id, NOT NULL | User |
| `period_start` | `date` | NOT NULL | Start of billing period |
| `period_end` | `date` | NOT NULL | End of billing period |
| `briefs_used` | `integer` | DEFAULT 0 | Briefs created this period |
| `briefs_limit` | `integer` | NOT NULL | Max briefs allowed |
| `created_at` | `timestamptz` | DEFAULT now() | Record creation |
| `updated_at` | `timestamptz` | DEFAULT now() | Last update |

**Unique Constraint:** `(user_id, period_start)`

---

### 12. `user_activity`

Tracks user actions for analytics.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Activity ID |
| `user_id` | `uuid` | FK → users.id, NOT NULL | User |
| `action` | `text` | NOT NULL | Action type |
| `resource_type` | `text` | | brief, template, etc. |
| `resource_id` | `uuid` | | ID of affected resource |
| `metadata` | `jsonb` | | Additional context |
| `created_at` | `timestamptz` | DEFAULT now() | When action occurred |

**Action Types:**
- `brief_created`
- `brief_generated`
- `brief_shared`
- `brief_downloaded`
- `brief_regenerated`
- `template_created`
- `subscription_upgraded`
- `subscription_canceled`

---

## Sharing & Collaboration

### 13. `brief_shares`

Tracks shared brief access.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | Share record ID |
| `brief_id` | `uuid` | FK → briefs.id, NOT NULL | Shared brief |
| `share_token` | `text` | UNIQUE, NOT NULL | Public access token |
| `created_by` | `uuid` | FK → users.id, NOT NULL | Who created the share |
| `expires_at` | `timestamptz` | | When share link expires (NULL = never) |
| `password_hash` | `text` | | Optional password protection |
| `view_count` | `integer` | DEFAULT 0 | Number of views |
| `is_active` | `boolean` | DEFAULT true | Is share link active? |
| `created_at` | `timestamptz` | DEFAULT now() | When share was created |

---

### 14. `brief_share_views`

Tracks individual views of shared briefs.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | View record ID |
| `share_id` | `uuid` | FK → brief_shares.id, NOT NULL | Share record |
| `viewer_ip` | `inet` | | Viewer's IP (hashed for privacy) |
| `user_agent` | `text` | | Browser/device info |
| `viewed_at` | `timestamptz` | DEFAULT now() | When viewed |

---

## File Storage (Supabase Storage Buckets)

### Buckets:
1. **`avatars`** - User profile pictures
   - Path: `{user_id}/avatar.{ext}`
   - Max size: 2MB
   - Allowed types: jpg, png, gif, webp

2. **`brief-assets`** - Files uploaded during brief creation
   - Path: `{user_id}/{brief_id}/{file_name}`
   - Max size: 10MB
   - Allowed types: jpg, png, pdf, doc, docx

3. **`exports`** - Generated PDF/Word exports
   - Path: `{user_id}/{brief_id}/export.{ext}`
   - Auto-delete after 24 hours

---

## Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐
│   auth.users    │       │   industries    │
│   (Supabase)    │       │                 │
└────────┬────────┘       └────────┬────────┘
         │                         │
         │ 1:1                     │ 1:N
         ▼                         │
┌─────────────────┐                │
│     users       │                │
│                 │                │
│ - profile       │                │
│ - onboarding    │                │
│ - preferences   │                │
└────────┬────────┘                │
         │                         │
         │ 1:N                     │
         ▼                         │
┌─────────────────┐                │
│     briefs      │◄───────────────┘
│                 │
│ - title         │
│ - industry      │
│ - status        │
│ - share_token   │
└────────┬────────┘
         │
    ┌────┴────┬─────────────┐
    │         │             │
    │ 1:N     │ 1:N         │ 1:N
    ▼         ▼             ▼
┌─────────┐ ┌─────────┐ ┌─────────────┐
│ brief_  │ │ brief_  │ │ brief_      │
│ sections│ │ answers │ │ shares      │
└─────────┘ └─────────┘ └─────────────┘

┌─────────────────┐       ┌─────────────────┐
│ subscription_   │       │ user_           │
│ plans           │       │ subscriptions   │
└────────┬────────┘       └────────┬────────┘
         │                         │
         │ 1:N                     │ 1:1
         └─────────────────────────┘
                   │
                   │ 1:N
                   ▼
         ┌─────────────────┐
         │    invoices     │
         └─────────────────┘
```

---

## RLS Policies

### Users Table
```sql
-- Users can only read/update their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### Briefs Table
```sql
-- Users can only access their own briefs
CREATE POLICY "Users can view own briefs" ON briefs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create briefs" ON briefs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own briefs" ON briefs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own briefs" ON briefs
  FOR DELETE USING (auth.uid() = user_id);

-- Public briefs can be viewed by anyone with share token
CREATE POLICY "Public briefs viewable" ON briefs
  FOR SELECT USING (is_public = true AND share_token IS NOT NULL);
```

### Brief Sections & Answers
```sql
-- Access through parent brief ownership
CREATE POLICY "Users can access own brief sections" ON brief_sections
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM briefs 
      WHERE briefs.id = brief_sections.brief_id 
      AND briefs.user_id = auth.uid()
    )
  );
```

---

## Database Functions

### 1. `increment_brief_usage()`
Increments user's monthly brief count when a brief is generated.

### 2. `check_brief_limit()`
Returns whether user can create more briefs this month.

### 3. `generate_share_token()`
Generates a unique, URL-safe share token.

### 4. `get_user_stats()`
Returns user's dashboard statistics (briefs created, credits remaining, time saved).

---

## Indexes

```sql
-- Performance indexes
CREATE INDEX idx_briefs_user_id ON briefs(user_id);
CREATE INDEX idx_briefs_industry_id ON briefs(industry_id);
CREATE INDEX idx_briefs_created_at ON briefs(created_at DESC);
CREATE INDEX idx_briefs_share_token ON briefs(share_token) WHERE share_token IS NOT NULL;

CREATE INDEX idx_brief_sections_brief_id ON brief_sections(brief_id);
CREATE INDEX idx_brief_answers_brief_id ON brief_answers(brief_id);

CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_usage_credits_user_period ON usage_credits(user_id, period_start);

CREATE INDEX idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX idx_user_activity_created_at ON user_activity(created_at DESC);
```

---

## Summary

### Total Tables: 14

| Category | Tables |
|----------|--------|
| **Users & Auth** | users |
| **Content** | industries, briefs, brief_sections, brief_answers, custom_brief_templates |
| **Billing** | subscription_plans, user_subscriptions, payment_methods, invoices |
| **Usage** | usage_credits, user_activity |
| **Sharing** | brief_shares, brief_share_views |

### Key Features Supported:
- ✅ Email + Google OAuth authentication
- ✅ 5-step onboarding wizard data storage
- ✅ 10 industry questionnaires
- ✅ Custom brief builder with dynamic fields
- ✅ AI-generated brief content storage
- ✅ Brief sharing with public links
- ✅ Free/Pro/Enterprise subscription tiers
- ✅ Stripe payment integration
- ✅ Monthly usage limits for free tier
- ✅ User activity tracking
- ✅ File uploads (avatars, brief assets)
- ✅ PDF/Word export tracking

---

## Next Steps

1. Create Supabase project
2. Run migration scripts to create tables
3. Set up RLS policies
4. Configure Stripe webhooks
5. Implement authentication flow
6. Connect frontend to Supabase client
