import crypto from 'crypto';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';
import {createServer as createViteServer} from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const LEADS_FILE = path.resolve(DATA_DIR, 'leads.json');

const ALLOWED_RESTAURANT_TYPES = new Set([
  'Pizza Restaurant',
  'Sushi Restaurant',
  'Cloud Kitchen',
  'Restaurant Franchise',
  'Independent Restaurant',
  'Other',
]);

const ALLOWED_LOCATION_COUNTS = new Set(['1', '2-5', '6-10', '10+']);
const ALLOWED_RIDER_COUNTS = new Set(['1-2', '3-5', '6-10', '10+']);
const ALLOWED_TIME_SLOTS = new Set([
  'Weekday Lunch',
  'Weekday Dinner',
  'Friday Evening',
  'Saturday',
  'Sunday',
  'Football Match Days',
  'Christmas / New Year',
  'Special Promotions',
  'Other',
]);

interface LeadSubmissionPayload {
  restaurantName: string;
  contactPerson: string;
  businessEmail: string;
  phoneNumber: string;
  restaurantType: string;
  restaurantAddress: string;
  city: string;
  locationsCount: string;
  ridersNeeded: string;
  neededSlots: string[];
  preferredStartDate: string;
  additionalInfo?: string;
  gdprConsent: boolean;
}

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function validateLeadPayload(body: unknown): {
  valid: boolean;
  errors: Record<string, string>;
  data?: LeadSubmissionPayload;
} {
  const errors: Record<string, string> = {};
  if (!body || typeof body !== 'object') {
    return {valid: false, errors: {form: 'Invalid request body.'}};
  }

  const raw = body as Record<string, unknown>;
  const restaurantName = sanitizeText(raw.restaurantName, 160);
  const contactPerson = sanitizeText(raw.contactPerson, 120);
  const businessEmail = sanitizeText(raw.businessEmail, 160);
  const phoneNumber = sanitizeText(raw.phoneNumber, 40);
  const restaurantType = sanitizeText(raw.restaurantType, 60);
  const restaurantAddress = sanitizeText(raw.restaurantAddress, 240);
  const city = sanitizeText(raw.city, 100);
  const locationsCount = sanitizeText(raw.locationsCount, 20);
  const ridersNeeded = sanitizeText(raw.ridersNeeded, 20);
  const preferredStartDate = sanitizeText(raw.preferredStartDate, 20);
  const additionalInfo = sanitizeText(raw.additionalInfo, 1500);
  const gdprConsent = raw.gdprConsent === true;

  const neededSlotsRaw = Array.isArray(raw.neededSlots) ? raw.neededSlots : [];
  const neededSlots = Array.from(
    new Set(
      neededSlotsRaw
        .map((item) => sanitizeText(item, 40))
        .filter((item) => ALLOWED_TIME_SLOTS.has(item)),
    ),
  );

  if (restaurantName.length < 2) {
    errors.restaurantName = 'Please enter your restaurant or business name.';
  }
  if (contactPerson.length < 2) {
    errors.contactPerson = 'Please enter a primary contact person.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(businessEmail)) {
    errors.businessEmail = 'Please provide a valid business email address.';
  }
  if (!/^[+\d][\d\s().-]{6,25}$/.test(phoneNumber)) {
    errors.phoneNumber = 'Please provide a valid business phone number.';
  }
  if (!ALLOWED_RESTAURANT_TYPES.has(restaurantType)) {
    errors.restaurantType = 'Please select a restaurant type.';
  }
  if (restaurantAddress.length < 4) {
    errors.restaurantAddress = 'Please enter the restaurant street address.';
  }
  if (city.length < 2) {
    errors.city = 'Please enter the city.';
  }
  if (!ALLOWED_LOCATION_COUNTS.has(locationsCount)) {
    errors.locationsCount = 'Please select the number of restaurant locations.';
  }
  if (!ALLOWED_RIDER_COUNTS.has(ridersNeeded)) {
    errors.ridersNeeded = 'Please select how many additional riders you need.';
  }
  if (neededSlots.length === 0) {
    errors.neededSlots = 'Please select at least one peak period or time slot.';
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredStartDate)) {
    errors.preferredStartDate = 'Please select a preferred start date.';
  } else {
    const parsed = new Date(`${preferredStartDate}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime())) {
      errors.preferredStartDate = 'Please enter a valid start date.';
    }
  }
  if (!gdprConsent) {
    errors.gdprConsent = 'You must agree to the contact and privacy policy terms.';
  }

  if (Object.keys(errors).length > 0) {
    return {valid: false, errors};
  }

  return {
    valid: true,
    errors: {},
    data: {
      restaurantName,
      contactPerson,
      businessEmail,
      phoneNumber,
      restaurantType,
      restaurantAddress,
      city,
      locationsCount,
      ridersNeeded,
      neededSlots,
      preferredStartDate,
      additionalInfo,
      gdprConsent,
    },
  };
}

async function saveToSupabase(
  referenceId: string,
  submittedAt: string,
  lead: LeadSubmissionPayload,
): Promise<boolean> {
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) {
    return false;
  }

  const endpoint = new URL('/rest/v1/rider_leads', supabaseUrl).toString();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      reference_id: referenceId,
      restaurant_name: lead.restaurantName,
      contact_person: lead.contactPerson,
      business_email: lead.businessEmail,
      phone_number: lead.phoneNumber,
      restaurant_type: lead.restaurantType,
      restaurant_address: lead.restaurantAddress,
      city: lead.city,
      locations_count: lead.locationsCount,
      riders_needed: lead.ridersNeeded,
      needed_slots: lead.neededSlots,
      preferred_start_date: lead.preferredStartDate,
      additional_info: lead.additionalInfo || null,
      gdpr_consent: lead.gdprConsent,
      submitted_at: submittedAt,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase storage error (${response.status}): ${detail}`);
  }

  return true;
}

