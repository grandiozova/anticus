// ============================================================
// ЛИЦЕНЗИИ
// ============================================================

// Условия на всё, из чего собрано приложение. Открытая лицензия здесь не у
// всего: собственный код закрыт, а учебники — это права правообладателей.
// Открытые лицензии идут в середине, между своим кодом и учебниками.
const LICENSES = [
    {
        name: 'Код приложения',
        nameEn: 'Application code',
        terms: '© 2026 Александра Морозова, Марк Ингрэм. Все права защищены. ' +
               'Открытая лицензия не предоставляется: код опубликован для ознакомления.',
        termsEn: '© 2026 Alexandra Morozova, Mark Ingram. All rights reserved. ' +
                 'No open licence is granted: the code is published for inspection.',
        url: null
    },
    {
        name: 'Noto Sans, Noto Serif, Noto Serif Hebrew',
        terms: 'SIL Open Font License 1.1 © Google',
        url: 'https://openfontlicense.org/'
    },
    {
        name: 'Gveret Levin',
        terms: 'SIL Open Font License 1.1 © AlefAlefAlef',
        url: 'https://github.com/AlefAlefAlef/gveret-levin'
    },
    {
        name: 'Material Symbols Rounded',
        terms: 'Apache License 2.0 © Google',
        url: 'https://www.apache.org/licenses/LICENSE-2.0'
    },
    {
        name: 'Material Design 3',
        terms: 'Apache License 2.0 © Google',
        url: 'https://m3.material.io/'
    },
    {
        name: 'Open Scriptures Hebrew Bible (OSHB)',
        terms: 'Текст Westminster Leningrad Codex — общественное достояние. ' +
               'Леммы и морфология — Creative Commons Attribution 4.0 ' +
               '© Open Scriptures Hebrew Bible Project.',
        termsEn: 'The Westminster Leningrad Codex text is in the public domain. ' +
                 'Lemmas and morphology: Creative Commons Attribution 4.0 ' +
                 '© Open Scriptures Hebrew Bible Project.',
        url: 'https://github.com/openscriptures/morphhb'
    },
    {
        name: 'PT Sans',
        terms: 'SIL Open Font License 1.1 © ParaType',
        url: 'https://openfontlicense.org/'
    },
    {
        name: 'PT Serif',
        terms: 'SIL Open Font License 1.1 © ParaType',
        url: 'https://openfontlicense.org/'
    },
    {
        name: 'Noto Sans (шрифт интерфейса)',
        nameEn: 'Noto Sans (interface font)',
        terms: 'SIL Open Font License 1.1 © Google / The Noto Project',
        url: 'https://openfontlicense.org/'
    },
    {
        name: 'Inter',
        terms: 'SIL Open Font License 1.1 © Rasmus Andersson',
        url: 'https://openfontlicense.org/'
    },
    {
        name: 'Literata',
        terms: 'SIL Open Font License 1.1 © TypeTogether',
        url: 'https://openfontlicense.org/'
    },
    {
        name: 'Source Serif 4',
        terms: 'SIL Open Font License 1.1 © Adobe',
        url: 'https://openfontlicense.org/'
    },
    {
        name: 'Синодальный перевод Библии',
        nameEn: 'Synodal translation of the Bible',
        terms: 'Русский текст Бытия 1:1–5 и стихов-примеров в словаре — ' +
               'Синодальный перевод, общественное достояние.',
        termsEn: 'The Russian text of Genesis 1:1–5 and of the example verses in the ' +
                 'dictionary is the Synodal translation, in the public domain.',
        url: null
    },
    {
        name: 'Учебные материалы: греческий',
        nameEn: 'Course materials: Greek',
        terms: 'Дж. Грешем Мейчен. Учебник греческого языка Нового Завета. ' +
               'Перевод А. А. Руденко, научный редактор Е. Б. Смагина. ' +
               'Москва: Российское Библейское общество, 2024. ISBN 978-5-85524-292-8. ' +
               'Оригинал: J. Gresham Machen. New Testament Greek for Beginners, 1923. ' +
               'Права на русскоязычную версию принадлежат Российскому Библейскому обществу. ' +
               'Проект некоммерческий и образовательный.',
        termsEn: 'J. Gresham Machen. New Testament Greek for Beginners. ' +
                 'Russian translation by A. A. Rudenko, edited by E. B. Smagina. ' +
                 'Moscow: Russian Bible Society, 2024. ISBN 978-5-85524-292-8. ' +
                 'Original: J. Gresham Machen. New Testament Greek for Beginners, 1923. ' +
                 'Rights to the Russian version belong to the Russian Bible Society. ' +
                 'This is a non-commercial educational project.',
        url: null
    },
    {
        name: 'Учебные материалы: древнееврейский',
        nameEn: 'Course materials: Biblical Hebrew',
        terms: 'Учебное пособие по грамматике древнееврейского языка, 1-й год обучения. ' +
               'Новосибирская библейская богословская семинария, 2011. ' +
               'В основе: Gary D. Pratico, Miles V. Van Pelt. Basics of Biblical Hebrew Grammar. ' +
               'Права принадлежат правообладателям пособия. ' +
               'Проект некоммерческий и образовательный.',
        termsEn: 'A textbook of Biblical Hebrew grammar, first year. ' +
                 'Novosibirsk Biblical Theological Seminary, 2011. ' +
                 'Based on: Gary D. Pratico, Miles V. Van Pelt. Basics of Biblical Hebrew Grammar. ' +
                 'Rights belong to the holders of the textbook. ' +
                 'This is a non-commercial educational project.',
        url: null
    }
];
