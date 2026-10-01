'use client';

import { useState } from 'react';

export default function RegistrationForm({ kind, fields }) {
  const [done, setDone] = useState(false);

  return (
    <form
      className="vol-form registration-detail-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();

        const empty = [...e.currentTarget.elements].find(
          (el) =>
            el.tagName === 'INPUT' &&
            !el.value.trim()
        );

        if (empty) return empty.focus();

        setDone(true);
      }}
    >
      {!done && (
        <>
          <h3
            style={{
              margin: '0 0 6px',
              fontSize: 20,
              color: 'var(--plum)',
            }}
          >
            {kind[0].toUpperCase() + kind.slice(1)} registration
          </h3>

          <p
            style={{
              fontSize: 13,
              opacity: 0.7,
              margin: '0 0 22px',
            }}
          >
            Enter your details to register as{' '}
            {kind === 'attendee' ? 'an' : 'a'} {kind}.
          </p>

          {fields.map(([label, type, placeholder]) => (
            <label
              key={label}
              className="detail-field"
            >
              <span>{label}</span>

              <input
                type={type}
                placeholder={placeholder}
              />
            </label>
          ))}

          <button
            className="register-btn detail-submit"
            type="submit"
          >
            Continue
          </button>
        </>
      )}

      {done && (
        <div className="success-box detail-success show">
          <h4
            style={{
              margin: '0 0 6px',
              color: 'var(--plum)',
            }}
          >
            Registration noted
          </h4>

          <p
            style={{
              fontSize: 13,
              opacity: 0.75,
              margin: 0,
            }}
          >
            Thank you. Your {kind} registration details have been captured.
          </p>
        </div>
      )}
    </form>
  );
}
