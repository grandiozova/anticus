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
| a `font-size` on Greek/Hebrew text | multiply it: `calc(<size> * var(--md-ref-script-scale))` — except the dictionary headword (`.word-item .word-row strong` → `var(--md-ref-script-headword-size)`, 24px Greek / 40px Hebrew) and the usage example (`.vocab-example__script` → `var(--md-ref-script-example-size)`, 22px / 24px), which are deliberately fixed so the dictionary does not move with the sliders |
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
  `reference/nbbs-hebrew/`. A word the book never uses in a sentence gets no
  example, and its dictionary row is simply not expandable — that is correct, not
  a gap. `tests/hebrew-content.test.js` requires every example shown to occur as a
  whole sentence in the reference.

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
- **Огласовки заучиваются карточками** (`vowel_flashcards`): лицо — знак с носителем
  (`בַּ`), оборот — название знака и звук (`патах`, `[а]`). Колода —
  `courseAlphabet().vowels`, доступность — по данным урока (`heb_vowel_*`), а не по
  пулу курса. Виды `heb_vowel_name` и `heb_vowel_sound` остались в данных и в
  `TEST_TYPES`, но пунктами меню больше не показываются; тесты, которые водили их
  через `startLessonDrill()`, ходят в них через `startExercise()`.
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
  рисованием. Разметка показа одна на оба курса: `.letter-write-reveal__forms`
  с `.script` внутри (у греческого форм две — прописная и строчная, у иврита
  одна), поэтому обе центрируются одним флексом и берут один кегль — сложение
  `calc(3.5rem * var(--md-ref-script-scale))` на коробке и множителя `.script`
  на самой букве; пометка `.script` на коробке оставляла иврит на одном
  множителе, вдвое мельче греческого. Карточка письма ещё и перебивает
  выравнивание оборота заучивания, классы которого носит: `justify-content:
  center` и `padding-bottom: 24px` вместо 76px от `--has-flip` (этот запас — под
  кнопку переворота, которой у письма нет), иначе буква висела в верхней трети
  карточки. Правило сторожит `tests/static.test.js`.
  **С показа можно вернуться к письму.** «Готово» жмут и не дорисовав букву,
  поэтому рядом с «Далее» есть «Назад» (`backToLetterWriteCanvas()`): он снимает
  засчитанный ответ (и с `stats.totalCorrect`, и с `exerciseState.correct`) и
  зовёт `showExercise()` на том же индексе — вопрос отрисуется заново вместе с
  холстом, а обработчики навесит тот же `initLetterWriteCanvas()`. Обе строки
  кнопок письма разведены по краям (`justify-content: space-between`): на холсте
  «Очистить | Готово», на показе «Назад | Далее», поэтому «Назад» стоит там же,
  где «Очистить», а «Далее» — где «Готово». Холст перед новым вопросом очищает
  сам `showExercise()`, а не канвас-хендлер, — иначе возврат затирал бы уже
  нарисованный штрих.
  В еврейской главе 1 вопросы — `HEBREW_WRITE_LETTERS`: пул без изменений плюс
  5 конечных из `finals` (в самом пуле конечных нет: это вопрос о начертании,
  и `heb_letter_final` держит их отдельно), причём конечные помечены
  `finalForm: true` — по этой пометке вопрос пишет «каф (конечная)» до рисования.
  Шин и син этот вид различает сам: `\u05E9\u05C1` («шин») и `\u05E9\u05C2`
  («син») стоят в списке письма вместо одной буквы ש из пула — в остальных видах
  ש остаётся одной буквой с двумя чтениями, и трогать пул нельзя (на нём стоит
  таблица алфавита и остальные виды).
  **Холст подгоняется под свою рамку, а не растягивается.** `initLetterWriteCanvas()`
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