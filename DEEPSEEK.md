# DEEPSEEK.md

Your working instructions for this repository. Read this whole file before editing
anything. Follow every rule below exactly, even if it looks unnecessary — each one
exists because skipping it broke something before. (This repo also has an `AGENTS.md`
for other AI tools — same rules, longer explanations. You don't need it.)

## What this repo is

**Anticus** — a web app for learning Ancient Greek and Biblical Hebrew.
Published on GitHub Pages: https://grandiozova.github.io/anticus/

- No backend, no build step, no bundler. Progress is stored in `localStorage` only.
- All files are **classic scripts**, not ES modules. Do not add `type="module"`,
  `import`/`export`, or `fetch()`. Reason: ~80 `onclick="..."` handlers in the HTML
  call these functions by name, so every function must stay global (`window.foo`).
  Modules and `fetch()` are also blocked when the file is opened as `file://`.
- All UI text is **Russian**.
- Greek text uses **polytonic** accents (breathings, iota subscript: `ᾅ`, `ὥρᾳ`, `ἡμῶν`).
  Hebrew text uses **niqqud** (vowel points).
  **NEVER "clean up", normalize, or strip these diacritics/points — by hand or by
  script.** They are the actual subject being taught. This includes NFC normalization.

## File map

| Part | Files | Edit for |
|---|---|---|
| HTML shell | `index.html` | New screens, script/style load order. No logic, no styles, no data belongs here. |
| Styles | `styles/*.css` (7 files) | See "Styles" table below. |
| Content | `data/lessons.js` (Greek), `data/hebrew-lessons.js` (Hebrew), `data/prayer.js`, `data/licenses.js`, `data/courses.js` | Vocabulary, grammar, exercises. **Only touch if the task is explicitly about content.** |
| Logic | `js/*.js` (17 files, one per feature) | See "Logic" table below. |
| Offline | `sw.js`, `manifest.webmanifest`, `icon.svg`, `icon-dark.svg` | Rarely touched. See "Offline". |
| Reference textbooks | `reference/machen-nt-greek/`, `reference/nbbs-hebrew/` | Read-only source material. Never loaded by the app, never referenced from code. |
| Tests | `tests/` | `npm test` runs them. See `tests/README.md`. |

### Styles

| File | Contains |
|---|---|
| `tokens.css` | All CSS variables: colors, shape, motion, `[data-theme]`. Loaded first — everything else depends on it. |
| `base.css` | Reset, typography, `.script`/`.greek`/`.hebrew` classes, app bar, nav bar, FAB |
| `components.css` | Buttons, cards, tabs, search bar, chips |
| `screens.css` | Question/answer screens, word lists, tables, flashcards, stats, start screen |
| `dialogs.css` | Snackbar, dialog |
| `layout.css` | Screen transitions, nav rail breakpoint |
| `settings.css` | Theme switch, course card, text-size sliders, license list |

### Logic

| File | Contains |
|---|---|
| `core.js` | Global state, `shuffle`, `escHtml`, `keywordsMatch`, localStorage helpers |
| `course.js` | Active course, storage-key namespacing, course switching, start screen |
| `ui.js` | Ripple, toast, dialog, shared render helpers |
| `shell.js` | Navigation: `SCREEN_META`, `DEST_SECTION`, `FAB_CONFIG`, `showSection`, `navigateTo` |
| `theme.js` | Light/dark/sepia theme |
| `fontscale.js` | Text-size sliders |
| `lesson.js` | Opening a lesson, its tabs, swipe, grammar rendering |
| `declension.js` | Renders declension/conjugation tables from `declension_forms` |
| `exercises.js` | `EXERCISE_TYPES`, question rendering, answer checking |
| `flashcards.js` | Flashcards (lesson + full dictionary), card-flip declension quiz |
| `test.js` | Lesson test |
| `translation.js` | Sentence-building drills |
| `stats.js` | Progress stats, error list, reset |
| `prayer.js` | "Отче наш" breakdown |
| `vocab.js` | Full dictionary: search, filters, card rendering |
| `settings.js` | Settings screen |
| `boot.js` | Runs at load time — must stay the last script |

## Before you start editing

1. Find the section of this file that covers your task and read it fully.
2. Run `npm test` first (241 tests, ~30s). If it fails before you change anything,
   say so — that failure is not yours to fix unless asked.
3. Read the actual code before editing. Every function is global — grep for its name,
   then open the file. For `reference/`, start from its `INDEX.md`, don't grep the
   whole folder.
4. **Do not guess a data shape from a neighboring entry.** `data/hebrew-lessons.js`
   has a field-by-field authoring guide at the top of the file — follow it.

## Hard rules — breaking these causes real, hard-to-spot bugs

- **Never retype Greek or Hebrew text.** Copy it character-for-character out of
  `reference/`. A retyped word can look identical on screen and still be a different
  string, or be missing a breathing mark. See "Content accuracy" below.
- **Never run Greek or Hebrew text through PowerShell** (`Set-Content`, `Add-Content`,
  `Out-File`). Windows PowerShell 5.1 mangles non-ASCII characters into `?`. Edit these
  files with the editor tool directly, or use Node/Python with explicit UTF-8 if a
  script must write them.
- **Never edit `data/lessons.js` or `data/hebrew-lessons.js` unless the task is
  explicitly about content.** These are large single files; two agents/edits touching
  them at once will silently clobber each other.
- **`boot.js` must stay the last `<script>` tag**, and `data/*.js` must load before
  `js/*.js`. Within `data/`, `courses.js` must be last (it references objects the
  other data files declare). Reordering any of these breaks the app at load time,
  possibly silently.
- **`tokens.css` must stay the first stylesheet.** Everything else reads its variables.
- **No hardcoded colors, anywhere** — not in CSS, not in inline `style=`, not in
  JS-generated HTML strings. Always `var(--md-sys-color-*)`. A literal hex breaks dark
  mode. The only exceptions are the two `<meta name="theme-color">` tags in `<head>`
  and the two SVG icon files (SVG can't read page CSS).
- **A new color role must be added to all three themes**: `:root`, `[data-theme="dark"]`,
  `[data-theme="sepia"]`. Never ship a token in only one of them.
- **Storage keys must go through `courseKey('...')`**, never be hardcoded
  (`courseKey('stats')` → `greek_stats` / `hebrew_stats`). A truly global setting
  (not per-course) gets an `app_` prefix instead: `app_theme`, `app_course`. Wrap all
  localStorage access in `try/catch` (it throws in Safari private mode).
- **Read lesson data through `courseLessons()`, never `LESSONS_DATA` directly** —
  `LESSONS_DATA` is only the Greek course's data. Same for `coursePrayer()`,
  `courseAlphabet()`.
- **`<html>` never gets a `dir` attribute.** Hebrew is RTL, the Russian UI is always
  LTR. Only the studied-language text itself turns over, via `.script`/`.greek`/
  `.hebrew` classes and `--md-ref-script-direction`. Don't touch this to "fix" RTL —
  see "Writing direction" if a bug looks RTL-related.
- **Never use `alert()`, `confirm()`, or `prompt()`.** Use `showToast()` and
  `mdDialog()` instead — they were deliberately removed from the codebase once already.
- **Never write `scrollBehavior: 'smooth'` literally.** Use `scrollBehavior()` /
  `scrollPageTop()` from `js/ui.js` so `prefers-reduced-motion` is respected.

## When you add X, you must also change Y

Missing one of these is the most common source of bugs, and most of them are
invisible until someone hits the specific path (offline load, one specific theme, etc).

| You add… | You must also update |
|---|---|
| a file in `styles/`, `data/`, or `js/` | its `<link>`/`<script>` tag in `index.html` (correct position!) **+** `CORE_ASSETS` in `sw.js` **+** bump `CACHE_VERSION` in `sw.js` |
| an icon (`<span class="msym">name</span>`) | `icon_names=` in the Google Fonts `<link>` in `<head>` — otherwise it renders as literal text, not a glyph |
| a screen | markup in `index.html` **+** `SCREEN_META` / `DEST_SECTION` / `FAB_CONFIG` in `js/shell.js` |
| an exercise kind | `EXERCISE_TYPES` (`js/exercises.js`) **+** `LESSON_DRILL_GROUPS` (`js/lesson.js`) and/or `TEST_TYPES` (`js/test.js`) |
| a color role | `:root`, `[data-theme="dark"]`, **and** `[data-theme="sepia"]` in `tokens.css` |
| a `font-size` on Greek/Hebrew text | multiply it: `calc(<size> * var(--md-ref-script-scale))` |
| a part-of-speech `type` value | `VOCAB_TYPE_ORDER` **+** `TYPE_LABELS` in `js/vocab.js` |
| a cache that spans screens | a reset for it inside `applyCourse()` in `js/course.js` |
| a new dependency/font/asset | an entry in `data/licenses.js` |
| a test file | a row in `tests/README.md` |

## Content accuracy (Greek & Hebrew text)

- **Greek** (`reference/machen-nt-greek/`): 95% of words have verified polytonic
  accents. The unverified 5% are listed in `restoration-report.md` in that folder —
  if a word is NOT in that report, its accents are verified, copy it as-is. If it IS
  in that report, don't guess: check against NA28/SBLGNT or against the already
  verified lessons 1–10 in `data/lessons.js`.
- **Hebrew** (`reference/nbbs-hebrew/`): can be copied as-is, character for character.
  Do not NFC-normalize it — canonical Unicode ordering puts the vowel before the
  dagesh, which is wrong for this text and renders incorrectly in some fonts.
  `tests/hebrew-content.test.js` checks every Hebrew string in the lesson data occurs
  verbatim in `reference/nbbs-hebrew/`. **If that test fails, copy the correct string
  from the reference — do not retype it to "fix" it.**
- Hebrew course currently covers chapters 1–11 (nominal system) only. The verb
  (chapters 12–36) is out of scope — don't add it unless asked.

## Design system: Material 3 — mandatory, always

This app fully implements Material 3 (https://m3.material.io). Extend it; never add
ad-hoc styling, even for a one-off element.

Non-negotiable rules:
1. No hardcoded colors (see "Hard rules" above).
2. Always pair a background role with its `on-` color: `background: primary-container`
   requires `color: on-primary-container`. Never mix roles across pairs.
3. Every new role goes in all three themes.
4. Spacing on a 4dp grid. Shape from the shape scale (`--md-sys-shape-corner-*`).
   Motion from the motion tokens (`--md-sys-motion-*`). No arbitrary `border-radius: 7px`
   or `transition: 0.15s ease`.
5. Touch targets ≥ 48×48dp, even if the visible element is smaller.
6. Interactive elements need state layers (hover/focus/pressed) via the existing
   `::before` pattern, plus ripple (add to `RIPPLE_TARGETS` if new).
7. Respect `prefers-reduced-motion` — don't add animations that bypass the existing
   reduce block.

Reuse existing classes instead of inventing new visual patterns:

| Class | Is a... |
|---|---|
| `.menu-btn` (`.primary`/`.outlined`/`.text`/`.elevated`/`.danger`) | button |
| `.card` | filled card |
| `.option-btn` | outlined answer button (`correct`/`wrong` states) |
| `.word-bank .chip` | suggestion chip |
| `.filter-chip` | filter chip |
| `.tab-bar` | scrollable tabs with sliding indicator |
| `.search-box` | search bar |
| `.input-group input` | text field |
| `.word-item` | expandable list item |
| `.md-snackbar` / `.md-dialog` | snackbar / dialog |

Typography: Russian UI text uses Noto Sans. Studied-language text (headwords,
flashcards, prayer text) uses `--md-ref-typeface-script` (Noto Serif for Greek, Noto
Serif Hebrew for Hebrew) — never apply the serif to Russian UI text. Icons are
Material Symbols Rounded via `<span class="msym">name</span>` — no emoji.

Layout: bottom nav bar under 905px width, nav rail at ≥905px (same markup, CSS-only).
If you add a nav destination, check both. Nav bar is capped at 5 destinations (already
at the M3 max) — a 6th needs a different pattern (see how the course picker is a
full-screen overlay, not a nav item).

## Writing direction (RTL Hebrew)

- `<html>` is never given a `dir` — only studied-language spans turn over
  (`.script`/`.greek`/`.hebrew`/`lang="he"`), controlled by `--md-ref-script-direction`.
- In a table cell, alignment must use `--md-table-align` (a physical `left`/`right`
  value), never `text-align: start`. `start` resolves per-cell against each cell's own
  bidi direction and misaligns headers against RTL content.
- Interface chrome (nav bar, tabs, swipe direction, flashcard flip button) never
  mirrors — it's part of the LTR interface, not studied-language content.
- Hebrew niqqud have a minimum readable size (`--md-ref-script-min-size: 1.25rem`).
  Any small `font-size` on studied-language text must use
  `calc(max(<size>, var(--md-ref-script-min-size)) * var(--md-ref-script-scale))`.

## Paradigm / declension tables

`js/declension.js` renders a grid from `declension_forms.tables` in the word's data:
each table has `rows`, `cols`, `cells`, optional `caption`/`translations`. The shape
is documented at the top of `js/declension.js` and again in `data/hebrew-lessons.js`.

- Greek's 101 existing paradigms use an older nested format
  (`forms[gender][number][case]`) — `legacyParadigm()` converts it, don't rewrite it.
- Cell keys for Greek (`gen_sg`, `nom_pl_m`, `2sg`, ...) must match the keys already
  used in authored `declension_fill` exercise questions for that word — reusing the
  same keys is what lets the flashcard quiz pull from both the authored exercise and
  the full paradigm without duplicates.
- Studied-language text in a paradigm table gets `.script`; row labels and the
  translation column do not (they're Russian).

## Exercise types

- `EXERCISE_TYPES` in `js/exercises.js` is the single list of drill kinds. A new kind
  is a new table entry, not a new `if`/`switch` branch.
- A kind must be registered in **three** places or it's unreachable: `EXERCISE_TYPES`,
  `LESSON_DRILL_GROUPS` (`js/lesson.js`), and/or `TEST_TYPES` (`js/test.js`).
- Kind names shared by both courses have no prefix (`agreement`, `translate_*`).
  Kinds that only exist for Hebrew are prefixed `heb_` (`heb_construct`,
  `heb_gender_number`, etc.) — this is a naming convention only, no code parses it.
- Typed Russian answers are checked with `keywordsMatch()` (`js/core.js`), never a raw
  string comparison — it strips brackets, punctuation, case, and treats ё=е.
- When answer options are derived (not a fixed array), use `otherValues()` and put the
  correct answer **first**: `options: q => [q.correct].concat(otherValues(..., 3))`.
  Forgetting the correct value in front produces an unanswerable question.
- Never put the answer inside the question text itself.

## Courses

- `data/courses.js` is the registry (`COURSES`), `js/course.js` holds switching logic.
- A course entry defines: its lessons, prayer data, alphabet pool, which lessons are
  intro-only, dictionary start lesson, script + writing direction, and the language
  name for drill labels (via `courseLang()`/`drillLabel()` — never hardcode "греческий"
  in a shared string).
- Adding a course = a data entry + its lesson file. Not a code change.
- Switching a course calls `applyCourse(id)`, which resets stats, clears
  `allVocabCache`, and re-renders. Any new cross-screen cache must be reset there too.

## Offline (`sw.js`)

- Precaches everything in `CORE_ASSETS`: every file in `styles/`, `data/`, `js/`, plus
  the manifest and icons. **Adding a file to any of those folders without adding it to
  `CORE_ASSETS` means the app breaks on a cold offline load** — invisible in normal
  online testing.
- Bump `CACHE_VERSION` in `sw.js` whenever `CORE_ASSETS` changes.
- Navigation and same-origin assets are network-first (fresh build wins online, cache
  is the offline fallback). Fonts are cache-first.

## Finishing a task

- Report what you verified and what you did NOT verify. `npm test` covers behavior
  only — contrast, rendering, and offline have no automated check (see below). If you
  changed how something looks and didn't check it in a browser, say so explicitly.
- Update this file in the same change if you settle a decision or discover a rule that
  wasn't written down.
- Commit only when explicitly asked. Commit messages in Russian, one short line
  matching the existing log style. **No AI attribution in commits or PRs** — no
  `Co-Authored-By`, no mention of an AI assistant, even if your tool adds it by default.

### Verification checklist

1. **Syntax**: `npm test` covers this (`static.test.js`), or `node --check` each file.
2. **Contrast**: every `on-*`/container color pair, in all 3 themes, needs ≥4.5:1 for
   text, ≥3:1 for non-text. Not automated — check manually against `styles/tokens.css`.
3. **Behavior**: covered by `npm test` — every screen, every drill, checked for
   `undefined`/`NaN` leaking into markup.
4. **Render**: not automated — screenshot light/dark/sepia, mobile (412px) and desktop
   (1280px) if you touched CSS or markup. Check for console errors and horizontal
   overflow.
5. **Icons**: covered by `npm test` (`icons.test.js`) — fails if a `.msym` name isn't
   in `icon_names=`.
6. **Offline**: not automated. If you touched `sw.js`, the manifest, or `<head>`: serve
   over HTTP at a `/anticus/` subpath, load once, go offline, confirm it still boots.

## Environment notes

- Windows. Bash heredocs with quotes get mangled — write a script file and run it
  instead of piping a heredoc.
- PowerShell 5.1 has no `&&`/`||` — chain commands with `;`.
- Never write Greek/Hebrew text through PowerShell (see "Hard rules").
- `jsdom` doesn't implement `scrollTo` — the test loader stubs it, the app also
  guards the calls itself; this is already handled, don't "fix" it.
- Playwright needs `npx playwright install chromium` before first use.
