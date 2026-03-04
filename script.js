const EXTENSION = "jpg";

function generarImagenes(total) {
    const imgs = [];
    for (let i = 1; i <= total; i++) {
        imgs.push(`img/foto${i}.${EXTENSION}`);
    }
    return imgs;
}

const imagenes = generarImagenes(56);
const anchoFoto = 180;
const altoFoto = 180;

function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let timeouts = [];

function colocarFotos() {
    document.querySelectorAll(".foto-fondo").forEach(f => f.remove());
    timeouts.forEach(t => clearTimeout(t));
    timeouts = [];

    const W = window.innerWidth;
    const H = window.innerHeight;
    const total = imagenes.length; // 56 fotos

    // Calcula la cuadrícula óptima para que total fotos cubran la pantalla
    // Ratio de la pantalla para distribuir filas/columnas proporcionalmente
    const ratio = W / H;
    const cols = Math.round(Math.sqrt(total * ratio));
    const rows = Math.ceil(total / cols);

    // Tamaño de celda exacto para cubrir la pantalla completa
    const celdaW = Math.ceil(W / cols);
    const celdaH = Math.ceil(H / rows);

    // Mezcla las fotos
    const fotosMezcladas = [...imagenes];
    mezclar(fotosMezcladas);

    fotosMezcladas.forEach((ruta, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        // Centro de la celda + pequeño offset aleatorio para naturalidad
        const offsetX = Math.round((Math.random() * 16) - 8);
        const offsetY = Math.round((Math.random() * 16) - 8);

        const posX = Math.round(col * celdaW + (celdaW - celdaW) / 2) + offsetX;
        const posY = Math.round(row * celdaH + (celdaH - celdaH) / 2) + offsetY;

        const t = setTimeout(() => {
            crearFoto(ruta, posX, posY, celdaW, celdaH);
        }, index * 80);

        timeouts.push(t);
    });
}

function crearFoto(ruta, x, y, w, h) {
    const foto = document.createElement("img");
    foto.src = ruta;
    foto.onerror = () => foto.remove();
    foto.classList.add("foto-fondo");

    foto.style.left   = x + "px";
    foto.style.top    = y + "px";
    foto.style.width  = w + "px";  // tamaño dinámico según cuadrícula
    foto.style.height = h + "px";

    const rotacion = Math.round(((Math.random() * 16) - 8) * 10) / 10;
    foto.style.transform = `rotate(${rotacion}deg)`;
    foto.style.willChange = "auto";

    document.body.appendChild(foto);
}
/*const EXTENSION = "jpg"; // ← cambia aquí si tus fotos son .jpeg

function generarImagenes(total) {
    const imgs = [];
    for (let i = 1; i <= total; i++) {
        imgs.push(`img/foto${i}.${EXTENSION}`);
    }
    return imgs;
}

const imagenes = generarImagenes(56); // ← cambia 21 por el número de fotos que tengas

const anchoFoto = 180;
const altoFoto = 180;

function mezclar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

mezclar(imagenes);

let timeouts = [];

function colocarFotos() {
    document.querySelectorAll(".foto-fondo").forEach(f => f.remove());
    timeouts.forEach(t => clearTimeout(t));
    timeouts = [];

    const posiciones = [];
    const maxIntentos = 100;

    imagenes.forEach((ruta, index) => {
        const t = setTimeout(() => {
            let colocado = false;
            let intentos = 0;

            while (!colocado && intentos < maxIntentos) {
                intentos++;
                const maxX = window.innerWidth - anchoFoto;
                const maxY = window.innerHeight - altoFoto;
                const posX = Math.round(Math.random() * maxX);
                const posY = Math.round(Math.random() * maxY);

                let colision = posiciones.some(p => {
                    return !(posX + anchoFoto < p.x || posX > p.x + anchoFoto ||
                            posY + altoFoto < p.y || posY > p.y + altoFoto);
                });

                if (!colision) {
                    crearFoto(ruta, posX, posY);
                    posiciones.push({ x: posX, y: posY });
                    colocado = true;
                }
            }

            if (!colocado) {
                const posX = Math.round(Math.random() * (window.innerWidth - anchoFoto));
                const posY = Math.round(Math.random() * (window.innerHeight - altoFoto));
                crearFoto(ruta, posX, posY);
            }
        }, index * 200);

        timeouts.push(t);
    });
}

function crearFoto(ruta, x, y) {
    const foto = document.createElement("img");
    foto.src = ruta;
    foto.onerror = () => foto.remove(); // ignora silenciosamente las que no existan
    foto.classList.add("foto-fondo");
    foto.style.left = x + "px";
    foto.style.top = y + "px";
    const rotacion = Math.round(((Math.random() * 20) - 10) * 10) / 10;
    foto.style.transform = `rotate(${rotacion}deg)`;
    foto.style.imageRendering = "auto";
    foto.style.willChange = "auto";
    document.body.appendChild(foto);
}*/

