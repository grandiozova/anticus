// ============================================================
// ЯЗЫК ИНТЕРФЕЙСА
// ============================================================
// Приложение русское по умолчанию, и русский текст остаётся в разметке и в
// коде: английский — надстройка, а не второй равноправный источник. Поэтому
// ключ перевода — сама русская строка, а не выдуманный идентификатор:
//   t('Уроки')  ->  'Lessons'
// Строка, которой нет в словаре, возвращается как есть. Это значит, что
// непереведённый текст виден глазом, а не превращается в пустую строку.
//
// Английский материал уроков лежит отдельно — data/lessons.en.js и
// data/hebrew-lessons.en.js: там не строки интерфейса, а текст уроков, и он
// привязан к номеру урока, а не к строке.

const APP_LANG_RU = 'ru';
const APP_LANG_EN = 'en';
const APP_LANG_KEY = 'app_lang';

let appLang = APP_LANG_RU;

// Английские уроки по курсам: два файла данных объявлены до этого скрипта.
const LESSONS_EN = {
    greek: LESSONS_EN_GREEK,
    hebrew: LESSONS_EN_HEBREW
};

const UI_EN = {
    // ---------------------------------------------------------- оболочка
    'Древнегреческий': 'Ancient Greek',
    'Древнееврейский': 'Biblical Hebrew',
    'Греческий': 'Greek',
    'Еврейский': 'Hebrew',
    'Словарь': 'Dictionary',
    'Проверка слов': 'Word practice',
    'Прогресс': 'Progress',
    'Урок': 'Lesson',
    'Упражнение': 'Exercise',
    'Упражнения': 'Exercises',
    'Тест': 'Test',
    'Ошибки': 'Mistakes',
    'Разбор текста': 'Text analysis',
    'Настройки': 'Settings',
    'Уроки': 'Lessons',
    'Карточки': 'Cards',
    'Продолжить': 'Continue',
    'Повторить': 'Review',
    'Заново': 'Restart',
    'Материал': 'Material',
    'Грамматика': 'Grammar',
    'Словарь урока': 'Lesson vocabulary',
    'Проверка знаний': 'Test your knowledge',
    'Предыдущий': 'Previous',
    'Следующий': 'Next',
    'Назад': 'Back',
    'Поиск': 'Search',
    'Найти': 'Find',

    // ---------------------------------------------------------- главный экран
    'Уроки готовятся': 'Lessons are on their way',
    'Материал этого курса ещё не подключён. Курс можно сменить в настройках.':
        'The material for this course is not connected yet. You can change the course in settings.',
    'Ничего не найдено': 'Nothing found',
    'Поиск идёт по названиям уроков и по темам внутри них.':
        'The search covers lesson titles and the topics inside them.',
    'Совпадения': 'Matches',

    // ---------------------------------------------------------- урок
    'Показать всё': 'Show all',
    'Скрыть всё': 'Hide all',
    'Упражнений нет': 'No exercises',
    'Для этого урока упражнения ещё не подготовлены':
        'The exercises for this lesson have not been prepared yet',
    'Это первый урок.': 'This is the first lesson.',
    'Это последний урок (урок ': 'This is the last lesson (lesson ',
    'Урок ': 'Lesson ',
    ' ещё не добавлен.': ' has not been added yet.',
    'В английской версии упражнения пока недоступны — открыт только материал урока.':
        'Exercises are not available in English yet — only the lesson material is shown.',
    'Английской версии этого урока пока нет — материал открыт по-русски.':
        'This lesson has no English version yet — the material is shown in Russian.',

    // ---------------------------------------------------------- словарь
    'Все': 'All',
    'Существительные': 'Nouns',
    'Глаголы': 'Verbs',
    'Прилагательные': 'Adjectives',
    'Местоимения': 'Pronouns',
    'Наречия': 'Adverbs',
    'Предлоги': 'Prepositions',
    'Союзы': 'Conjunctions',
    'Частицы': 'Particles',
    'Артикли': 'Articles',
    'Прочее': 'Other',
    'Показать формы': 'Show forms',
    'Скрыть формы': 'Hide forms',
    'Ещё значения': 'More meanings',
    'пример составлен автоматически': 'example generated automatically',
    'Попробуйте другое слово или его часть': 'Try another word or part of a word',
    'Стереть': 'Delete',
    'Английские значения есть только у уроков 1–3; остальные слова пока по-русски.':
        'English meanings exist for lessons 1–3 only; the rest are still in Russian.',

    // ---------------------------------------------------------- статистика
    'Ваш прогресс': 'Your progress',
    'Пока нет ответов': 'No answers yet',
    'Пройдите упражнение или тест — статистика появится здесь':
        'Complete an exercise or a test — statistics will appear here',
    'Точность': 'Accuracy',
    'Всего ответов': 'Answers in total',
    'Правильных': 'Correct',
    'Неправильных': 'Wrong',
    'Уроков с ошибками': 'Lessons with mistakes',
    'Разобрать ошибки': 'Review mistakes',
    'Ошибок нет': 'No mistakes',
    'Отличная работа — разбирать пока нечего': 'Well done — there is nothing to review',
    'Очистить ошибки': 'Clear mistakes',
    'Все слова': 'All words',
    'Работа над ошибками': 'Working on mistakes',
    'Очистить список ошибок?': 'Clear the list of mistakes?',
    'Разбор ошибок будет удалён. Общая статистика ответов сохранится.':
        'The review of mistakes will be deleted. The overall statistics are kept.',
    'Очистить': 'Clear',
    'Список ошибок очищен': 'The list of mistakes has been cleared',
    'Сбросить прогресс?': 'Reset progress?',
    'Статистика ответов и список ошибок будут удалены безвозвратно.':
        'The statistics and the list of mistakes will be deleted permanently.',
    'Сбросить': 'Reset',
    'Прогресс сброшен': 'Progress has been reset',

    // ---------------------------------------------------------- результат
    'ОК': 'OK',
    'Результат': 'Result',
    ' из ': ' of ',
    'Разбор ошибок': 'Review of mistakes',
    ' → правильно: ': ' → correct: ',
    'ваш ответ: ': 'your answer: ',
    'Повторить ошибки': 'Repeat mistakes',

    // ---------------------------------------------------------- настройки
    'Язык': 'Language',
    'Язык интерфейса и уроков': 'The language of the interface and lessons',
    'Английский пока охватывает уроки 1–3: грамматику и словарь. Упражнения в нём недоступны.':
        'English currently covers lessons 1–3: grammar and vocabulary. Exercises are not available in it.',
    'Русский': 'Russian',
    'Курс': 'Course',
    'Сменить курс': 'Switch course',
    'Спрашивать': 'Ask',
    'Курс при запуске': 'Course at launch',
    'При запуске приложение будет спрашивать':
        'At launch the app will ask',
    'При запуске откроется ': 'At launch the app will open ',
    'Новый Завет по учебнику Мейчена': 'The New Testament with Machen’s textbook',
    'Пособие Новосибирской библейской семинарии':
        'The Novosibirsk Biblical Theological Seminary textbook',
    'Оформление': 'Appearance',
    'Тема оформления': 'Theme',
    'Системная': 'System',
    'Светлая': 'Light',
    'Тёмная': 'Dark',
    'Сепия': 'Sepia',
    'Тема следует за настройкой системы: сейчас ': 'The theme follows the system setting: currently ',
    'тёмная': 'dark',
    'светлая': 'light',
    'Тема выбрана вручную и не меняется вместе с системной.':
        'The theme is chosen manually and does not follow the system.',
    'Размер текста': 'Text size',
    'Текст изучаемого языка по умолчанию крупнее общего; кнопка рядом возвращает язык к общему размеру.':
        'The studied language is larger than the rest by default; the button next to it returns it to the general size.',
    'Общий': 'General',
    'задан отдельно': 'set separately',
    'как общий': 'as general',
    'Расширенные настройки': 'Advanced settings',
    'Вернуть к общему размеру': 'Reset to the general size',
    'Вернуть греческий к общему размеру': 'Reset Greek to the general size',
    'Вернуть еврейский к общему размеру': 'Reset Hebrew to the general size',
    'Шрифт': 'Font',
    'Шрифт интерфейса и русского текста. Греческий и еврейский остаются не меняются.':
        'The font of the interface and Russian text. Greek and Hebrew stay unchanged.',
    'Выбрать шрифт': 'Choose a font',
    'Системный': 'System',
    'Управление данными': 'Data management',
    'Прогресс хранится только в этом браузере и никуда не отправляется. Сброс удалит статистику ответов и список ошибок. Отменить это действие нельзя.':
        'Progress is stored only in this browser and is never sent anywhere. Resetting deletes the statistics and the list of mistakes. This cannot be undone.',
    'Сбросить прогресс': 'Reset progress',
    'Лицензии': 'Licenses',
    'Ниже — что и на каких условиях используется в приложении.':
        'Below: what is used in the app and under what terms.',
    'текст лицензии': 'licence text',
    'Поддержать проект': 'Support the project',
    'Приложение полностью бесплатное. Донат добровольный: он поддерживает время и работу разработчика.':
        'The app is completely free. Donations are voluntary: they support the developer’s time and work.',
    'Поддержать': 'Support',

    // ---------------------------------------------------------- стартовый экран
    'С чего начнём?': 'Where shall we start?',
    'Материал готовится': 'Material in preparation',
    'урок': 'lesson',

    // ---------------------------------------------------------- подсказки полей
    'Поиск урока или темы': 'Search lessons or a topic',
    'Поиск по урокам и темам': 'Search lessons and topics',
    'Очистить поиск': 'Clear the search',
    'Поиск по-гречески или по-русски': 'Search in Greek or Russian',
    'Поиск по-еврейски или по-русски': 'Search in Hebrew or Russian',
    'Поиск по словарю': 'Search the dictionary',
    'Клавиатура изучаемого языка': 'Keyboard of the studied language',
    'Часть речи': 'Part of speech',
    'Основная навигация': 'Main navigation',
    'Отмена': 'Cancel',
    'Удалить': 'Delete',
    'Открыт курс «': 'Course opened: “',

    // ---------------------------------------------------------- недоступно
    'Карточки пока не переведены на английский.':
        'Flashcards have not been translated into English yet.',
    'Разбор текста пока не переведён на английский.':
        'The text analysis has not been translated into English yet.'
};

