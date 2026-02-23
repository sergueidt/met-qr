# 🚀 INSTRUCCIONES DE DEPLOY — MET QR
## Netlify + Firebase Firestore (tiempo real)

---

## PASO 1 — CREAR PROYECTO FIREBASE

1. Abrí https://console.firebase.google.com
2. Iniciá sesión con **metrevolution2020@gmail.com**
3. Clic en **"Agregar proyecto"**
4. Nombre: `met-qr` → Continuar → Desactivar Google Analytics → **Crear proyecto**
5. Esperá que termine (aprox. 30 segundos)

---

## PASO 2 — ACTIVAR FIRESTORE

1. En el menú lateral: **Firestore Database** → **Crear base de datos**
2. Seleccioná **"Comenzar en modo de producción"** → Siguiente
3. Ubicación: **us-central1** (o la más cercana) → **Habilitar**

---

## PASO 3 — CONFIGURAR REGLAS DE FIRESTORE

1. En Firestore → pestaña **"Reglas"**
2. Reemplazá TODO el contenido con esto:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /metqr/data {
      allow read, write: if true;
    }
  }
}
```

3. Clic en **"Publicar"**

> ⚠️ Estas reglas permiten acceso público (adecuado para esta app).
> Si querés más seguridad en el futuro, se pueden restringir.

---

## PASO 4 — OBTENER LA CONFIG DE FIREBASE

1. En Firebase Console → ícono ⚙️ (arriba) → **"Configuración del proyecto"**
2. Bajá hasta **"Tus apps"** → clic en **"</> Web"**
3. Nombre de la app: `met-qr-web` → **"Registrar app"**
4. Copiá el objeto `firebaseConfig` que aparece, tiene este formato:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "met-qr.firebaseapp.com",
  projectId: "met-qr",
  storageBucket: "met-qr.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

---

## PASO 5 — PEGAR LA CONFIG EN index.html

1. Abrí el archivo `index.html` en un editor de texto (Notepad, VS Code, etc.)
2. Buscá el bloque que dice `// ⚠️ REEMPLAZAR CON LA CONFIG REAL`
3. Reemplazá los valores uno por uno:

**ANTES:**
```javascript
const FIREBASE_CONFIG = {
  apiKey:            "REEMPLAZAR_API_KEY",
  authDomain:        "REEMPLAZAR_AUTH_DOMAIN",
  projectId:         "REEMPLAZAR_PROJECT_ID",
  storageBucket:     "REEMPLAZAR_STORAGE_BUCKET",
  messagingSenderId: "REEMPLAZAR_MESSAGING_SENDER_ID",
  appId:             "REEMPLAZAR_APP_ID"
};
```

**DESPUÉS (con tus valores reales):**
```javascript
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSy...",
  authDomain:        "met-qr.firebaseapp.com",
  projectId:         "met-qr",
  storageBucket:     "met-qr.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123"
};
```

4. Guardá el archivo

---

## PASO 6 — SUBIR A NETLIFY

### Opción A — Arrastrando la carpeta (más fácil, recomendado)

1. Abrí https://netlify.com y creá una cuenta gratuita (o iniciá sesión)
2. En el Dashboard, buscá el área que dice **"Want to deploy a new site without connecting to Git?"**
3. Abajo dice **"drag and drop your site folder here"**
4. **Arrastrá la carpeta entera** `metqr-deploy` a esa zona
5. Netlify sube todo automáticamente y te da una URL como `https://amazing-name-123.netlify.app`
6. ¡Listo! La app está online

### Opción B — Con GitHub (recomendado para actualizaciones futuras)

1. Creá repositorio en https://github.com con el nombre `met-qr`
2. Subí todos los archivos de la carpeta `metqr-deploy`
3. En Netlify → **"Add new site"** → **"Import an existing project"** → GitHub
4. Seleccioná el repo `met-qr` → Deploy
5. Cada vez que actualices los archivos en GitHub, Netlify se actualiza solo

---

## PASO 7 — PERSONALIZAR EL DOMINIO (opcional)

1. En Netlify → tu sitio → **"Domain settings"**
2. Clic en **"Add custom domain"**
3. Podés usar un dominio propio (ej: `metqr.metrevolutionbox.com`) si tenés uno
4. O podés cambiar el subdominio gratuito a algo como `metqr.netlify.app`
   - En **"Options"** → **"Edit site name"** → escribí `metqr` → Guardar

---

## ✅ VERIFICACIÓN FINAL

Después del deploy, verificá que todo funcione:

1. **Abrí la URL** en tu celular
2. **Ingresá como admin:**
   - Email: `metrevolution2020@gmail.com`
   - Contraseña: `Pdimastres.com.net3`
3. **Creá un alumno** desde Admin → + Nuevo
4. **Abrí la URL del alumno** en otra pestaña/dispositivo
5. **Desde admin, asigná un cupón** al alumno
6. **Verificá** que aparezca inmediatamente en la pantalla del alumno (tiempo real ✅)

---

## 📱 CÓMO GUARDAR EN PANTALLA DE INICIO

### Android / Chrome:
- Al abrir la app, aparece un banner automático que dice **"Guardar MET QR en tu inicio"**
- Tocá **"Guardar"** → ya queda como app con el ícono QR

### iPhone / Safari:
- Abrí la URL en **Safari** (no Chrome)
- La app muestra instrucciones con el banner
- Tocá el ícono □↑ → "Añadir a pantalla de inicio" → el nombre ya aparece como **"MET QR"**

---

## 🔄 CÓMO FUNCIONA EL TIEMPO REAL

- Todos los cambios del admin (cupones, créditos, noticias, gift cards) se guardan en **Firebase Firestore**
- Todos los dispositivos conectados reciben la actualización en **menos de 1 segundo**
- Si un dispositivo está offline, recibe los cambios cuando vuelve a conectarse
- Sin Firebase configurado, funciona igual pero solo con localStorage (sin sincronización)

---

## 📁 ARCHIVOS INCLUIDOS EN LA CARPETA

```
metqr-deploy/
├── index.html      ← La app completa
├── manifest.json   ← Configuración PWA (nombre MET QR, ícono)
├── sw.js           ← Service Worker (funciona offline)
├── icon-192.png    ← Ícono QR 192px
├── icon-512.png    ← Ícono QR 512px
├── netlify.toml    ← Configuración de Netlify
└── INSTRUCCIONES.md ← Este archivo
```

---

## ❓ PROBLEMAS COMUNES

**"Firebase no conectado" en consola:**
→ Revisá que pegaste correctamente los valores en `FIREBASE_CONFIG`

**Los cambios no se sincronizan:**
→ Verificá las reglas de Firestore (Paso 3)
→ Abrí la consola del navegador (F12) y buscá errores

**La app no aparece para instalar en iPhone:**
→ Debe abrirse en Safari, no en Chrome ni otro navegador

**Error al subir a Netlify:**
→ Asegurate de arrastrar la carpeta entera, no solo el index.html
