# Інтеграція аналітики для Echocode.app

Цей документ описує виконану інтеграцію аналітики та ingestion форм саме зі сторони фронтенду `Echocode.app`.

## Обсяг виконаного

У бекенді/адмінці `echocode-newsite` уже підготовлено:

- `POST /api/analytics/page-view`
- `POST /api/forms/submissions`
- CORS allowlist для `echocode.app` і preview-доменів
- site-aware admin views у `/admin/echocode-app`

Цей репозиторій тепер відправляє дані з сайту `Echocode.app` у ці endpoint-и.

## Що реалізовано

### 1. Спільна конфігурація сайту

Додано [`src/lib/siteIngest.ts`](/Users/annakotlyar/Desktop/projects/web-echocode-app/src/lib/siteIngest.ts) як єдине місце для:

- `SITE_ID`
- `SITE_HOST`
- `ANALYTICS_INGEST_URL`
- `FORM_SUBMIT_URL`

Значення за замовчуванням:

- `SITE_ID = "echocode_app"`
- `SITE_HOST = "echocode.app"`

### 2. Відправка page view

Існуючий page tracking залишився через [`src/components/analytics/PageViewTracker.tsx`](/Users/annakotlyar/Desktop/projects/web-echocode-app/src/components/analytics/PageViewTracker.tsx), який підключений у [`src/app/layout.tsx`](/Users/annakotlyar/Desktop/projects/web-echocode-app/src/app/layout.tsx).

Оновлено [`src/lib/analytics/siteAnalytics.ts`](/Users/annakotlyar/Desktop/projects/web-echocode-app/src/lib/analytics/siteAnalytics.ts), тому тепер payload кожного page view містить:

- `siteId`
- `siteHost`
- `path`
- `url`
- `title`
- `referrer`
- `source: "website"`
- опційний first-touch attribution у `metadata`

Запит відправляється в `NEXT_PUBLIC_ANALYTICS_INGEST_URL`.

### 3. Відправка форми

Оновлено [`src/components/modals/ContactUsModal/ContactUsForm/useContactUsForm.ts`](/Users/annakotlyar/Desktop/projects/web-echocode-app/src/components/modals/ContactUsModal/ContactUsForm/useContactUsForm.ts), щоб прибрати старий Formspree flow.

Тепер contact form відправляє JSON `POST` у `NEXT_PUBLIC_FORMS_SUBMIT_URL` з такими полями:

- `siteId`
- `siteHost`
- `source: "website"`
- `firstName`
- `lastName`
- `email`
- `message`

Локальна валідація та існуючий success/error UX збережені.

### 4. Змінні середовища

Оновлено [`.env.example`](/Users/annakotlyar/Desktop/projects/web-echocode-app/.env.example) під новий контракт:

```env
NEXT_PUBLIC_SITE_ID=echocode_app
NEXT_PUBLIC_SITE_HOST=echocode.app
NEXT_PUBLIC_ANALYTICS_INGEST_URL=
NEXT_PUBLIC_FORMS_SUBMIT_URL=
```

Рекомендовані значення для локальної або preview-перевірки:

```env
NEXT_PUBLIC_ANALYTICS_INGEST_URL=https://web-echocode-app.vercel.app/api/analytics/page-view
NEXT_PUBLIC_FORMS_SUBMIT_URL=https://web-echocode-app.vercel.app/api/forms/submissions
```

Якщо активний backend розгорнуто на іншому домені, потрібно підставити відповідну базову адресу.

## Runtime flow

### Page view

1. Користувач відкриває маршрут у `Echocode.app`.
2. `PageViewTracker` викликає `trackPageView()`.
3. Фронтенд відправляє site-aware payload у `/api/analytics/page-view`.
4. Дані мають з’явитися в `/admin/echocode-app`.

### Form submission

1. Користувач відправляє форму в contact modal.
2. На фронтенді проходить локальна валідація.
3. Фронтенд відправляє site-aware JSON payload у `/api/forms/submissions`.
4. Дані мають з’явитися в `/admin/echocode-app/submissions`.

## Що вже перевірено

Після змін успішно пройшли:

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run check`

## Що ще треба перевірити вручну

Ці кроки залежать від live env і доступності бекенда:

1. Встановити `NEXT_PUBLIC_ANALYTICS_INGEST_URL` і `NEXT_PUBLIC_FORMS_SUBMIT_URL`.
2. Відкрити сайт локально або на preview.
3. Завантажити хоча б одну сторінку.
4. Відправити contact form.
5. Перевірити записи в:
   - `/admin/echocode-app`
   - `/admin/echocode-app/submissions`

## Підготовка до коміту

Поточний стан готовий до звичайного коміту після короткого рев’ю diff.

Що входить у логічний коміт:

- shared site ingest config
- інтеграція page-view з `echocode-newsite`
- інтеграція form submission з `echocode-newsite`
- оновлення env example
- документація

Перед комітом варто ще раз перевірити:

- що в tracked-файлах немає тимчасових локальних env-значень
- що endpoint-и дивляться в правильне backend-середовище
- що backend payload contract досі відповідає полям `firstName`, `lastName`, `email`, `message`, `siteId`, `siteHost`, `source`
