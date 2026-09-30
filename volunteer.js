/*
 * Festival of Ideas - Volunteer Form API
 * File: /api/volunteer.js
 *
 * Vercel Serverless Function
 *
 * Required Vercel Environment Variables:
 *
 * NOTION_TOKEN
 * NOTION_DATABASE_ID
 */

const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

/* =========================================================
   FORM FIELDS
========================================================= */

const REQUIRED_FIELDS = [
  "name",
  "phone",
  "email",
  "college",
  "course_year",
  "about",
  "team",
  "why_team",
  "skills",
  "experience",
  "idea"
];

const OPTIONAL_FIELDS = [
  "anything"
];

/* =========================================================
   NOTION PROPERTY ALIASES
   Allows your Notion column names to be slightly different.
========================================================= */

const FIELD_ALIASES = {
  name: [
    "name",
    "full name",
    "applicant name",
    "student name"
  ],

  phone: [
    "phone",
    "phone number",
    "mobile",
    "mobile number",
    "whatsapp",
    "whatsapp number"
  ],

  email: [
    "email",
    "e-mail",
    "email address",
    "e-mail address"
  ],

  college: [
    "college",
    "college name",
    "institution"
  ],

  course_year: [
    "course_year",
    "course and year",
    "course & year",
    "course/year",
    "course",
    "year"
  ],

  about: [
    "about",
    "about yourself",
    "something about yourself"
  ],

  team: [
    "team",
    "preferred team",
    "team choice",
    "chosen team"
  ],

  why_team: [
    "why_team",
    "why team",
    "why did you choose this particular team",
    "team interest"
  ],

  skills: [
    "skills",
    "strengths",
    "skills or strengths"
  ],

  experience: [
    "experience",
    "relevant experience"
  ],

  idea: [
    "idea",
    "original idea",
    "idea or approach"
  ],

  anything: [
    "anything",
    "anything else",
    "additional information",
    "additional info"
  ]
};

/* =========================================================
   RESPONSE HELPER
========================================================= */

function jsonResponse(data, status = 200) {
  return new Response(
    JSON.stringify(data),
    {
      status: status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    }
  );
}

/* =========================================================
   CLEAN INPUT
========================================================= */

function clean(value, maxLength = 5000) {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

/* =========================================================
   NORMALIZE PROPERTY NAMES
========================================================= */

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[_-]+/g, " ")
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
}

/* =========================================================
   EMAIL
========================================================= */

function normalizeEmail(value) {
  return clean(value, 254).toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/* =========================================================
   PHONE
========================================================= */

function normalizePhone(value) {

  let phone = clean(value, 40);

  // Remove spaces, +, -, brackets, etc.
  let digits = phone.replace(/\D/g, "");

  // +91XXXXXXXXXX
  if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.substring(2);
  }

  // 0XXXXXXXXXX
  if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.substring(1);
  }

  return digits;
}

function isValidIndianPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}

/* =========================================================
   NOTION REQUEST
========================================================= */

