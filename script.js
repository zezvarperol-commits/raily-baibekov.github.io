// --- 1. ЛОГИКА ПЕРЕКЛЮЧЕНИЯ СТРАНИЦ ---
function openPage(pageId, btnElement) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');

    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    if (pageId === 'contacts') {
        loadYandexMap();
    }
}

// --- 2. ФУНКЦИЯ ОТКРЫТИЯ ССЫЛОК ---
function openLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// --- 3. АВТОСКРЫТИЕ НАВИГАЦИИ ---
const nav = document.getElementById('mainNav');
const navTrigger = document.getElementById('navTrigger');
let hideTimeout;

function hideNav() { nav.classList.add('hidden'); }
function showNav() {
    nav.classList.remove('hidden');
    resetTimer();
}
function resetTimer() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(hideNav, 3000);
}

document.addEventListener('mousemove', (event) => {
    if (event.clientY < 100) {
        showNav();
    } else {
        resetTimer();
    }
});

navTrigger.addEventListener('mouseenter', showNav);
nav.addEventListener('mouseenter', showNav);
resetTimer();

// --- 4. ЭФФЕКТ "УБЕГАЮЩИХ" КНОПОК И КАРТОЧЕК ---
const interactiveElements = document.querySelectorAll('button:not(.asurso-btn), .profile-card, .team-card');

interactiveElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        let divisor = 2.5;
        if (el.classList.contains('profile-card') || el.classList.contains('team-card')) {
            divisor = 15;
        }

        const moveX = (x - centerX) / divisor;
        const moveY = (y - centerY) / divisor;

        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = `translate(0, 0)`;
    });
});

// --- 5. ЗАГРУЗКА ЯНДЕКС.КАРТЫ ---
let mapLoaded = false;

function loadYandexMap() {
    if (mapLoaded) return;
    const target = document.getElementById('yandexMapTarget');
    if (!target) return;

    target.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = "https://yandex.ru/map-widget/v1/?um=constructor%3A64512bc03d49957375270b846ea1790f9fbd335c3d8e36d66d6093e5e97c6a51&source=constructor&width=100%&height=100%";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.frameBorder = "0";
    iframe.allowFullscreen = "true";
    iframe.style.border = "none";
    iframe.style.display = "block";

    target.appendChild(iframe);
    mapLoaded = true;
}

// --- 6. МОДАЛЬНЫЕ ОКНА ПРОФИЛЕЙ ---
const profileData = {
    social: {
        title: '> Соц-эконом профиль',
        items: [
            { spec: 'Экономист', uni: 'МГУ им. М.В. Ломоносова' },
            { spec: 'Экономист', uni: 'СПбГУ' },
            { spec: 'Менеджер', uni: 'НИУ ВШЭ (Москва)' },
            { spec: 'Менеджер', uni: 'РЭУ им. Г.В. Плеханова' },
            { spec: 'Юрист', uni: 'МГЮА им. О.Е. Кутафина' },
            { spec: 'Юрист', uni: 'СПбГУ' },
            { spec: 'Социолог', uni: 'МГУ им. М.В. Ломоносова' },
            { spec: 'Социолог', uni: 'НИУ ВШЭ (Санкт-Петербург)' },
            { spec: 'Маркетолог', uni: 'РЭУ им. Г.В. Плеханова' },
            { spec: 'Маркетолог', uni: 'Финансовый университет при Правительстве РФ' }
        ]
    },
    biochem: {
        title: '> Био-Хим профиль',
        items: [
            { spec: 'Врач (Лечебное дело)', uni: 'Сеченовский Университет (Москва)' },
            { spec: 'Врач (Лечебное дело)', uni: 'РНИМУ им. Н.И. Пирогова' },
            { spec: 'Педиатр', uni: 'СПбГПМУ' },
            { spec: 'Фармацевт', uni: 'СПХФУ (Санкт-Петербург)' },
            { spec: 'Фармацевт', uni: 'РязГМУ им. И.П. Павлова' },
            { spec: 'Биолог', uni: 'МГУ им. М.В. Ломоносова' },
            { spec: 'Биолог', uni: 'СПбГУ' },
            { spec: 'Эколог', uni: 'РУДН (Москва)' },
            { spec: 'Ветеринар', uni: 'МГАВМиБ им. К.И. Скрябина' },
            { spec: 'Ветеринар', uni: 'СПбГУВМ' }
        ]
    },
    tech: {
        title: '> Технический профиль',
        items: [
            { spec: 'Инженер (Машиностроение)', uni: 'МГТУ им. Н.Э. Баумана' },
            { spec: 'Инженер (Авиастроение)', uni: 'МАИ (Москва)' },
            { spec: 'Программист', uni: 'МФТИ (Долгопрудный)' },
            { spec: 'Программист', uni: 'ИТМО (Санкт-Петербург)' },
            { spec: 'Программист', uni: 'НИУ ВШЭ (Москва)' },
            { spec: 'Архитектор', uni: 'МАрхИ (Москва)' },
            { spec: 'Архитектор', uni: 'СПбГАСУ' },
            { spec: 'Физик-ядерщик', uni: 'МИФИ (Москва)' },
            { spec: 'Физик-ядерщик', uni: 'МГУ им. М.В. Ломоносова' },
            { spec: 'Инженер (Электроника)', uni: 'МИЭТ (Зеленоград)' }
        ]
    },
    psych: {
        title: '> Психологический профиль',
        items: [
            { spec: 'Психолог', uni: 'МГУ им. М.В. Ломоносова' },
            { spec: 'Психолог', uni: 'СПбГУ' },
            { spec: 'Психолог', uni: 'НИУ ВШЭ (Москва)' },
            { spec: 'Педагог', uni: 'МПГУ (Москва)' },
            { spec: 'Педагог', uni: 'РГПУ им. А.И. Герцена (СПб)' },
            { spec: 'Социальный работник', uni: 'РГСУ (Москва)' },
            { spec: 'Социальный работник', uni: 'СПбГУ' },
            { spec: 'HR-специалист', uni: 'НИУ ВШЭ (Москва)' },
            { spec: 'HR-специалист', uni: 'РЭУ им. Г.В. Плеханова' }
        ]
    }
};

