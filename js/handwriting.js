// ============================================================
// ПРАКТИКА ПИСЬМА КАЖДОЙ БУКВЫ АЛФАВИТА
// ============================================================
// Нормализация и проверка не нужны: это guided practice, не упражнение и не
// тест. Пользователь пишет от руки по контуру, а «Далее» просто движет вперёд.

let handwritingState = {
    queue: [],
    index: 0,
    complete: false,
    returnLessonId: null,
    returnLessonPart: 'menu',
    returnScrollY: 0,
    strokes: [],
    currentStroke: null,
    isDrawing: false
};

function handwritingLessonNumber() {
    return firstLessonNumber();
}

function handwritingLessonAvailable(lessonNumber) {
    if (typeof lessonNumber === 'undefined' || lessonNumber === null) return false;
    let n = Number(lessonNumber);
    if (!Number.isFinite(n)) return false;
    let data = getLessonData(n);
    if (!data) return false;
    if (n !== handwritingLessonNumber()) return false;
    return !!(courseAlphabet() && Array.isArray(courseAlphabet().letters) && courseAlphabet().letters.length > 0);
}

function handwritingAlphabetEntries() {
    let alphabet = courseAlphabet() || {};
    let entries = [];
    let letters = Array.isArray(alphabet.letters) ? alphabet.letters : [];
    letters.forEach(item => {
        entries.push({ glyph: item.letter || '', name: item.name || item.letter || '' });
    });
    if (Array.isArray(alphabet.finals)) {
        alphabet.finals.forEach(item => {
            let base = (letters || []).find(l => l.letter === item.letter) || {};
            entries.push({ glyph: item.final || item.letter || '', name: base.name || item.letter || '' });
        });
    }
    return entries;
}

function buildHandwritingQueue() {
    let queue = [];
    handwritingAlphabetEntries().forEach((item) => {
        queue.push({
            letter: item.glyph || '',
            name: item.name || item.glyph || '',
            mode: 'guide',
            order: queue.length
        });
        queue.push({
            letter: item.glyph || '',
            name: item.name || item.glyph || '',
            mode: 'blank',
            order: queue.length
        });
    });
    return queue;
}

function currentHandwritingItem() {
    return handwritingState.queue[handwritingState.index] || null;
}

function refreshHandwritingCanvas() {
    let canvas = document.getElementById('handwritingCanvas');
    if (!canvas) return;
    let btn = document.getElementById('handwritingNextBtn');
    let p = document.getElementById('handwritingPrompt');
    let msg = document.getElementById('handwritingStatus');
    let item = currentHandwritingItem();

    if (btn) {
        let finalStep = handwritingState.index >= handwritingState.queue.length - 1;
        btn.textContent = handwritingState.complete ? 'Готово' : (finalStep ? 'Готово' : 'Далее');
        btn.disabled = false;
    }

    if (p && item) p.textContent = item.name || item.letter || 'Буква';
    if (msg) {
        let total = Math.max(1, handwritingState.queue.length);
        let step = handwritingState.complete ? total : handwritingState.index + 1;
        msg.textContent = handwritingState.complete ? 'Готово' : 'Шаг ' + step + ' / ' + total;
    }

    redrawHandwritingCanvas();
}

function hexToRgba(hex, alpha) {
    let value = (hex || '').trim();
    if (!value) return 'rgba(0, 0, 0, ' + alpha + ')';
    if (value.startsWith('#')) {
        let raw = value.slice(1);
        if (raw.length === 3) raw = raw.split('').map(ch => ch + ch).join('');
        if (raw.length !== 6) return 'rgba(0, 0, 0, ' + alpha + ')';
        let num = parseInt(raw, 16);
        let r = (num >> 16) & 255;
        let g = (num >> 8) & 255;
        let b = num & 255;
        return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }
    return value;
}

function getCanvasColors() {
    let styles = getComputedStyle(document.documentElement);
    return {
        ink: styles.getPropertyValue('--md-sys-color-on-surface').trim() || '#131316',
        bg: styles.getPropertyValue('--md-sys-color-surface-container-lowest').trim() || '#FFFFFF',
        ghost: styles.getPropertyValue('--md-sys-color-on-surface-variant').trim() || '#44474E'
    };
}

