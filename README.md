# Les Petites Fugues — LPF Website

This repository contains the public website for **Les Petites Fugues (LPF)**, available at **https://www.lpf.one**.

LPF develops small, focused macOS applications for people who prefer to keep control of their files, folders and data.

## Applications

- **LPF Organizer** — Organize, cull and edit metadata for your photographs.
- **LPF Explorer** — Browse, search and create collections from your existing photo archive.

Both applications are available free of charge, with optional donations.

Visit [lpf.one](https://www.lpf.one) for information, documentation and downloads.

## About this repository

This repository contains only the files required to publish the LPF website using GitHub Pages.

**The source code of LPF Organizer and LPF Explorer is not included here.**

The applications are distributed as freeware, but they are not open-source software. Their source code remains private.

## Contact and support

For questions, feedback and support, please visit [lpf.one](https://www.lpf.one).

---

*Small apps. Your files. No cloud required.*

## Publishing new application versions

Current version numbers, download links and (for Explorer) the minimum
Organizer version needed for handoff come from:

- `updates/organizer.json`
- `updates/explorer.json`

The same JSON files are used by the applications for update checks.
`release-info.js` loads them on the website and fills in the version labels,
product download buttons, and ZIP filenames automatically.

For the next release, publish the new ZIP to the appropriate GitHub Releases
repository, then change the `version`, `downloadURL` (if necessary), and
`releaseNotes` in the corresponding JSON file. ZIP assets are named
`LPFOrganizer-<version>.zip` and `LPFExplorer-<version>.zip`.

If a JSON request fails, the pages still show readable, version-neutral
text and retain their existing GitHub download URLs. To test the automatic
labels, serve the site over HTTP(S), not directly from `file://`.
