// POST /api/volunteer: forwards a volunteer application to the Notion database.
// Env: NOTION_TOKEN (integration secret), NOTION_DB_ID (volunteer database id).

// form field -> Notion column name
const COLUMNS = {
  name: 'Name',
  phone: 'Phone',
  email: 'Email',
  college: 'College',
  course_year: 'Course & Year',
  team: 'Team',
  about: 'About',
  why_team: 'Why this team',
  skills: 'Skills',
  experience: 'Experience',
  idea: 'Idea',
  anything_else: 'Anything else',
};
const OPTIONAL = ['anything_else'];
const MAX_LEN = 10000;

// Notion caps each rich_text block at 2000 chars, so split long answers
const text = (v) => ({ rich_text: (v.match(/[\s\S]{1,2000}/g) || []).map((c) => ({ text: { content: c } })) });

const json = (status, data) => Response.json(data, { status });

export async function POST(req) {
  const body = (await req.json().catch(() => null)) || {};
  const data = {};
  for (const key of Object.keys(COLUMNS)) {
    const value = String(body[key] ?? '').trim();
    if (!value && !OPTIONAL.includes(key)) return json(400, { error: `Missing ${key}` });
    if (value.length > MAX_LEN) return json(400, { error: `${key} is too long` });
    data[key] = value;
  }

  // Store phone as 10 digits and email lowercased so duplicate lookups match
  data.phone = data.phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  data.email = data.email.toLowerCase();
  if (!/^[6-9]\d{9}$/.test(data.phone)) return json(400, { error: 'Enter a valid 10-digit Indian mobile number' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) return json(400, { error: 'Enter a valid email' });

  const headers = {
    Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
  };

  // ponytail: check-then-insert, two simultaneous submits can both pass; fine at this volume
  const existing = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DB_ID}/query`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      page_size: 1,
      filter: { or: [
        { property: COLUMNS.email, email: { equals: data.email } },
        { property: COLUMNS.phone, phone_number: { equals: data.phone } },
      ] },
    }),
  });
  if (!existing.ok) {
    console.error('Notion query error', existing.status, await existing.text());
    return json(502, { error: 'Could not save application' });
  }
  if ((await existing.json()).results.length) {
    return json(409, { error: 'You have already registered with this email or phone number.' });
  }

  const properties = {};
  for (const [key, column] of Object.entries(COLUMNS)) {
    if (key === 'name') properties[column] = { title: [{ text: { content: data.name } }] };
    else if (key === 'phone') properties[column] = { phone_number: data.phone };
    else if (key === 'email') properties[column] = { email: data.email };
    // Notion select options can't contain commas
    else if (key === 'team') properties[column] = { select: { name: data.team.replace(/,/g, '') } };
    else properties[column] = text(data[key]);
  }

  const notion = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers,
    body: JSON.stringify({ parent: { database_id: process.env.NOTION_DB_ID }, properties }),
  });

  if (!notion.ok) {
    console.error('Notion error', notion.status, await notion.text());
    return json(502, { error: 'Could not save application' });
  }
  return json(200, { ok: true });
}