function generarLuces() {
    document.querySelectorAll(".luz").forEach(l => l.remove());
    const cantidad = Math.floor((window.innerWidth * window.innerHeight) / 25000);

    for (let i = 0; i < cantidad; i++) {
        const luz = document.createElement("div");
        luz.classList.add("luz");
        luz.style.left = Math.random() * window.innerWidth + "px";
        luz.style.top = Math.random() * window.innerHeight + "px";
        luz.style.animationDuration = 1 + Math.random() * 2 + "s";
        document.body.appendChild(luz);
    }
}

const btnEmpezar = document.querySelector(".btn-empezar");
const container = document.querySelector(".container");
const invitacion = document.getElementById("invitacion");

btnEmpezar.addEventListener("click", () => {
    btnEmpezar.classList.add("fade-out");
    setTimeout(() => btnEmpezar.style.display = "none", 500);
    container.classList.add("animar");
    setTimeout(() => invitacion.classList.add("show"), 1000);
    iniciarMusica();
});

const btnSi = document.querySelector(".btn-si");
const btnNo = document.querySelector(".btn-no");

let escalaSi = 1;
let intentosNo = 0;

const frasesNo = [
    "¿Estás segura...? 🥺",
    "Piénsatelo otra vez...",
    "Venga, que tú quieres venir 😏",
    "Error 404: respuesta correcta no encontrada",
    "Eso no suena bien... inténtalo de nuevo",
    "Sinceramente, esa repuesta no me vale",
    "Reconsideración en progreso...",
    "Eso duele más que el WiFi cortado",
    "Hasta Rocco sabe que es mala idea decir no",
    "Inténtalo de nuevo, esta vez con el corazón 💛",
];

let fraseIndex = -1;
let frasesMezcladas = [...frasesNo];

function mezclarFrases() {
    for (let i = frasesMezcladas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [frasesMezcladas[i], frasesMezcladas[j]] = [frasesMezcladas[j], frasesMezcladas[i]];
    }
}

mezclarFrases();
const MAX_NOS = 10;

