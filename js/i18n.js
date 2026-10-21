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

// Английский текст проверяемых ответов: ключевые слова перевода, условия
// заданий и предложения уроков. Отдельный файл, потому что это не материал
// урока, а данные упражнений, и переводить их можно по одному упражнению за
// раз — недопереведённое упражнение просто не показывается (см.
// englishDrillReady).
const EXERCISES_EN = {
    greek: EXERCISES_EN_GREEK,
    hebrew: EXERCISES_EN_HEBREW
};

// Английский разбор текста по курсам: «Отче наш» и чтение Бытия. Файлы
// генерируются из русских данных (tools/en-build/reading.js), поэтому порядок
// стихов, слов и кусков стиха в них тот же, что в источнике, — оверлей
// накладывается по месту, а не по ключу.
const PRAYERS_EN = {
    greek: typeof PRAYER_EN !== 'undefined' ? PRAYER_EN : null,
    hebrew: typeof HEBREW_READING_EN !== 'undefined' ? HEBREW_READING_EN : null
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
    'Вопрос': 'Question',
    'Слово': 'Word',
    'Карточка': 'Card',
    'Огласовка': 'Vowel sign',
    'Форма': 'Form',
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

    // ---------------------------------------------------------- парадигмы
    // Подписи осей и переводы строк — это русские строки из данных, а не
    // разметки: греческие оси собирает legacyParadigm() в js/declension.js,
    // ивритские написаны в data/hebrew-lessons.js. Словарь закрытый — это
    // термины парадигмы и два десятка местоимений, — поэтому переводить их
    // здесь, а данные не трогать.
    'Падеж': 'Case',
    'Лицо': 'Person',
    'Перевод': 'Translation',
    'Ед.ч.': 'Singular',
    'Ед. число': 'Singular',
    'Мн.ч.': 'Plural',
    'Множ. число': 'Plural',
    'Муж.': 'Masc.',
    'Муж. род': 'Masc.',
    'Муж. (мн.)': 'Masc. pl.',
    'Жен.': 'Fem.',
    'Жен. род': 'Fem.',
    'Жен. (мн.)': 'Fem. pl.',
    'Ср.': 'Neut.',
    'Ср. (мн.)': 'Neut. pl.',
    '1-е лицо': '1st person',
    '2-е лицо': '2nd person',
    '3-е лицо': '3rd person',
    'я': 'I',
    'ты': 'you (sg.)',
    'он / она / оно есть': 'he / she / it is',
    'мы': 'we',
    'вы': 'you (pl.)',
    'они': 'they',
    'меня': 'me',
    'тебя': 'you (sg.)',
    'его / её': 'him / her',
    'нас': 'us',
    'вас': 'you (pl.)',
    'их': 'them',
    'мне': 'to me',
    'тебе': 'to you (sg.)',
    'ему / ей': 'to him / her',
    'нам': 'to us',
    'вам': 'to you (pl.)',
    'им': 'to them',
    'я есмь': 'I am',
    'ты еси': 'you are',
    'сам / сама / само': 'himself / herself / itself',
    'сами': 'themselves',

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

    // ---------------------------------------------------------- упражнения
    // Экран упражнения, теста и карточек. Вопросы видов собраны ниже
    // отдельным блоком: это подписи над вариантами, а не оболочка.
    'Нет вопросов.': 'No questions.',
    'Нет упражнений.': 'No exercises.',
    'Нет слов.': 'No words.',
    'Нет огласовок.': 'No vowel signs.',
    'Огласовок пока нет': 'No vowel signs yet',
    'Слов пока нет': 'No words yet',
    'Тип упражнения не поддерживается.': 'This exercise type is not supported.',
    'Неизвестный тип вопроса.': 'Unknown question type.',
    'Для этого урока вопросов пока нет': 'There are no questions for this lesson yet',
    'вопрос': 'question',
    'Упражнение завершено': 'Exercise complete',
    'Тест завершён': 'Test complete',
    'Проверка завершена': 'Review complete',
    'Карточки завершены': 'Flashcards complete',
    'Огласовки завершены': 'Vowel signs complete',
    'Проверка всех слов': 'All words review',
    'Ещё раз': 'Again',
    'Повторить': 'Repeat',
    'Проверить': 'Check',
    'Готово': 'Done',
    'Далее': 'Next',
    // Подсказка в поле сборки предложения: текст лежит в data-hint, потому что
    // CSS не переводится (styles/components.css, .build-area:empty::before).
    'Выберите слова по порядку': 'Choose the words in order',
    'К упражнениям': 'Back to exercises',
    'К уроку': 'Back to the lesson',
    'К урокам': 'Back to lessons',
    'Знаю': 'I know',
    'Не знаю': 'I don’t know',
    'Показать перевод': 'Show translation',
    'Показать ответ': 'Show answer',
    'Верно!': 'Correct!',
    'Верно': 'Correct',
    'Неверно. Правильный ответ: ': 'Wrong. The correct answer is: ',
    'Неверно. Ключевые слова: ': 'Wrong. Keywords: ',
    'Неверно. Правильно: ': 'Wrong. Correct: ',
    'Неверно. Правильный порядок: ': 'Wrong. The correct order is: ',
    'Что-то пошло не так. Начните упражнение заново.':
        'Something went wrong. Start the exercise again.',
    'Нажмите, чтобы убрать слово': 'Tap to remove the word',
    'Переведите на русский': 'Translate into English',
    'Переведите на ': 'Translate into ',
    'Нарисуйте знак огласовки': 'Draw the vowel sign',
    'Поле для письма буквы': 'Letter writing field',
    'Поле для знака огласовки': 'Vowel sign writing field',
    'Выберите стиль написания': 'Choose a writing style',
    'Печатные': 'Print',
    'Курсив': 'Cursive',
    'Тренировать формы слова': 'Practise the word forms',
    'Вернуться к слову': 'Back to the word',
    'вернулись переписать': 'went back to rewrite',
    'не знал': 'did not know',

    // ---------------------------------------------------------- вопросы видов
    // Подписи из EXERCISE_TYPES: у каждой есть продолжение, собранное кодом
    // вокруг слова изучаемого языка, поэтому ключ — только постоянная часть.
    'Как называется эта буква?': 'What is this letter called?',
    'Какая буква так называется?': 'Which letter is called that?',
    'Как произносится эта буква?': 'How is this letter pronounced?',
    'Какая буква идёт следом?': 'Which letter comes next?',
    'Какая строчная буква соответствует прописной?': 'Which lowercase letter matches the capital?',
    'Какая прописная буква соответствует строчной?': 'Which capital letter matches the lowercase?',
    'Как произносится этот дифтонг?': 'How is this diphthong pronounced?',
    'Какое придыхание при этой гласной?': 'Which breathing does this vowel carry?',
    'Какое ударение на этой гласной?': 'Which accent does this vowel carry?',
    'Выберите конечную форму буквы': 'Choose the final form of the letter',
    'Вставьте форму для <b>': 'Insert the form for <b>',
    '</b> для слова ': '</b> of the word ',
    'Определите падеж и число для формы: ': 'Identify the case and number of the form: ',
    'Вставьте прилагательное ': 'Insert the adjective ',
    ' в правильной форме:<br>': ' in the correct form:<br>',
    'Определите, атрибутив или предикатив:<br>': 'Decide whether it is attributive or predicative:<br>',
    'Что означает:<br>': 'What does this mean:<br>',
    'Вставьте правильную форму артикля:<br>': 'Insert the correct form of the article:<br>',
    'Как называется этот знак?': 'What is this sign called?',
    'Какой звук обозначает этот знак?': 'Which sound does this sign stand for?',
    'Какого знака огласовки не хватает?': 'Which vowel sign is missing?',
    'Как читается шва': 'How is the shewa read',
    ' под буквой ': ' under the letter ',
    'Какой дагеш стоит в букве ': 'Which dagesh is in the letter ',
    'Камец или камец хатуф': 'Qamets or qamets hatuf',
    'Определите род и число': 'Identify the gender and number',
    'Как произносится буква ': 'How is this letter pronounced: ',
    'Разделите слово на слоги': 'Divide the word into syllables',
    'Что произошло с артиклем?': 'What happened to the article?',
    'Сочетание определённое или неопределённое?': 'Is the construct definite or indefinite?',
    'Суффикс какого типа?': 'Which type of suffix is it?',

    // ---------------------------------------------------------- варианты
    // Постоянные наборы вариантов из EXERCISE_TYPES и подписи, которые
    // приходят из данных (падеж и число, род и число): правильный ответ
    // переводится тем же словарём, иначе выбранная кнопка не совпадёт с ним.
    'Густое (с [х])': 'Rough (with [h])',
    'Тонкое (не произносится)': 'Smooth (not pronounced)',
    'Острое': 'Acute',
    'Тупое': 'Grave',
    'Облеченное': 'Circumflex',
    '«Немое» шва': 'Silent shewa',
    '«Произносимое» шва': 'Vocal shewa',
    '«Слабый» дагеш': 'Dagesh lene',
    '«Сильный» дагеш': 'Dagesh forte',
    'Камец — долгий ā': 'Qamets — long ā',
    'Камец хатуф — краткий o': 'Qamets hatuf — short o',
    'Муж. р., ед. ч.': 'Masc. sg.',
    'Муж. р., мн. ч.': 'Masc. pl.',
    'Жен. р., ед. ч.': 'Fem. sg.',
    'Жен. р., мн. ч.': 'Fem. pl.',
    'Двойственное число': 'Dual',
    'Обычное удвоение': 'Ordinary doubling',
    'Заместительное удлинение': 'Compensatory lengthening',
    'Скрытое удвоение гортанного': 'Virtual doubling of a guttural',
    'Неправильный сегол': 'Irregular segol',
    'Определённое': 'Definite',
    'Неопределённое': 'Indefinite',
    'Тип 1 — существительное ед. ч.': 'Type 1 — singular noun',
    'Тип 2 — существительное мн. ч.': 'Type 2 — plural noun',
    '1-е л. ед.ч.': '1st sg.',
    '2-е л. ед.ч.': '2nd sg.',
    '3-е л. ед.ч.': '3rd sg.',
    '1-е л. мн.ч.': '1st pl.',
    '2-е л. мн.ч.': '2nd pl.',
    '3-е л. мн.ч.': '3rd pl.',

    // ---------------------------------------------------------- греческая грамматика
    // Ответы видов о формах. Подписи лица и числа, «атрибутив / предикатив» и
    // значения субстантивированных прилагательных — закрытый набор: он лежит
    // в данных русскими строками, а упражнение сверяет ответ с текстом кнопки,
    // поэтому переводится тот же ключ, что и у варианта.
    'атрибутив': 'attributive',
    'предикатив': 'predicative',
    'Определение (атрибутив)': 'modifier (attributive)',
    'Сказуемое (предикатив)': 'predicate (predicative)',
    // Субстантивация: оборот «the X (people / thing)» — тот, которым эти же
    // примеры напечатаны в грамматике урока 6 («the good (people)»,
    // «the beautiful (thing)»).
    'хорошие (люди)': 'the good (people)',
    'хорошие (вещи)': 'the good (things)',
    'хорошие (женщины)': 'the good (women)',
    'добро': 'the good',
    'красивое (дело/вещь)': 'the beautiful (thing)',
    'красивый (человек)': 'the beautiful (man)',
    'красивая (женщина)': 'the beautiful (woman)',
    'красота': 'beauty',
    'мёртвые (люди)': 'the dead (people)',
    'мёртвое (дело)': 'the dead (thing)',
    'мёртвая (женщина)': 'the dead (woman)',
    'смерть': 'death',
    'злые (люди)': 'the evil (people)',
    'злое (дело)': 'the evil (thing)',
    'злая (женщина)': 'the evil (woman)',
    'зло': 'evil',
    'последнее (то, что в конце)': 'the last (thing)',
    'последние (люди)': 'the last (people)',
    'последняя (женщина)': 'the last (woman)',
    'конец': 'the end',
    'первый (человек)': 'the first (person)',
    'первое (дело)': 'the first (thing)',
    'первая (женщина)': 'the first (woman)',
    'начало': 'the beginning',
    'верные (женщины)': 'the faithful (women)',
    'верные (мужчины)': 'the faithful (men)',
    'верное (дело)': 'the faithful (thing)',
    'вера': 'faith',
    'малое (то, что мало)': 'the small (thing)',
    'малые (люди)': 'the small (people)',
    'малая (женщина)': 'the small (woman)',
    'малость': 'smallness',
    // Глоссы слов-парадигм, которых нет в словаре курса: подсказка в вопросе
    // о форме. Обороты взяты из английских подписей парадигм тех же уроков
    // («I untie myself / I am untied», «I shall set myself free (mid.)»).
    'развязываюсь': 'I untie myself / I am untied',
    'освобождаюсь (Fut.)': 'I set myself free (fut.)',
    'развязываюсь (Aor.)': 'I untied myself (aor.)',
    'покидаю (себя)': 'I leave (for myself)',
    'освобождаю (Fut.)': 'I set free (fut.)',
    'развязываю (Aor.)': 'I untied (aor.)',
    'развязываю (Aor. pass.)': 'I was untied (aor.)',
    'развязываю (Fut. pass.)': 'I shall be untied (fut.)',
    'эта': 'this (f.)', 'это': 'this (n.)', 'та': 'that (f.)', 'то': 'that (n.)',

    // ---------------------------------------------------------- алфавит и чтение
    // Названия букв и огласовок повторяют английский материал урока, а не
    // научную транслитерацию: в таблице главы 2 уже стоят patach, qamets,
    // shureq, а в таблице главы 1 — aleph, khet, tsade. Упражнение и материал
    // об одном и том же не могут называть это по-разному. Звуки греческого —
    // из колонки «Звук» урока 1, дифтонги — из строки дифтонгов (там же [üi],
    // [au], [eu]).
    'альфа': 'alpha', 'бета': 'beta', 'гамма': 'gamma', 'дельта': 'delta',
    'эпсилон': 'epsilon', 'дзета': 'zeta', 'эта': 'eta', 'тета': 'theta',
    'йота': 'iota', 'каппа': 'kappa', 'лямбда': 'lambda', 'мю': 'mu',
    'ню': 'nu', 'кси': 'xi', 'омикрон': 'omicron', 'пи': 'pi', 'ро': 'rho',
    'сигма': 'sigma', 'тау': 'tau', 'ипсилон': 'upsilon', 'фи': 'phi',
    'хи': 'chi', 'пси': 'psi', 'омега': 'omega',
    '[а]': '[a]', '[в]': '[v]', '[г]': '[g]', '[д]': '[d]', '[э]': '[e]',
    '[дз]': '[dz]', '[э] (долгий)': '[e] (long)', '[т] (придыхательный)': '[t] (aspirated)',
    '[и]': '[i]', '[к]': '[k]', '[л]': '[l]', '[м]': '[m]', '[н]': '[n]',
    '[кс]': '[ks]', '[о]': '[o]', '[п]': '[p]', '[р]': '[r]', '[с]': '[s]',
    '[т]': '[t]', '[ю] (как нем. ü)': '[ü] (as German ü)', '[ф]': '[f]',
    '[х]': '[kh]', '[пс]': '[ps]', '[о] (долгий)': '[o] (long)',
    '[ай]': '[ai]', '[эй]': '[ei]', '[ой]': '[oi]', '[юй]': '[üi]',
    '[ав]': '[au]', '[эв]': '[eu]', '[у]': '[u]',
    // Еврейские буквы — колонки «Название» и «Звук» таблицы главы 1.
    'а́леф': 'aleph', 'бет': 'bet', 'ги́мел': 'gimel', 'да́лет': 'dalet',
    'хе': 'he', 'вав': 'waw', 'за́йин': 'zayin', 'хет': 'khet', 'тет': 'tet',
    'йод': 'yod', 'каф': 'kaf', 'ла́мед': 'lamed', 'мем': 'mem', 'нун': 'nun',
    'са́мех': 'samekh', 'а́йин': 'ayin', 'пе': 'pe', 'ца́де': 'tsade',
    'коф': 'qof', 'реш': 'resh', 'син / шин': 'sin / shin', 'тав': 'taw',
    // Колода письма держит ש двумя буквами, и спрашивает она каждую по имени:
    // «син» и «шин» — отдельные ключи, а не половинки «син / шин».
    'син': 'sin', 'шин': 'shin',
    'не произносится': 'silent', 'б / в': 'b / v', 'г': 'g', 'д': 'd',
    'х': 'kh', 'в': 'v', 'з': 'z', 'т': 't', 'й': 'y', 'к / х': 'k / kh',
    'л': 'l', 'м': 'm', 'н': 'n', 'с': 's', 'п / ф': 'p / f', 'ц': 'ts',
    'к': 'k', 'р': 'r', 'с / ш': 's / sh',
    // Огласовки — имена из таблицы главы 2.
    'патах': 'patach', 'сегол': 'segol', 'хирек': 'hireq', 'киббуц': 'qibbuts',
    'камец': 'qamets', 'цере': 'tsere', 'холем': 'holem',
    'камец хе': 'qamets he', 'цере йод': 'tsere yod', 'хирек йод': 'hireq yod',
    'холем вав': 'holem waw', 'шурек': 'shureq',
    'хатеф-патах': 'hateph patach', 'хатеф-сегол': 'hateph segol',
    'хатеф-камец': 'hateph qamets', 'шва': 'shewa',
    // Бегадкефат: звук и характер согласного. «Смычный» и «щелевой» — это
    // stop и fricative из грамматики главы 1.
    '(б) b, смычное': '(b) b, stop', '(в) ḇ, щелевое': '(v) ḇ, fricative',
    '(г) g, смычное': '(g) g, stop', '(г) ḡ, щелевое': '(g) ḡ, fricative',
    '(д) d, смычное': '(d) d, stop', '(д) ḏ, щелевое': '(d) ḏ, fricative',
    '(к) k, смычное': '(k) k, stop', '(х) ḵ, щелевое': '(kh) ḵ, fricative',
    '(п) p, смычное': '(p) p, stop', '(ф) p̄, щелевое': '(f) p̄, fricative',
    '(т) t, смычное': '(t) t, stop', '(т) ṯ, щелевое': '(t) ṯ, fricative',
    // Значения слов в вопросе о пропущенной огласовке — подсказка, а не ответ.
    'слово': 'word', 'царь': 'king', 'книга': 'book',

    // ---------------------------------------------------------- список упражнений
    // Группы и пункты LESSON_DRILL_GROUPS (js/lesson.js). «русский» в подписи
    // направления — это язык ответа, а не интерфейса: в английском режиме он
    // английский, и подпись читается «Phrases: Greek → English».
    'Алфавит и чтение': 'Alphabet and reading',
    'Огласовка и чтение': 'Vowel points and reading',
    'Формы и грамматика': 'Forms and grammar',
    'Слова': 'Vocabulary',
    'Название буквы': 'Letter name',
    'Написание буквы': 'Writing the letter',
    'Буква по названию': 'Letter from its name',
    'Произношение буквы': 'Letter pronunciation',
    'Порядок букв': 'Letter order',
    'Прописная → строчная': 'Capital → lowercase',
    'Строчная → прописная': 'Lowercase → capital',
    'Дифтонги': 'Diphthongs',
    'Придыхание': 'Breathing',
    'Знаки ударения': 'Accent marks',
    'Конечные формы': 'Final forms',
    'Карточки огласовок': 'Vowel sign cards',
    'Названия огласовок': 'Vowel sign names',
    'Звук огласовки': 'Vowel sign sound',
    'Написание огласовки': 'Writing the vowel sign',
    'Пропущенная огласовка': 'Missing vowel sign',
    'Шва: немое или произносимое': 'Shewa: silent or vocal',
    'Дагеш: слабый или сильный': 'Dagesh: lene or forte',
    'Камец и камец хатуф': 'Qamets and qamets hatuf',
    'Бегадкефат': 'Begadkefat',
    'Слогораздел': 'Syllabification',
    'Падеж и число': 'Case and number',
    'Согласование': 'Agreement',
    'Атрибут / предикатив': 'Attributive / predicative',
    'Субстантивация': 'Substantivisation',
    'Артикль': 'Article',
    'Род и число': 'Gender and number',
    'Артикль и гортанные': 'Article and gutturals',
    'Сопряжённое сочетание': 'Construct chain',
    'Местоимённые суффиксы': 'Pronominal suffixes',
    // Один и тот же термин стоит в грамматике («Местоимённые суффиксы») и в
    // подписи упражнения («Местоименные суффиксы», без ё): ключ — сама строка,
    // поэтому без второй записи подпись молча оставалась русской.
    'Местоименные суффиксы': 'Pronominal suffixes',
    'Фразы: {lang} → русский': 'Phrases: {lang} → English',
    'Фразы: русский → {lang}': 'Phrases: English → {lang}',
    'Предложения: {lang} → русский': 'Sentences: {lang} → English',
    'Предложения: русский → {lang}': 'Sentences: English → {lang}',
    'случайный вопрос': 'random question',
    'случайных вопроса': 'random questions',
    'случайных вопросов': 'random questions',
    ' по уроку': ' in the lesson',

    // ---------------------------------------------------------- настройки
    'Язык': 'Language',
    'Язык интерфейса и уроков': 'The language of the interface and lessons',
    'Английский охватывает материал всех уроков: грамматику и словарь. Упражнения в нём недоступны.':
        'English covers the material of every lesson: grammar and vocabulary. Exercises are not available in it.',
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

    // ---------------------------------------------------------- разбор текста
    // Подписи экрана «Отче наш» / чтения Бытия. Сам текст разбора английский
    // лежит в data/prayer.en.js и data/hebrew-reading.en.js: это материал, а не
    // оболочка. Здесь только строки, написанные в коде.
    'Нажмите на любое слово, чтобы увидеть разбор формы.':
        'Tap any word to see the analysis of its form.',
    'Заполни пропуски': 'Fill in the blanks',
    'Перевод на ': 'Translation into ',
    'Соберите перевод на ': 'Build the translation into ',
    ' из слов': ' from the words',
    'День': 'Day',
    'Неверно. Правильный порядок:': 'Not quite. The correct order:'
};

