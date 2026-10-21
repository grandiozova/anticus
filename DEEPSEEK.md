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
| Content | `data/lessons.js` (Greek), `data/hebrew-lessons.js` (Hebrew), `data/hebrew-examples.js` (Bible examples), `data/prayer.js`, `data/hebrew-reading.js`, `data/licenses.js`, `data/courses.js` | Vocabulary, grammar, exercises. **Only touch if the task is explicitly about content.** |
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
| `vocab.js` | Full dictionary: search, filters, on-screen keyboard, card rendering |
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
5. **Match verification effort to the change's blast radius.** A trivial, purely
   textual edit (renaming a lesson title, fixing a typo, changing one string) needs
   `npm test` and nothing else — don't run a full Playwright sweep across every
   screen/theme/viewport for that. Reserve the full render/offline verification
   checklist for changes that touch shared CSS, layout, navigation, or anything
   rendered on more than one screen.

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
| a `font-size` on Greek/Hebrew text | multiply it: `calc(<size> * var(--md-ref-script-scale))` — except the dictionary headword (`.word-item .word-row strong` → `var(--md-ref-script-headword-size)`, 24px Greek / 40px Hebrew), the usage example (`.vocab-example__script` → `var(--md-ref-script-example-size)`, 22px / 24px), and the alphabet's letters and signs (`.md-table--alphabet .alphabet-glyph` → `var(--md-ref-script-alphabet-size)`, 44.8px Greek / 56px Hebrew, `.md-table--pool .md-table-pool__glyph` 35.2px, `.grammar-text .md-table--begadkefat td[lang="he"]` 38.4px), all deliberately fixed in bare `px` so they do not move with the sliders; a lone breathing/accent sign in the prose (`.script--mark`) likewise takes a fixed `1.5rem` on purpose — it is a label, not a word, and is nudged down with `vertical-align` |
| a part-of-speech `type` value | `VOCAB_TYPE_ORDER` **+** `TYPE_LABELS` in `js/vocab.js` |
| a cache that spans screens | a reset for it inside `applyCourse()` in `js/course.js` |
| a new dependency/font/asset | an entry in `data/licenses.js` |
| a user-facing string | `t('…')` at the call site **and** an entry in `UI_EN` (`js/i18n.js`); a missing entry stays Russian, and `tests/i18n.test.js` shows it as leftover Cyrillic in English mode |
| an English lesson | `data/lessons.en.js` / `data/hebrew-lessons.en.js` — title, grammar **and every vocabulary meaning**; a lesson is translated whole or not at all |
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
- **Greek lessons are ported one at a time.** The app has lessons 1–16 of the book's
  33 (as of 2026-10-14). To add lesson N: read `reference/machen-nt-greek/lessons/lesson-NN.md`
  and `data/vocabulary-by-lesson.json` (`raw_lines` when `parsed_ok` is false — the parse
  is heuristic and sometimes glues articles together). Build `title`, `grammar`,
  `vocabulary`, `exercises`, `translation` in the shape of the neighbouring lessons.
  Greek strings come from the book (copy, never compose: recovery of OCR damage is
  allowed, new sentences are not); the Russian side is written fresh. Build
  `declension_fill`/`case_number` only from forms printed in the lesson, and use a short
  verbatim phrase from the book for any word the book never puts in a sentence —
  `vocab.test.js` ("у каждого слова есть примеры, автопример или внятное объяснение")
  fails otherwise. Put the paradigm the lesson itself prints into `declension_forms`.
  No `index.html`/`sw.js` change is needed — a lesson is just a `LESSONS_DATA` entry.
- Hebrew course currently covers chapters 1–12. Chapters 1–11 are the nominal system,
  fully grounded in `reference/nbbs-hebrew/lessons/`. **Chapter 12 (Глагол) is the
  exception**: its prose is not transcribed yet, only its 16 vocabulary entries, which
  were verified against the Westminster Leningrad Codex and hand-added to
  `reference/nbbs-hebrew/data/vocabulary-by-lesson.json` — so running `build_vocab.py`
  would delete them. Its grammar may use only Hebrew the reference already contains
  (why the seven stems are named in Latin there). Chapters 13–36 are not started.