// Перевод строки интерфейса. Ключ — русский текст, поэтому перевод виден на
// месте вызова: t('Уроки') читается как «Уроки, но на языке приложения».
function t(s) {
    if (appLang !== APP_LANG_EN || s == null) return s;
    return Object.prototype.hasOwnProperty.call(UI_EN, s) ? UI_EN[s] : s;
}

function isEnglish() { return appLang === APP_LANG_EN; }

// ------------------------------------------------------------ статическая разметка
//
// Текст в index.html написан по-русски и переводится один раз, до первой
// отрисовки. Узлы и атрибуты запоминаются вместе с исходным текстом: без этого
// возврат на русский не нашёл бы ключа — в узле уже стоит английская строка.
// Динамические экраны сюда не попадают: снимок делается до того, как что-либо
// отрисовано, поэтому содержимое уроков и списков не затрагивается.
let staticI18nNodes = null;

const STATIC_I18N_ATTRS = ['placeholder', 'aria-label', 'title', 'content'];

function staticKey(raw) {
    // В разметке длинная подпись бывает перенесена на другую строку с отступом;
    // ключом служит её текст с одиночными пробелами, иначе перевод не найдётся.
    return String(raw).replace(/\s+/g, ' ').trim();
}

function snapshotStaticI18n() {
    staticI18nNodes = [];
    let walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
        let key = staticKey(node.nodeValue);
        if (key && Object.prototype.hasOwnProperty.call(UI_EN, key)) {
            staticI18nNodes.push({ node: node, key: key });
        }
    }
    document.querySelectorAll('[placeholder],[aria-label],[title],[content]').forEach(el => {
        STATIC_I18N_ATTRS.forEach(attr => {
            if (!el.hasAttribute(attr)) return;
            let key = staticKey(el.getAttribute(attr));
            if (key && Object.prototype.hasOwnProperty.call(UI_EN, key)) {
                staticI18nNodes.push({ el: el, attr: attr, key: key });
            }
        });
    });
}