// Перевод строки интерфейса. Ключ — русский текст, поэтому перевод виден на
// месте вызова: t('Уроки') читается как «Уроки, но на языке приложения».
function t(s) {
    if (appLang !== APP_LANG_EN || s == null) return s;
    return Object.prototype.hasOwnProperty.call(UI_EN, s) ? UI_EN[s] : s;
}

function isEnglish() { return appLang === APP_LANG_EN; }

// Чтение слова иврита записано как «русскими (latin)»: «давáр (dāḇār)». Русская
// половина нужна русскому читателю, английскому — нет, и в скобках уже стоит
// транслитерация учебника. Английский режим оставляет её одну: это то же
// чтение, а не второй его вариант, поэтому ничего не приходится выдумывать.
// Форма строки проверена на всех 179 статьях (tests/i18n.test.js).
function displayTranslit(value) {
    if (!value || !isEnglish()) return value;
    let m = /\(([^()]+)\)\s*$/.exec(value);
    return m ? m[1] : value;
}

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
    clearLocalizedPrayerCache();
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
        case 'prayerSection':
            // Разбор текста — тоже переведённый материал, и его кеш только что
            // сброшен: без перерисовки на экране остался бы прошлый язык.
            showPrayer();
            break;
        default:
            break;
    }
}

function syncLanguageControls() {
    let group = document.getElementById('appLangSegmented');
    if (group) {
        // Подложка выбранного языка едет по data-lang, а не по inline-стилю:
        // положение — часть состояния, как data-theme у темы. Иначе после
        // перезагрузки в английском режиме подложка стояла бы под русским.
        group.setAttribute('data-lang', appLang);
        group.querySelectorAll('[data-app-lang]').forEach(b => {
            b.setAttribute('aria-checked',
                b.getAttribute('data-app-lang') === appLang ? 'true' : 'false');
        });
    }
    let hint = document.getElementById('appLangHint');
    if (hint) hint.textContent = t('Английский охватывает материал всех уроков: грамматику и словарь. Упражнения в нём недоступны.');
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
            // Греческое слово-заголовок бывает с пометкой по-русски («Fut. от
            // διώκω»); английский заголовок лежит в pack.headwords под исходным.
            let head = pack.headwords && pack.headwords[word.greek];
            if (gloss == null && head == null) return word;
            let copy = Object.assign({}, word);
            if (gloss != null) copy.translation = gloss;
            if (head != null) copy.greek = head;
            return copy;
        });
    }
    applyExercisesEn(lesson, base, n);
    localizedLessonCache.set(key, lesson);
    return lesson;
}

