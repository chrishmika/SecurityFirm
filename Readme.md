# SecurityFirm

SecurityFirm is a multi-platform security operations system with:

- A Node.js + Express + MongoDB backend API
- An Admin dashboard (`Frontend/Admin`) built with React + Vite
- A public Website (`Frontend/Website`) built with React + Vite
- A Mobile app (`Frontend/Mobile`) built with Expo + React Native

## Tech Stack

- Backend: `Node.js`, `Express`, `MongoDB`, `Mongoose`, `JWT`, `Cloudinary`
- Frontend (Admin + Website): `React`, `Vite`
- Mobile: `Expo`, `React Native`, `expo-router`

## Project Structure

```text
SecurityFirm/
	controllers/
	db/
	lib/
	middleware/
	models/
	routes/
	server.mjs
	Frontend/
		Admin/
		Website/
		Mobile/
```

## Prerequisites

- `Node.js` 18+ (recommended)
- `npm` 9+
- A running MongoDB instance (local or Atlas)
- A Cloudinary account (for upload features)
- Expo Go app (for mobile testing), optional but recommended

## Environment Variables

Create a `.env` file in the project root (`SecurityFirm/.env`) with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

NODE_ENV=development
```

## Local Development

Open separate terminals for each service you want to run.

### 1. Clone and install backend dependencies

```bash
git clone https://github.com/chrishmika/SecurityFirm.git
cd SecurityFirm
npm install
```

### 2. Start backend API

```bash
npm run dev
```

Default API base URL:

```text
http://localhost:5000/api
```

### 3. Start Admin dashboard

```bash
cd Frontend/Admin
npm install
npm run dev
```

### 4. Start Website

```bash
cd Frontend/Website
npm install
npm run dev
```

### 5. Start Mobile app (Expo)

```bash
cd Frontend/Mobile
npm install
npm run start
```

For platform-specific runs:

```bash
npm run android
npm run ios
npm run web
```

## Production Build (Web + Admin)

From the project root:

```bash
npm run heroku-postbuild
```

This builds:

- `Frontend/Admin/build`
- `Frontend/Website/build`

The backend serves:

- Admin app at `/app`
- Website at `/`

## Useful Scripts

Root:

- `npm run dev` - start backend with `nodemon`
- `npm run heroku-postbuild` - install + build Admin and Website apps

`Frontend/Admin`:

- `npm run dev`
- `npm run build`
- `npm run preview`

`Frontend/Website`:

- `npm run dev`
- `npm run build`
- `npm run preview`

`Frontend/Mobile`:

- `npm run start`
- `npm run android`
- `npm run ios`
- `npm run web`

## Troubleshooting

- If backend cannot connect to DB, verify `MONGO_URI` in `.env`.
- If auth fails, verify `JWT_SECRET` is set.
- If uploads fail, verify all `CLOUDINARY_*` variables.
- If mobile cannot reach local API, ensure your phone/emulator can access your machine network.

## Notes

- CORS is currently configured with `origin: true` and `credentials: true` in `server.mjs`.
- Backend default port is `5000` unless overridden by `PORT`.