function applyStaticI18n() {
    if (!staticI18nNodes) return;
    staticI18nNodes.forEach(item => {
        let value = t(item.key);
        if (item.node) {
            let raw = item.node.nodeValue;
            let lead = raw.match(/^\s*/)[0];
            let trail = raw.match(/\s*$/)[0];
            item.node.nodeValue = lead + value + trail;
        } else {
            item.el.setAttribute(item.attr, value);
        }
    });
    // Язык страницы нужен для экранных дикторов и переносов: интерфейс русский
    // или английский, изучаемый язык помечается своими lang в разметке.
    document.documentElement.setAttribute('lang', appLang);
}

// ------------------------------------------------------------ состояние языка

function storedAppLang() {
    let saved = null;
    try { saved = localStorage.getItem(APP_LANG_KEY); } catch (e) {}
    return saved === APP_LANG_EN ? APP_LANG_EN : APP_LANG_RU;
}

// Вызывается из boot.js до первой отрисовки: снимок статической разметки должен
// быть сделан, пока в списках и карточках нет содержимого.
function initLanguage() {
    appLang = storedAppLang();
    snapshotStaticI18n();
    applyStaticI18n();
}

function setAppLang(lang) {
    if (lang !== APP_LANG_RU && lang !== APP_LANG_EN) return;
    if (lang === appLang) { syncLanguageControls(); return; }
    appLang = lang;
    try { localStorage.setItem(APP_LANG_KEY, lang); } catch (e) {}

    // Всё, что кешировалось по языку, недействительно: английский текст урока
    // приходит из оверлея, и словарь обязан собраться заново — иначе в нём
    // останутся русские значения прошлого языка.
    clearLocalizedLessonCache();
    allVocabCache = null;
    lessonSearchIndex = null;
    allFlashcardState = { words: [], index: 0, revealed: false, correct: 0, total: 0, type: 'all', mistakes: [] };
    flashcardState = { words: [], index: 0, revealed: false, correct: 0, total: 0, mistakes: [] };

    applyStaticI18n();
    applyCourseChrome();
    syncCourseControls();
    syncLanguageControls();
    renderMainMenu();
    updateShell();
    rerenderCurrentScreen();
}

