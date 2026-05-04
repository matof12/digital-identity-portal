# Portal de Identidad Digital – Interfase

Aplicación web desarrollada como prueba técnica para Interfase.
Permite autenticación de usuarios, visualización de perfil, gestión de dispositivos y registro de actividad.

## 🚀 Cómo ejecutar el proyecto

### Requisitos
- Node.js 18+
- npm

### Instalación

```bash
git clone https://github.com/tu-usuario/digital-identity-portal.git
cd digital-identity-portal
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Credenciales de acceso
- **Usuario:** admin
- **Contraseña:** 1234

---

## 🧱 Stack tecnológico

- **React 18** + **TypeScript** con Vite
- **React Router v6** — navegación y rutas protegidas
- **Axios** — llamadas HTTP a la API pública externa
- **React Hook Form** + **Zod** — formularios y validación
- **SCSS** — estilos por componente
- **Bootstrap** — utilidades de layout

---

## 📁 Estructura del proyecto

```
src/
├── mocks/           # Datos simulados (usuario, dispositivos, actividad)
├── context/         # AuthContext — manejo de sesión y token
├── services/        # Lógica de acceso a datos (mocks + API externa)
├── components/      # Componentes reutilizables (Layout, ConfirmModal)
├── pages/           # Vistas de la aplicación
│   ├── LoginPage
│   ├── ForgotPasswordPage
│   ├── DashboardPage
│   ├── ProfilePage
│   ├── DevicesPage
│   └── ActivityPage
└── styles/          # Archivos SCSS por componente
```

---

## ⚙️ Decisiones técnicas

### Autenticación — OAuth2 simulado
Se implementó un flujo mock que simula OAuth2. El login valida credenciales hardcodeadas y genera un token en base64 que se persiste en `localStorage`. El componente `PrivateRoute` verifica el token antes de renderizar cualquier ruta protegida. En producción se reemplazaría por un redirect al `/authorize` de un proveedor real como Auth0 o Keycloak, usando el flujo PKCE.

### Arquitectura de servicios
Toda la lógica de acceso a datos vive en `services/` — las páginas nunca llaman a las APIs directamente. Esto permite reemplazar cualquier mock por una API real sin tocar los componentes.

### API pública externa
Se integró **randomuser.me** para enriquecer el perfil del usuario con avatar y teléfono. Se eligió porque sus datos tienen sentido semántico en un portal de identidad digital. El parámetro `?seed=matias` garantiza que siempre devuelva el mismo usuario.

### Validación
Se usó **Zod** junto con **React Hook Form** para validación declarativa y type-safe en los formularios de login, perfil y recuperación de contraseña.

### Modal de confirmación
Se implementó un modal propio con animación y backdrop blur para la eliminación de dispositivos, en lugar del `confirm()` nativo del browser, para mantener la coherencia visual con la identidad de Interfase.

### Estilos
Se tomó la identidad visual del PDF de la prueba técnica como referencia — gradiente `#5B1FA8 → #D4237A → #E8632A`, tipografía sans-serif, y componentes con bordes redondeados — para que la app refleje la estética de Interfase.

---

## 📌 Supuestos realizados

- Un solo usuario (`admin/1234`) para simplificar el flujo de autenticación
- Los dispositivos eliminados se resetean al recargar la página — el estado vive en memoria
- Los cambios del perfil se persisten en el estado local del componente — si el usuario recarga, vuelven al valor original del mock
- El flujo de recuperación de contraseña simula el envío de email sin backend real
- La paginación del Activity Log es del lado del servidor simulada — en producción el backend recibiría `page` y `pageSize` como parámetros

---

## 🔧 Qué mejoraría para producción

| Mejora | Detalle |
|---|---|
| Auth real | Auth0 o Keycloak con flujo PKCE |
| Seguridad del token | `httpOnly cookie` en lugar de `localStorage` para evitar XSS, o token en memoria + refresh token en cookie |
| React Query | Manejo de caché, estados de loading/error y refetch automático |
| Tests | Vitest + Testing Library para componentes y servicios |
| Interceptor Axios | Token agregado automáticamente a todos los requests en lugar de pasarlo manualmente |
| Variables de entorno | URLs de APIs en `.env` en lugar de hardcodeadas |
| i18n | Internacionalización con `react-i18next` si la app escala a múltiples mercados |
| Backend real | API REST con persistencia real en base de datos |

---

## ✅ Requerimientos cubiertos

| Requerimiento | Estado |
|---|---|
| Login simulado OAuth2 | ✅ |
| Manejo de sesión / token | ✅ |
| Perfil con nombre, email, información básica | ✅ |
| Gestión de dispositivos con confirmación | ✅ |
| Activity Log con paginación | ✅ |
| Integración API pública externa (randomuser.me) | ✅ |
| Edición de perfil con validación y feedback | ✅ opcional |
| README | ✅ |