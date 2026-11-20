# Converting a chapter to the "sa bàn isometric" style

Chapter 1 (`src/cases/ho-so-boi-thuong`) is the reference. Each chapter is
converted in its own branch and only touches its own case folder.

1. Add `"artStyle": "sa-ban"` to the chapter's `case.json`. The UI theme,
   block portraits (front-facing `FrontBust`), the light deduction board and the
   interrogation room (`InterviewRoom`, investigator opposite with gestures)
   switch on automatically.
2. Scenes: write `iso/scenes.tsx` with `IsoStage` + `Box`/`Cyl`/`Face`/props
   from `src/art/iso`. Place objects with `floorAt`, `wallLAt`, `wallRAt` so
   they land under the existing hotspot percentages; do not move hotspots.
3. Close-ups: `iso/closeups.tsx`, each a crop of the zone diorama via `IsoCrop`
   (see Chapter 1).
4. Evidence photos that show people or places: block people with `FrontBust`
   (`k`, `at`, `colors`) and front-on blocks (the `Fb` helper in Chapter 1's
   `documents.tsx`). Text-only papers stay as paper.
5. Reconstruction, cutscenes and epilogue panels: small dioramas with
   `IsoFigure` (facing `x`/`y` shows the face). Use `OnPlane` for text lying on
   a desk or a box front.
6. Export the iso versions from the chapter's `index.ts`; keep the old flat
   files for comparison.
7. Do not edit shared files in `src/art/iso` unless a new generic prop is
   needed; add chapter-only props in the chapter folder.
8. Check with `tsc --noEmit` and screenshots of every zone, close-up,
   interrogation, document and epilogue panel.
