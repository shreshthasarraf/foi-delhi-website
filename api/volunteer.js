// Vercel function: forwards a volunteer application to the Notion database.
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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body || {};
  const data = {};
  for (const key of Object.keys(COLUMNS)) {
    const value = String(body[key] ?? '').trim();
    if (!value && !OPTIONAL.includes(key)) return res.status(400).json({ error: `Missing ${key}` });
    if (value.length > MAX_LEN) return res.status(400).json({ error: `${key} is too long` });
    data[key] = value;
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
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ parent: { database_id: process.env.NOTION_DB_ID }, properties }),
  });

  if (!notion.ok) {
    console.error('Notion error', notion.status, await notion.text());
    return res.status(502).json({ error: 'Could not save application' });
  }
  return res.status(200).json({ ok: true });
}