function openProfileModal(profileKey) {
    const data = profileData[profileKey];
    if (!data) return;

    document.getElementById('profileModalTitle').textContent = data.title;
    const list = document.getElementById('profileModalList');
    list.innerHTML = '';

    data.items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="spec-name">${item.spec}</span>
            <span class="spec-uni">${item.uni}</span>
        `;
        list.appendChild(li);
    });

    document.getElementById('profileModalOverlay').classList.add('visible');
}

function closeProfileModal() {
    document.getElementById('profileModalOverlay').classList.remove('visible');
}

document.getElementById('profileModalOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeProfileModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProfileModal();
    }
});

// --- 7. ПОДПИСЬ АВТОРА: ФИЗИКА ---
const signature = document.getElementById('authorSignature');

let sigX = 20, sigY = 90;
let velocityX = 0, velocityY = 0;
let isDragging = false;
let startX = 0, startY = 0;
let lastMouseX = 0, lastMouseY = 0;
let physicsMode = false;
let physicsAnimationId = null;
let gravity = 0.7;
let bounce = 0.65;
let friction = 0.99;
let restingFriction = 0.85;

signature.style.left = sigX + 'px';
signature.style.top = sigY + 'px';

function startPhysics() {
    if (physicsMode) return;
    physicsMode = true;
    signature.classList.add('falling');
    loopPhysics();
}

function stopPhysics() {
    physicsMode = false;
    signature.classList.remove('falling');
    if (physicsAnimationId) {
        cancelAnimationFrame(physicsAnimationId);
        physicsAnimationId = null;
    }
}

function loopPhysics() {
    if (!physicsMode) return;

    if (isDragging) {
        physicsAnimationId = requestAnimationFrame(loopPhysics);
        return;
    }

    const maxX = window.innerWidth - signature.offsetWidth - 10;
    const maxY = window.innerHeight - signature.offsetHeight - 10;

    velocityY += gravity;
    velocityX *= friction;
    velocityY *= friction;

    let newX = sigX + velocityX;
    let newY = sigY + velocityY;

    if (newX > maxX) { newX = maxX; velocityX = -Math.abs(velocityX) * bounce; }
    if (newX < 10) { newX = 10; velocityX = Math.abs(velocityX) * bounce; }
    if (newY > maxY) {
        newY = maxY;
        if (Math.abs(velocityY) > 1.5) {
            velocityY = -Math.abs(velocityY) * bounce;
        } else {
            velocityY = 0;
            velocityX *= restingFriction;
        }
    }
    if (newY < 10) { newY = 10; velocityY = Math.abs(velocityY) * bounce; }

    sigX = newX;
    sigY = newY;

    signature.style.left = sigX + 'px';
    signature.style.top = sigY + 'px';

    physicsAnimationId = requestAnimationFrame(loopPhysics);
}

signature.addEventListener('mousedown', (e) => {
    if (e.shiftKey && !isDragging) {
        e.preventDefault();
        if (!physicsMode) {
            velocityX = (Math.random() - 0.5) * 10;
            velocityY = -5;
            startPhysics();
        }
        return;
    }

    e.preventDefault();
    isDragging = true;
    startX = e.clientX - sigX;
    startY = e.clientY - sigY;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    velocityX = 0;
    velocityY = 0;

    signature.classList.add('dragging');
    signature.classList.remove('falling');
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const newX = e.clientX - startX;
    const newY = e.clientY - startY;

    const maxX = window.innerWidth - signature.offsetWidth - 10;
    const maxY = window.innerHeight - signature.offsetHeight - 10;

    sigX = Math.max(10, Math.min(newX, maxX));
    sigY = Math.max(10, Math.min(newY, maxY));

    velocityX = (e.clientX - lastMouseX) * 0.6;
    velocityY = (e.clientY - lastMouseY) * 0.6;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;

    signature.style.left = sigX + 'px';
    signature.style.top = sigY + 'px';
});

document.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    signature.classList.remove('dragging');
    document.body.style.userSelect = '';
    document.body.style.cursor = '';

    if (physicsMode) {
        signature.classList.add('falling');
        if (!physicsAnimationId) loopPhysics();
    } else {
        if (Math.abs(velocityX) > 2 || Math.abs(velocityY) > 2) {
            startPhysics();
        } else {
            velocityX = 0;
            velocityY = 0;
        }
    }
});

signature.addEventListener('dblclick', () => {
    stopPhysics();
    velocityX = 0;
    velocityY = 0;
    sigX = 20;
    sigY = 90;
    signature.style.transition = 'left 0.6s cubic-bezier(0.16, 1, 0.3, 1), top 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    signature.style.left = sigX + 'px';
    signature.style.top = sigY + 'px';
    setTimeout(() => { signature.style.transition = ''; }, 600);
});

window.addEventListener('resize', () => {
    const maxX = window.innerWidth - signature.offsetWidth - 10;
    const maxY = window.innerHeight - signature.offsetHeight - 10;
    if (sigX > maxX) { sigX = maxX; signature.style.left = sigX + 'px'; }
    if (sigY > maxY) { sigY = maxY; signature.style.top = sigY + 'px'; }
});

// --- 8. ВИРТУАЛЬНЫЙ ПОМОЩНИК ---
const assistantBubble = document.getElementById('assistantBubble');
const assistantText = document.getElementById('assistantText');
const assistantChar = document.getElementById('assistantChar');
const assistantFace = document.getElementById('assistantFace');
let bubbleTimeout = null;

// База знаний: что рассказывать о каждом элементе
const knowledgeBase = {
    'body': {
        face: '>_',
        title: 'BODY',
        text: 'Корневой элемент страницы. В CSS у него задан фон (#05070a), шрифт JetBrains Mono и flex-раскладка (display: flex) для прижатия футера к низу.'
    },
    'nav': {
        face: '^_^',
        title: 'NAV',
        text: 'Навигация с position: fixed — всегда сверху. Класс .hidden через transform: translateY(-150%) прячет её за экран. JS слушает mousemove, чтобы показывать её при приближении курсора к верху.'
    },
    'button': {
        face: '^_^',
        title: 'BUTTON',
        text: 'Кнопки. У них CSS-переход transition для плавности. На mousemove JS вычисляет позицию курсора относительно центра кнопки и смещает её через transform: translate — эффект "убегания".'
    },
    '.nav-btn': {
        face: '^_^',
        title: 'NAV BUTTON',
        text: 'Кнопка навигации. onclick вызывает openPage() — она скрывает все .page и показывает нужную по id. Активная кнопка получает класс .active с фиолетовым фоном.'
    },
    '.profile-card': {
        face: 'o_o',
        title: 'PROFILE CARD',
        text: 'Карточка профиля. При клике открывается модальное окно со списком специальностей и вузов РФ. CSS Grid раскладывает карточки автоматически.'
    },
    '.profile-modal': {
        face: 'O_O',
        title: 'MODAL',
        text: 'Модальное окно профиля. Показывает специальности и университеты России для выбранного направления. Закрывается по клику на фон или Escape.'
    },
    '.team-card': {
        face: 'o_o',
        title: 'TEAM CARD',
        text: 'Карточка сотрудника. Внутри — фото (загружается по URL) и имя с должностью. Чтобы добавить фото, вставьте ссылку в атрибут src тега img.'
    },
    '.vpr-card': {
        face: 'o_o',
        title: 'VPR CARD',
        text: 'Информационная карточка. Списки внутри оформлены через ul li::before с content: ">" — псевдоэлемент создаёт маркер-стрелку в стиле терминала.'
    },
    '.asurso-btn': {
        face: '^_^',
        title: 'ASURSO BUTTON',
        text: 'Главная кнопка входа в АСУ РСО. onclick="openLink(\'https://asurso.ru\')" — открывает портал через window.open. Стиль: background: var(--accent-color) с box-shadow для свечения.'
    },
    '.map-container': {
        face: 'O_O',
        title: 'MAP IFRAME',
        text: 'Контейнер карты. Внутрь через JavaScript вставляется iframe с Яндекс.Картой. Карта грузится только при переходе на вкладку "Контакты" — функция loadYandexMap().'
    },
    '.terminal-box': {
        face: 'o_o',
        title: 'TERMINAL BOX',
        text: 'Основной блок контента. Стиль "жидкого стекла": background: rgba(20,25,35,0.6) + backdrop-filter: blur(12px). При наведении меняется border-color на фиолетовый.'
    },
    '.author-signature': {
        face: 'O_O',
        title: 'SIGNATURE',
        text: 'Подпись автора. Перетаскивается через mousedown/mousemove/mouseup. Shift+клик включает физику (гравитация, отскоки). Двойной клик — сброс в угол. Реализовано через requestAnimationFrame.'
    },
    '.assistant': {
        face: '^_^',
        title: 'ASSISTANT',
        text: 'Виртуальный помощник (я!). Фиксирован в правом нижнем углу. Слушаю mouseover на всех элементах и показываю подсказки о том, как они работают в коде.'
    },
    '.bg-light': {
        face: 'o_o',
        title: 'BG LIGHT',
        text: 'Фоновые светящиеся пятна. Созданы через radial-gradient с filter: blur(80px). Анимируются через @keyframes, меняя left/top — плавают по экрану.'
    },
    '.watermark-row': {
        face: 'o_o',
        title: 'WATERMARK',
        text: 'Ватермарка-конвейер. Строки с надписью "Байбеков" бесконечно двигаются через @keyframes conveyor (transform: translateX). Чётные ряды едут в обратную сторону.'
    },
    'footer': {
        face: '>_',
        title: 'FOOTER',
        text: 'Подвал сайта. Прижат к низу через margin-top: auto в flex-контейнере body. Содержит контакты и копирайт.'
    }
};

// Эмоции
const faces = {
    neutral: '>_',
    happy: '^_^',
    curious: 'o_o',
    surprised: 'O_O',
    sad: 'T_T',
    thinking: '@_@'
};

function setFace(face) {
    assistantFace.textContent = face;
    assistantChar.classList.add('excited');
    setTimeout(() => assistantChar.classList.remove('excited'), 400);
}

function showBubble(title, text) {
    clearTimeout(bubbleTimeout);
    assistantText.innerHTML = `<span class="bubble-tag">[${title}]</span> ${text}`;
    assistantBubble.classList.add('visible');
}

function hideBubble() {
    bubbleTimeout = setTimeout(() => {
        assistantBubble.classList.remove('visible');
    }, 250);
}

function getInfoForElement(el) {
    let current = el;
    while (current && current !== document.body) {
        if (current.classList) {
            for (const cls of current.classList) {
                const key = '.' + cls;
                if (knowledgeBase[key]) return knowledgeBase[key];
            }
        }
        const tagKey = current.tagName.toLowerCase();
        if (knowledgeBase[tagKey]) return knowledgeBase[tagKey];
        if (current.classList && current.classList.contains('schedule-error')) {
            return {
                face: 'T_T',
                title: 'ERROR',
                text: 'Блок с ошибкой. Анимация pulseBorder через @keyframes создаёт пульсирующее фиолетовое свечение. Реализовано через box-shadow.'
            };
        }
        if (current.id === 'yandexMapTarget') {
            return knowledgeBase['.map-container'];
        }
        current = current.parentElement;
    }
    return null;
}

document.addEventListener('mouseover', (e) => {
    const target = e.target;

    if (target.closest('.assistant')) return;
    if (target === signature || signature.contains(target)) {
        showBubble('SIGNATURE', 'Подпись автора. Перетаскивай мышкой, Shift+клик — физика, двойной клик — сброс.');
        setFace(faces.surprised);
        return;
    }

    const info = getInfoForElement(target);
    if (info) {
        setFace(info.face);
        showBubble(info.title, info.text);
    } else {
        setFace(faces.curious);
        showBubble('ЭЛЕМЕНТ', `Это <${target.tagName.toLowerCase()}>. Наведи на кнопки, карточки или другие элементы, чтобы узнать о них подробнее.`);
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.assistant')) return;
    hideBubble();
});

assistantChar.addEventListener('click', () => {
    setFace(faces.happy);
    showBubble('ПРИВЕТ', 'Я виртуальный помощник этого сайта. Наведи на любой элемент, чтобы узнать, как он устроен в HTML, CSS и JavaScript!');
    setTimeout(() => {
        setFace(faces.neutral);
    }, 3000);
});

setTimeout(() => {
    showBubble('ПРИВЕТ', 'Я твой виртуальный помощник. Наведи на любой элемент — расскажу, как он работает в коде.');
    setTimeout(() => {
        hideBubble();
    }, 5000);
}, 1500);