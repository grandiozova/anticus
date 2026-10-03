# AGENTS.md
If you are DeepSeek, stop reading this file. Open DEEPSEEK.md in the repo root instead — it has the same rules, written for you specifically. Do not read past this point.

Guidance for AI agents working in this repository.

## What this repo is

**Anticus** — a biblical-languages learning web app, Ancient Greek and Biblical Hebrew, published to GitHub Pages at <https://grandiozova.github.io/anticus/>. The repository was renamed from `greek_bot` to match, so the Pages subpath is `/anticus/`; a clone of the old URL still redirects, but nothing in the repo should say `greek_bot` any more.

The `greek_*` storage keys are **not** a leftover of that name and must not be renamed with it. `greek_stats` is simply what `courseKey('stats')` produces for the Greek course, exactly as `hebrew_stats` is for Hebrew — see "Courses". The one true legacy key is `greek_theme`, still read once as a fallback for `app_theme`.

| Part | Files | Notes |
|---|---|---|
| Markup shell | `index.html` | `<head>`, the screens, and the tag list that loads everything else. No logic, no styles, no data. |
| Styles | `styles/*.css` | The design system, seven files. See "Project layout". |
| Lesson content | `data/*.js` | Vocabulary, grammar, exercises, prayer, licences, the course registry. |
| Logic | `js/*.js` | Seventeen files, one per feature area. |
| Offline shell | `sw.js`, `manifest.webmanifest`, `icon.svg`, `icon-dark.svg` | Service worker + PWA metadata. Small, rarely touched — see "Offline shell" below. |
| Source textbooks | `reference/machen-nt-greek/`, `reference/nbbs-hebrew/` | The books the lessons come from, as text. Reference only — never loaded by the app. See "Source textbooks" below. |

The app hosts **two courses**, Greek and Hebrew, chosen on a start screen. `data/courses.js`
is the registry and `js/course.js` the switching; see "Courses" and "The Hebrew
course" below.

There is no backend and no build step. Progress is kept in `localStorage`. Do not add a server, a bundler, or new tracked secrets.

The split files are **classic scripts and plain stylesheets**, deliberately not ES modules: the ~80 inline `onclick=` handlers, in `index.html` and in generated markup alike, need their functions to stay global, and `type="module"` / `fetch()` are both blocked on `file://`, which would break "clone and open `index.html`". Keep it that way unless you first replace the inline handlers with delegation.

All user-facing copy is **Russian**. Greek content is **polytonic** (accents, breathings, iota subscript — `ᾅ`, `ὥρᾳ`, `ἡμῶν`). Never "normalise" or strip Greek diacritics; they are the subject matter.

## How to work here

The rest of this file is *what* the code is. This section is *how* to change it without
breaking something you did not look at.

### Before editing

1. **Find the section of this file that covers your task and read it.** The task table
   under "Project layout" names the file; the sections below it name the traps. Most
   bugs this repo has had were an invariant written down here and not read.
2. **Run `npm test` first** (241 tests, ~30 s). A failure afterwards is then known to be
   yours. If the baseline is already red, say so before you start.
3. **Read the code directly.** There are about thirty source files and every function is
   global, so Grep for the name and Read the file. `reference/` is the large part — enter
   it through its `INDEX.md`, not a repo-wide search.

### Subagents

**Work inline by default.** A subagent starts cold and has to re-read this file to work
safely, and most tasks touch one or two files, so spawning usually costs more than it saves.
Spawn one only when:

- **A read-only sweep** where only the conclusion matters: "which lessons use X", "where
  in the textbook is Y taught".
- **Independent verification in parallel**: checking lesson data against `reference/`,
  one agent per range of lessons or chapters, each told to **report, not edit**.
- **A second opinion** on a large diff before it is reported as done.

Never let two agents edit the same file at once. `data/lessons.js` and
`data/hebrew-lessons.js` are single large files, so concurrent edits clobber each other.
A subagent's brief must name the sections of this file that apply, restate the
no-normalisation rule for Greek and Hebrew, and say "do not commit".

### Large features go in phases

The Hebrew course went in as phases 0–5, one commit each. Do the same for anything bigger
than an afternoon:

- **Phase 0 is groundwork with no visible change**, for example a registry or an extracted
  helper. Its test is that nothing moved.
- **Every phase leaves the app working and `npm test` green.** Nothing lands half-wired.
- **Every phase updates its own docs and plumbing in the same commit**: this file,
  `tests/README.md`, a new test, `CORE_ASSETS`/`CACHE_VERSION`, `data/licenses.js`. Do not
  save them for a clean-up at the end, because they get lost.

### Things that live in more than one place

Missing one of these edits causes most of the bugs, and several of them are invisible in an
online test. When you add:

| You add… | Also change |
|---|---|
| a file in `styles/`, `data/`, `js/` | its tag in `index.html` **in the right place** (see load order) + `CORE_ASSETS` in `sw.js` + bump `CACHE_VERSION` |
| an icon | `icon_names=` on the fonts `<link>` |
| a screen | markup + `SCREEN_META` / `DEST_SECTION` / `FAB_CONFIG` |
| an exercise kind | `EXERCISE_TYPES` + `LESSON_DRILL_GROUPS` and/or `TEST_TYPES` |
| a colour role | `:root`, `[data-theme="dark"]` **and** `[data-theme="sepia"]` |
| a `font-size` on studied-language text | `* var(--md-ref-script-scale)` on it, plus `* var(--md-ref-script-size)` where it is the subject — see "Text size" |
| a part-of-speech `type` | `VOCAB_TYPE_ORDER` + `TYPE_LABELS` |
| a field on a vocabulary entry (`data/*-lessons.js`) | `buildAllVocabCache()` (`js/vocab.js`) copies each field by name — one it does not copy is invisible in Словарь while the lesson's own word list, which reads `data.vocabulary` directly, still shows it |
| a per-course fact about how the dictionary row reads | the registry's field list in `data/courses.js` + `vocabRowGloss()`/`vocabExtraGlosses()` (`js/vocab.js`), and a test on the other course that pins its behaviour |
| a cache that spans screens | a reset in `applyCourse()` |
| a dependency, font or asset | an entry in `data/licenses.js` |
| a test file | a row in the `tests/README.md` table |

### Content

- **Leave `data/*.js` alone unless the task is explicitly about content.**
- **Copy studied-language strings out of `reference/`; never retype them.** A retyped Hebrew
  word can look identical and still be a different string. A retyped Greek word can lose a
  breathing. Check any Greek word against `restoration-report.md` before trusting it.
- **Do not NFC-normalise, trim diacritics or "clean up" Unicode**, whether by hand or with a
  script.

### Finishing

- **Report what you verified and what you did not.** `npm test` covers behaviour. Contrast,
  rendering and offline have no harness (see "Verify before reporting done"). If you
  changed how something looks and did not screenshot it, say so. Do not imply you did.
- **Keep this file current in the same change.** When you settle a decision or find an
  invariant that was not obvious, write it here with the reason. The *why* is what stops
  the next agent from re-litigating it.