btnNo.addEventListener("click", () => {
    intentosNo++;

    // 💔 Varios corazones en posiciones aleatorias
    const cantidad = 3 + Math.floor(Math.random() * 4); // entre 3 y 6 por clic
    for (let i = 0; i < cantidad; i++) {
        setTimeout(() => {
            const rx = Math.random() * (window.innerWidth - 120);
            const ry = Math.random() * (window.innerHeight - 120);
            crearCorazonPartido(rx, ry);
        }, i * 120); // aparecen escalonados para más dramatismo
    }

    // Escalar el botón Sí
    escalaSi += 0.3;
    btnSi.style.transform = `scale(${escalaSi})`;

    // Al llegar al límite, eliminar el No y agrandar el Sí al máximo
    if (intentosNo >= MAX_NOS) {
        btnNo.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        btnNo.style.opacity = "0";
        btnNo.style.transform = "scale(0)";
        setTimeout(() => btnNo.remove(), 400);

        // Sí ocupa gran parte de la pantalla
        btnSi.style.transition = "transform 0.8s ease, box-shadow 0.8s ease";
        btnSi.style.transform = "scale(6)";
        btnSi.style.boxShadow = "0 0 60px rgba(46, 204, 113, 0.9)";
        return;
    }
    // Siguiente frase aleatoria
    fraseIndex++;
    if (fraseIndex >= frasesMezcladas.length) {
        mezclarFrases();
        fraseIndex = 0;
    }

    btnNo.textContent = frasesMezcladas[fraseIndex];

    // Escapar por la pantalla
    if (btnNo.parentElement !== document.body) {
        btnNo.style.padding = "12px 30px";
        btnNo.style.fontSize = "1.1rem";
        btnNo.style.borderRadius = "30px";
        btnNo.style.border = "none";
        btnNo.style.cursor = "pointer";
        btnNo.style.color = "white";
        btnNo.style.background = "#e74c3c";
        document.body.appendChild(btnNo);
    }

    btnNo.style.position = "fixed";
    btnNo.style.zIndex = "9999";
    btnNo.style.boxShadow = "0 8px 20px rgba(231, 76, 60, 0.5)";

    const btnW = btnNo.getBoundingClientRect().width;
    const btnH = btnNo.getBoundingClientRect().height;

    const margenX = window.innerWidth * 0.05;
    const margenY = window.innerHeight * 0.05;

    const areaMaxX = window.innerWidth - margenX - btnW;
    const areaMaxY = window.innerHeight - margenY - btnH;

    const posX = margenX + Math.random() * (areaMaxX - margenX);
    const posY = margenY + Math.random() * (areaMaxY - margenY);

    btnNo.style.left = posX + "px";
    btnNo.style.top = posY + "px";
});

const COLORES_CONFETI = ["#f39c12","#2ecc71","#e74c3c","#3498db","#9b59b6","#1abc9c","#e91e8c"];

function lanzarConfeti() {
    const cantidad = 120;

    for (let i = 0; i < cantidad; i++) {
        setTimeout(() => {
            const pieza = document.createElement("div");
            pieza.classList.add("confeti");

            // posición y color aleatorios
            pieza.style.left     = Math.random() * 100 + "vw";
            pieza.style.background = COLORES_CONFETI[Math.floor(Math.random() * COLORES_CONFETI.length)];

            // tamaño ligeramente aleatorio
            const tam = 8 + Math.random() * 10;
            pieza.style.width  = tam + "px";
            pieza.style.height = tam * 1.4 + "px";

            // duración y delay aleatorios para que no caigan todas igual
            const duracion = 2.5 + Math.random() * 2;
            pieza.style.animationDuration = duracion + "s";

            document.body.appendChild(pieza);

            // se elimina del DOM al terminar para no acumular elementos
            pieza.addEventListener("animationend", () => pieza.remove());

        }, i * 25); // pequeño delay escalonado entre piezas
    }
}

btnSi.addEventListener("click", () => {
    lanzarConfeti();
    btnSi.remove();
    btnNo.remove();
    document.querySelector(".texto-invitacion").remove();

    // Oculta el contenedor de la invitación
    document.getElementById("invitacion").style.display = "none";

    // 🌸 Ramos desde abajo a ambos lados
    setTimeout(() => {
        crearRamoFlores('izquierda');
        crearRamoFlores('derecha');
    }, 600);

    // Crea un contenedor nuevo independiente
    const contenedor = document.createElement("div");
    contenedor.classList.add("texto-respuesta-wrapper");

    const respuesta = document.createElement("p");
    respuesta.classList.add("texto-respuesta");
    respuesta.innerHTML = `
        ¡Perfecto! Sabía que tú también querías salir a cenar conmigo.<br>
        Te recojo a las 21h, nos vamos a cenar y después a tomar algo.<br>
        Tú solo ponte hermosa. Yo me encargo de lo demás… y de hacer las cosas bien esta vez.
    `;

    contenedor.appendChild(respuesta);
    document.body.appendChild(contenedor);
    // Calcula la posición correcta tras la animación del título
    setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const espacioDesdeContainer = containerRect.bottom + 24; // 24px de separación
        const alturaWrapper = contenedor.getBoundingClientRect().height;
        const centroY = espacioDesdeContainer + alturaWrapper / 2;
        const topPct = (centroY / window.innerHeight) * 100;

        contenedor.style.top = topPct + "%";
    }, 1100); // espera a que termine subirTexto (1s) + margen
});