function exercisesEnPack(courseId, n) {
    let pack = EXERCISES_EN[courseId || currentCourseId];
    return (pack && (pack[n] || pack[String(n)])) || null;
}

// ------------------------------------------------------------ разбор текста
//
// Русский разбор — канон, английский лежит поверх него: заголовок, книга,
// название перевода, дни, стихи, куски стихов и разбор каждого слова.
// Изучаемый язык (греческий текст, иврит, его чтение) не переводится вовсе —
// он берётся из источника как есть, поэтому оверлей трогает только русские
// поля. Кеш — на курс: он говорит на одном языке и живёт до смены языка.
let localizedPrayerCache = new Map();

function clearLocalizedPrayerCache() {
    localizedPrayerCache = new Map();
}

function localizedPrayer(base) {
    if (!isEnglish() || !base) return base;
    let pack = PRAYERS_EN[currentCourseId];
    if (!pack) return base;
    if (localizedPrayerCache.has(currentCourseId)) return localizedPrayerCache.get(currentCourseId);

    let out = Object.assign({}, base);
    if (pack.title) out.title = pack.title;
    if (pack.book) out.book = pack.book;
    if (pack.source) out.source = pack.source;
    if (Array.isArray(pack.days) && Array.isArray(base.days)) {
        out.days = base.days.map((day, i) => Object.assign({}, day, {
            title: pack.days[i] == null ? day.title : pack.days[i]
        }));
    }
    if (Array.isArray(pack.verses) && Array.isArray(base.verses)) {
        out.verses = base.verses.map((verse, i) => {
            let en = pack.verses[i];
            if (!en) return verse;
            let copy = Object.assign({}, verse);
            if (en.russian != null) copy.russian = en.russian;
            if (Array.isArray(en.segments) && Array.isArray(verse.segments)) {
                copy.segments = verse.segments.map((segment, j) => {
                    let prompt = en.segments[j] && en.segments[j].russian;
                    return prompt == null ? segment : Object.assign({}, segment, { russian: prompt });
                });
            }
            if (Array.isArray(en.words) && Array.isArray(verse.words)) {
                copy.words = verse.words.map((word, j) => {
                    let w = en.words[j];
                    if (!w) return word;
                    let local = Object.assign({}, word);
                    if (w.translation != null) local.translation = w.translation;
                    if (w.analysis != null) local.analysis = w.analysis;
                    return local;
                });
            }
            return copy;
        });
    }
    localizedPrayerCache.set(currentCourseId, out);
    return out;
}

