# Mentor headshots

Drop a headshot here and point the mentor's `photo` field at it in
`src/lib/site.ts` — the commented-out lines are already in place:

    photo: '/mentors/govindam-pal.jpg',
    photo: '/mentors/anwar.jpg',

Requirements:

- Square crop. The avatar renders in a rounded tile at 80px on the grid
  and 96px on the profile page, so 400x400 is plenty.
- JPEG or WebP, under ~120 KB. These ship as static files with no image
  optimisation (the site is a static export), so the file you drop in is
  the file every visitor downloads.
- Face centred, head and shoulders.

Without a photo the mentor falls back to an initials tile, so the layout
is correct either way.