- **Every Hebrew vocabulary entry carries a `translit`** — the reading of the word:
  Russian letters with a stress mark, then the textbook's transliteration in brackets
  («давáр (dāḇār)»). It is authored, not derived: shva and stop/fricative begadkefat
  cannot be guessed from the points alone. Latin must use the book's signs — the
  spirant gets its own character (ḇ ḡ ḏ ḵ p̄ ṯ), never a Latin b/d/k/f — and the shva is
  U+01DD (ǝ), not the look-alike U+0259. `tests/hebrew-content.test.js` checks both.
- **Hebrew usage examples are never written by hand.** The dictionary and the
  flashcards show a sentence from `lesson.translation` that contains the word
  (`findUsageExamples()`, `js/vocab.js` — course-agnostic). To add one, add the
  *book's* sentence to a chapter's `translation`, copied verbatim from
  `reference/nbbs-hebrew/`. **Never retype the Hebrew you insert** — mine it out of
  the reference and match by bare consonants, or the combining-mark order differs
  and every added example fails the test at once. Write the Russian with no inner
  punctuation: it is split into word-bank chips.
- **Words the textbook never puts in a phrase get a Bible verse** from
  `data/hebrew-examples.js`, keyed by the dictionary headword and generated from
  `reference/oshb/verses.json` (OSHB Hebrew + Synodal Russian). The record carries
  the exact word `form` to highlight, because the verse has an inflected form the
  entry's search forms do not contain; `findUsageExamples()` therefore looks the
  entry up by `entry.greek`, with no morphology at runtime. Coverage is 173 of 179
  words; the six function words (`וְ`, `לְ`, `בְּ`, `כְּ`, `הֲ`, `עַל־דְּבַר`) stay
  without an example because they cannot be highlighted as a word. Never retype a
  verse or edit the Synodal text; choose another verse and regenerate both files.
  `tests/hebrew-content.test.js` checks every example against its source verbatim.
- **A word may carry `usage_forms`** — the exact forms in which the book prints it
  (construct state, plural, with a preposition or article), copied verbatim from the
  reference. `getWordSearchForms()` adds them, so `הַמַּיִם` finds `מַיִם` and
  `דִּבְרֵי` finds `דָּבָר`. It is a search-form list, not a paradigm: nothing renders
  it, `buildAllVocabCache()` copies it by name, and every form must actually produce
  an example — `tests/hebrew-content.test.js` fails on a dead one.

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
Serif Hebrew for Hebrew) — never apply the serif to Russian UI text. Рукописный иврит
(курсив в упражнении письма) — `--md-ref-typeface-cursive-hebrew` (Gveret Levin),
а маркер
`.script--cursive` объявлен составным — `.script.script--cursive`: правила
компонентов задают гарнитуру сами и лежат в более позднем файле, и одиночный класс
при равной специфичности им молча проигрывает. Icons are
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

## Экранная клавиатура словаря

Кнопка в строке поиска (`.keyboard-toggle` в `index.html`, иконка `keyboard`)
открывает клавиатуру изучаемого языка: греческую или еврейскую раскладку ещё
надо поставить, а на телефоне — найти в списке языков.

- Буквы берутся из пула курса (`courseAlphabet()`, `js/vocab.js`) — того же,
  что у упражнений уроков 1–2. Поэтому клавиатура сама идёт за курсом,
  веток по курсу нет, и конечные начертания иврита (`finals`) входят в набор
  наравне с основными: без `ץ` слово с конечной буквой не набрать.
- Огласовки и знаков ударения на клавишах нет: поиск их не учитывает
  (`foldForSearch` снимает всю диакритику), а клавиш потребовалось бы втрое
  больше. `tests/vocab.test.js` падает, если на клавише появится комбинирующий
  знак.
- `foldForSearch` сводит к основной форме и конечные начертания
  (`FINAL_LETTER_FORMS`: `ς` и пять конечных иврита) — так же, как снимает
  диакритику. Слово, набранное по буквам, обязано находиться, даже если
  конечная набрана основной. Таблица набрана в коде и потому проверяется по
  пулу курса.
- Вставка идёт в каретку и **без** `input.focus()`: на телефоне фокус поднял бы
  системную клавиатуру поверх своей. Разметку клавиш собирает
  `renderVocabKeyboard()` при каждом открытии (курс мог смениться);
  `resetVocabKeyboard()` убирает клавиатуру на новом заходе в словарь
  (`showAllVocab`) и в `applyCourse()` — иначе в словаре остались бы буквы
  прошлого курса.
