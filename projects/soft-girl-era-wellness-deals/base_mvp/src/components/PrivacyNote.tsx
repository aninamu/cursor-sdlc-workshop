import { useId, useState } from 'react';

export function PrivacyNote() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <footer className="privacy-note">
      <button
        type="button"
        className="privacy-note__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        Location & privacy
      </button>
      {open ? (
        <div id={panelId} className="privacy-note__panel">
          <p>
            Your location is used only in this browser session to sort deals and
            show approximate distance. We do not sell location data, and this
            demo does not send your coordinates to our servers.
          </p>
        </div>
      ) : null}
    </footer>
  );
}
