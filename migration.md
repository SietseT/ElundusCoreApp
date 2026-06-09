# Release 1.0.0 Checklist

## Before releasing 1.0.0

- [ ] Set up tauri-plugin-updater (so 1.0.0+ users get auto-updates going forward)
      https://v2.tauri.app/plugin/updater/
- [ ] Bump version to 1.0.0 in package.json AND src-tauri/tauri.conf.json
- [ ] Verify icon files exist: public/icon.icns, public/icon.ico, public/icon.png

## Migrating users from Electron 0.8.0

- [ ] Push one final Electron update (0.8.1) showing a banner:
      "Version 1.0.0 is available — requires a fresh install. [Download]"
      Link to: https://github.com/<your-repo>/releases/latest
- [ ] Tag and push 1.0.0 to trigger the Tauri release workflow:
      git tag v1.0.0 && git push origin v1.0.0
- [ ] Publish the draft GitHub Release (release.yml creates it as draft)

## Notes

- Users need to manually uninstall the old Electron app after installing 1.0.0
- Both apps appear separately in Add/Remove Programs on Windows — this is expected
- User preferences (voice, dark mode) will reset to defaults — not worth migrating