// Проверяемые ответы переводятся по ключу, а не по месту в массиве: ключ —
// русский (или греческий) текст условия, он и есть то, что переводится.
// Вопроc без перевода остаётся русским, и тогда englishDrillReady() не пустит
// это упражнение на экран.
function applyExercisesEn(lesson, base, n) {
    let pack = exercisesEnPack(currentCourseId, n);
    if (!pack) return;
    // Какие упражнения переведены целиком. Список живёт на самом английском
    // уроке: lessonDrillAvailable() получает уже готовый объект и по нему
    // решает, показывать ли пункт. Недопереведённое упражнение не рисуется
    // вовсе, а не проверяет ответы не на том языке.
    let ready = lesson._englishDrills = {};
    let covered = (list, map, keyOf) => !Array.isArray(list) || list.length === 0 ||
        (!!map && list.every(q => map[keyOf(q)] != null));
    ready['exercise:translate_greek_to_russian'] = covered(
        base.exercises && base.exercises.translate_greek_to_russian,
        pack.exercises && pack.exercises.translate_greek_to_russian,
        q => q.greek);
    ready['exercise:translate_russian_to_greek'] = covered(
        base.exercises && base.exercises.translate_russian_to_greek,
        pack.exercises && pack.exercises.translate_russian_to_greek,
        q => q.russian);
    ready['translation:el_to_ru'] = covered(
        base.translation && base.translation.el_to_ru,
        pack.translation && pack.translation.el_to_ru,
        q => q.source);
    ready['translation:ru_to_el'] = covered(
        base.translation && base.translation.ru_to_el,
        pack.translation && pack.translation.ru_to_el,
        q => q.source);
    if (pack.exercises && base.exercises) {
        let out = {};
        Object.keys(base.exercises).forEach(kind => {
            let map = pack.exercises[kind];
            let src = base.exercises[kind];
            if (!map || !Array.isArray(src)) return;
            let isPrompt = kind === 'translate_russian_to_greek';
            out[kind] = src.map(q => {
                let value = map[isPrompt ? q.russian : q.greek];
                if (value == null) return q;
                let copy = Object.assign({}, q);
                // Условие рисуется как текст, а не как набор слов: массив,
                // положенный в шаблон, склеился бы через запятую («he,writes»).
                // Ключевые слова остаются массивом — по ним идёт сверка.
                if (isPrompt) copy.russian = value.join(' ');
                else copy.keywords = value.slice();
                return copy;
            });
        });
        lesson.exercises = Object.assign({}, base.exercises, out);
    }
    if (pack.translation && base.translation) {
        let out = {};
        Object.keys(base.translation).forEach(dir => {
            let map = pack.translation[dir];
            let src = base.translation[dir];
            if (!map || !Array.isArray(src)) return;
            out[dir] = src.map(q => {
                let value = map[q.source];
                if (value == null) return q;
                // Условие обратного перевода — текст на экране; ответ
                // (el_to_ru) собирается из фишек, поэтому остаётся массивом.
                if (dir === 'ru_to_el') return Object.assign({}, q, { source: value.join(' ') });
                let copy = Object.assign({}, q);
                copy.correct = value.slice();
                // Исходное предложение до разбора на слова — из него словарь
                // берёт пример употребления (js/vocab.js). Пакет хранит слова
                // без хвостовой пунктуации (её снимает сборка, как это делает
                // boot.js с русским ответом), а примеру точка нужна.
                let text = value.join(' ');
                copy.correctText = /[.!?]$/.test(text) ? text : text + '.';
                return copy;
            });
        });
        lesson.translation = Object.assign({}, base.translation, out);
    }
}