function rerenderCurrentScreen() {
    switch (currentSectionId) {
        case 'mainMenu':
            renderMainMenu();
            break;
        case 'allVocabSection':
            showAllVocab(true);
            break;
        case 'statsSection':
            showStats();
            break;
        case 'errorsSection':
            showErrors();
            break;
        case 'settingsSection':
            showSettings();
            break;
        case 'lessonSection':
            openLesson(currentLesson, currentLessonPart);
            break;
        default:
            break;
    }
}

function syncLanguageControls() {
    let group = document.getElementById('appLangSegmented');
    if (group) {
        group.querySelectorAll('[data-app-lang]').forEach(b => {
            b.setAttribute('aria-checked',
                b.getAttribute('data-app-lang') === appLang ? 'true' : 'false');
        });
    }
    let hint = document.getElementById('appLangHint');
    if (hint) hint.textContent = t('Английский пока охватывает уроки 1–3: грамматику и словарь. Упражнения в нём недоступны.');
}

// ------------------------------------------------------------ текст уроков
//
// Английский урок — это оверлей поверх русского: заголовок, грамматика и
// значения слов. Всё остальное (номера, части речи, парадигмы) берётся из
// данных как есть. Урок либо переведён целиком, либо не переведён вовсе —
// поэтому полуанглийских экранов не бывает.

let localizedLessonCache = new Map();

function englishLessonPack(courseId, n) {
    if (!LESSONS_EN[courseId]) return null;
    return LESSONS_EN[courseId][n] || LESSONS_EN[courseId][String(n)] || null;
}

function hasEnglishLesson(courseId, n) {
    return !!englishLessonPack(courseId || currentCourseId, n);
}

function clearLocalizedLessonCache() {
    localizedLessonCache = new Map();
}

// Русский урок — канон. Английский возвращает копию с подменёнными полями;
// объект кешируется, потому что словарь и примеры употребления держат ссылки
// на словарные статьи и ждут, что статья — один и тот же объект.
function localizedLesson(base, n) {
    if (!isEnglish() || !base) return base;
    let key = currentCourseId + ':' + n;
    if (localizedLessonCache.has(key)) return localizedLessonCache.get(key);

    let pack = englishLessonPack(currentCourseId, n);
    if (!pack) {
        localizedLessonCache.set(key, base);
        return base;
    }
    let lesson = Object.assign({}, base);
    if (pack.title) lesson.title = pack.title;
    if (pack.grammar) lesson.grammar = pack.grammar;
    if (pack.vocabulary && base.vocabulary) {
        lesson.vocabulary = base.vocabulary.map(word => {
            let gloss = pack.vocabulary[word.greek];
            if (gloss == null) return word;
            return Object.assign({}, word, { translation: gloss });
        });
    }
    localizedLessonCache.set(key, lesson);
    return lesson;
}

// ------------------------------------------------------------ составные подписи
//
// Строки с числом не переводятся точным совпадением: собранная «Урок 5» не
// равна ключу «Урок ». Такие подписи собираются здесь, чтобы форма была одна
// на все места.

function tLessonNumber(n) { return isEnglish() ? 'Lesson ' + n : 'Урок ' + n; }

function tLessonRange(a, b) {
    return isEnglish() ? 'Lessons ' + a + '–' + b : 'Уроки ' + a + '–' + b;
}

function tMatches(n) { return isEnglish() ? 'Matches: ' + n : 'Совпадения: ' + n; }

function tCountLabel(count, unit) {
    return isEnglish() ? count + ' ' + unit + (count === 1 ? '' : 's')
                       : count + ' ' + pluralRu(count, unit, unit + 'а', unit + 'ов');
}

function tOf(value, total) { return value + t(' из ') + total; }