- Поле поиска идёт за направлением курса: `applyCourseChrome()` (`js/course.js`)
  ставит ему `dir` из `courseDir()` (иврит — `rtl`), рядом с подсказкой, —
  это единственное поле, где изучаемый язык набирают руками.

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
- A drill kind that is not an `EXERCISE_TYPES` entry (`flashcards`, and the new
  `vowel_flashcards`) additionally needs a container in `DRILL_BOXES` and a branch in
  `startLessonDrill()`. Two kinds may share a container (`#flashcardContainer`), in
  which case the others are hidden **by container id**, not by kind.
- **Огласовку спрашивают тремя упражнениями вокруг одного пула.** Карточка
  (`vowel_flashcards`) показывает знак с носителем на лице (`בַּ`), а на обороте —
  название знака и звук (`патах`, `[а]`); те же два вопроса задают выбором варианта
  `heb_vowel_name` («Как называется этот знак?») и `heb_vowel_sound` («Какой звук
  обозначает этот знак?»). Колода карточки — `courseAlphabet().vowels`, доступность —
  по данным урока (`heb_vowel_*`), а не по пулу курса. Вид без пункта меню (как
  `declension_fill`) — это нормально: его данные и `TEST_TYPES` остаются, а тесты
  ходят в него через `startExercise()`.
- **Тот же пул знаков ещё и дорисовывают** (`vowel_write`): дано название знака и
  звук (`патах`, `[а]`), а знак рисуют на холсте к бледному носителю
  (`.vowel-write-guide`). Ход как у письма буквы: «Готово» засчитывает и показывает
  верный знак с названием и звуком, «Назад» снимает ответ. Вид без записи в
  `EXERCISE_TYPES` — четыре места, как у `flashcards`: пункт в `LESSON_DRILL_GROUPS`,
  контейнер в `DRILL_BOXES` (`#exerciseQuestion`, как у `letter_write`),
  доступность по данным урока (`heb_vowel_*`) и ветка в `startLessonDrill()`;
  состояние своё — `vowelWriteState`, `showVowelWrite()`. Рисунок не оценивается:
  это самопроверка, а не проверка. Большинство знаков — точки, поэтому холст
  огласовки открывается с `tapDot` (`initWritingCanvas('vowelWriteCanvas',
  { tapDot: true })`): нажатие без движения ставит залитую точку, а штрих (чёрточку
  патаха и камеца) ведут движением, как раньше. У письма буквы тап точки не
  ставит — там точка лишь часть начертания, а не весь ответ.
- Kind names shared by both courses have no prefix (`agreement`, `translate_*`).
  Kinds that only exist for Hebrew are prefixed `heb_` (`heb_construct`,
  `heb_gender_number`, etc.) — this is a naming convention only, no code parses it.
- Typed Russian answers are checked with `keywordsMatch()` (`js/core.js`), never a raw
  string comparison — it strips brackets, punctuation, case, and treats ё=е.
- When answer options are derived (not a fixed array), use `otherValues()` and put the
  correct answer **first**: `options: q => [q.correct].concat(otherValues(..., 3))`.
  Forgetting the correct value in front produces an unanswerable question.
