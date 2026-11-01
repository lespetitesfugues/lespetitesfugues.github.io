// LPF.one release information. Version numbers and download URLs come from
// updates/organizer.json and updates/explorer.json, also used by the Mac apps.
// A missing/unavailable JSON file leaves useful, version-neutral HTML in place.
(() => {
  'use strict';

  const apps = {
    organizer: { path: 'updates/organizer.json', zipPrefix: 'LPFOrganizer' },
    explorer: { path: 'updates/explorer.json', zipPrefix: 'LPFExplorer' }
  };
  const versionPattern = /^\d+\.\d+\.\d+(?:[-+][A-Za-z0-9.-]+)?$/;

  function applyRelease(app, config, info) {
    if (!info || typeof info.version !== 'string' ||
        !versionPattern.test(info.version)) {
      throw new Error(`Invalid version in ${config.path}`);
    }

    document.querySelectorAll(`[data-lpf-version-label="${app}"]`).forEach(el => {
      el.textContent = `Version ${info.version}`;
    });
    document.querySelectorAll(`[data-lpf-version="${app}"]`).forEach(el => {
      el.textContent = ` ${info.version}`;
    });
    document.querySelectorAll(`[data-lpf-zip="${app}"]`).forEach(el => {
      el.textContent = `${config.zipPrefix}-${info.version}.zip`;
    });

    // Keep each HTML page's working GitHub link as a fallback.
    if (typeof info.downloadURL === 'string' &&
        /^https:\/\//i.test(info.downloadURL)) {
      document.querySelectorAll(`[data-lpf-download="${app}"]`).forEach(el => {
        el.href = info.downloadURL;
      });
    }

    // This is a compatibility requirement, not the latest Organizer version.
    if (app === 'explorer' &&
        typeof info.handoffMinimumOrganizerVersion === 'string' &&
        versionPattern.test(info.handoffMinimumOrganizerVersion)) {
      document.querySelectorAll('[data-lpf-handoff="explorer"]').forEach(el => {
        el.textContent = `LPF Organizer version ${info.handoffMinimumOrganizerVersion} or later is needed only for the handoff feature.`;
      });
    }
  }

  for (const [app, config] of Object.entries(apps)) {
    if (!document.querySelector(
      `[data-lpf-version-label="${app}"], [data-lpf-version="${app}"], ` +
      `[data-lpf-zip="${app}"], [data-lpf-download="${app}"], ` +
      `[data-lpf-handoff="${app}"]`)) continue;

    fetch(config.path, { cache: 'no-cache' })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(info => applyRelease(app, config, info))
      .catch(error => {
        // Deliberately leave the version-neutral text and static download links.
        console.warn(`LPF.one: could not load ${config.path}`, error);
      });
  }
})();