function redrawHandwritingCanvas() {
    if (typeof navigator !== 'undefined' && /jsdom/i.test(navigator.userAgent || '')) return;
    let canvas = document.getElementById('handwritingCanvas');
    if (!canvas) return;
    let ctx = null;
    try {
        let getContext = canvas.getContext;
        if (typeof getContext !== 'function') return;
        ctx = getContext.call(canvas, '2d');
    } catch (e) { return; }
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = window.devicePixelRatio || 1;
    const cssWidth = Math.max(220, Math.round(rect.width));
    const cssHeight = Math.max(220, Math.round(rect.height));
    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = getCanvasColors();
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, cssWidth, cssHeight);

    let item = currentHandwritingItem();
    if (item && item.mode === 'guide') {
        ctx.save();
        ctx.fillStyle = hexToRgba(colors.ghost, 0.28);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let family = getComputedStyle(document.documentElement)
            .getPropertyValue('--md-ref-typeface-script').trim() || 'serif';
        let fontSize = Math.min(cssWidth, cssHeight) * 0.62;
        ctx.font = 'normal ' + fontSize + 'px ' + family;
        ctx.fillText(item.letter || '', cssWidth / 2, cssHeight / 2 + fontSize * 0.08);
        ctx.restore();
    }

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = colors.ink;
    ctx.lineWidth = 8;
    handwritingState.strokes.forEach(stroke => {
        if (!stroke || !stroke.points || stroke.points.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
            ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
        }
        ctx.stroke();
    });
}

function getCanvasPoint(event) {
    let canvas = document.getElementById('handwritingCanvas');
    if (!canvas) return null;
    let rect = canvas.getBoundingClientRect();
    let clientX = event.clientX;
    let clientY = event.clientY;
    if (typeof event.touches !== 'undefined' && event.touches && event.touches[0]) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    }
    return {
        x: Math.max(0, Math.min(rect.width, clientX - rect.left)),
        y: Math.max(0, Math.min(rect.height, clientY - rect.top))
    };
}

function beginHandwritingStroke(event) {
    if (!document.body.classList.contains('handwriting-open')) return;
    let canvas = document.getElementById('handwritingCanvas');
    if (!canvas) return;
    let point = getCanvasPoint(event);
    if (!point) return;
    handwritingState.isDrawing = true;
    handwritingState.currentStroke = { points: [point] };
    handwritingState.strokes.push(handwritingState.currentStroke);
    event.preventDefault();
    redrawHandwritingCanvas();
}

function moveHandwritingStroke(event) {
    if (!handwritingState.isDrawing || !handwritingState.currentStroke) return;
    let point = getCanvasPoint(event);
    if (!point) return;
    handwritingState.currentStroke.points.push(point);
    event.preventDefault();
    redrawHandwritingCanvas();
}

function endHandwritingStroke(event) {
    if (!handwritingState.isDrawing) return;
    if (event && typeof event.preventDefault === 'function') event.preventDefault();
    handwritingState.isDrawing = false;
    handwritingState.currentStroke = null;
    redrawHandwritingCanvas();
}

function clearHandwritingCanvas() {
    handwritingState.strokes = [];
    handwritingState.currentStroke = null;
    handwritingState.isDrawing = false;
    redrawHandwritingCanvas();
}

function setHandwritingCompleteState() {
    let overlay = document.getElementById('handwritingOverlay');
    if (!overlay) return;
    let canvasWrap = document.getElementById('handwritingCanvasWrap');
    let done = document.getElementById('handwritingDone');
    let btn = document.getElementById('handwritingNextBtn');
    if (canvasWrap) canvasWrap.classList.add('hidden');
    if (done) done.classList.remove('hidden');
    if (btn) btn.textContent = 'Готово';
    handwritingState.complete = true;
    refreshHandwritingCanvas();
}

function showNextHandwritingStep() {
    if (handwritingState.complete) return;
    if (handwritingState.index >= handwritingState.queue.length - 1) {
        setHandwritingCompleteState();
        return;
    }
    handwritingState.index++;
    handwritingState.strokes = [];
    handwritingState.currentStroke = null;
    handwritingState.isDrawing = false;
    let canvasWrap = document.getElementById('handwritingCanvasWrap');
    let done = document.getElementById('handwritingDone');
    if (canvasWrap) canvasWrap.classList.remove('hidden');
    if (done) done.classList.add('hidden');
    refreshHandwritingCanvas();
}

function restartHandwritingPractice() {
    handwritingState.queue = buildHandwritingQueue();
    handwritingState.index = 0;
    handwritingState.complete = false;
    handwritingState.strokes = [];
    handwritingState.currentStroke = null;
    handwritingState.isDrawing = false;
    let canvasWrap = document.getElementById('handwritingCanvasWrap');
    let done = document.getElementById('handwritingDone');
    if (canvasWrap) canvasWrap.classList.remove('hidden');
    if (done) done.classList.add('hidden');
    refreshHandwritingCanvas();
}

function openHandwritingPractice(lessonNumber) {
    let n = Number(lessonNumber);
    if (!Number.isFinite(n)) return;

    handwritingState.returnLessonId = n;
    handwritingState.returnLessonPart = currentLessonPart || 'material';
    handwritingState.returnScrollY = window.scrollY || 0;

    handwritingState.queue = buildHandwritingQueue();
    handwritingState.index = 0;
    handwritingState.complete = false;
    handwritingState.strokes = [];
    handwritingState.currentStroke = null;
    handwritingState.isDrawing = false;

    let overlay = document.getElementById('handwritingOverlay');
    if (!overlay) return;
    overlay.removeAttribute('hidden');
    document.body.classList.add('handwriting-open');

    let done = document.getElementById('handwritingDone');
    if (done) done.classList.add('hidden');
    let canvasWrap = document.getElementById('handwritingCanvasWrap');
    if (canvasWrap) canvasWrap.classList.remove('hidden');
    refreshHandwritingCanvas();
}