- Never put the answer inside the question text itself.
- **Письмо от руки — одно упражнение с выбором начертания впереди.** Печатный
  и рукописный варианты — один и тот же вопрос с разным показом, поэтому вид
  `letter_write` один, а начертание выбирается **один раз на весь заход**
  экраном выбора (`showLetterWriteChoice`), который показывается до первой
  буквы и повторяется при каждом заходе, в том числе по «Ещё раз» с экрана
  результата. Живёт этот экран внутри `#exerciseQuestion` (карточка со списком
  пунктов `.lesson-item`, как меню урока), а не перекрытием, как выбор курса:
  так остаются заголовок «Написание буквы» и кнопка «назад». Выбор хранится
  в `letterWriteStyle`; `startExercise` — это врата (пусто или выбор), а сам
  прогон вопросов — `beginExercise(type, style)`. Экрана выбора нет у курса без
  `cursiveWriting` (`courseCursiveWriting()`), то есть у греческого.
  Имя над холстом — русское в обоих курсах: греческий пул несёт `ru`
  («альфа», русское прочтение из словаря урока 1) рядом с греческим `name`,
  и разметка берёт `q.ru || q.name` (у иврита `name` и так русское) — читать
  `ἄλφα` новичку ещё нечем.
  Показ буквы — только начертание, без имени: имя уже было вопросом перед
  рисованием, и повторять его на ответе незачем. Отсюда ушла и подпись
  (`letterRevealNameHtml()`). **Центрируется не строка, а чернила**: после
  отрисовки `alignLetterReveal()` через `letterRevealInkBand()` спрашивает
  у холста `actualBoundingBoxAscent`/`Descent` каждой формы, берёт полосу,
  которую буквы реально занимают чернилами, и сдвигает показ на разницу между
  её серединой и серединой строки — в `--letter-write-ink-shift`. Флекс центр
  строки держит и так; чего он знать не может — что выносная ламеда уходит
  вверх на ~19px от середины строки, а хвост конечной формы свисает вниз (пара
  кафа читается ниже центра на ~14px). Поэтому каждая буква встаёт по центру
  оптически. Сдвиг — `transform`: поток и высота карточки не меняются, а у
  показа огласовки переменной нет и сдвиг равен нулю.
  Разметка показа одна на оба курса: `.letter-write-reveal__forms` с `.script`
  внутри. Формы собирает `letterWriteRevealForms()`: у греческого это прописная
  и строчная, а у ивритской буквы с конечной формой — обе формы («כ ך»), так
  что и вопрос о конечной, и вопрос об обычной отвечают одной парой и на обороте
  видно их родство. Кегль и высота строки стоят вместе на
  `.letter-write-reveal__forms .script`, и множитель у них **двойной**:
  `calc(3.5rem * var(--md-ref-script-scale) * var(--md-ref-script-scale))` и
  то же с 4.25rem — прежняя пропорция 1.214. Двойной множитель — не ошибка,
  такой показ и был задуман (коробка давала первый, `.script` — второй); ошибка
  была в том, что высота строки несла множитель один раз и под буквой в 143px
  оказывалась строка 108.8px, из которой чернила вылезали на подпись. Трогая
  эти два числа, держи пропорцию и держи их в одном правиле. Карточка письма ещё и перебивает
  выравнивание оборота заучивания, классы которого носит: `justify-content:
  center` и `padding-bottom: 24px` вместо 76px от `--has-flip` (этот запас — под
  кнопку переворота, которой у письма нет), иначе буква висела в верхней трети
  карточки. Правило сторожит `tests/static.test.js`.
  **С показа можно вернуться к письму.** «Готово» жмут и не дорисовав букву,
  поэтому рядом с «Далее» есть «Назад» (`backToLetterWriteCanvas()`): он снимает
  засчитанный ответ (и с `stats.totalCorrect`, и с `exerciseState.correct`) и
  зовёт `showExercise()` на том же индексе — вопрос отрисуется заново вместе с
  холстом, а обработчики навесит тот же `initWritingCanvas('letterWriteCanvas')`. Обе строки
  кнопок письма разведены по краям (`justify-content: space-between`): на холсте
  «Очистить | Готово», на показе «Назад | Далее», поэтому «Назад» стоит там же,
  где «Очистить», а «Далее» — где «Готово». Холст перед новым вопросом очищает
  сам `showExercise()`, а не канвас-хендлер, — иначе возврат затирал бы уже
  нарисованный штрих.
  В еврейской главе 1 вопросы — `HEBREW_WRITE_LETTERS`: ровно пул курса, где ש
  стоит двумя буквами, — 23 вопроса. **Конечных форм своим вопросом нет**:
  своего имени у них нет, а с тех пор как с оборота убрали пометку «(конечная)»,
  конечный вопрос был бы дословным повтором основного — тот же «каф» и тот же
  показ. Начертание конечной остаётся в упражнении через пару на обороте
  основной буквы. В самом пуле `finals` — по-прежнему отдельный список: на нём
  стоит `heb_letter_final`, и в `letters` конечная не попадает.
  Шин и син этот вид различает сам: `\u05E9\u05C1` («шин») и `\u05E9\u05C2`
  («син») стоят в списке письма вместо одной буквы ש из пула — в остальных видах
  ש остаётся одной буквой с двумя чтениями, и трогать пул нельзя (на нём стоит
  таблица алфавита и остальные виды).
  **Холст один на письмо буквы и на написание огласовки, и стилизуется классом,
  а не id.** Оба холста — `.writing-canvas` (`#letterWriteCanvas`,
  `#vowelWriteCanvas`), и правило размера в `styles/screens.css` берёт класс:
  селектор по одному id оставлял второй холст с внутренними 300×150 и растягивал
  страницу. Очистка тоже общая — `clearWritingCanvas(id)`.
  **Холст подгоняется под свою рамку, а не растягивается.** `initWritingCanvas(id)`
  ставит `canvas.width/height` по `getBoundingClientRect()` — буфер обязан
  совпадать с отрисованной коробкой, иначе штрихи уезжают из-под пальца, а линии
  мылятся (рисуем мы в CSS-пикселях через `setTransform(ratio, …)`). Следит он за
  своей рамкой **двумя** путями: `ResizeObserver` на `.writing-canvas-card` и
  обычный `window.resize` — карточка сужается на телефонной контрольной точке без
  изменения окна, а высота поля берётся от высоты окна, о которой наблюдатель
  сообщает не всегда. Перед сменой размера буфер копируется в запасной холст и
  рисуется обратно — так рисунок переживает поворот; перерисовка холста даёт новый
  наблюдатель, и штрихи не текут между вопросами. Гасить наблюдатель по клику
  нельзя: первая версия отключала его на первом же тапе, и после первого штриха
  поле переставало тянуться.
  **Жест по полю принадлежит полю, и штрих ведут касания, а не указатель.**
  iOS Safari забирает себе жест, начатый на холсте, даже при `touch-action: none`
  на нём: весь интерфейс — вместе с fixed app bar и nav bar — уезжает вниз под
  пальцем («окошко дёргается»), браузер шлёт `pointercancel`, а обрыв штриха на
  нём оставлял остаток движения палец вхолостую («думает, что я двигаю, а не
  пишу»). Поэтому `initWritingCanvas(id)` рисует на `touchstart`/`touchmove`, оба
  **не-passive** и оба зовут `preventDefault()`: это и есть ответ «жест наш»,
  после которого браузер не начинает ни прокрутку, ни масштабирование и
  продолжает слать движения. Pointer-события с `pointerType` `'touch'` там
  игнорируются — иначе штрих писался бы дважды и всё равно умирал бы вместе с
  `pointercancel`. Мышь и перо остаются на pointer-событиях (дороги делят
  `startStroke`/`moveStroke`/`endStroke`), а `setPointerCapture` зовётся *после*
  выставления состояния и обёрнут в `try/catch`: он может бросить (нет активного
  указателя, нет поддержки), и прежний порядок оставлял холст нерисующим вовсе.
  Слушатели касаний живут на **`.writing-canvas-card`**, а не на холсте, — жест,
  начатый в её поле в 12px (холст вписан в неё с отступом 12px), тоже рисует, а
  не уезжает страницей; два пальца штрих отменяют и жест оставлен браузеру, а
  `pointercancel`/`pointerleave` от касания больше ничего не заканчивают. Прежние
  предохранители на месте: `touch-action: none` плюс `user-select: none` /
  `-webkit-touch-callout: none` на `.writing-canvas-card`, и `overscroll-behavior:
  none` у корня страницы в `base.css`, который гасит упругий откат и
  pull-to-refresh, не трогая обычную прокрутку. `tests/drills.test.js` держит всё
  это разом: касание рисует и погашено, `pointercancel` с `pointerType: 'touch'`
  штрих не обрывает, указатель того же касания не пишет второй раз, а бросивший
  `setPointerCapture` не мешает рисовать мышью.
  **Высоту поле берёт от окна по флекс-цепочке.** `#drillSection` —
  `min-height: calc(100dvh - app-bar - safe-top - nav-bar - safe-bottom - 88px)`
  (последнее — собственный нижний padding `.md-content` в `base.css`; `dvh`, а не
  `vh`, потому что на телефоне адресная строка уезжает), а
  `#drillSection > .card` → `#exerciseQuestion` → `.writing-practice` → карточка
  холста — каждая с `flex: 1 1 auto; min-height: 0`. Сам холст —
  `position: absolute` с `top/left: 12px` и `width/height: calc(100% - 24px)`:
  явно, потому что у `<canvas>` есть собственная ширина 300×150 и растяжение он
  иначе игнорирует. **Процентной высоты на холсте быть не должно** — она
  разрешалась бы против карточки, высоту которой сама же и определяет, и браузер
  падал бы на нижнюю границу `clamp`: именно из-за этого поле оставалось
  маленьким, а под ним зияла пустота. У карточки есть пол
  (`min-height: clamp(180px, 34vh, 340px)`), чтобы низкое окно прокручивалось, а
  не сжимало поле в полоску, и
  `.writing-practice .flashcard-flip > .md-flashcard--writing` растягивается так
  же, чтобы переворот не прыгал.