- **Git:** commit or push only when asked. Write commit messages in Russian, as one short
  line in the style of the log ("Интеграция иврита в приложение, фаза 3", "Исправлены
  опечатки."). **No AI attribution anywhere**: no `Co-Authored-By` trailer and no mention
  of the assistant in commits or PR descriptions, even if your tooling adds one by
  default. The repository's history is its authors'.

## Project layout

```
index.html           422  <head>, разметка, порядок загрузки
styles/
  tokens.css           307  :root, [data-theme=dark], [data-theme=sepia] и [data-script] — все переменные
  base.css             385  сброс, типографика, метки языка (.script/.greek/.hebrew), каркас, app bar, icon button, nav bar, FAB, ripple
  components.css       953  кнопки, list item урока, карточки, табы, search bar, text field, chips
  screens.css          862  вопрос/варианты, обратная связь, списки слов, таблицы и их прокрутка, ритм материала, flashcards и их оборот, статистика, «Отче наш», стартовый экран выбора курса
  dialogs.css           88  snackbar, dialog
  layout.css            68  переходы экранов, утилиты, адаптивность (nav rail)
  settings.css         312  segmented button темы и курса, карточка курса, ползунки размера текста, список лицензий
data/
  lessons.js         1,811  const LESSONS_DATA (греческий курс) и GREEK_ALPHABET — пул букв для уроков 1–2
  hebrew-lessons.js    872  const HEBREW_LESSONS_DATA — главы 1–11: грамматика, словарь, упражнения; HEBREW_ALPHABET — пул букв и огласовок
  prayer.js            136  const PRAYER_DATA
  licenses.js           49  const LICENSES
  courses.js            94  const COURSES/COURSE_ORDER — реестр курсов, грузится последним из data/
tests/                    jsdom-набор, `npm test` — см. tests/README.md
js/
  core.js              171  состояние, shuffle/escHtml/escArg, keywordsMatch, isScriptText, scheduleAdvance, localStorage
  course.js            253  текущий курс, ключи хранилища, письмо, алфавит курса, стартовый экран, переключение курса
  ui.js                 92  ripple, showToast, mdDialog, progressHead, emptyState, resultBlock
  shell.js             238  SCREEN_META/DEST_SECTION/FAB_CONFIG, showSection, navigateTo, renderMainMenu
  theme.js             108  режимы темы, applyTheme, иконка вкладки по теме, initTheme
  fontscale.js         174  размер текста: общий и языковые множители, «как общий», ползунки
  lesson.js            544  openLesson, меню разделов урока, вкладки, свайп, экран упражнения, разметка грамматики
  declension.js        197  парадигма как описание осей, отрисовка таблицы, перебор ячеек
  exercises.js         513  EXERCISE_TYPES — список видов упражнений, отрисовка вопроса, проверка ответа
  flashcards.js        374  карточки: общие и урока, оборот карточки с тренировкой форм
  test.js              192  тест
  translation.js       230  перевод
  stats.js             107  статистика, ошибки, сброс прогресса
  prayer.js            237  «Отче наш»: разбор и упражнения
  vocab.js             693  общий словарь, поиск, фильтр по частям речи, клавиатура изучаемого языка
  settings.js           29  showSettings, renderLicenses
  boot.js               79  normalizeTranslationData, init*, глобальные слушатели
```

**Load order is the contract.** Three rules, all enforced only by the order of tags in `index.html`:

1. `tokens.css` first — everything else reads its variables. The other six stylesheets are listed in the order their rules appeared in the old single `<style>`, so the cascade is unchanged; reordering the `<link>` tags is a silent visual regression.
2. `data/*.js` before `js/*.js` — the logic reads the lesson data during boot. Within `data/`, **`courses.js` comes last**: the registry references the objects the other data files declare, so it must see them already bound.
3. **`boot.js` last.** It is the only file that *executes* anything at load time; every other file just declares. Top-level `let`/`const` across classic scripts share one global lexical environment, so a file that ran code referencing a binding declared in a later file would hit a temporal-dead-zone `ReferenceError`. Keep new files declaration-only, and keep `boot.js` at the bottom.

The two exceptions to "declaration-only" are `ui.js` (the ripple `pointerdown`/`keydown` listeners) and `prayer.js` (the click-outside handler); both only register callbacks, which run long after every script has loaded.

Whatever you touch, it is almost always one file:

| Task | File |
|---|---|
| Colours, shape, motion, elevation | `styles/tokens.css` |
| A component's look | `styles/components.css` (or `dialogs.css` / `settings.css`) |
| A screen's look | `styles/screens.css` |
| Responsive / nav rail | `styles/layout.css` |
| **Lesson content** | `data/lessons.js` (Greek) / `data/hebrew-lessons.js` (Hebrew) — **do not touch** unless the task is explicitly about content |
| Letters, sounds, alphabet drill questions | `GREEK_ALPHABET` / `HEBREW_ALPHABET` in the same two files — see "Alphabet and reading" |
| Finding content in the textbook | `reference/machen-nt-greek/INDEX.md` or `reference/nbbs-hebrew/INDEX.md` — then the lesson file it points to |
| A new dependency's licence | `data/licenses.js` |
| Behaviour | the matching `js/*.js` — the table above says which |
| A new screen | `index.html` markup **+** `SCREEN_META`/`DEST_SECTION`/`FAB_CONFIG` in `js/shell.js` |
| A course, or a fact that varies by course | `data/courses.js` — see "Courses" |

Structural facts worth knowing before editing:

- Screens are `div.section`; `showSection(id)` (`js/shell.js`) clears `.active` from **all** `.section` elements, including the lesson's inner tab panels — which is why `restoreLessonPart()` (`js/lesson.js`) exists. Keep that invariant if you touch navigation.
- **The lesson is three levels deep, not one.** Opening a lesson lands on `#partMenu` — its sections offered as a list of M3 list items (`renderLessonMenu()`), not on the material. Choosing one calls `switchLessonPart()`, which reveals the tab bar; `#lessonTabs` carries `.hidden` while the part is `'menu'`, so the tabs exist only inside a section, where there is something to switch between. The part names map to panel ids by capitalisation (`material` → `partMaterial`, `menu` → `partMenu`), which is what `switchLessonPart()` and `restoreLessonPart()` rely on, and `'menu'` is a part like any other — that is why `currentLessonPart` starts as `'menu'`. Back is a step **up**, not out: `goBack()` (`js/shell.js`) turns a section back into the menu, and only from the menu does it leave for the lesson list.
- **`#partMaterial` holds the grammar card with the lesson's vocabulary card under it; `#partExercise` holds only the list of drills.** A drill is one entry in `LESSON_DRILL_GROUPS` (`js/lesson.js`) with a `kind` that says what runs it and where it draws: `exercise` → `startExercise()` into `#exerciseQuestion`, `translation` → `startTranslation()` into `#translationQuestion`, `flashcards` → `startFlashcards()` into `#flashcardContainer`. Those three containers live on **`#drillSection`, a screen of its own** — a chosen drill is a page, not a card appended under the list. `startLessonDrill()` shows the one container the chosen drill needs, clears the other two and calls `showSection('drillSection')`, so the three renderers keep their own ids and none of them had to change; `closeLessonDrill()` is the way back, and every drill's result block offers it. The app bar titles that screen from `currentDrill.label`, which is why `currentDrill` holds the drill **object**. Adding a drill means one entry in that catalogue — plus an availability rule in `lessonDrillAvailable()` if it is not an `exercises`/`translation` key.
- **The writing drill is two steps with a way back.** `letter_write` draws a canvas (`#letterWriteCanvas`), «Готово» calls `completeLetterWritingPractice()`, which credits the answer and swaps the canvas for a card showing the letter. «Готово» gets pressed before the letter is finished, so the reveal carries a «Назад» (`backToLetterWriteCanvas()`) that *undoes* the credit — both `stats.totalCorrect` and `exerciseState.correct` — and calls `showExercise()` on the same index, which re-renders the canvas and re-binds its handlers. Both button rows are spread to the edges (`justify-content: space-between`): «Очистить | Готово» on the canvas, «Назад | Далее» on the reveal, so each button keeps its place across the swap. Clearing the canvas is `showExercise()`'s job, not the canvas handler's — otherwise coming back would wipe the already-drawn stroke. The question above the canvas names the letter in **Russian** in both courses: the Greek pool carries `ru` («альфа», the Russian reading lesson 1's own dictionary prints) beside its Greek `name`, because a beginner cannot yet read `ἄλφα`, and Hebrew's `name` is already Russian, so `letterWritePracticeState()` uses `q.ru || q.name`. The reveal is the same markup in both courses — one `.letter-write-reveal__forms` with a `.script` child (two children for Greek's capital and small, one for Hebrew) — so both centre by the same flex rule and take the same size; putting `.script` on the container itself for Hebrew left it one multiplier short and half the Greek size. The writing card also overrides the flashcard-back alignment it borrows: `justify-content: center` and a 24px bottom padding in place of `--has-flip`'s 76px (that reserve is for the flip button, which the writing reveal does not have), so the letter sits in the middle of the card rather than its upper third. `tests/static.test.js` fails if that centring rule goes.
- **The writing canvas is one component, styled by class, not by id.** Both the letter drill (`#letterWriteCanvas`) and the vowel drill (`#vowelWriteCanvas`, see "Alphabet and reading") are `.writing-canvas`; the sizing rule in `screens.css` selects that class. Styling by `#letterWriteCanvas` left the second canvas with the `<canvas>` intrinsic 300×150 and stretched the page — a second id in the selector is the maintenance trap, so use the class.
- **The canvas bitmap is resized to its own CSS box, never left to be stretched.** `initWritingCanvas(id)` measures the canvas and sets `canvas.width/height` so the drawing buffer matches the rendered box (we stroke in CSS px via `setTransform(ratio, …)`, so the two must agree or strokes land off the finger and lines blur). It follows its box through **both** a `ResizeObserver` on `.writing-canvas-card` and a plain `window.resize` listener — the card narrows on the phone breakpoint without the window changing, and the field's *height* comes from the window, which the observer does not reliably report. Before a resize the bitmap is copied to a scratch canvas and drawn back afterwards, so a drawing survives a rotation; re-rendering the canvas produces a new observer, which is what keeps strokes from leaking across questions. Do not add click-based teardown: an earlier version disconnected the observer on the first tap, which killed tracking after the first stroke. `tests/drills.test.js` stubs the rect and a fake 2D context (jsdom has neither) to hold the buffer to the box and to check the `window.resize` path.
- **A drag on the writing field must not pan the page.** iOS Safari rubber-bands the document on a gesture that starts on the canvas even with `touch-action: none` on it: the whole UI — the fixed app bar and nav bar included — slides down under the finger («окошко тянется вниз») and the stroke smears. Three guards hold it: `.writing-canvas-card` (not just the canvas) carries `touch-action: none` plus `user-select: none` / `-webkit-touch-callout: none`; `initWritingCanvas(id)` adds a **non-passive** `touchmove` listener that calls `preventDefault()` — a bare `touch-action` was not enough on iOS, and a passive listener would have its `preventDefault` ignored; and the page root sets `overscroll-behavior: none` in `base.css`, which kills the elastic bounce and pull-to-refresh without touching ordinary scrolling. Drawing stays on pointer events and is unaffected. `tests/drills.test.js` dispatches a cancelable `touchmove` on the canvas and requires it to be default-prevented.
- **The writing field takes its height from the window, down a flex chain.** `#drillSection` is `min-height: calc(100dvh - app-bar - safe-top - nav-bar - safe-bottom - 88px)` (the last is `.md-content`'s own bottom padding in `base.css`; `dvh`, not `vh`, because mobile browser chrome moves), and `#drillSection > .card` → `#exerciseQuestion` → `.writing-practice` → `.writing-canvas-card` are each `flex: 1 1 auto; min-height: 0`. **The `display: flex` that chain needs belongs to `#drillSection.active`, never to `#drillSection`**: a selector by id (1,0,0) beats `.section { display: none }` (0,1,0), so flex declared on the bare id keeps the drill screen on screen after you leave it — every following screen then opens *below* the abandoned drill card. That is exactly how «Настройки» came to sit under a stray exercise card; `static.test.js` now fails on any `display` that a bare section id sets. The canvas itself is `position: absolute` with `top/left: 12px` and `width/height: calc(100% - 24px)` — explicit, because `<canvas>` has an intrinsic 300×150 and ignores a stretch otherwise. Do **not** put a `%` height on the canvas: it would resolve against a card whose height it also defines, and the browser falls back to the clamp floor, which is what left a small field above a large empty gap. The card keeps a floor (`min-height: clamp(180px, 34vh, 340px)`) so a short window scrolls instead of crushing the field, and `.writing-practice .flashcard-flip > .md-flashcard--writing` grows the same way so the reveal does not jump.
- **The grammar in `data/lessons.js` is a `<br>`-separated stream, and the app does not render it raw.** In the data, paragraphs are separated by pairs of `<br>`, a section heading is a line that is nothing but `<b>…</b>`, and a list is *either* lines starting with `•` *or* a real `<ul>` (lesson 5 is the one that uses tags). That shape makes vertical rhythm a function of how many `<br>` someone typed, and it puts a wrapped bullet's second line under the marker. `renderGrammarHtml()` (`js/lesson.js`) rebuilds it into real blocks at render time — `.grammar-h`, `.grammar-p`, `.grammar-list` — so spacing comes from CSS instead. It changes markup only, never text; `<b>Примечание:</b> …` with the sentence continuing on the same line stays a paragraph, which is why the heading test requires the bold element to span the **whole** line. Fix grammar spacing here or in `screens.css`, **not** by editing `<br>` runs in the content.
- **Studied-language runs in the prose are marked at render time.** The Greek
  material carries no markup for its Greek words — they sit inside `<b>` / `<i>` —
  so `wrapScriptRuns()` (`js/lesson.js`) wraps every run of Greek-or-Hebrew
  characters in `<span class="script">` while the blocks are built, and CSS gives
  it its size. Three things it deliberately does not do: it never touches text
  inside an element that is already marked (the Hebrew chapters are marked word by
  word by hand, and a second wrapper changes nothing but nesting), it never
  touches a lifted table or a tag-built list (they keep their table sizes —
  `.md-table-pool__glyph`, `td.script`), and it changes no text, only markup. The
  prose blocks are named in the selector (`.grammar-p .script`, …) rather than
  using `.grammar-text .script`, because a grammar table also lives under
  `.grammar-text` and the descendant selector (0,2,0) would beat
  `.md-table-pool__glyph` (0,1,0) and break the chapter-2 vowel table.
- **`<table>`, `<ul>` and `<ol>` are lifted out of the stream before it is split** (`GRAMMAR_LIFT_RE` → placeholders → `grammarLiftedHtml()`). Two reasons, and both bite: `<br>` and `•` mean nothing inside them, and — the subtler one — a native `<ul>` in the source has no `<br>` around it, so without lifting, the paragraph before it, the list, and the paragraph after it all collapse into one `.grammar-p` with no spacing between them, and the `<ul>` never gets `.grammar-list`, which drops it through to the global `* { margin: 0; padding: 0 }` reset with no indent at all. A lifted table comes back wrapped in `.md-table-scroll`; a lifted list comes back carrying `.grammar-list`, the same class the `•` form produces. The lift regex is non-nesting — a list inside a list would break it, and there are none.
- **Cells take their alignment from the strip, not from their own text** — `--md-table-align`, never `text-align: start`. See "Writing direction" for why the logical value is wrong here.
- **A table wider than the screen scrolls inside its own strip; the page never scrolls sideways.** Every table sits in `.md-table-scroll` (`overflow-x: auto` plus `overscroll-behavior-x: contain`, so the gesture does not chain to the page), and `body` has `overflow-x: clip` as the backstop — `clip` rather than `hidden` because `hidden` would make `body` a scroll container and break the `window.scrollY` the app bar reads. Inside the strip the table is `width: auto; min-width: 100%` and its cells are `white-space: nowrap`: squeezing columns to fit would inflate a row to three lines because of a «Перевод» column that is off-screen anyway. All cells are left-aligned. If you add a table anywhere, wrap it.
- **Horizontal swipe switches lesson sections on touch screens.** `initLessonSwipe()` (`js/lesson.js`, called from `boot.js`) listens on `#lessonSection`. The row it moves along is **the tab bar itself** — `lessonSwipeTabs()` reads the visible `#lessonTabs` buttons in markup order, so «Тест» is in it too, and intro lessons (whose exercise and test tabs are hidden via `style.display` — none at present, see `introLessons`) have nothing to swipe to. `swipeLessonPart()` ends by **clicking the tab it landed on** rather than calling `switchLessonPart()` directly: the test tab carries `startTest()`, not a panel switch, and a swipe must do exactly what a tap on that tab does. That is the whole reason the row is derived from the DOM instead of a list of part names — a hardcoded list silently drops any tab that is an action rather than a panel. A gesture is ignored when it is short, more vertical than horizontal, multi-touch, or started inside something that scrolls sideways itself (`SWIPE_BLOCKERS` — declension tables, the tab bar, chip rows, inputs). Both ends of the row are dead ends; the gesture never wraps.
- `SCREEN_META`, `DEST_SECTION` and `FAB_CONFIG` (`js/shell.js`) drive the app bar title, back button, active nav destination and contextual FAB. Adding a screen means adding entries there, not just markup.
- Functions call freely across files — they are all globals on `window`, and every file is loaded before anything runs. There is no import graph to keep in sync; the only ordering rule is the one about `boot.js` above.
- Top-level `let` and `const` bindings — state (`stats`, `testState`, `allFlashcardState`, …) *and* the data (`LESSONS_DATA`, `PRAYER_DATA`, `LICENSES`) — are **not** on `window`; splitting the data into their own files did not change this, because `const` at the top level of a classic script never creates a window property. `function` declarations *are* on `window`. So a harness can call `window.openLesson(3)` but must reach data through `window.eval('LESSONS_DATA')`. Test through the DOM, not through `window.someState`.
- **Формы слова тренируются на обороте карточки, а не отдельным упражнением.** `declension_fill` больше не значится в `LESSON_DRILL_GROUPS`: круглая кнопка в углу карточки (появляется только после «Показать перевод») переворачивает её и запускает тот же вопрос о форме с теми же `.option-btn`. Вопросы собирает `cardDeclensionQuestions()` (`js/flashcards.js`) из двух источников — авторских `exercises.declension_fill` урока про это же слово (их дистракторы продуманы вручную, и их же берёт «Тест», поэтому данные не осиротели) и остальной парадигмы из `declension_forms`. Ключи генерируемых форм намеренно совпадают с авторскими (`gen_sg`, `2pl`, `nom_pl_m`, `dat_sg_f`), иначе один и тот же падеж попадёт в колоду дважды. Результат кешируется в `word._declQuestions` — тем же приёмом, что `entry._examples`. Ответ перерисовывает только `#cardDeclension`, а не всю карточку: иначе анимация переворота проигрывалась бы на каждый вариант.
- **The dictionary and the flashcards share one cache.** `buildAllVocabCache()` (`js/vocab.js`) collects the vocabulary of every lesson ≥ `VOCAB_FIRST_LESSON` (lesson 1 is the letter names, not words), de-duplicates it and serves both screens; `startAllFlashcards(type)` builds its deck from there, not from `LESSONS_DATA` directly. A card and a dictionary entry are therefore literally the same object — which is why `findUsageExamples()` caches the full set in `entry._examples` and slices it, instead of caching whatever count the first caller asked for. The example search is **course-agnostic**: it walks `lesson.translation` and the `translate_*` drills of whichever course is open, and matches the word through its own paradigm forms. The Greek-looking names of its helpers (`foldAccents`, `tokenizeGreek`, `GREEK_WORD_SOURCE`) are historical — they cut tokens at “letter + diacritic”, which is right for Hebrew too, and strip only Greek accents, so niqqud stays part of the compared word. Both courses' rows are expandable in place: `vocabEntryHasDetails()` gives the dictionary the same usage example the lesson's word list shows, and — behind a «Показать формы» button rather than shown with the example — the same paradigm table. That strip must stay a **direct child of `.word-details`**, because `.word-details > .md-table-scroll` is the rule that turns the table over with the script; `.vocab-forms` therefore rides on the strip itself, not on a wrapper. In Hebrew that is 16 of 163 words — the ones the chapters' own sentences happen to contain — and that is the point: examples are never written by hand, they are sentences the textbook prints. **A flashcard shows the word's reading too** (`.flashcard-translit`, `flashcardBodyHtml()`), between the word and the translation, and it appears with the answer rather than before it: the card checks whether the word is remembered, and the reading is part of the answer, not a hint to the question. Its size is in `rem`, not through the script multipliers — it is Russian letters and Latin, a hint *about* the word.
- **The lesson's word list and the dictionary are the same row.** `#vocabList` (`js/lesson.js`) and `#allVocabContent` (`js/vocab.js`) both emit `.word-item > .word-row > strong + span`, and one CSS rule sizes the headword for both — so the two screens cannot drift apart, and a change to `.word-item .word-row strong` shows up in the lesson's material tab as well as in Словарь. (That one rule is also why the fixed headword size of "Text size" applies to both lists at once.) Their `.word-details` block opens with the same two blocks — **the reading of the word under the word itself, then the meanings the row had no room for** — and only then diverge: the dictionary follows with the usage example and puts the paradigm behind a «Показать формы» toggle, the lesson holds its paradigm table unfolded with the row. Both blocks are built by `renderVocabEntryTopHtml()` (`js/vocab.js`) from the same data, so the two screens cannot show different readings either. That element is **not** `.script`: it is Russian letters and Latin transliteration, written left to right, and the studied-language multipliers do not apply to it — it is a hint *about* the word, not the word. The article and the word are joined in both builders by a non-breaking space (`\u00A0`), so a row too tight for the pair wraps the translation instead of splitting the headword into «ἡ» and «ὁδός»; `tests/vocab.test.js` holds that. One cascade trap lives in that row: the chevron of the dictionary is a `<span>` too (`<span class="msym vocab-chevron">`), so the translation's own rule — `.word-item .word-row > span` in `screens.css` — would style it as well; both selectors are (0,2,0) and `screens.css` loads after `components.css`, so the chevron silently took the translation's `margin-left: auto` and its font size, drifting away from the translation and drawing at 0.875rem instead of 20px. The translation selector therefore carries `:not(.vocab-chevron)`, and `tests/static.test.js` fails if that exclusion is dropped.
- **How much translation a row shows is a course fact, not a course branch.** `vocabRowGloss()` splits the translation on commas *outside* brackets (`splitVocabGlosses()` — «имя (известность, слава), Сим» is two meanings, not three) and, only when the course sets `vocabShortGloss` in `data/courses.js`, keeps the first meaning plus the second if both are short (≤ 8 characters, no brackets). The rest are handed to `vocabExtraGlosses()` and shown in the opened entry as a «Ещё значения» list. Hebrew sets the flag because its translation is a bare list of synonyms; Greek does not, and the reason is worth keeping: its comma list also carries case government («в, во (куда; с Acc.)»), so shortening the row there would hide half the dictionary entry. `tests/vocab.test.js` holds that line for Greek, `tests/hebrew-content.test.js` for Hebrew.
- **Part of speech is a filter, not just a heading.** `item.type` in `data/lessons.js` drives the dictionary's section headings, the `.filter-chip` row above both screens, and which words go into a flashcard deck. The permitted values are listed in `VOCAB_TYPE_ORDER` and `TYPE_LABELS` (`js/vocab.js`): `noun`, `verb`, `adjective`, `pronoun`, `adverb`, `preposition`, `conjunction`, `particle`, `article`, `other`. A new type must go into both lists, or its words fall into «Прочее» and get no chip.
- Progress is `localStorage` only, and the keys are **per course**: `courseKey('stats')` and `courseKey('last_lesson')` resolve to `greek_stats` / `hebrew_last_lesson` and so on. Genuinely global settings take an `app_` prefix instead — `app_theme`, `app_course`, `app_default_course`. Never hard-code a course's key. See "Courses". All reads/writes must stay wrapped in `try/catch` — they throw in private-mode Safari.

## Design: Material 3 (Material You) — mandatory

**Follow the current Material 3 / Material You specification strictly at all times, unless the user directly instructs otherwise in that request.** A user preference expressed for one element does not license abandoning the system elsewhere. When the spec and a local habit disagree, the spec wins. Reference: <https://m3.material.io>.

The app is already a full M3 implementation. Extend it; do not reintroduce ad-hoc styling.

### Non-negotiables

1. **No hard-coded colors.** Not in CSS, not in inline `style=`, not in JS-generated markup strings. Every color is `var(--md-sys-color-*)` or `var(--md-extended-color-*)`. A literal hex anywhere outside the theme blocks in `styles/tokens.css` is a bug — this codebase had ~20 of them and dark mode was broken everywhere as a result. The only permitted literals are the two bootstrap `<meta name="theme-color">` tags, which must paint before CSS loads; keep them in sync with `surface` in the light and dark schemes. Sepia gets none: it is a manual choice, not a system preference, and nothing knows about it before JS runs — `applyTheme()` then removes all of them and writes one from the token. Where JS needs a color it reads the token — see `applyTheme()`, which pulls `--md-sys-color-surface` via `getComputedStyle` rather than repeating the hex. The other exception is the two app icons. An SVG loaded as an icon never sees the page's CSS, so its colours are written into the file. `icon.svg` is the light one. `icon-dark.svg` uses the dark scheme's `primary-container` / `on-primary-container`, the dark FAB's pair, so change it with that pair. Its geometry and its Ω (U+03A9, not the look-alike ohm sign U+2126) are copied from `icon.svg`, so keep the two in step. The tab icon follows the theme the same way `theme-color` does. `<head>` carries a `media` variant per system scheme for the moment before JS runs. `applyThemeIcon()` then leaves a single link chosen by the app's own theme: the dark icon for dark, the light one for light and sepia.
2. **Always use the `on-` pair.** `background: primary-container` requires `color: on-primary-container`. Never mix roles across pairs.
3. **All three themes, always.** Any new role goes into `:root`, `[data-theme="dark"]` *and* `[data-theme="sepia"]`. Never ship a token defined in only some of them. The exception is a role a scheme inherits unchanged from `:root` — `shadow`, `scrim` and the elevation levels are correct for both light schemes, so dark overrides the elevations and sepia overrides nothing; anything else missing is a bug, not an inheritance.
4. **Spacing on a 4dp grid**, shape from the shape scale, motion from the motion tokens. No arbitrary `border-radius: 7px` or `transition: 0.15s ease`.
5. **Touch targets ≥ 48×48dp**, even when the visual element is smaller.
6. **State layers on everything interactive** — hover 8%, focus 10%, pressed 10%, via the `::before` overlay pattern used throughout, plus ripple (`RIPPLE_TARGETS`).
7. **Respect `prefers-reduced-motion`.** The global reduce block exists; do not add animations that bypass it. It cannot reach script-driven scrolling: `behavior: 'smooth'` passed to `scrollTo()` overrides any CSS. So every scroll from JS takes its behaviour from `scrollBehavior()` (or `scrollPageTop()`) in `js/ui.js`; never write `'smooth'` literally. `shell.test.js` checks both settings.

### Token vocabulary

Defined in the `:root`, `[data-theme="dark"]` and `[data-theme="sepia"]` blocks. Use these names, add new ones only when a genuine M3 role is missing.

- Color: `primary`, `secondary`, `tertiary`, `error` (each with `on-*`, `*-container`, `on-*-container`); `surface`, `surface-dim`, `surface-bright`, `surface-container-lowest|low|<base>|high|highest`, `on-surface`, `on-surface-variant`, `outline`, `outline-variant`, `inverse-surface`, `inverse-on-surface`, `inverse-primary`, `shadow`, `scrim`.
- Custom extended color: `--md-extended-color-success*` — correct answers. Errors use the standard `error` role.
- Shape: `--md-sys-shape-corner-none … -full`.
- Motion: `--md-sys-motion-easing-*` (emphasized, standard, and their accelerate/decelerate variants) and `--md-sys-motion-duration-short1 … long4`.
- Elevation: `--md-sys-elevation-level0 … level5`.
- Typography: the `.md-display-*` / `.md-headline-*` / `.md-title-*` / `.md-body-*` / `.md-label-*` classes.

Surface-role conventions in this app: page background `surface`; filled cards `surface-container`; anything nested inside a card `surface-container-high`; tables and the sentence-building area `surface-container-lowest`; nav bar and scrolled app bar `surface-container`. `card--elevated` is `surface-container-low` **plus** a shadow — that pairing is the whole point of the elevated variant, so never use that tone flat.

### Component mapping

Legacy class names were kept to avoid rewriting every generated HTML string. They implement real M3 components — treat the M3 semantics as the contract:

| Class | M3 component |
|---|---|
| `.menu-btn` | filled tonal button (`.primary` filled, `.outlined`, `.text`, `.elevated`, `.danger` error-tonal, `.danger-outlined`) |
| `.card` | filled card |
| `.option-btn` | outlined button with `correct` / `wrong` answer states |
| `.word-bank .chip` | suggestion chip |
| `.filter-chip` | filter chip (ряд `.chip-set` над словарём и карточками) |
| `.tab-bar` | scrollable primary tabs with sliding indicator (`moveTabIndicator()`) |
| `.search-box` | search bar |
| `.input-group input` | outlined text field |
| `.word-item` | list item, expandable |
| `.md-snackbar` / `.md-scrim` + `.md-dialog` | snackbar / basic dialog |

Use `showToast(msg, icon)` and `mdDialog({...})`. **Never** `alert()`, `confirm()` or `prompt()` — they are not Material and were deliberately removed.

### Adaptive layout

Window size classes drive navigation: bottom **navigation bar** in compact, **navigation rail** at ≥905px (same DOM, CSS-only transform in the `min-width: 905px` block). If you add a destination, verify both.

### Typography

- UI: **Noto Sans** (`--md-ref-typeface-plain`).
- The language being studied: **`--md-ref-typeface-script`** — Noto Serif for Greek, **Noto Serif Hebrew** for Hebrew (the Greek serif has no Hebrew glyph at all, let alone niqqud). The token resolves per course; the two raw faces stay available as `--md-ref-typeface-greek` / `--md-ref-typeface-hebrew`. Applied *only* where that language is the object of study — headwords, flashcards, chips and tokens, prayer text, and answer options via `.options--script`. Russian UI text never gets the serif; a rule outside `tokens.css`/`base.css` that names `--md-ref-typeface-greek` directly is a bug, and `tests/rtl.test.js` fails on it.
- Mark studied-language text inside a Russian sentence with `<span class="script">`, not `<b>` — see "Writing direction" below.
- Icons are **Material Symbols Rounded** (`<span class="msym">name</span>`). No emoji in the interface.
- The icon font is **subsetted** via the `icon_names=` parameter on the Google Fonts `<link>` in `<head>`. The full family is 5.4 MB and loads with `display=block`, so the whole UI sits iconless until it arrives; the subset carries only the icons actually used and downloads in a fraction of that. **Adding an icon means adding its ligature name to that list** — otherwise it renders as raw text (`menu_book`) instead of a glyph. Sweep the rendered DOM for `.msym` text to regenerate the list rather than editing it by hand.

## Settings screen

`settingsSection` is the fifth navigation destination and the home for anything that is not study content: theme, text size, data management, support, licenses.

- **Course** is the first card: which course is open, a button that switches straight to the other course, and `app_default_course` — whether the start screen asks on every load or drops straight into one course. `switchCourse()` applies the next course in `COURSE_ORDER` and opens its lesson list (`goToMain()`), rather than returning to the start screen. The three-way `#defaultCourseSegmented` labels each course with its own letter — the same `glyph` / `glyphClass` from `data/courses.js` that the start screen badge uses, filled in by `syncCourseControls()` rather than typed into the markup, so the two cannot drift. That letter is an **icon-sized mark, not text to read** (`.course-glyph`, `18px` at wide widths and `20px` in the ≤420px block where the labels are hidden and the icons grow — the same sizes the `.msym` it replaced has): it keeps the button's label and must not ride the language sliders, exactly like `.course-card__glyph`. `fontscale.test.js` therefore exempts both and asserts every one of their rules stays bare `px`.
- **Theme** is a four-way choice — `system` / `light` / `dark` / `sepia` — stored in `app_theme` as the *mode*, never as the resolved colour. `sepia` is a warm light scheme built on the same M3 tone map as `:root`, not a filter over it. Storing the resolved value is what breaks "follow the system": the app would pin whatever the OS happened to be on first run. `system` stays live via a `matchMedia` listener. A value written by an older build (`light`/`dark`) is still read as a valid manual choice, and the pre-courses key `greek_theme` is read as a fallback and migrated forward once.
- **Text size** is the interface slider, always visible with a live sample under it, and the two per-language sliders (Greek and Hebrew) folded into a collapsed «Расширенные настройки» disclosure — the same `.open` + `max-height` idiom as the dictionary's expandable entries (`toggleFontScaleAdvanced()` in `js/fontscale.js`). The interface slider starts at 100% and the two language sliders start at the top of their range, **160%**, so the studied language opens larger than the Russian around it. They are therefore *not* following the interface one by default, and the reset button is visible from the first visit; pressing it returns a language to the interface size, which on Hebrew means +20% rather than exactly it, for the niqqud. Each keeps a live sample in a tighter preview (`.font-scale--compact`); the sample's own size is not reduced, because 1.25rem is the floor at which niqqud stays readable. See "Text size".
- **Font** is the card right after «Размер текста». It
  picks the typeface for Russian text and the interface, and the list is hidden under its
  own «Выбрать шрифт» disclosure — the same `.settings-disclosure` idiom as the
  language sliders, opened by the shared `toggleSettingsDisclosure(head)` (`js/fontscale.js`,
  which reads the body id off `aria-controls`). Each option shows **only its own name**,
  set in its own face: the sample sentence that used to sit under it was dropped at the
  owner's request, because the whole screen changes as soon as you tap a font. The options
  live in `FONT_CHOICES` (`js/fontpicker.js`) — `system` (the previous stack) plus six
  self-hosted faces in `fonts/`. An option's id is the suffix of its token
  `--font-ru-<id>`, so no family name is written in JS: the stacks and the `@font-face`
  rules are together in `styles/tokens.css`. The choice is stored under the global
  `app_font` key and restored in `js/boot.js` right after `initFontScale()`, so the font is
  applied before the first paint. `--font-ru` is read by `body` and the interface rules that
  name a font themselves (`.filter-chip__body`, `.word-bank .chip`, `.build-area .token`);
  studied-language text never looks at it — `.script` / `.greek` / `.hebrew` keep
  `--md-ref-typeface-script`. The self-hosted families carry an `… Anticus` suffix so they
  cannot shadow the Google-loaded `'Noto Sans'` the "Системный" option must preserve.
- **Support the project** is the first card on the screen. It is one optional external link (`target="_blank" rel="noopener noreferrer"`) to a donation page, framed as voluntary support for the developer's time and hosting costs. Nothing is gated, no functionality depends on it, and the text names no textbook or rights holder.
- **Licenses** come from the `LICENSES` array; add an entry when you add a dependency. Only the middle of that list is open licences: the app's own code is first and is all-rights-reserved (see `LICENSE`), and the course materials are last as their holders' copyright. Both are statements, not licences, and carry no `url`.
- The nav bar now holds **five** destinations — the M3 maximum. A sixth needs a different pattern, not a sixth item. That is exactly why the course picker is a full-screen overlay rather than a destination.

## Source textbooks

There are two, one per course. Both are **reference material only**: nothing under
`reference/` is loaded by the app, precached by `sw.js`, or listed in `index.html` —
do not wire it in.

### Greek — `reference/machen-nt-greek/`

`reference/machen-nt-greek/` holds the book the lessons are built from — Machen's
*New Testament Greek for Beginners* in the Russian Bible Society edition (33 lessons,
241 pages), extracted from its PDF as Markdown plus two JSON vocabulary files.
Start at `reference/machen-nt-greek/INDEX.md`; the rules are in its `README.md`.

The Greek there **is polytonic and can be copied** — but check one thing first.
The source PDF is a scan whose OCR layer had lost every breathing and circumflex;
the marks were restored by re-OCRing the 600-dpi page images with an ancient-Greek
model and accepting a form only where two independent readings agreed. That covers
13 560 of 14 267 Greek words (95%). The remaining 707 are left in their original,
accent-less form and are all listed in `reference/machen-nt-greek/restoration-report.md`.

So: if a word is not in that report, its polytonic form is verified — use it. If it is,
restore the form yourself (against NA28/SBLGNT, or the verified lessons 1–10 already in
`data/lessons.js`). A vowel-initial word with no breathing is always unverified — that
is the visible tell. Russian text, page numbers and structure are reliable throughout.

### Hebrew — `reference/nbbs-hebrew/`

`reference/nbbs-hebrew/` holds the Novosibirsk Biblical Theological Seminary's
*Учебное пособие по грамматике древнееврейского языка* (2011, after Pratico &
Van Pelt's *Basics of Biblical Hebrew Grammar*; 273 pages, 36 chapters).
**Chapters 1–11 are transcribed** — the whole nominal system, up to the verb.
Start at `reference/nbbs-hebrew/INDEX.md`.

Unlike the Greek, this was never OCR'd. The PDF stores Hebrew in the **BWHEBB**
legacy font encoding — Latin characters that a font draws as Hebrew glyphs, so
דָּבָר is stored as `rb'D"`. That mapping is reversible and lossless, and
`tools/unfont.py` applies it mechanically. **So the Hebrew forms can be copied as
they stand**; there is no per-word verification list, because nothing was guessed.

Two things to know before copying:

- **Never NFC-normalise the Hebrew.** Canonical ordering sorts combining marks by
  class and puts the vowel *before* the dagesh — which matches neither BHS nor the
  Leningrad Codex, and some fonts render it wrong. The decoder deliberately emits
  consonant → dagesh → shin/sin dot → vowel → meteg → accent and leaves it there.
  Same rule as the Greek diacritics, with a concrete cost if broken.
- **The weak link is the hand transcription**, not the decoding. `unfont.py --audit`
  flags glyphs missing from the table, which catches impossible input (it found a
  Cyrillic `а` typed for a Latin `a`); it cannot catch one *valid* glyph typed for
  another. Verify against the Westminster Leningrad Codex anything that goes into
  a drill. See `reference/nbbs-hebrew/restoration-report.md`.

## The Hebrew course

Scope is a pilot of **chapters 1–11**, the nominal system; the verb (chapters 12–36) is
out of scope. All eleven chapters are authored in `data/hebrew-lessons.js` — grammar,
163 dictionary entries ordered by the textbook's own Hebrew-Bible frequency, drills for
every `heb_*` type, and sentence-building where the book prints sentences. That file
carries the field-by-field authoring guide; follow it rather than inferring the shape
from a neighbouring entry.

Chapters 1–2 are the alphabet and the vowel points, and they now carry drills like
every other chapter — see "Alphabet and reading". Chapter 9 has drills but no
dictionary — the book gives it no vocabulary section. Neither is a gap to fill.

**The one thing to know before editing this data**: 220 of the Hebrew strings written by
hand were byte-wrong on the first pass, and none of it was visible. Hebrew combining
marks have no canonical order — the textbook writes dagesh before the vowel
(`תּ` = 05EA 05BC 05B8), and typing the same glyph naturally produces the reverse
(05EA 05B8 05BC). Identical on screen, different strings to every search and comparison.
This is exactly the failure `restoration-report.md` says the decoding audit cannot catch.
`tests/hebrew-content.test.js` catches it mechanically: every Hebrew token in the lesson
data must occur verbatim somewhere in `reference/nbbs-hebrew/`. **Do not "fix" a failure
from that test by retyping the word** — copy it out of the reference, or the same
reordering comes back.

One decision already settled in the data, so it does not get re-litigated: **`אֵת`
occurs twice in chapter 6 as two different words.** The dictionary forbids duplicate
headwords, so the preposition sense is folded into a comment and only the object-marker
entry ships. It is not a missing entry.

**Every Hebrew word carries its own reading.** `translit` in
`data/hebrew-lessons.js` holds it — Russian letters with a stress mark, then the
textbook's transliteration in brackets: «давáр (dāḇār)». It is **authored, never
derived**: which shva is vocal and which begadkefat letter is a stop cannot be read off
the points with a rule, and a generator would be wrong in exactly the places a beginner
cannot check. The Latin half must use the book's own signs: the spirant keeps its
character (ḇ ḡ ḏ ḵ p̄ ṯ — never a Latin b/d/k/f, which is what the fricatives sound
like, not what the book writes), and the shva is U+01DD (ǝ), not the look-alike U+0259
from another font. Two tests in `tests/hebrew-content.test.js` hold that line — every
entry has a reading in the «русскими (latin)» shape, and every Latin character in it
occurs in the alphabet pool, so a substituted look-alike cannot slip in.

**Usage examples for Hebrew are never authored — they are the book's own sentences.**
The dictionary and the flashcards ask `findUsageExamples()` for a sentence a word
appears in, and that search reads `lesson.translation`; so a Hebrew example exists
exactly where a chapter already prints a sentence containing the word (16 of 163 words
today, and every one of them comes from a `translation` drill that was copied out of
`reference/nbbs-hebrew/`). Two consequences: adding examples means adding the *book's*
sentences to a chapter's `translation`, never writing Hebrew phrases by hand; and a word
the book never uses in a sentence gets no example at all — the row still opens (for the
reading and the remaining meanings), but it shows no example there, and that is correct,
not a gap. `tests/hebrew-content.test.js` holds the
line by requiring each shown example to occur **as a whole sentence** in the reference,
which the token-by-token check cannot do: one valid niqqud sign substituted for another
looks identical on screen.

## Exercise types

**`EXERCISE_TYPES` in `js/exercises.js` is the list of drill kinds.** An entry says how
one kind is asked — the question text, where the options come from, and whether those
options are in the studied language. `choiceQuestionHtml()` renders from it, and both
the lesson drill (`showExercise`) and the lesson test (`showTest`) call it with their
own answer handler. A new kind is an entry in that table, not a branch.

- **A kind lives in three lists**, and forgetting one is the usual bug: `EXERCISE_TYPES`
  (how it is drawn), `LESSON_DRILL_GROUPS` in `js/lesson.js` (its label, icon and place
  in the menu) and `TEST_TYPES` in `js/test.js` (whether the lesson test may ask it).
  `tests/drills.test.js` checks that every declared kind is reachable from at least one
  of the last two, and that nothing in them is undeclared.
- **Two kinds are not multiple choice** — `translate_greek_to_russian` (a text field)
  and `translate_russian_to_greek` (a word bank). Their markup differs between the drill
  screen and the test screen (different element ids, different handlers), so there is no
  shared code to extract; they are declared `custom: true` and drawn by the caller.
- **A typed Russian answer is checked with `keywordsMatch()` (`js/core.js`), never by a
  raw substring.** Keywords are written like dictionary entries — «почему?», «(домашнее)
  животное», «локоть (мера длины)» — and nobody types the brackets or the question mark.
  Both sides are reduced to bare words: parenthetical glosses dropped, punctuation and
  case ignored, ё = е. The data is not rewritten; only the comparison is. This applies to
  the Russian answer only; the studied-language text is never folded.
- **Extra chips in the sentence drills are words, not dictionary entries.** They come from
  the lesson's vocabulary through `headwordChip()` / `glossChips()` (`js/translation.js`),
  which keep the headword without its gender endings or labels («ἀγαθός, ή, όν» → ἀγαθός,
  «ἔρχομαι (dep.)» → ἔρχομαι) and each gloss separately without its brackets. Taken raw,
  they put «-ее)» and «(с Acc.)» into the word bank and made the wrong chips obvious.
  Parentheses attached to a word are movable ν (λύουσι(ν)) and are kept.
- **Options are either a fixed array or derived from the question.** Fixed sets — «Немое»
  / «Произносимое» шва and the like — live in the table so the author does not retype
  them per question; the question's `correct` must then match one of them exactly, which
  a test enforces across every course's data.
- **When the options are derived, they are derived by `otherValues()` — which never
  returns the correct value.** It hands back look-alikes at an even stride through the
  pool (so neighbouring letters show up among the distractors, which is the point), and
  the kind must therefore put the right answer in **first**:
  `options: q => [q.correct].concat(otherValues(…, q.correct, 3))`. Forgetting the
  prefix produces a question whose answer is not on screen — a perfectly normal-looking
  question you can only fail. All nine alphabet kinds that derive options had this bug
  at once; `tests/alphabet.test.js` now checks every question of every alphabet kind for
  it, by calling `exerciseOptions()`.
- **Keys name the concept, not the language, when the concept is shared.** `agreement`,
  `translate_*` and `article_fill` are used by both courses — Hebrew's article question
  is the same question, just with `הָ`/`הַ`/`הֶ` as the forms. So are the
  `letter_*` kinds both courses answer (`letter_name`, `letter_from_name`,
  `letter_sound`); `letter_order` is the alphabet drill only the Greek course
  asks. Kinds that exist only in
  the Hebrew course are prefixed `heb_`: `heb_vowel_name`, `heb_vowel_fill`, `heb_shva`,
  `heb_dagesh`, `heb_qamets`, `heb_gender_number`, `heb_begadkefat`, `heb_syllables`,
  `heb_gutturals`, `heb_construct`, `heb_suffix_type`, plus the alphabet's
  `heb_letter_final`. Hebrew has no
  cases, so `heb_gender_number` is its own kind rather than a reuse of Greek's
  `case_number`, which is labelled «Падеж и число». The prefix is a convention for
  readers; no code parses it.
- **A kind can keep its data and its place in the test without a place in the menu.**
  `declension_fill` is that kind today: a form is trained on the back of a flashcard
  (`cardDeclensionQuestions()`, see "Paradigms"), so the kind has no `LESSON_DRILL_GROUPS`
  entry, yet its data and its `TEST_TYPES` entry stay and «Тест» still asks it.
  Removing a drill from `LESSON_DRILL_GROUPS` therefore does **not** orphan its kind,
  but it does mean a test that drove it through `startLessonDrill()` must switch to
  `startExercise()`. The two vowel kinds travelled that road once — while огласовку
  спрашивали только карточками, `heb_vowel_name`/`heb_vowel_sound` жили в данных и в
  тесте без пункта меню — and were returned to the menu beside the cards; the tests
  that had switched to `startExercise()` did not have to switch back, because a kind
  in both places is reachable either way.
- **A drill kind that is not an `EXERCISE_TYPES` entry needs four places, not three.**
  `flashcards`, `vowel_flashcards` and `vowel_write` are `kind` values dispatched by
  `startLessonDrill()`: their entry in `LESSON_DRILL_GROUPS`, their container in
  `DRILL_BOXES`, an availability rule in `lessonDrillAvailable()` when it is not
  `data.vocabulary`, and a branch in `startLessonDrill()`. Two kinds may share a
  container (`flashcards` and `vowel_flashcards` both draw into `#flashcardContainer`),
  but then `startLessonDrill()` must hide the rest **by container id**, not by kind —
  comparing kind would have the second one hide the first's container. `vowel_flashcards`
  and `vowel_write` are available where the lesson actually drills the vowels
  (`heb_vowel_*` in its data), because `courseAlphabet().vowels` alone is true for every
  Hebrew lesson. `vowel_write` draws into `#exerciseQuestion` (as `letter_write` does)
  and reuses the shared `initWritingCanvas()`/`clearWritingCanvas()` rather than the
  exercise run — it has no `EXERCISE_TYPES` entry and no options, only its own
  `vowelWriteState` and `showVowelWrite()`.
- **A group with nothing available is not drawn.** That is what keeps the phonology
  group («Огласовка и чтение») off Greek lesson screens without any branching on course.
- **Do not put the answer in the question.** `heb_construct` and `heb_suffix_type` carry
  a translation in the data and deliberately do not show it: «его кони» announces the
  number, «(этот) голос (этого) человека» announces the definiteness.

## Alphabet and reading

The first lesson of each course has no words in it: Greek lesson 1 and Hebrew chapter 1
are the letters, and the lesson after them is the reading rules (Greek: diphthongs,
breathings, accents; Hebrew: the vowel points). Those two units per course are now
drilled like any other material — thirteen kinds exist for them.

**The Hebrew vowel points are learnt from flashcards, choice questions and drawing.**
The three drills all work the one pool. The drill `vowel_flashcards` (речь о нём в
разделе «Exercise types») shows the sign with its carrier on the front (`בַּ`) and the
name and sound on the back (`патах`, `[а]`); the two multiple-choice kinds give the same
two facts one at a time — `heb_vowel_name` asks «Как называется этот знак?» and
`heb_vowel_sound` «Какой звук обозначает этот знак?». The card is a drill *kind* like
`flashcards`, not an `EXERCISE_TYPES` entry: it has no question and no options, and its
deck is `courseAlphabet().vowels`, not a lesson's vocabulary; the two choice kinds are
ordinary `EXERCISE_TYPES` entries whose questions come from the same pool. See
"Exercise types".

**The same pool is also drawn, not only recognised.** `vowel_write` gives the sign's
name and sound and asks for the sign itself: the canvas carries the carrier
(`בּ`) as a faint guide (`.vowel-write-guide`, one shared `.vowel-write-form` size with
the reveal, the flashcard's sign size), the user draws the point, and «Готово» credits
the answer and reveals the whole sign with its name and sound — the same two-step
shape, and the same way back, as `letter_write` (see "Exercise types"). The drawing is
not graded; it is a self-check. The carrier is the pool's own prefix — every sign is
written on `בּ`, which `tests/alphabet.test.js` already assumes — and a test asserts
the pool keeps that prefix rather than retyping the letter.

**The letters live in a pool per course, not in the questions.** `GREEK_ALPHABET`
(`data/lessons.js`) and `HEBREW_ALPHABET` (`data/hebrew-lessons.js`) hold the letters
once with everything there is to ask about them; the kinds build both the question and
the wrong answers out of it. Writing the alphabet out per question would have been four
copies of the same table, and they would have drifted.

| Pool | Fields |
|---|---|
| `GREEK_ALPHABET` | `letters` ×24 — `{letter, upper, name, ru, sound}`; `diphthongs` ×8 — `{diphthong, sound}`; `breathings` ×6 — `{sign, correct}`; `accents` ×9 — `{sign, correct}` |
| `HEBREW_ALPHABET` | `letters` ×22 — `{letter, name, translit, sound}`; `finals` ×5 — `{letter, final}`; `vowels` ×15 — `{sign, name, sound}` |

- **`courseAlphabet()` (`js/course.js`) is the only way to the pool** — `COURSES.greek.alphabet`
  is not. Same rule as `courseLessons()`.
- **`ru` is the Russian reading of a Greek letter's name, and it is not read off the grammar
  table.** That table's «Название» column is Greek (`ἄλφα`), so `ru` («альфа») is copied from
  lesson 1's own dictionary translation, which prints the same reading; the writing drill is
  its only reader. Hebrew has no `ru` — its `name` is already Russian. `tests/alphabet.test.js`
  requires the Greek field non-empty and unique beside `name`.
- **A pool holds only what the course has, and that absence is load-bearing.** Greek has
  no `finals`/`vowels` fields and Hebrew has no `upper`/`diphthongs`/`breathings`/`accents`
  (asserted as `undefined`, not as empty arrays). A kind whose questions can only be built
  from a field the course does not have simply has no questions there, so the phonology
  group never appears on a Greek lesson screen — no branching on course anywhere.
- **`letter_order` asks what comes next, so the last letter is not asked about.**
  `alphabetSuccessor()` returns the letter after the one in the question, and `''` for the
  last; the authored questions are `letters.slice(0, -1)`, which a test checks against the
  pool rather than trusting.
- **`script` may be a function of the question, not of the kind.** «Как называется эта
  буква?» is one question in both courses, but its options are Greek names (`ἄλφα`) in one
  and Russian ones (`а́леф`) in the other, so `letter_name` computes `script` from
  `isScriptText(q.name)`. `letter_from_name` is the mirror image and can be constant: the
  options are always letters.
- **The line under the question is set from its own content, not from the course.**
  `choiceQuestionHtml()` picks `.md-prompt-strong` when `isScriptText(subject)` and
  `.md-prompt-ru` otherwise, because the subject is sometimes the letter (`בּ`) and
  sometimes its Russian name (`а́леф`) — within one kind, in one course. `.script` on the
  *options* still comes from the kind or the question, as everywhere else.
- **The tables in the textbook's grammar are the source of truth for the pool.**
  `tests/alphabet.test.js` re-derives the pool from the Greek lesson-1 table, the Hebrew
  alphabet table, the diphthong line, the breathings and accents, the five finals bullets,
  the begadkefat rows, the gutturals sentence and the vowel table in chapter 2 — and fails
  if the data and the book disagree. Write the pool first, then reconcile it with the
  grammar text; do not type it twice from memory.
- **The alphabet table is one component, shared by both courses, and its letter column is
  the widest cell in the material.** The Greek lesson-1 table and the Hebrew chapter-1
  table both carry `.md-table--alphabet`; the Greek one merges the two cases into a single
  «Буква» cell (`<td lang="el"><span class="alphabet-glyph">Αα</span></td>`) and has no
  extra columns, so the collapse rules simply find nothing to hide on it — that is why it
  has no `Показать всё` button. Two numbers there are ceilings rather than taste: the glyph
  is fixed at `44.8px` — the size the old `1.75rem × 1.6` slider formula gave at the
  shipped 160%, see "Text size" — because at `2rem` three columns stop fitting a 412px
  phone, and the letter
  column keeps `white-space: nowrap` (via the `td:not(:first-child)` rule) because «Σσ» and
  «בּ / ב» are single marks — letting them break inflates the row to 140px.
- **A directional drill label reads «shown → chosen»**, as in «Фразы: {lang} → русский».
  `letter_case_lower` shows the capital, so it is «Прописная → строчная». The first
  version said «Строчная к прописной» and «Прописная к строчной». Russian «X к Y»
  reads either way, and both labels came out backwards. `alphabet.test.js` pins them
  against the letter that is actually displayed.
- **`introLessons` is empty in both courses and the mechanism is now inert.** It still
  means "material only, no drills and no test", and `isIntroLesson()` still honours it,
  but no lesson is on either list: the alphabet is trainable, so there is no material-only
  lesson left. Only `tests/shell.test.js` exercises the flag, by pushing a lesson onto the
  list for the length of one test.

## Paradigms

A paradigm is a grid: axes with ordered values, and forms at the intersections.
**`js/declension.js` takes that description from the data** — `declension_forms.tables`,
one entry per table, each with `rows`, `cols`, `cells` and optional `caption` and
`translations`. The exact shape is documented at the top of that file and again in
`data/hebrew-lessons.js`, where the Hebrew paradigms are authored.

- **Greek data was not rewritten.** All 101 paradigms in `data/lessons.js` keep the old
  nested notation (`forms[gender][number][case]`); `legacyParadigm()` expands it into the
  same axes, so there is one renderer and no second code path. Greek output is unchanged
  down to the byte — `declension.test.js` holds that line, and it is the reason the
  legacy branch reproduces small oddities like always emitting five case rows.
- **Cell keys must keep matching authored `declension_fill` questions** (`gen_sg`,
  `nom_pl_m`, `2sg`) for Greek, which is why `collectCardForms()` in `js/flashcards.js`
  still builds those keys itself. Axis-described paradigms need none of that: the key is
  `row_col` and the label comes from the axis values, so nothing parses a key with a
  regular expression.
- **Forms are marked `.script`, the row labels and the translation column are not.** The
  paradigm table was the one place studied-language text was still drawn in the interface
  font — invisible with Greek, fatal with niqqud at 14px. Cell size is
  `max(0.875rem, var(--md-ref-script-min-size))`: unchanged for Greek, floored for Hebrew.
- **Anything that walks the data looking for word forms must go through
  `paradigmCells()`**, not over the object. Axis labels are Russian strings living in the
  same structure; `getWordSearchForms()` in `js/vocab.js` used to collect every string it
  found, which would have made the dictionary highlight «Тип 1» inside example sentences.
- The verb (chapters 12–36) is still out of scope, but nothing about it needs new
  machinery now: a binyan × conjugation × PGN cube is a list of tables, which is what the
  description already is.

## Courses

The app hosts two courses. **`data/courses.js` is the registry**; `js/course.js` holds
the state and the switching.

- A course is one entry in `COURSES` — its name, its lessons object, its prayer data,
  its alphabet pool, and the handful of facts that used to be hard-coded for Greek:
  which lessons are intro-only (no drills), which lesson the dictionary starts at, the
  search placeholder, the script and its writing direction, and `lang` — the name of the
  language as it appears in drill labels ("Фразы: {lang} → русский", "Переведите на
  …"). Read that one through `courseLang()` and `drillLabel()`; a literal
  "греческий" in a shared string is a bug. Adding a course is a data entry plus its
  lesson file; it is not a code change.
- **`vocabShortGloss` is a course fact about how a dictionary row reads**, not a branch
  in the row's code: `vocabRowGloss()` (`js/vocab.js`) asks the course whether to keep
  the first translation only, and `vocabExtraGlosses()` gives the opened entry the rest.
  Hebrew sets it — its translation is a bare list of synonyms («слово, дело, вещь»),
  and the row was becoming a paragraph. Greek does not, and that is a decision: its
  comma list also carries case government («в, во (куда; с Acc.)»), so a shortened row
  would hide part of the entry. `tests/vocab.test.js` pins the Greek side,
  `tests/hebrew-content.test.js` the Hebrew one.
- **Read lesson data through `courseLessons()`, never `LESSONS_DATA` directly.** The
  same goes for `coursePrayer()`. `LESSONS_DATA` is now *the Greek course's* lessons,
  not *the* lessons. `getLessonData()` and `lessonNumbers()` in `js/core.js` already
  go through the active course; use them.
- **Storage keys are namespaced by course**: `courseKey('stats')` → `greek_stats` /
  `hebrew_stats`, `courseKey('last_lesson')` likewise. This is why no migration was
  needed for progress — the pre-existing `greek_stats` and `greek_last_lesson` are
  exactly what the scheme produces for the Greek course. Anything genuinely global
  gets an `app_` prefix instead: `app_theme` (migrated from `greek_theme`, which is
  still read as a fallback), `app_course`, `app_default_course`.
- **The start screen is an overlay, not a `.section`.** `#startScreen` sits outside
  `.app` and is toggled by `body.start-open`, which hides the app bar, nav bar and FAB
  in CSS. It was deliberately not made a sixth screen: the nav bar is already at the
  M3 maximum of five destinations, and a launcher is not a destination. The app behind
  it is fully booted on the active course, so dismissing it is just hiding it.
- **The course card shows only what identifies the course**, and that is a decision,
  not an accident of layout: the alphabet glyph on a `primary-container` badge, the
  course name, the source textbook (`tagline`) under it, and the lesson count as a
  `secondary-container` chip — `renderStartScreen()` in `js/course.js` builds exactly
  those three spans and `tests/course.test.js` pins the list. A description of the
  lessons stood there until 2026-09-29 (the registry's `blurb`, since removed): the
  start screen picks a course, it does not describe one, so putting a content summary
  back on the card is a regression rather than a polish.
- **`app_default_course` decides whether the start screen appears at all.** `ask`
  (the default) shows it on every load; a course id skips straight into that course.
  The setting lives on the settings screen next to the course switcher, but the
  switcher (`switchCourse()`) does **not** reopen the start screen — it applies the
  next course and opens that course's lesson list — so after launch the start screen
  is reached only through `app_default_course` and a reload.
- Switching a course goes through `applyCourse(id)`, which reloads stats, drops
  `allVocabCache`, resets the decks and re-renders. Anything you add that caches
  across screens must be reset there, or it will leak one course's words into the
  other.

## Writing direction

Hebrew is written right to left; the interface is Russian and stays left to right.
Those two facts are kept apart by one rule: **`<html>` never gets a `dir`.** Turning
the page over would turn over the app bar, the tabs, the nav bar and every Russian
label with it. Only the text of the language being studied is turned over.

Three pieces carry it:

1. **`applyCourseChrome()` (`js/course.js`) puts two attributes on `<html>`** from the
   registry: `data-script` (which script — `course.script`) and `data-script-dir`
   (`course.dir`). Nothing else in the app reads the course to decide how to draw text.
2. **`styles/tokens.css` resolves them into tokens**: `--md-ref-typeface-script`,
   `--md-ref-script-direction` and `--md-ref-script-min-size`. Every rule that draws
   studied-language text declares the first two plus `unicode-bidi: isolate`, so no
   rule mentions a course.
3. **`.script` is the marker class in generated markup.** A Hebrew word quoted inside
   a Russian sentence is an inline island: `<span class="script">…</span>`. `isolate`
   is what keeps the sentence's full stop from jumping to the wrong end of the word.

A few consequences worth knowing before you touch the rendering:

- **`.script` means "whatever the current course is". `.greek`, `.hebrew`, `lang="grc"`
  and `lang="he"` mean a specific language and win over it** — they are declared after
  `.script` in `base.css` for exactly that reason. Use them in `data/*.js` (`<td
  lang="he">`) where the content, not the course, decides.
- **The word bank is marked by the language of the chips, not by the course.**
  `ru_to_el` builds a phrase in the studied language, `el_to_ru` builds a Russian one,
  and the same screen does both — hence `word-bank--script` / `build-area--script`
  rather than a rule keyed on the course. Direction there reorders the chips: in RTL
  the first word picked lands on the right. `chosen[]` keeps logical order, so the
  answer check never learns about direction.
- **The same goes for the `<strong>` in the feedback line and in the error review.**
  Whether it holds a form or a Russian keyword depends on the drill; the code that
  builds the string adds `.script` when it is a form. The error list sweeps every
  drill into one place, so there no code path knows which it is. `errorText()`
  (`js/stats.js`) asks the string itself through `isScriptText()` and marks each of
  the three columns separately. `<strong>` keeps `unicode-bidi: plaintext` as the
  fallback for a mixed string. It used to force the script font instead, and that
  broke both ways at once. A Hebrew subject had no `.script`, so its niqqud was set
  in the interface font and drifted off the letter. A Russian answer («патах»,
  «[о]») got Noto Serif Hebrew, which has no Cyrillic. `stats.test.js` holds this.
- **Niqqud have a floor on how small they may be set.** `--md-ref-script-min-size` is
  `0px` for Greek — the unit matters, see "Text size" — and `1.25rem` for Hebrew, and
  small studied-language text is written
  `font-size: calc(max(<its own size>, var(--md-ref-script-min-size)) * var(--md-ref-script-scale))`,
  with `* var(--md-ref-script-size)` added where the step applies. Hebrew vowel points
  are dots below and inside the letter: at 15px the dagesh merges into the letter it
  sits in and qamets is not distinguishable from segol. Large text — the flashcard
  word, the drill prompt — is already above the floor and carries no `max()`. Add it
  when you set a small size on script text, and leave it off where the text may be
  Russian or where the step has already carried it well past 20px (the answer
  options). The error list has it on `.error-item .script`, which only ever holds
  text that `isScriptText()` has already recognised.
- **Paradigm tables turn over with the course** (`.word-details > .md-table-scroll`):
  in RTL the first column is the right one. Grammar tables in the lesson data do not —
  they are often Russian — so they opt in with `<table dir="rtl">`, and
  `grammarLiftedHtml()` copies that `dir` onto the scroll strip. It has to: the strip
  is its own element, and a strip with `direction: ltr` would open a too-wide RTL
  table on its *last* column.
- **In a table cell, alignment comes from the table, not from the cell's own text**,
  and this is the one place where `text-align: start` is **wrong**. Cells carry
  `unicode-bidi: plaintext` so that each takes its bidi direction from its own
  content — a Russian «ед. ч.» must not have its full stop thrown to the far end
  inside an RTL table. But `start` and `end` then resolve against *that same
  per-cell* direction, so a Russian header flushes left while the Hebrew form under
  it flushes right, and the heading stops sitting over its column. The two
  properties are independent — `unicode-bidi` orders the glyphs, `text-align` only
  picks the edge — so the fix is a **physical** value handed down by the strip:
  `--md-table-align`, which is `left` by default, `right` on
  `.md-table-scroll[dir="rtl"]`, and `var(--md-ref-script-align)` on a paradigm.
  `--md-ref-script-align` sits beside `--md-ref-script-direction` in `tokens.css`
  and exists only for cases like this one. This bit both kinds of table at once,
  and also the chapter-1 alphabet table, where `א` sat 170px from its own «Буква»
  heading. Do not "restore" the logical value.
- **Interface chrome stays put.** The flashcard flip button, the tab bar, the swipe
  direction and the dictionary row layout are all part of the LTR interface, so none
  of them mirror. Use logical properties (`text-align: start`,
  `padding-inline-start`) inside anything that can turn over.

`tests/rtl.test.js` covers all of this, including a synthetic Hebrew chapter written
over `HEBREW_LESSONS_DATA[3]`. The fixture exercises every RTL feature in one chapter
and keeps the test independent of the authored content, so editing a real chapter cannot
quietly change what the rendering is asserted against.

## The dictionary keyboard

The studied languages cannot be typed on an ordinary keyboard — the layout has to be
installed first, and on a phone found in the language list — so the dictionary carries
its own on-screen keyboard. A button in the search bar (`#vocabKeyboardToggle`,
`.keyboard-toggle`, icon `keyboard`) opens a panel of letter keys under it, and a
second button on the panel erases the last letter.

- **The letters come from the course's alphabet pool** — `courseAlphabet()`, the same
  pool the lesson 1–2 drills are built from — so the keyboard follows the course with
  no branch on the course anywhere, and Hebrew's final forms
  (`HEBREW_ALPHABET.finals`) are keys like any other: without `ץ` a word ending in
  tsadi cannot be typed at all.
- **The search field turns over with the course.** `applyCourseChrome()`
  (`js/course.js`) sets `dir` on `#vocabSearchInput` from `courseDir()`, so Hebrew is
  entered right to left; it is the only field where the studied language is typed by
  hand, and the attribute is set beside the placeholder so it cannot lag a course
  behind.
- **Neither niqqud nor accent marks are on it.** Search ignores them anyway
  (`foldForSearch` strips every combining mark), and keys for them would treble the
  panel. `tests/vocab.test.js` fails if a combining mark ever reaches a key.
- **`foldForSearch` folds final forms to the base letter too** — `FINAL_LETTER_FORMS`
  (`js/vocab.js`) holds Greek's final sigma and the five Hebrew finals. The keyboard
  offers base letters, so a word typed letter by letter must be found even when its
  last letter is spelled with the final form, and the same goes for a word pasted from
  elsewhere. That table is typed in code and therefore checked against the pool rather
  than trusted.
- **Insertion goes to the caret and deliberately does not call `input.focus()`** — on a
  phone, focus would raise the system keyboard on top of ours and cover half the
  screen; browsers keep the caret of an unfocused field, so the letters still land
  where the user last tapped.
- `renderVocabKeyboard()` builds the keys on **every** open, because the course may
  have changed while the panel was closed. `resetVocabKeyboard()` hides it on a fresh
  entry to the dictionary (`showAllVocab`) and forgets its letters in `applyCourse()`,
  so the dictionary can never show the letters of the course you left.

## Text size

Three sliders on the settings screen — interface, Greek, Hebrew — and **three
multipliers in the CSS**: the general scale on the root, the language scale on top
of it, and the per-language size step that makes the studied language larger than
the Russian around it. `js/fontscale.js` holds the sliders; the tokens are in
`styles/tokens.css`.

- **A stray comment terminator silently deletes the rule that follows it.** One was
  left inside the `.script` comment block in `base.css`, and CSS error recovery
  swallowed the `.script` rule whole — no typeface, no direction, no multiplier —
  for nine days of commits and hundreds of tests. Nothing caught it because every
  assertion read the file as *text* and found the rule that the browser had thrown
  away. `static.test.js` now walks every stylesheet and fails on a terminator
  outside a comment, so keep the comment blocks balanced when editing them.

- **The general scale is applied to the root, not to `body`.** `html { font-size:
  calc(100% * var(--app-font-scale)) }`. The entire M3 type scale is written in
  `rem`, and `rem` resolves against `<html>` — a scale on `body` reaches none of
  those classes. That was the bug in the first attempt at this feature, and the
  follow-up commit that tried to fix it did not either; both were reverted.
  `100%` rather than a fixed size, because it is the user's own browser setting
  that is being multiplied.
- **The language multipliers are therefore relative.** The general scale is
  already in every `rem`, so `--app-greek-scale` / `--app-hebrew-scale` are the
  *extra* on top of it: `effective / general`. A language slider stores and shows
  an **absolute** size ("Greek — 130%"); only the token is relative. At "follows
  the general" the extra is exactly 1.
- **"Follows the general" is stored as `'auto'`, not as a copy of the general
  value.** A copy would freeze at whatever the general was when it was written and
  stop following. Same reason `app_theme` stores `'system'` rather than the
  resolved scheme. Keys are `app_font_scale`, `app_greek_font_scale`,
  `app_hebrew_font_scale` — `app_` because size is an application setting, not a
  per-course one.
- **The default is a size, not a mode, and "follows the general" is not the same as
  "equal to the general".** A first visit has no key in `localStorage` at all, and
  `FONT_SCALE_DEFAULT` fills that in with the **top of the range, 160%**, for both
  languages — the studied text is the subject, so it opens larger than the Russian
  around it while the interface stays at 100%. The default is deliberately *not*
  written to storage on boot: absence of the key is what "first visit" means, so
  changing the default later still reaches everyone who never touched a slider.
  `'auto'` is a separate state, reached only through the reset button, and
  `FONT_SCALE_AUTO_BASE` gives each language a baseline for it: 1 for Greek,
  **1.2 for Hebrew**, because niqqud are dots under and inside the letter and the
  interface size does not carry them — the same reason `--md-ref-script-min-size`
  exists. So a language returned to the interface size still rides *above* it on
  Hebrew, and the reset button does show on a fresh install, because there is
  something to return from. The derived value goes through `clampFontScale()`, so
  it lands on a step of the slider and cannot leave the range: at a general of 1.4
  the Hebrew 1.68 is cut to 1.6, and the state label computes the real difference
  rather than claiming "+20%" where the ceiling has eaten it.
- **Every `font-size` on studied-language text must carry at least the slider
  multiplier**: `font-size: calc(<size> * var(--md-ref-script-scale))`. Where the
  text *is* the subject — grammar prose, the drill prompt, the answer options, the
  word bank — it carries **both** multipliers, the size step as well:
  `font-size: calc(<size> * var(--md-ref-script-size) * var(--md-ref-script-scale))`.
  `fontscale.test.js` re-derives the list of such rules from the stylesheets and
  fails on one without a multiplier; `layout.css` is on that list, because a
  narrow-screen override that forgot the multiplier once hid the whole language
  step on phones. The exemptions are named in that sweep — the two course glyphs,
  the dictionary headword and the usage example, each of them fixed on purpose and
  each of them pinned by its own test below. (The alphabet's letters and signs are
  fixed too, but the sweep never sees them — see the bullet after the next one.)
  Where the *content* decides the
  language rather than the course — `.greek` / `.hebrew` / `[lang="he"]`, and the
  two samples on the settings screen — use `--app-greek-scale` /
  `--app-hebrew-scale` by name instead.
- **The size step is a separate axis from the slider, and it is per language.**
  `--md-ref-script-size` answers "how much larger than the Russian around it is
  the studied language drawn by design", the way it is in a reader that enlarges
  the original text. It is a constant, not a preference: `-greek: 1.5` and
  `-hebrew: 1.6` in `:root`, with `--md-ref-script-size: var(…-hebrew)` under
  `:root[data-script="hebrew"]` — the same course-switched pattern as the typeface
  and the direction, so no rule branches on the course. The step multiplies with
  the slider, so at the shipped 160% the intended ratio is 1.6 × 1.6 = 2.56 for
  Hebrew and 1.5 × 1.6 = 2.4 for Greek, and 1.6 × 1.2 = 1.92 for Hebrew once its
  slider has been returned to "follows the general". Only four things ask
  for the step, each at its own base: `.grammar-p/.grammar-h/.grammar-list .script`
  and `.question .script` (1em — the size of the prose/line they sit in),
  `.md-prompt-strong` (1.375rem — the `.question` line, the Russian text on that
  screen), `.options--script .option-btn` (1.125rem, ≈0.82 of the prompt — answers
  read as secondary but stay legible) and the word-bank chips, which *are* answers.
  Everything that is genuinely small — paradigm cells, the error list, the row's
  Russian translation — keeps only the slider multiplier and is reached by size,
  not by the step. **Neither the dictionary headword nor the usage example takes the
  step or the slider any more** — both are fixed, see the next bullet.
- **The dictionary headword and the usage example are fixed sizes, and that is the
  one deliberate exception to everything above.** They are the two halves of one
  decision by the owner: a list of hundreds of words is scanned, not read, so the
  dictionary must not move when the text-size sliders do. `.word-item .word-row
  strong` — one rule for the all-vocabulary screen *and* the lesson's word list —
  is `font-size: var(--md-ref-script-headword-size)`: `24px` for Greek, `40px`
  under `:root[data-script="hebrew"]`. `.vocab-example__script` — one rule for the
  example in an expanded entry *and* the "В словосочетании" line under a flashcard
  — is `var(--md-ref-script-example-size)`: `22px` / `24px`. Both tokens are in
  `px`, so *neither* slider reaches them (the general one lives in the root
  `font-size`, and `px` does not resolve against that), and Hebrew's extra 16px are
  not decoration: niqqud sit inside and under the letter and read tighter at the
  same size — at equal size the Hebrew row read *smaller* than the Greek one, and the
  owner asked for the opposite. The example
  sits one step below the headword so the word is read first and the sentence
  second (0.85× in Greek; Hebrew's gap is wider, 24px against 40px) —
  before, the expanded entry took the size step and put the example at 40.8px,
  larger than the word itself. Two knock-on rights fall out of the fixed sizes: the
  Greek row sits back at its M3 56px minimum (`24px × 1.3 + 16px` of padding is
  47.2px; Hebrew's is well above it at ~68px, the owner's explicit request — the
  height the slider-driven formula used to produce and that was rejected then no
  longer applies, because the size is fixed now) while the headword still
  dominates the Russian gloss beside it (`0.875rem`), and the niqqud floor is no
  longer needed on either token — 24px is above its 20px at every slider position,
  and the floor is not a slider either. Both of those rules used to carry a floor-then-step
  `calc()`; `fontscale.test.js` exempts them from the multiplier sweep instead and
  pins both values (Hebrew > Greek, example < headword, `line-height` a number so
  the fixed size is not dragged back by a `rem` line box), so the exemption cannot
  quietly become a forgotten rule.
- **The alphabet's letters and signs are fixed by the same decision.** The alphabet
  table's letter (`.md-table--alphabet .alphabet-glyph`), the begadkefat letters
  (`.grammar-text .md-table--begadkefat td[lang="he"]`) and the vowel sign
  (`.md-table--pool .md-table-pool__glyph`) are the alphabet's own objects of study,
  so they are scanned and recognised like a dictionary row rather than read as
  prose, and the owner asked for them to stop moving with the sliders. Each is
  written in bare `px` — the value the old `calc()` produced at the shipped 160%
  (`1.75rem`/`1.5rem`/`1.375rem` × `1.6` → `44.8px`/`38.4px`/`35.2px`), so at the
  default nothing moved, and `px` keeps the general slider away as well. The niqqud
  floor is dropped from all three: every value is already above 20px, and the floor
  is not a slider. These three rules are *not* seen by the multiplier sweep (they
  carry no typeface and no `.script` — the face comes from `lang=` in `base.css`),
  so `fontscale.test.js` pins them by text instead, next to the course-glyph check.
- **Do not multiply the niqqud floor into a stepped size the wrong way round.**
  `max(<base>, var(--md-ref-script-min-size)) * var(--md-ref-script-size) * …`
  lifts Hebrew's *base* from 1rem to 1.25rem and then inflates the whole 1.92 — the
  word bank does exactly that and lands at 38px, which is right for a chip that *is*
  the answer, but on a list row or an example card it made the block sparser rather
  than more readable. Where a floor is still wanted on a stepped size, put it on the
  *designed* size instead: `max(<base> * var(--md-ref-script-size),
  var(--md-ref-script-min-size)) * var(--md-ref-script-scale)`. No rule uses that
  form today — the two that did are the fixed sizes above — so it is recorded here
  for the next stepped rule, not as a description of the current code.
- **The answer-options rule deliberately has no `--md-ref-script-min-size`.** At
  the step its smallest possible value is still ≈28px, so the 20px niqqud floor
  would never engage — and on Hebrew, where the floor *is* the base, `max()` would
  push the answer to 91% of the prompt instead of the intended 82%. The floor stays
  on the rules where the text really is small: the word bank (which is why Hebrew
  chips come out at 38px against 27px in Greek), paradigm cells, the error list.
- **A rule that sets its own `font-size` on script text has to carry the
  multiplier itself**, even if the element is already marked `.greek`. The marker
  classes live in `base.css`; a later stylesheet with equal specificity silently
  wins and drops the multiplier. That is how the settings preview came out frozen
  at one size while its slider moved — caught in a browser, not by the suite,
  because jsdom expands neither `calc()` nor `var()`.
- **The course badge on the start screen is the one studied-language size that is
  deliberately static.** `.course-card__glyph.greek` / `.hebrew` are `30px` / `32px`
  written in `px`, with no multiplier at all. The badge is a fixed 48px circle
  (`.course-card__icon`), so the old `rem` + slider form grew the letter to the whole
  diameter at 160% (Greek 48px) and past it (Hebrew 53.76px). 30px is exactly what the
  Greek letter was at 100%; the Hebrew one drops from 40.32px, because that figure was
  a slider baseline rather than a fixed design size — and a badge that took the 160%
  default would be the whole diameter and then some. It carries no niqqud either, so
  nothing there needs the extra size. `tests/fontscale.test.js` exempts these two rules
  from the multiplier check and asserts they stay bare `px` instead, so the exemption
  cannot quietly become a forgotten rule.
- **`--md-ref-script-min-size` is `0px`, and the unit is load-bearing.** Inside
  `max()` every argument must be the same type, and a bare `0` is a `<number>`,
  not a length: `max(1.0625rem, 0)` is invalid and the browser drops the whole
  declaration. It was unitless until this feature, which means that in the Greek
  course — the only one where the floor is zero — all eight of those script sizes
  had never applied at all, and the text was rendering at its inherited size.
  Hebrew was unaffected, its floor being `1.25rem`. The scale multiplies the
  result of `max()`, so the floor scales with the slider rather than pinning it.
- **The navigation bar's labels have a ceiling on how large they get**, in `px`
  so the ceiling does not ride the same scale it is limiting. Five destinations
  is the M3 maximum and the bar's height is fixed, so at 160% the labels collide.
  The ceiling is written **twice** — `base.css` and the narrow-screen block in
  `layout.css`, which overrides it — and the narrow screen is where they run out
  of room first.

Ranges: 0.8–1.6, step 0.05. The interface default is 1 and **both language defaults
are 1.6, the top of the range**: the studied text opens 60% larger than the Russian
around it, which together with the **size step** is what the language is meant to
look like (Greek prose 16 → 38.4px, Hebrew 16 → 41px at the default). `'auto'` —
"follows the general" — is what the reset button restores, not what a fresh install
gets. `--app-greek-scale` / `--app-hebrew-scale` are therefore `1.6` in `tokens.css`
too, matching what `initFontScale()` sets, so the studied language does not flash at
the smaller size before the scripts run.

**The flashcard headword has its own size per script, written out.**
`.flashcard-word` is `3.5rem` for both Greek and Hebrew, switched by
`:root[data-script="hebrew"]`, with a narrow-screen twin for each in `layout.css`
(Greek `2.375rem`, Hebrew `2.5rem`). The two are **not** derived from one another by
a multiplier: Greek words run longer and Hebrew needs the extra size so niqqud stay
visible against the letters they sit in, so the pair is tuned by hand and may move
apart again. Both keep `var(--md-ref-script-scale)`, so the
language slider still governs them. **Their `line-height` carries the same multiplier**
(`calc(4.125rem * …)` / `calc(3rem * …)`), and that is not a formality: `line-height`
written plain in `rem` does not follow the size step, so the line box came out *smaller
than the glyphs* and the ink spilled below it — with niqqud sitting inside and under the
letter, the card's reading was left 5px under the word instead of the intended ~15. The
card's back face
(`.card-declension__word`) is a separate, smaller size — it is the declension
drill's caption, not a second headword — and is left as it is.

## Offline shell

`sw.js` precaches `index.html`, every stylesheet, every data file, the manifest and the icon, and caches the Google Fonts CSS and font files at runtime. Strategies differ on purpose:

- **navigation → network-first**, cache as fallback. A published change reaches users on their next load; going cache-first here would strand them on a stale build.
- **same-origin assets → network-first**, cache as fallback. This used to be cache-first, which was safe while the app was a single file. It is not safe now: fresh `index.html` from the network plus yesterday's `styles/*.css` from the cache is a broken build. Both must come from the same place, so they use the same strategy. Offline is unaffected — with no network the fetch rejects immediately and the cache answers.
- **fonts → cache-first**; their URLs are already content-versioned.

**Adding any file under `styles/`, `data/` or `js/` means adding it to `CORE_ASSETS`.** Miss it and the app still works online, then cold-starts offline with no styles or empty screens — a failure you will not see in any online test.

`manifest.webmanifest` uses **relative** `start_url` and `scope` because Pages serves this from the `/anticus/` subpath; absolute paths would break it. Its icons stay the light `icon.svg`: a manifest cannot switch icons by colour scheme in any shipping browser, and its `background_color` is the light surface anyway. Registration is guarded on `location.protocol` so opening the file over `file://` is still fine, and a failed registration is swallowed — offline is a bonus, never a precondition.

Bump `CACHE_VERSION` in `sw.js` when the cached set changes; `activate` deletes every cache that does not match.

## Verify before reporting done

**Start with `npm test`.** The suite lives in `tests/` and is committed; it
boots the real `index.html` in jsdom and drives every screen. It covers points
1, 3 and 5 below, plus the load-order contract and `CORE_ASSETS` completeness.
See `tests/README.md` for how it is wired and what it deliberately does not
cover. `npm install` once; jsdom is the only dependency, and the app itself
still has none.

Do not claim completion on a design change without checking it renders. At minimum:

1. **JS syntax** — covered by `npm test` (`static.test.js`), or `node --check` every file in `js/` and `data/`, plus `sw.js`.
2. **Contrast** — compute WCAG ratios for every `on-*`/container pair in **all three** themes. Text ≥ 4.5:1, outlines/non-text ≥ 3:1, adjacent surface tones distinguishable (≥ ~1.10:1). Parse the tokens straight out of `styles/tokens.css` so the audit cannot drift from the source.
3. **Behaviour** — covered by `npm test`: every screen is exercised, every drill in every lesson is played to its result screen, and `undefined`/`NaN` leaking into markup fails the run. Add a test here rather than re-deriving a throwaway harness.
4. **Render** — screenshot light, dark and sepia, mobile (412px) and desktop (1280px), and check for console errors and horizontal overflow.
5. **Icon coverage** — covered by `npm test` (`icons.test.js`): it drives every screen, collects `.msym` text and diffs it against `icon_names=`. A missing name is invisible in jsdom and obvious to users.
6. **Offline** — if you touched `sw.js`, the manifest, or anything in `<head>`: serve the repo over HTTP under a `/anticus/` subpath, load once, `setOffline(true)`, and confirm a cold load still boots and renders. Then confirm an edited `index.html` is still served when back online — a service worker that pins a stale build is worse than no service worker.

Points 2, 4 and 6 have no committed harness — they need a browser or a server,
and are still written ad hoc. Ask before adding further tooling and dependencies
to the repo.

## Environment gotchas

- Windows. The Bash tool mangles heredocs containing quotes — write patch scripts to a file and run them, rather than piping a heredoc.
- **Never write Greek or Hebrew through the shell.** In Windows PowerShell 5.1, `Set-Content` and `Add-Content` write in the ANSI codepage, which turns every polytonic or pointed character into `?`, and `Out-File -Encoding utf8` adds a BOM. Edit files with the editor tool. If a script has to write them, use Node or Python with explicit UTF-8.
- PowerShell 5.1 has no `&&` or `||`. Chain with `;`, or use `if ($?) { … }`.
- jsdom does not implement `window.scrollTo`/`Element.scrollTo`; the test loader stubs both. The app also guards the calls itself.
- Playwright needs `npx playwright install chromium` before first use.
