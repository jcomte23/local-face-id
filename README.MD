# Local Face ID

Este proyecto implementa un sistema de autenticación local utilizando reconocimiento facial a través de la cámara del dispositivo.  
El objetivo es ofrecer una alternativa ligera y sin conexión a internet para validar la identidad del usuario.

## 🚀 Características

- Registro de rostro desde la cámara del dispositivo.
- Inicio de sesión mediante comparación facial.
- Funciona de manera local, sin necesidad de conexión a internet.
- Interfaz sencilla y rápida de usar.

## 🛠️ Tecnologías utilizadas

- **HTML5**, **CSS3**, **JavaScript** y **Vite** para la interfaz y lógica principal.
- **Face API.js** (basada en TensorFlow.js) para el reconocimiento facial.
- **LocalStorage** para almacenar temporalmente los datos del rostro.

## 📂 Estructura del proyecto
```
local-face-id/
├── index.html
├── src/
│ │ └── styles.css
│ │ ├── main.js
├── public/
│ └── (imágenes, íconos, etc.)
├── License
├── README.md
└── .gitignore
```


## ⚙️ Instalación y uso

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/jcomte23/local-face-id.git
   cd local-face-id
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Ejecutar el proyecto:
   ```bash
   npm run dev
   ```
## ⚙️ Ejemplo de flujo

1. El usuario abre la aplicación y registra su rostro.

2. La aplicación guarda la información en el navegador (LocalStorage).

3. Al volver a iniciar sesión, el sistema compara la cámara con el registro local.

## 📌 Notas importantes

1. El reconocimiento facial puede variar según la iluminación y la calidad de la cámara.

2. Este proyecto es educativo y no debe usarse en producción para sistemas que requieran alta seguridad.

3. Los datos se almacenan únicamente en el navegador, no se envían a servidores externos.

## ⚙️ Autor

Este proyecto fue creado por **[Javier Cómbita Téllez](https://github.com/jcomte23)**. 

Si tienes alguna pregunta o comentario sobre el proyecto, puedes contactar con Javier en Jcomte23@outlook.com.