## English mode

Russian is the source language; English is an overlay. The switch is the
language card in settings, stored under `app_lang`.

- The switch (`#appLangSegmented`, `md-segmented--lang`) has its own styles in
  `styles/settings.css`: a code badge (`RU`/`EN`, never translated), a check on
  the chosen segment and a thumb that slides by `data-lang` on the group (set in
  `syncLanguageControls`). Its buttons carry their **own `font-size`** because the
  ≤420px rule sizes segmented buttons at `0` for the theme icons — without it the
  language card was two empty fields on a phone.

- `t('Уроки')` returns `Lessons`; **the key is the Russian string itself**, so a
  missing translation stays Russian instead of going blank. `UI_EN` lives in
  `js/i18n.js`.
- Static markup is translated from a **snapshot taken at boot** (`snapshotStaticI18n`
  before any render), so generated lesson content is never rewritten by the
  translator. `applyStaticI18n()` restores from that snapshot on the way back to
  Russian.
- Generated strings are wrapped where they are built; strings with a number use
  `tLessonNumber` / `tLessonRange` / `tMatches` / `tOf` / `tCountLabel`, and
  exercise progress lines use `tProgress(noun, value, total)`.
- **An exercise option and its correct answer go through `t()` together**
  (`exerciseOptions()` / `exerciseCorrect()` in `js/exercises.js`): the answer is
  compared with the text of the pressed button, so translating one and not the
  other would grade every answer wrong. The data stays Russian; studied-language
  strings are not `UI_EN` keys and come back unchanged.
