# web-echocode-app

[English version](./README.md)

Статичний продакшен-сайт: [https://www.echocode.app/](https://www.echocode.app/)  
Динамічний Next.js preview: [https://web-echocode-app.vercel.app/](https://web-echocode-app.vercel.app/)

## Контекст проєкту

Цей репозиторій підтримує два узгоджені режими постачання одного й того ж сайту Echocode:

- `main` - статична гілка для хостингу на Namecheap
- `vercel-experiment` - динамічна Next.js гілка для Vercel

Візуал і продуктова поведінка мають залишатися однаковими в обох гілках.  
Різниця тільки в моделі рантайму:

- `main` тримається сумісною зі статичним білдіом і ручною заливкою на хостинг
- `vercel-experiment` тримається сумісною зі звичайним Next.js runtime на Vercel

## Live середовища

- Статичний продакшен: [https://www.echocode.app/](https://www.echocode.app/)
  Це Namecheap-версія сайту, яка працює через статичний хостинг.
- Динамічний preview: [https://web-echocode-app.vercel.app/](https://web-echocode-app.vercel.app/)
  Це Vercel-версія для перевірки сайту в природному середовищі Next.js.

## Швидкий старт

- Node `20.x`
- npm `10+`

## Основні команди

- `npm run dev` - запуск локального Next.js застосунку
- `npm run lint` - перевірка ESLint
- `npm run typecheck` - перевірка TypeScript
- `npm run build` - production build для поточної моделі гілки
- `npm run check` - обов'язкова перевірка перед merge або ручним деплоєм (`lint + typecheck + build`)

## Ролі гілок

### `main`

- Статична гілка для Namecheap
- Має залишатися сумісною зі static export логікою
- Live domain: [https://www.echocode.app/](https://www.echocode.app/)
- Автоматичний деплой не налаштований
- Деплой виконується вручну: статичний build збирається і заливається на хостинг

### `vercel-experiment`

- Динамічна Next.js гілка для Vercel
- Зберігає природну модель роботи Next.js
- Preview URL: [https://web-echocode-app.vercel.app/](https://web-echocode-app.vercel.app/)
- Підходить для перевірки поведінки, яка має працювати в нормальному Next.js runtime

## Нотатки по деплою

### Namecheap / статичний хостинг

- Для цього сценарію використовуй `main`
- Перед build мають бути виставлені правильні production `NEXT_PUBLIC_*` env
- Статичний результат треба заливати на хостинг вручну
- Автоматичного деплою на Namecheap немає

### Vercel / динамічний хостинг

- Для цього сценарію використовуй `vercel-experiment`
- Деплой і перевірка відбуваються в стандартному Next.js/Vercel середовищі
- Runtime-специфічну поведінку, яка не потрібна у статиці, слід лишати тут

## Правило роботи для обох гілок

- Візуал має залишатися однаковим між `main` і `vercel-experiment`
- Static-only рішення належать до `main`
- Dynamic-only runtime-рішення належать до `vercel-experiment`

## Чекліст перед merge

1. `git pull`
2. За потреби оновити залежності
3. Внести зміни
4. Якщо змінювався `package.json`, оновити `package-lock.json`
5. Запустити `npm run check`
6. Окремо оцінити вплив змін на static vs dynamic гілку