function closeHandwritingPractice() {
    let overlay = document.getElementById('handwritingOverlay');
    if (overlay) overlay.setAttribute('hidden', '');
    document.body.classList.remove('handwriting-open');

    let lessonId = handwritingState.returnLessonId;
    if (lessonId && getLessonData(lessonId)) {
        openLesson(lessonId);
        if (handwritingState.returnLessonPart) {
            switchLessonPart(handwritingState.returnLessonPart);
        }
        if (typeof window.scrollTo === 'function') {
            window.scrollTo({ top: handwritingState.returnScrollY, behavior: scrollBehavior() });
        }
    } else {
        goToMain();
    }

    handwritingState.complete = false;
    handwritingState.queue = [];
    handwritingState.index = 0;
    handwritingState.strokes = [];
    handwritingState.currentStroke = null;
    handwritingState.isDrawing = false;
}

function injectHandwritingPracticeButton(lessonNumber) {
    if (!handwritingLessonAvailable(lessonNumber)) return;
    let wrap = document.getElementById('handwritingPracticeWrap');
    if (wrap) wrap.remove();
    let grammar = document.getElementById('grammarContent');
    let vocabCard = document.getElementById('lessonVocabCard');
    if (!grammar || !vocabCard) return;

    let btnWrap = document.createElement('div');
    btnWrap.id = 'handwritingPracticeWrap';
    btnWrap.className = 'handwriting-practice';
    btnWrap.innerHTML = '<button class="menu-btn outlined" type="button" onclick="openHandwritingPractice(' + Number(lessonNumber) + ')"><span class="msym">edit</span>Практика письма</button>';
    grammar.parentNode.insertBefore(btnWrap, vocabCard);
}

function attachHandwritingCanvasEvents() {
    let canvas = document.getElementById('handwritingCanvas');
    if (!canvas || canvas.dataset.bound === 'true') return;
    canvas.dataset.bound = 'true';

    canvas.addEventListener('touchstart', beginHandwritingStroke, { passive: false });
    canvas.addEventListener('touchmove', moveHandwritingStroke, { passive: false });
    canvas.addEventListener('touchend', endHandwritingStroke, { passive: false });
    canvas.addEventListener('touchcancel', endHandwritingStroke, { passive: false });

    canvas.addEventListener('mousedown', beginHandwritingStroke, { passive: false });
    canvas.addEventListener('mousemove', moveHandwritingStroke, { passive: false });
    window.addEventListener('mouseup', endHandwritingStroke, { passive: false });
}

function bindHandwritingControls() {
    let btn = document.getElementById('handwritingNextBtn');
    if (btn && !btn.dataset.bound) {
        btn.dataset.bound = 'true';
        btn.addEventListener('click', showNextHandwritingStep);
    }
    let clearBtn = document.getElementById('handwritingClearBtn');
    if (clearBtn && !clearBtn.dataset.bound) {
        clearBtn.dataset.bound = 'true';
        clearBtn.addEventListener('click', clearHandwritingCanvas);
    }
    let backBtn = document.getElementById('handwritingBackBtn');
    if (backBtn && !backBtn.dataset.bound) {
        backBtn.dataset.bound = 'true';
        backBtn.addEventListener('click', closeHandwritingPractice);
    }
    let restartBtn = document.getElementById('handwritingRestartBtn');
    if (restartBtn && !restartBtn.dataset.bound) {
        restartBtn.dataset.bound = 'true';
        restartBtn.addEventListener('click', restartHandwritingPractice);
    }
    let exitBtn = document.getElementById('handwritingExitBtn');
    if (exitBtn && !exitBtn.dataset.bound) {
        exitBtn.dataset.bound = 'true';
        exitBtn.addEventListener('click', closeHandwritingPractice);
    }
    attachHandwritingCanvasEvents();
}

function initHandwritingPractice() {
    bindHandwritingControls();
    let overlay = document.getElementById('handwritingOverlay');
    if (overlay && overlay.hasAttribute('hidden')) {
        overlay.setAttribute('aria-hidden', 'true');
    }
    let canvas = document.getElementById('handwritingCanvas');
    if (canvas) {
        window.addEventListener('resize', redrawHandwritingCanvas, { passive: true });
    }
    window.refreshHandwritingCanvas = refreshHandwritingCanvas;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHandwritingPractice);
} else {
    initHandwritingPractice();
}