async function saveToLocalStore(
  referenceId: string,
  submittedAt: string,
  lead: LeadSubmissionPayload,
): Promise<void> {
  if (!LEADS_FILE.startsWith(DATA_DIR + path.sep)) {
    throw new Error('Invalid storage path configuration.');
  }
  await fs.mkdir(DATA_DIR, {recursive: true});

  let existing: Array<Record<string, unknown>> = [];
  try {
    const content = await fs.readFile(LEADS_FILE, 'utf8');
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch (err) {
    const nodeErr = err as NodeJS.ErrnoException;
    if (nodeErr.code !== 'ENOENT') {
      throw err;
    }
  }

  existing.push({
    referenceId,
    submittedAt,
    ...lead,
  });

  const tempFile = path.resolve(DATA_DIR, `leads.${crypto.randomUUID()}.tmp`);
  if (!tempFile.startsWith(DATA_DIR + path.sep)) {
    throw new Error('Invalid temporary file path.');
  }
  await fs.writeFile(tempFile, JSON.stringify(existing, null, 2), 'utf8');
  await fs.rename(tempFile, LEADS_FILE);
}

async function startServer() {
  const app = express();
  app.use(express.json({limit: '100kb'}));

  app.get('/api/health', (_req, res) => {
    const supabaseConfigured = Boolean(
      process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
    );
    res.json({
      status: 'ok',
      supabaseConfigured,
      timestamp: new Date().toISOString(),
    });
  });

  app.post('/api/leads', async (req, res) => {
    try {
      const validation = validateLeadPayload(req.body);
      if (!validation.valid || !validation.data) {
        return res.status(400).json({
          ok: false,
          message: 'Please review the highlighted fields and try again.',
          errors: validation.errors,
        });
      }

      const submittedAt = new Date().toISOString();
      const referenceId = `RM-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

      const savedToSupabase = await saveToSupabase(referenceId, submittedAt, validation.data);
      if (!savedToSupabase) {
        await saveToLocalStore(referenceId, submittedAt, validation.data);
      }

      return res.status(201).json({
        ok: true,
        referenceId,
        submittedAt,
        storage: savedToSupabase ? 'supabase' : 'server_store',
        message: 'Your rider requirements have been submitted successfully.',
      });
    } catch (error) {
      console.error('Lead submission error:', error);
      return res.status(500).json({
        ok: false,
        message: 'Unable to record your rider request right now. Please try again shortly.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: {middlewareMode: true},
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RapidMate server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
