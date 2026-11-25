import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

interface ServerlessReq {
  method?: string;
  body?: unknown;
}

interface ServerlessRes {
  status: (code: number) => ServerlessRes;
  json: (payload: unknown) => void;
}

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

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

export default async function handler(req: ServerlessReq, res: ServerlessRes) {
  if (req.method !== 'POST') {
    return res.status(405).json({ok: false, message: 'Method not allowed.'});
  }

  try {
    const raw =
      typeof req.body === 'string'
        ? (JSON.parse(req.body) as Record<string, unknown>)
        : ((req.body ?? {}) as Record<string, unknown>);

    const errors: Record<string, string> = {};
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
    }
    if (!gdprConsent) {
      errors.gdprConsent = 'You must agree to the contact and privacy policy terms.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        ok: false,
        message: 'Please review the highlighted fields and try again.',
        errors,
      });
    }

    const submittedAt = new Date().toISOString();
    const referenceId = `RM-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    const supabaseUrl = process.env.SUPABASE_URL?.trim();
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

    if (supabaseUrl && serviceRoleKey) {
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
          restaurant_name: restaurantName,
          contact_person: contactPerson,
          business_email: businessEmail,
          phone_number: phoneNumber,
          restaurant_type: restaurantType,
          restaurant_address: restaurantAddress,
          city,
          locations_count: locationsCount,
          riders_needed: ridersNeeded,
          needed_slots: neededSlots,
          preferred_start_date: preferredStartDate,
          additional_info: additionalInfo || null,
          gdpr_consent: gdprConsent,
          submitted_at: submittedAt,
        }),
      });

      if (!response.ok) {
        const detail = await response.text();
        throw new Error(`Supabase storage error (${response.status}): ${detail}`);
      }

      return res.status(201).json({
        ok: true,
        referenceId,
        submittedAt,
        storage: 'supabase',
        message: 'Your rider requirements have been submitted successfully.',
      });
    }

    const tmpDir = path.resolve('/tmp');
    const tmpFile = path.resolve(tmpDir, 'rapidmate-leads.json');
    if (tmpFile.startsWith(tmpDir + path.sep)) {
      let existing: Array<Record<string, unknown>> = [];
      try {
        const content = await fs.readFile(tmpFile, 'utf8');
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) existing = parsed;
      } catch {
        // File does not exist yet
      }
      existing.push({
        referenceId,
        submittedAt,
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
      });
      await fs.writeFile(tmpFile, JSON.stringify(existing, null, 2), 'utf8');
    }

    return res.status(201).json({
      ok: true,
      referenceId,
      submittedAt,
      storage: 'tmp_fallback',
      message: 'Your rider requirements have been submitted successfully.',
    });
  } catch (error) {
    console.error('Vercel lead submission error:', error);
    return res.status(500).json({
      ok: false,
      message: 'Unable to record your rider request right now. Please try again shortly.',
    });
  }
}