function llueviaFrambuesas() {
    const totalFrambuesas = Math.floor(window.innerWidth / 180);
    for (let i = 0; i < totalFrambuesas; i++) {
        crearFrambuesa(i * (Math.random() * 500 + 200));
    }
}

function crearFrambuesa(delay) {
    const frambuesa = document.createElement("img");
    frambuesa.src = "img/frambuesa.webp";
    frambuesa.classList.add("frambuesa");

    const size = 30 + Math.random() * 30;
    frambuesa.style.width = size + "px";
    frambuesa.style.height = size + "px";
    frambuesa.style.left = Math.random() * (window.innerWidth - size) + "px";

    const duracion = 3 + Math.random() * 3;
    frambuesa.style.animationDuration = duracion + "s";
    frambuesa.style.animationDelay = delay + "ms";

    document.body.appendChild(frambuesa);

    frambuesa.addEventListener("animationend", () => {
        frambuesa.style.left = Math.random() * (window.innerWidth - size) + "px";
        frambuesa.style.animationDelay = "0ms";
        frambuesa.style.animation = "none";
        void frambuesa.offsetWidth;
        frambuesa.style.animation = "";
        frambuesa.style.animationDuration = (3 + Math.random() * 3) + "s";
    });
}

function crearRamoFlores(lado) {
    const ramo = document.createElement("div");
    ramo.style.cssText = `
        position: fixed;
        bottom: -600px;
        ${lado === 'izquierda' ? 'left: -30px' : 'right: -30px'};
        width: 420px;
        height: 620px;
        z-index: 15;
        pointer-events: none;
        transition: bottom 2.5s cubic-bezier(0.22, 1, 0.36, 1);
        ${lado === 'derecha' ? 'transform: scaleX(-1)' : ''};
    `;

    ramo.innerHTML = `
    <svg viewBox="0 0 420 620" xmlns="http://www.w3.org/2000/svg" width="420" height="620">

    <!-- TALLOS PRINCIPALES -->
    <path d="M210 620 Q195 520 180 440 Q165 360 175 280 Q182 230 190 190" stroke="#3d6b33" stroke-width="7" fill="none" stroke-linecap="round"/>
    <path d="M210 620 Q225 530 235 450 Q245 370 238 290 Q232 240 225 195" stroke="#3d6b33" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M210 620 Q205 530 208 460 Q211 390 205 300 Q202 250 207 200" stroke="#4a7c3f" stroke-width="5" fill="none" stroke-linecap="round"/>
    <!-- tallos laterales -->
    <path d="M195 500 Q160 470 130 430 Q105 395 100 350" stroke="#4a7c3f" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M220 480 Q255 450 275 410 Q292 375 288 330" stroke="#4a7c3f" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M185 420 Q155 390 140 350 Q128 315 135 280" stroke="#5a8f4a" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M230 400 Q258 370 268 330 Q275 298 265 265" stroke="#5a8f4a" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M200 350 Q175 310 170 270 Q165 235 178 210" stroke="#4a7c3f" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M218 340 Q242 302 248 262 Q252 228 240 205" stroke="#4a7c3f" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- HOJAS ABUNDANTES -->
    <ellipse cx="168" cy="460" rx="30" ry="12" fill="#3d6b33" transform="rotate(-40 168 460)" opacity="0.95"/>
    <ellipse cx="250" cy="470" rx="28" ry="11" fill="#4a7c3f" transform="rotate(35 250 470)" opacity="0.95"/>
    <ellipse cx="155" cy="390" rx="28" ry="11" fill="#3d6b33" transform="rotate(-50 155 390)" opacity="0.9"/>
    <ellipse cx="258" cy="400" rx="26" ry="10" fill="#5a8f4a" transform="rotate(42 258 400)" opacity="0.9"/>
    <ellipse cx="160" cy="320" rx="26" ry="10" fill="#4a7c3f" transform="rotate(-45 160 320)" opacity="0.9"/>
    <ellipse cx="255" cy="328" rx="25" ry="10" fill="#3d6b33" transform="rotate(38 255 328)" opacity="0.9"/>
    <ellipse cx="172" cy="255" rx="24" ry="9" fill="#5a8f4a" transform="rotate(-35 172 255)" opacity="0.85"/>
    <ellipse cx="245" cy="260" rx="23" ry="9" fill="#4a7c3f" transform="rotate(30 245 260)" opacity="0.85"/>
    <ellipse cx="118" cy="345" rx="22" ry="9" fill="#3d6b33" transform="rotate(-55 118 345)" opacity="0.85"/>
    <ellipse cx="295" cy="338" rx="22" ry="9" fill="#4a7c3f" transform="rotate(50 295 338)" opacity="0.85"/>
    <!-- hojas pequeñas decorativas -->
    <ellipse cx="140" cy="280" rx="18" ry="7" fill="#5a8f4a" transform="rotate(-60 140 280)" opacity="0.8"/>
    <ellipse cx="278" cy="272" rx="18" ry="7" fill="#3d6b33" transform="rotate(55 278 272)" opacity="0.8"/>
    <ellipse cx="185" cy="210" rx="16" ry="6" fill="#4a7c3f" transform="rotate(-30 185 210)" opacity="0.8"/>
    <ellipse cx="228" cy="208" rx="16" ry="6" fill="#5a8f4a" transform="rotate(25 228 208)" opacity="0.8"/>

    <!-- ===== FLORES ===== -->

    <!-- ROSA GRANDE roja (centro) -->
    <g transform="translate(207, 175)">
        <circle cx="0" cy="0" r="28" fill="#dc1f4e"/>
        <ellipse cx="-13" cy="-8" rx="18" ry="13" fill="#f04470" transform="rotate(-25 -13 -8)"/>
        <ellipse cx="13" cy="-9" rx="17" ry="12" fill="#f04470" transform="rotate(25 13 -9)"/>
        <ellipse cx="0" cy="13" rx="18" ry="12" fill="#f04470" transform="rotate(5 0 13)"/>
        <ellipse cx="-16" cy="8" rx="15" ry="11" fill="#e8305a" transform="rotate(-35 -16 8)"/>
        <ellipse cx="16" cy="8" rx="15" ry="11" fill="#e8305a" transform="rotate(35 16 8)"/>
        <ellipse cx="-8" cy="-18" rx="13" ry="9" fill="#f04470" transform="rotate(-15 -8 -18)"/>
        <ellipse cx="8" cy="-18" rx="12" ry="9" fill="#f04470" transform="rotate(15 8 -18)"/>
        <circle cx="0" cy="0" r="12" fill="#b8103a"/>
        <circle cx="0" cy="0" r="6" fill="#8c0828"/>
    </g>

    <!-- GIRASOL GRANDE (izquierda) -->
    <g transform="translate(138, 200)">
        <ellipse cx="0" cy="-30" rx="10" ry="18" fill="#fbbf24"/>
        <ellipse cx="0" cy="-30" rx="10" ry="18" fill="#fbbf24" transform="rotate(30 0 0)"/>
        <ellipse cx="0" cy="-30" rx="10" ry="18" fill="#fbbf24" transform="rotate(60 0 0)"/>
        <ellipse cx="0" cy="-30" rx="10" ry="18" fill="#fbbf24" transform="rotate(90 0 0)"/>
        <ellipse cx="0" cy="-30" rx="10" ry="18" fill="#fbbf24" transform="rotate(120 0 0)"/>
        <ellipse cx="0" cy="-30" rx="10" ry="18" fill="#fbbf24" transform="rotate(150 0 0)"/>
        <ellipse cx="0" cy="-30" rx="9" ry="16" fill="#f59e0b" transform="rotate(15 0 0)"/>
        <ellipse cx="0" cy="-30" rx="9" ry="16" fill="#f59e0b" transform="rotate(45 0 0)"/>
        <ellipse cx="0" cy="-30" rx="9" ry="16" fill="#f59e0b" transform="rotate(75 0 0)"/>
        <ellipse cx="0" cy="-30" rx="9" ry="16" fill="#f59e0b" transform="rotate(105 0 0)"/>
        <ellipse cx="0" cy="-30" rx="9" ry="16" fill="#f59e0b" transform="rotate(135 0 0)"/>
        <ellipse cx="0" cy="-30" rx="9" ry="16" fill="#f59e0b" transform="rotate(165 0 0)"/>
        <circle cx="0" cy="0" r="20" fill="#4a2008"/>
        <circle cx="0" cy="0" r="15" fill="#2d1205"/>
        <circle cx="-5" cy="-5" r="2.5" fill="#5c3317"/>
        <circle cx="5" cy="-5" r="2.5" fill="#5c3317"/>
        <circle cx="0" cy="5" r="2.5" fill="#5c3317"/>
        <circle cx="-7" cy="3" r="2" fill="#5c3317"/>
        <circle cx="7" cy="3" r="2" fill="#5c3317"/>
        <circle cx="-3" cy="-8" r="2" fill="#5c3317"/>
        <circle cx="3" cy="-8" r="2" fill="#5c3317"/>
    </g>

    <!-- TULIPÁN ROSA (derecha centro) -->
    <g transform="translate(278, 185)">
        <path d="M0 10 Q-20 -10 -16 -50 Q-8 -75 0 -68" fill="#ec4899" stroke="#be185d" stroke-width="1.5"/>
        <path d="M0 10 Q20 -10 16 -50 Q8 -75 0 -68" fill="#ec4899" stroke="#be185d" stroke-width="1.5"/>
        <path d="M0 10 Q-10 -30 0 -68 Q10 -30 0 10" fill="#f472b6"/>
        <path d="M-16 -5 Q-26 -35 -20 -62" fill="#db2777" stroke="#be185d" stroke-width="1.5"/>
        <path d="M16 -5 Q26 -35 20 -62" fill="#db2777" stroke="#be185d" stroke-width="1.5"/>
    </g>

    <!-- LIRIO MORADO (izquierda arriba) -->
    <g transform="translate(162, 150)">
        <ellipse cx="0" cy="-28" rx="9" ry="24" fill="#7c3aed" transform="rotate(0 0 0)"/>
        <ellipse cx="0" cy="-28" rx="9" ry="24" fill="#7c3aed" transform="rotate(60 0 0)"/>
        <ellipse cx="0" cy="-28" rx="9" ry="24" fill="#7c3aed" transform="rotate(120 0 0)"/>
        <ellipse cx="0" cy="-28" rx="8" ry="22" fill="#a78bfa" transform="rotate(30 0 0)"/>
        <ellipse cx="0" cy="-28" rx="8" ry="22" fill="#a78bfa" transform="rotate(90 0 0)"/>
        <ellipse cx="0" cy="-28" rx="8" ry="22" fill="#a78bfa" transform="rotate(150 0 0)"/>
        <circle cx="0" cy="0" r="7" fill="#fde68a"/>
        <line x1="0" y1="-7" x2="0" y2="-20" stroke="#d97706" stroke-width="2"/>
        <line x1="-6" y1="-4" x2="-14" y2="-16" stroke="#d97706" stroke-width="2"/>
        <line x1="6" y1="-4" x2="14" y2="-16" stroke="#d97706" stroke-width="2"/>
        <circle cx="0" cy="-21" r="3" fill="#b45309"/>
        <circle cx="-15" cy="-17" r="3" fill="#b45309"/>
        <circle cx="15" cy="-17" r="3" fill="#b45309"/>
    </g>

    <!-- ROSA NARANJA (derecha abajo) -->
    <g transform="translate(268, 285)">
        <circle cx="0" cy="0" r="22" fill="#ea580c"/>
        <ellipse cx="-10" cy="-7" rx="15" ry="11" fill="#fb923c" transform="rotate(-20 -10 -7)"/>
        <ellipse cx="10" cy="-7" rx="14" ry="10" fill="#fb923c" transform="rotate(20 10 -7)"/>
        <ellipse cx="0" cy="10" rx="15" ry="10" fill="#fb923c"/>
        <ellipse cx="-13" cy="5" rx="12" ry="9" fill="#f97316" transform="rotate(-30 -13 5)"/>
        <ellipse cx="13" cy="5" rx="12" ry="9" fill="#f97316" transform="rotate(30 13 5)"/>
        <circle cx="0" cy="0" r="8" fill="#c2410c"/>
    </g>

    <!-- TULIPÁN AMARILLO (izquierda) -->
    <g transform="translate(125, 295)">
        <path d="M0 10 Q-18 -8 -14 -44 Q-6 -66 0 -60" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>
        <path d="M0 10 Q18 -8 14 -44 Q6 -66 0 -60" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>
        <path d="M0 10 Q-8 -26 0 -60 Q8 -26 0 10" fill="#fef08a"/>
        <path d="M-14 -5 Q-22 -30 -18 -55" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
        <path d="M14 -5 Q22 -30 18 -55" fill="#facc15" stroke="#ca8a04" stroke-width="1.5"/>
    </g>

    <!-- LIRIO BLANCO (centro derecha) -->
    <g transform="translate(252, 220)">
        <ellipse cx="0" cy="-22" rx="7" ry="19" fill="#f1f5f9" transform="rotate(0 0 0)"/>
        <ellipse cx="0" cy="-22" rx="7" ry="19" fill="#f1f5f9" transform="rotate(60 0 0)"/>
        <ellipse cx="0" cy="-22" rx="7" ry="19" fill="#f1f5f9" transform="rotate(120 0 0)"/>
        <ellipse cx="0" cy="-22" rx="6" ry="17" fill="#e2e8f0" transform="rotate(30 0 0)"/>
        <ellipse cx="0" cy="-22" rx="6" ry="17" fill="#e2e8f0" transform="rotate(90 0 0)"/>
        <ellipse cx="0" cy="-22" rx="6" ry="17" fill="#e2e8f0" transform="rotate(150 0 0)"/>
        <circle cx="0" cy="0" r="6" fill="#fef9c3"/>
        <line x1="0" y1="-6" x2="0" y2="-17" stroke="#a16207" stroke-width="1.5"/>
        <line x1="-5" y1="-3" x2="-12" y2="-13" stroke="#a16207" stroke-width="1.5"/>
        <line x1="5" y1="-3" x2="12" y2="-13" stroke="#a16207" stroke-width="1.5"/>
        <circle cx="0" cy="-18" r="2.5" fill="#92400e"/>
        <circle cx="-13" cy="-14" r="2.5" fill="#92400e"/>
        <circle cx="13" cy="-14" r="2.5" fill="#92400e"/>
    </g>

    <!-- GIRASOL PEQUEÑO (fondo derecha) -->
    <g transform="translate(290, 255)" opacity="0.85">
        <ellipse cx="0" cy="-20" rx="7" ry="13" fill="#fbbf24"/>
        <ellipse cx="0" cy="-20" rx="7" ry="13" fill="#fbbf24" transform="rotate(45 0 0)"/>
        <ellipse cx="0" cy="-20" rx="7" ry="13" fill="#fbbf24" transform="rotate(90 0 0)"/>
        <ellipse cx="0" cy="-20" rx="7" ry="13" fill="#fbbf24" transform="rotate(135 0 0)"/>
        <ellipse cx="0" cy="-20" rx="6" ry="11" fill="#f59e0b" transform="rotate(22.5 0 0)"/>
        <ellipse cx="0" cy="-20" rx="6" ry="11" fill="#f59e0b" transform="rotate(67.5 0 0)"/>
        <ellipse cx="0" cy="-20" rx="6" ry="11" fill="#f59e0b" transform="rotate(112.5 0 0)"/>
        <ellipse cx="0" cy="-20" rx="6" ry="11" fill="#f59e0b" transform="rotate(157.5 0 0)"/>
        <circle cx="0" cy="0" r="13" fill="#3d1a06"/>
        <circle cx="0" cy="0" r="9" fill="#1e0a02"/>
    </g>

    <!-- ROSA FUCSIA (izquierda media) -->
    <g transform="translate(148, 310)">
        <circle cx="0" cy="0" r="20" fill="#c026d3"/>
        <ellipse cx="-9" cy="-6" rx="14" ry="10" fill="#d946ef" transform="rotate(-20 -9 -6)"/>
        <ellipse cx="9" cy="-6" rx="13" ry="9" fill="#d946ef" transform="rotate(20 9 -6)"/>
        <ellipse cx="0" cy="9" rx="14" ry="9" fill="#d946ef"/>
        <ellipse cx="-12" cy="4" rx="11" ry="8" fill="#c026d3" transform="rotate(-30 -12 4)"/>
        <ellipse cx="12" cy="4" rx="11" ry="8" fill="#c026d3" transform="rotate(30 12 4)"/>
        <circle cx="0" cy="0" r="7" fill="#a21caf"/>
    </g>

    <!-- PEQUEÑAS FLORES DE RELLENO -->
    <!-- Florecitas blancas -->
    <g transform="translate(185, 240)">
        <circle cx="0" cy="-10" r="5" fill="#fef2f2"/>
        <circle cx="9" cy="-4" r="5" fill="#fef2f2"/>
        <circle cx="6" cy="7" r="5" fill="#fef2f2"/>
        <circle cx="-6" cy="7" r="5" fill="#fef2f2"/>
        <circle cx="-9" cy="-4" r="5" fill="#fef2f2"/>
        <circle cx="0" cy="0" r="6" fill="#fde68a"/>
    </g>
    <g transform="translate(228, 250)">
        <circle cx="0" cy="-9" r="4" fill="#fce7f3"/>
        <circle cx="8" cy="-3" r="4" fill="#fce7f3"/>
        <circle cx="5" cy="6" r="4" fill="#fce7f3"/>
        <circle cx="-5" cy="6" r="4" fill="#fce7f3"/>
        <circle cx="-8" cy="-3" r="4" fill="#fce7f3"/>
        <circle cx="0" cy="0" r="5" fill="#fde68a"/>
    </g>
    <g transform="translate(200, 165)">
        <circle cx="0" cy="-8" r="4" fill="#ede9fe"/>
        <circle cx="7" cy="-3" r="4" fill="#ede9fe"/>
        <circle cx="4" cy="5" r="4" fill="#ede9fe"/>
        <circle cx="-4" cy="5" r="4" fill="#ede9fe"/>
        <circle cx="-7" cy="-3" r="4" fill="#ede9fe"/>
        <circle cx="0" cy="0" r="5" fill="#fef08a"/>
    </g>

    <!-- LAZADA -->
    <path d="M175 590 Q210 565 245 590" stroke="#fda4af" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M175 590 Q155 568 168 553 Q188 542 195 565" fill="#fda4af" opacity="0.95"/>
    <path d="M245 590 Q265 568 252 553 Q232 542 225 565" fill="#fda4af" opacity="0.95"/>
    <circle cx="210" cy="587" r="10" fill="#f472b6"/>
    <!-- cinta que baja -->
    <path d="M200 597 Q190 610 195 625" stroke="#fda4af" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M220 597 Q230 610 225 625" stroke="#fda4af" stroke-width="3" fill="none" stroke-linecap="round"/>

    </svg>
    `;

    document.body.appendChild(ramo);

    setTimeout(() => {
        ramo.style.bottom = "-60px";
    }, 50);
}

function iniciarMusica() {
    const musica = document.getElementById("musica");
    if (musica) {
        musica.play().catch(() => {}); // El catch evita errores si el navegador bloquea el autoplay
    }
}

function crearCorazonPartido(x, y) {
    const corazon = document.createElement("div");
    corazon.innerHTML = "💔";
    corazon.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${5 + Math.random() * 4}rem;
        z-index: 9998;
        pointer-events: none;
        animation: corazonPartido 1.5s ease forwards;
        transform-origin: center;
        filter: drop-shadow(0 0 12px rgba(231, 76, 60, 0.8));
    `;
    document.body.appendChild(corazon);
    corazon.addEventListener("animationend", () => corazon.remove());
}

window.onload = () => {
    colocarFotos();
    generarLuces();
    llueviaFrambuesas();
};

let resizeTimeout;
window.onresize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        colocarFotos();
        generarLuces();
        document.querySelectorAll(".frambuesa").forEach(f => f.remove());
        llueviaFrambuesas();
    }, 300);
};