// Есть ли у упражнения английский текст целиком. Виды без проверяемых русских
// ответов (алфавит, грамматика, карточки) готовы всегда: их подписи в UI_EN.
function englishDrillReady(n, drill) {
    if (!drill) return false;
    let lesson = courseLessons()[n];
    let pack = exercisesEnPack(currentCourseId, n);
    if (!lesson || !pack) return false;
    if (drill.kind === 'exercise') {
        let src = (lesson.exercises || {})[drill.key];
        if (!Array.isArray(src) || !src.length) return false;
        if (drill.key !== 'translate_greek_to_russian' && drill.key !== 'translate_russian_to_greek') return true;
        let map = (pack.exercises || {})[drill.key] || {};
        let isPrompt = drill.key === 'translate_russian_to_greek';
        return src.every(q => map[isPrompt ? q.russian : q.greek] != null);
    }
    if (drill.kind === 'translation') {
        let src = (lesson.translation || {})[drill.key];
        if (!Array.isArray(src) || !src.length) return false;
        let map = (pack.translation || {})[drill.key] || {};
        return src.every(q => map[q.source] != null);
    }
    return true;
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

// Надпись хода упражнения: «Упражнение 3 из 10». Слово-название — русское,
// как и весь остальной текст в коде; переводится оно здесь же, а «из» —
// общий ключ, тот же, что у tOf.
function tProgress(noun, value, total) { return t(noun) + ' ' + value + t(' из ') + total; }

// «День 3» в чипах и на кнопках перехода по дням: число подставляется, поэтому
// точным ключом строку не перевести.
function tPrayerDay(n) { return t('День') + ' ' + n; }