- Lesson text is a per-lesson overlay: `data/lessons.en.js` and
  `data/hebrew-lessons.en.js` hold **every lesson of both courses** (Greek 1–16,
  Hebrew 1–12), keyed by lesson number, with vocabulary keyed by headword and an
  optional `headwords` map for headwords whose Russian label is part of the string
  (`διώξω (Fut. от διώκω)`). `getLessonData()` applies it, so every screen sees the
  same lesson. These files were **generated**, not typed: Greek and Hebrew forms are
  copied out of the Russian data, because a retyped breathing or niqqud is a
  different string that looks identical. The builder is `tools/en-build/`
  (`extract.js` → inventory, `build.js --check` → validate, `build.js` → write,
  `markdown.js` → the readable copies); the app loads none of it.
- A lesson without English opens in Russian and shows `#lessonLanguageNote`.
- **Paradigm tables are material too.** Their axis labels are Russian strings that
  never appear in the markup: `legacyParadigm()` builds the Greek ones, the Hebrew
  ones are authored in the data. `paradigmTableHtml()` passes caption, row label,
  axis values, the `'Перевод'` header and the translation cells through `t()`; the
  forms at the intersections are studied-language text and never go through it.
  `tests/i18n.test.js` walks every paradigm of both courses and fails on a Cyrillic
  label missing from `UI_EN`.
- **A drill's word gloss comes from the dictionary**, not from a second list:
  `drillGloss()` looks the headword up in the English vocabulary of the course
  (via `headwordChip`, so `οὗτος, αὕτη, τοῦτο` and `ἀπέρχομαι (dep.)` match their
  bare form), and only paradigm-only words fall back to `UI_EN`.
- **Alphabet labels follow the English material**: `UI_EN` maps the pools' Russian
  readings to what the grammar prints (`aleph`, `khet`, `patach`, `qamets`) and to
  its sound column (`[a]`, `[kh]`, `b / v`) — no invented diacritics. `silent` is
  the one word the table lacks (its cell is a dash) and the drill needs.
