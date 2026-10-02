/* Service worker: приложение открывается без сети.
 *
 * Стратегии:
 *   навигация      — сеть, при неудаче кэш (обновление доходит сразу, офлайн работает)
 *   свои файлы     — сеть, при неудаче кэш (то же самое, и по той же причине)
 *   шрифты Google  — кэш, при промахе сеть (они версионированы в URL)
 *
 * Почему свои файлы больше не «кэш вперёд»: стили и данные лежат отдельными
 * файлами, а index.html берётся из сети. Кэш вперёд отдал бы свежую разметку
 * со вчерашним styles/*.css — рассинхрон, которого при одном файле быть не могло.
 * Офлайн от этого не страдает: без сети fetch падает сразу и отвечает кэш.
 *
 * ВАЖНО: подняв CACHE_VERSION, вы гарантированно раздаёте новую версию —
 * старые кэши удаляются в activate.
 */
const CACHE_VERSION = 'anticus-v20';
const CORE_CACHE = CACHE_VERSION + '-core';
const FONT_CACHE = CACHE_VERSION + '-fonts';

// Всё, что нужно для холодного старта без сети.
// Приложение больше не один файл: без стилей и данных холодный старт покажет
// голую разметку и пустые экраны, поэтому здесь перечислено всё, что грузит <head> и <body>.
const CORE_ASSETS = [
    './',
    './index.html',
    './manifest.webmanifest',
    './icon.svg',
    './icon-dark.svg',
    './styles/tokens.css',
    './styles/base.css',
    './styles/components.css',
    './styles/screens.css',
    './styles/dialogs.css',
    './styles/layout.css',
    './styles/settings.css',
    // Свои шрифты интерфейса (fonts/): лежат у нас ради офлайна, поэтому
    // должны быть в предзагрузке — иначе холодный старт без сети покажет
    // интерфейс системной гарнитурой, пока файла нет.
    './fonts/pt-sans-cyrillic-400.woff2',
    './fonts/pt-sans-cyrillic-700.woff2',
    './fonts/pt-sans-latin-400.woff2',
    './fonts/pt-sans-latin-700.woff2',
    './fonts/noto-sans-cyrillic.woff2',
    './fonts/noto-sans-latin.woff2',
    './fonts/inter-cyrillic.woff2',
    './fonts/inter-latin.woff2',
    './fonts/pt-serif-cyrillic-400.woff2',
    './fonts/pt-serif-cyrillic-700.woff2',
    './fonts/pt-serif-latin-400.woff2',
    './fonts/pt-serif-latin-700.woff2',
    './fonts/literata-cyrillic.woff2',
    './fonts/literata-latin.woff2',
    './fonts/source-serif-4-cyrillic.woff2',
    './fonts/source-serif-4-latin.woff2',
    './data/lessons.js',
    './data/hebrew-lessons.js',
    './data/prayer.js',
    './data/licenses.js',
    './data/courses.js',
    './js/core.js',
    './js/course.js',
    './js/ui.js',
    './js/shell.js',
    './js/theme.js',
    './js/fontscale.js',
    './js/fontpicker.js',
    './js/lesson.js',
    './js/declension.js',
    './js/exercises.js',
    './js/flashcards.js',
    './js/test.js',
    './js/translation.js',
    './js/stats.js',
    './js/prayer.js',
    './js/vocab.js',
    './js/settings.js',
    './js/boot.js'
];

const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CORE_CACHE)
            // addAll — всё или ничего; один недоступный файл не должен рушить установку
            .then(cache => Promise.all(CORE_ASSETS.map(url =>
                cache.add(new Request(url, { cache: 'reload' })).catch(() => null)
            )))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(
                keys.filter(k => k !== CORE_CACHE && k !== FONT_CACHE).map(k => caches.delete(k))
            ))
            .then(() => self.clients.claim())
    );
});

// Кладём в кэш только полноценные ответы: ошибку или редирект кэшировать нельзя.
function isCacheable(response) {
    return response && response.status === 200 && response.type !== 'error';
}

self.addEventListener('fetch', event => {
    const request = event.request;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);

    // --- переходы: сеть вперёд, кэш как страховка ---
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (isCacheable(response)) {
                        const copy = response.clone();
                        caches.open(CORE_CACHE).then(c => c.put('./index.html', copy));
                    }
                    return response;
                })
                .catch(() => caches.match('./index.html', { ignoreSearch: true })
                    .then(hit => hit || caches.match('./')))
        );
        return;
    }

    // --- шрифты: кэш вперёд (URL уже содержит версию) ---
    if (FONT_HOSTS.indexOf(url.hostname) !== -1) {
        event.respondWith(
            caches.match(request).then(hit => hit || fetch(request).then(response => {
                // у шрифтов ответ opaque (status 0) — его тоже кладём, иначе офлайна нет
                if (response && (response.status === 200 || response.type === 'opaque')) {
                    const copy = response.clone();
                    caches.open(FONT_CACHE).then(c => c.put(request, copy));
                }
                return response;
            // сюда попадаем только при промахе кэша, откатываться не на что:
            // отвечаем честной ошибкой, а не undefined
            }).catch(() => Response.error()))
        );
        return;
    }

    // --- свои файлы: сеть вперёд, кэш как страховка ---
    // Стили, данные и разметка обязаны быть из одной сборки: index.html идёт из
    // сети, значит и остальное тоже, иначе получим свежую разметку со старым CSS.
    if (url.origin === self.location.origin) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (isCacheable(response)) {
                        const copy = response.clone();
                        caches.open(CORE_CACHE).then(c => c.put(request, copy));
                    }
                    return response;
                })
                .catch(() => caches.match(request).then(hit => hit || Response.error()))
        );
    }
});