async function notionRequest(path, options = {}) {

  const token = process.env.NOTION_TOKEN;

  if (!token) {
    throw new Error(
      "NOTION_TOKEN is not configured in Vercel."
    );
  }

  const response = await fetch(
    `${NOTION_API}${path}`,
    {
      ...options,

      headers: {
        "Authorization": `Bearer ${token}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",

        ...(options.headers || {})
      }
    }
  );

  const text = await response.text();

  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {
      raw: text
    };
  }

  if (!response.ok) {

    const message =
      data?.message ||
      data?.error ||
      `Notion API returned HTTP ${response.status}`;

    const error = new Error(message);

    error.status = response.status;
    error.notion = data;

    throw error;
  }

  return data;
}

/* =========================================================
   GET DATABASE SCHEMA
========================================================= */

async function getDatabaseSchema(databaseId) {

  return notionRequest(
    `/databases/${encodeURIComponent(databaseId)}`,
    {
      method: "GET"
    }
  );
}

/* =========================================================
   FIND NOTION PROPERTY
========================================================= */

function findProperty(schema, fieldName) {

  const properties = schema?.properties || {};

  const aliases =
    FIELD_ALIASES[fieldName] || [fieldName];

  const normalizedAliases =
    aliases.map(normalizeKey);

  /* Exact match */

  for (const [propertyName, property] of Object.entries(properties)) {

    if (
      normalizedAliases.includes(
        normalizeKey(propertyName)
      )
    ) {

      return {
        name: propertyName,
        property: property
      };
    }
  }

  /* Partial match */

  for (const [propertyName, property] of Object.entries(properties)) {

    const normalizedName =
      normalizeKey(propertyName);

    for (const alias of normalizedAliases) {

      if (
        alias.length >= 4 &&
        (
          normalizedName.includes(alias) ||
          alias.includes(normalizedName)
        )
      ) {

        return {
          name: propertyName,
          property: property
        };
      }
    }
  }

  return null;
}

/* =========================================================
   FIND TITLE PROPERTY
========================================================= */

function findTitleProperty(schema) {

  const properties =
    schema?.properties || {};

  for (
    const [name, property]
    of Object.entries(properties)
  ) {

    if (property?.type === "title") {

      return {
        name: name,
        property: property
      };
    }
  }

  return null;
}

/* =========================================================
   CONVERT VALUE TO NOTION PROPERTY
========================================================= */

function textValueForProperty(
  propertyType,
  value
) {

  const text = clean(value);

  if (!text) {
    return null;
  }

  switch (propertyType) {

    case "title":

      return {
        title: [
          {
            type: "text",

            text: {
              content: text
            }
          }
        ]
      };

    case "rich_text":

      return {
        rich_text: (text.match(/[\s\S]{1,2000}/g) || []).map(function (chunk) {
          return { type: "text", text: { content: chunk } };
        })
      };

    case "email":

      return {
        email: normalizeEmail(text)
      };

    case "phone_number":

      return {
        phone_number: text
      };

    case "url":

      return {
        url: text
      };

    case "number":

      return {
        number: Number(text)
      };

    case "select":

      return {
        select: {
          name: text
        }
      };

    default:

      return null;
  }
}

/* =========================================================
   BUILD NOTION PROPERTIES
========================================================= */

function buildProperties(schema, form) {

  const databaseProperties =
    schema?.properties || {};

  const result = {};

  const missing = [];

  /* Find Title */

  const titleProperty =
    findTitleProperty(schema);

  if (!titleProperty) {

    throw new Error(
      "Your Notion database must contain a Title property."
    );
  }

  /* Applicant Name */

  result[titleProperty.name] = {

    title: [

      {
        type: "text",

        text: {
          content: clean(form.name)
        }
      }

    ]
  };

  /* Other fields */

  for (
    const fieldName
    of [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]
  ) {

    if (fieldName === "name") {
      continue;
    }

    const value =
      clean(form[fieldName]);

    if (!value) {

      if (
        REQUIRED_FIELDS.includes(fieldName)
      ) {

        missing.push(fieldName);
      }

      continue;
    }

    const match =
      findProperty(
        schema,
        fieldName
      );

    if (!match) {

      if (
        REQUIRED_FIELDS.includes(fieldName)
      ) {

        missing.push(fieldName);
      }

      continue;
    }

    const propertyValue =
      textValueForProperty(
        match.property.type,
        value
      );

    if (propertyValue) {

      result[match.name] =
        propertyValue;
    }
  }

  /* Remove invalid properties */

  for (
    const key of Object.keys(result)
  ) {

    if (!databaseProperties[key]) {
      delete result[key];
    }
  }

  return {
    properties: result,
    missing: missing
  };
}

/* =========================================================
   DUPLICATE FILTER
========================================================= */

function duplicateFilterForProperty(
  propertyName,
  propertyType,
  value
) {

  if (propertyType === "email") {

    return {

      property: propertyName,

      email: {
        equals: value
      }

    };
  }

  if (propertyType === "phone_number") {

    return {

      property: propertyName,

      phone_number: {
        equals: value
      }

    };
  }

  if (propertyType === "title") {

    return {

      property: propertyName,

      title: {
        equals: value
      }

    };
  }

  return {

    property: propertyName,

    rich_text: {
      equals: value
    }

  };
}

/* =========================================================
   CHECK DUPLICATE EMAIL / PHONE
========================================================= */

async function findDuplicate(
  databaseId,
  schema,
  form
) {

  const filters = [];

  /* Email */

  const emailProperty =
    findProperty(
      schema,
      "email"
    );

  if (emailProperty) {

    filters.push(

      duplicateFilterForProperty(
        emailProperty.name,
        emailProperty.property.type,
        form.email
      )

    );
  }

  /* Phone */

  const phoneProperty =
    findProperty(
      schema,
      "phone"
    );

  if (phoneProperty) {

    filters.push(

      duplicateFilterForProperty(
        phoneProperty.name,
        phoneProperty.property.type,
        form.phone
      )

    );
  }

  if (!filters.length) {

    throw new Error(
      "Your Notion database needs an Email and/or Phone property."
    );
  }

  let filter;

  if (filters.length === 1) {

    filter = filters[0];

  } else {

    filter = {
      or: filters
    };
  }

  const result =
    await notionRequest(

      `/databases/${encodeURIComponent(
        databaseId
      )}/query`,

      {
        method: "POST",

        body: JSON.stringify({

          filter: filter,

          page_size: 10

        })
      }

    );

  if (
    Array.isArray(result.results) &&
    result.results.length > 0
  ) {

    return result.results[0];
  }

  return null;
}

/* =========================================================
   CREATE NOTION PAGE
========================================================= */

async function createVolunteerPage(
  databaseId,
  properties
) {

  return notionRequest(
    "/pages",
    {
      method: "POST",

      body: JSON.stringify({

        parent: {
          database_id: databaseId
        },

        properties: properties

      })
    }
  );
}

/* =========================================================
   MAIN VERCEL HANDLER
========================================================= */

async function handler(request) {

  /* =======================================================
     HEALTH CHECK
     Open /api/volunteer in browser
  ======================================================= */

  if (request.method === "GET") {

    const configured =
      Boolean(
        process.env.NOTION_TOKEN &&
        (process.env.NOTION_DB_ID || process.env.NOTION_DATABASE_ID)
      );

    return jsonResponse({

      ok: true,

      service:
        "Festival of Ideas Volunteer API",

      notionConfigured:
        configured

    });
  }

  /* =======================================================
     ONLY POST ALLOWED FOR FORM SUBMISSION
  ======================================================= */

  if (request.method !== "POST") {

    return jsonResponse(

      {
        ok: false,

        message:
          "Method not allowed. Use POST."
      },

      405

    );
  }

  try {

    /* =====================================================
       CHECK ENVIRONMENT VARIABLES
    ===================================================== */

    const databaseId =
      clean(
        (process.env.NOTION_DB_ID || process.env.NOTION_DATABASE_ID),
        100
      );

    if (
      !process.env.NOTION_TOKEN ||
      !databaseId
    ) {

      return jsonResponse(

        {
          ok: false,

          message:
            "Server configuration is incomplete. Please configure NOTION_TOKEN and NOTION_DB_ID in Vercel."
        },

        500

      );
    }

    /* =====================================================
       READ REQUEST BODY
    ===================================================== */

    let body = {};

    try {

      if (
        request.body &&
        typeof request.body === "object"
      ) {

        body = request.body;

      } else {

        body = await request.json();
      }

    } catch {

      return jsonResponse(

        {
          ok: false,

          message:
            "Invalid request body."
        },

        400

      );
    }

    /* =====================================================
       READ FORM VALUES
    ===================================================== */

    const form = {

      name:
        clean(body.name, 150),

      phone:
        normalizePhone(body.phone),

      email:
        normalizeEmail(body.email),

      college:
        clean(body.college, 250),

      course_year:
        clean(body.course_year, 150),

      about:
        clean(body.about, 5000),

      team:
        clean(body.team, 200),

      why_team:
        clean(body.why_team, 5000),

      skills:
        clean(body.skills, 3000),

      experience:
        clean(body.experience, 5000),

      idea:
        clean(body.idea, 5000),

      anything:
        clean(body.anything ?? body.anything_else, 5000)

    };

    /* =====================================================
       REQUIRED FIELD VALIDATION
    ===================================================== */

    const missing =
      REQUIRED_FIELDS.filter(
        field => !form[field]
      );

    if (missing.length > 0) {

      return jsonResponse(

        {
          ok: false,

          message:
            `Please complete all required fields. Missing: ${missing.join(", ")}.`
        },

        400

      );
    }

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    if (!isValidEmail(form.email)) {

      return jsonResponse(

        {
          ok: false,

          message:
            "Please enter a valid email address."
        },

        400

      );
    }

    /* =====================================================
       PHONE VALIDATION
    ===================================================== */

    if (!isValidIndianPhone(form.phone)) {

      return jsonResponse(

        {
          ok: false,

          message:
            "Please enter a valid 10-digit Indian mobile number beginning with 6, 7, 8 or 9."
        },

        400

      );
    }

    /* =====================================================
       GET NOTION DATABASE STRUCTURE
    ===================================================== */

    const schema =
      await getDatabaseSchema(
        databaseId
      );

    /* =====================================================
       DUPLICATE CHECK
    ===================================================== */

    const duplicate =
      await findDuplicate(
        databaseId,
        schema,
        form
      );

    if (duplicate) {

      return jsonResponse(

        {
          ok: false,

          duplicate: true,

          message:
            "This email address or phone number has already been used for a volunteer application."
        },

        409

      );
    }

    /* =====================================================
       BUILD NOTION RECORD
    ===================================================== */

    const built =
      buildProperties(
        schema,
        form
      );

    /* =====================================================
       CHECK DATABASE PROPERTIES
    ===================================================== */

    if (built.missing.length > 0) {

      return jsonResponse(

        {
          ok: false,

          message:
            "Your Notion database is missing required properties for this form.",

          missingProperties:
            built.missing,

          hint:
            "Create properties matching the form fields. Email should preferably be an Email property and Phone should preferably be a Phone number property. Other answers can be Rich text."
        },

        500

      );
    }

    /* =====================================================
       CREATE NOTION PAGE
    ===================================================== */

    const page =
      await createVolunteerPage(
        databaseId,
        built.properties
      );

    /* =====================================================
       SUCCESS
    ===================================================== */

    return jsonResponse(

      {
        ok: true,

        message:
          "Volunteer application submitted successfully.",

        pageId:
          page.id

      },

      201

    );

  } catch (error) {

    console.error(
      "Volunteer API error:",
      {
        message: error?.message,
        status: error?.status
      }
    );

    /* =====================================================
       FRIENDLY ERROR MESSAGES
    ===================================================== */

    let message =
      "Unable to submit the application right now. Please try again.";

    if (
      error?.status === 401 ||
      error?.status === 403
    ) {

      message =
        "The Notion integration is not authorized to access this database. Please connect the integration to your Notion database.";

    } else if (
      error?.status === 404
    ) {

      message =
        "The Notion database could not be found. Please check NOTION_DB_ID and make sure the database is shared with the integration.";

    } else if (
      error?.status === 429
    ) {

      message =
        "The submission service is temporarily busy. Please wait a moment and try again.";
    }

    return jsonResponse(

      {
        ok: false,

        message: message

      },

      500

    );
  }
}


/* =========================================================
   VERCEL EXPORT
========================================================= */

module.exports = handler;