- **The Hebrew reading is `русскими (latin)`; English shows the Latin half.**
  `displayTranslit()` keeps only the parenthesised textbook transliteration — the
  data keeps the full authored string.
- **Exercises are translated drill by drill.** The checked text lives in
  `data/exercises.en.js` (generated by `tools/en-build/exercises.js` from
  `words-*.json` / `prompts-*.json` / `sentences-*.json`); `applyExercisesEn`
  marks fully translated drills on the localized lesson (`_englishDrills`) and
  `lessonDrillAvailable()` hides the rest, so a lesson opens only the drills it
  can grade. Every drill of both courses is translated today — words, prompts and
  sentences — so nothing is hidden; `tests/i18n.test.js` checks that for every
  lesson. A translated prompt must be a **string**: `applyExercisesEn` joins the
  words before storing them in `q.russian` / `q.source`, because an array
  interpolated into a template renders «he,writes». Only `q.keywords` /
  `q.correct`, which are graded, stay arrays. An English typed answer is matched
  by whole words (`keywordsMatchEn`), with contractions expanded and word order
  ignored; person and article are required keywords.
- The «Карточки» screen and the text analysis are English too. Flashcards use
  `getAllVocab()` (English meanings) and the paradigm drill on the card's back, so
  `navigateTo('cards')` no longer refuses English. The prayer/reading is a data
  overlay — `data/prayer.en.js` and `data/hebrew-reading.en.js`, generated by
  `tools/en-build/reading.js` from `prayer-en.json` / `reading-en.json` and applied
  by `localizedPrayer()` in `js/i18n.js`; always read it through `coursePrayer()`.
  The overlay is positional (verse, word and segment index) because the Russian
  side is a translation; the build checks counts, empty strings and Cyrillic. Greek
  and Hebrew text, readings and verse numbers are copied from the Russian data
  unchanged. Genesis verses are the King James Version (public domain, in
  `data/licenses.js`); `word.translit` goes through `displayTranslit()`.
- The dictionary keeps working; its usage examples are English except the Hebrew
  Bible verses, whose Synodal translation stays Russian (the card above the list
  says so, driven by `vocabExamplesRu` in the registry).
- `setAppLang()` must reset every cross-screen cache (localized lessons, the
  localized prayer/reading, `allVocabCache`, `lessonSearchIndex`, flashcard decks)
  — same rule as `applyCourse()` — and re-render the current screen.

## Lesson & topic search (экран уроков)

The lessons screen stays a flat table of contents (owner's decision, 2026-10-14 —
neither textbook has parts, the numbering is continuous), and a search bar above it
(`#lessonSearchInput`, `js/shell.js`) answers "which lesson was that in?".

- **Topics are derived, not authored.** `grammarHeadings()` (`js/lesson.js`) returns
  exactly the lines `renderGrammarHtml()` turns into `.grammar-h`, from the same pass
  (`renderGrammarHtml(html, headings)`), in the same order. There is no `topics` field in
  `data/*-lessons.js` and you should not add one: a lesson added to the data enters the
  search by itself. `tests/lessonsearch.test.js` compares the index against the headings
  actually rendered, in both courses.
- **A heading is addressed by its order in the material**: each `.grammar-h` carries
  `data-grammar-heading="N"`, and the topic row in the results carries the same number.
  `openLessonTopic(lesson, index)` opens the lesson, switches to `material` and
  `scrollToGrammarHeading(index)`.
- The scroll offset is computed from the live app bar height (it is `position: fixed`),
  and the highlight is `.grammar-h.is-target` — a `box-shadow` halo, so the layout does
  not shift — removed by a 1.6 s timer. The `transition` lives on `.grammar-h` itself,
  not on `.is-target`, or the highlight would go out instantly when the class is removed.
- **The query is split into words and all of them must match** (`lessonTextMatches`):
  «знак шва» finds «4. Знак шва и слогораздел». Both sides are folded by
  `foldForSearch()` (`js/vocab.js`), so accents and niqqud do not matter — the same
  search the dictionary uses.
- A topic row is its own `.lesson-topic` button (48dp) under the lesson row, because it
  opens the lesson *at that section*; nested buttons are not valid markup. Its icon is
  `subdirectory_arrow_right` and must stay in `icon_names=`; `.lesson-topic` must stay in
  `RIPPLE_TARGETS` (`js/ui.js`).
- **With no query, map the index to entries with empty `topics`** in `renderMainMenu()` —
  the first version passed the index through and every table-of-contents row grew its
  whole topic list. No matches is a state, not an empty screen: `emptyState` with
  `search_off` and the card title «Поиск», with the query left in the field.
- **The index is cached per course** (`lessonSearchIndex`) and reset in `applyCourse()`
  together with the query and the input (`resetLessonSearch()`).

## Courses

- `data/courses.js` is the registry (`COURSES`), `js/course.js` holds switching logic.
- A course entry defines: its lessons, prayer data, alphabet pool, which lessons are
  intro-only, dictionary start lesson, script + writing direction, and the language
  name for drill labels (via `courseLang()`/`drillLabel()` — never hardcode "греческий"
  in a shared string).
- `vocabShortGloss` is set only on Hebrew. It means the dictionary row shows the first
  translation and, if both are short, the second; the rest go into the opened entry, on
  the right under the row's translation, with no caption. Greek has no such flag on
  purpose: its comma list also carries case government («в, во (куда; с Acc.)»), and
  shortening it would hide half the entry.
  The row code itself is course-agnostic (`vocabRowGloss` / `vocabExtraGlosses`,
  `js/vocab.js`) and is shared with the lesson's own word list (`js/lesson.js`).
- Flashcards show the word's reading too (`flashcardBodyHtml()`, `js/flashcards.js`),
  between the word and the translation, and only after «Показать перевод»: it is part of
  the answer, not a hint to the question. The card's Hebrew `line-height` must carry
  `var(--md-ref-script-scale)` like its `font-size` — a plain `rem` box is smaller than
  the glyphs and the reading ends up glued to the niqqud.
- The dictionary chevron is a `<span>`, so `.word-item .word-row > span` (the
  translation's rule, `styles/screens.css`) must exclude it with `:not(.vocab-chevron)`;
  both rules are the same specificity and `screens.css` wins by order.
- Adding a course = a data entry + its lesson file. Not a code change.
- The start-screen course card shows the alphabet glyph, the course name, the source
  textbook (`tagline`) and the lesson count chip — nothing else. A lesson description
  (`blurb`) used to be there and was removed on 2026-09-29: the start screen chooses a
  course, it does not describe one.
- Switching a course calls `applyCourse(id)`, which resets stats, clears
  `allVocabCache`, and re-renders. Any new cross-screen cache must be reset there too.

## Шрифт интерфейса и русского текста

- Настройка «Шрифт» (`js/fontpicker.js`) хранится под общим ключом `app_font` и
  кладёт один токен `--font-ru` на `<html>`; восстанавливается в `js/boot.js`
  сразу после `initFontScale()`, чтобы шрифт встал до первой отрисовки.
- Варианты — `FONT_CHOICES`: `system` (прежний стек) и шесть самодельных
  гарнитур из `fonts/`. Id варианта — суффикс токена `--font-ru-<id>`; стеки и
  `@font-face` лежат в `styles/tokens.css`, в JS имён семейств нет.
- Список спрятан под раскрывающимся заголовком «Выбрать шрифт» — общий
  `toggleSettingsDisclosure(head)` (`js/fontscale.js`) находит тело по
  `aria-controls`. У варианта только имя, набранное его же гарнитурой: образец
  строки убран, потому что экран меняется сразу после нажатия.
- `--font-ru` берут `body` и правила интерфейса (`.filter-chip__body`,
  `.word-bank .chip`, `.build-area .token`). Текст изучаемого языка — нет:
  `.script`/`.greek`/`.hebrew` остаются на `--md-ref-typeface-script`.
- Новый шрифт: файлы в `fonts/` → `@font-face` и токен в `styles/tokens.css` →
  запись в `FONT_CHOICES` → `CORE_ASSETS` и `CACHE_VERSION` в `sw.js` → запись
  в `data/licenses.js`. Имя семейства — с суффиксом `… Anticus`, чтобы не
  спорить с загруженным из Google `'Noto Sans'`.

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