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
    "Eso no suena bien... inténtalo de nuevo 🙈",
    "Mi corazón ha sufrido un pequeño cortocircuito 💔",
    "¿Y si te digo que habrá postre? 🍰",
    "Reconsideración en progreso... 🔄",
    "Oye, que yo me ducho y todo 😅",
    "Último aviso antes de poner cara triste 🥲",
    "Eso duele más que el WiFi cortado",
    "¿Seguro? Porque yo sé dónde hacen el mejor tiramisú...",
    "El universo dice que deberías pulsar Sí ✨",
    "Hasta mi gato pensaría que es mala idea decir no",
    "Inténtalo de nuevo, esta vez con el corazón 💛",
    "Ese no no cuenta, estabas parpadeando",
    "Procesando respuesta incorrecta... 🤖",
    "Spoiler: el Sí lleva a una noche increíble 🌙",
    "¿De verdad? ¿De verdaaaad? 👀",
    "Botón No temporalmente fuera de servicio 🚧",
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

btnNo.addEventListener("click", () => {
    intentosNo++;

    // Escalar el botón Sí
    escalaSi = Math.min(escalaSi + 0.3);
    btnSi.style.transform = `scale(${escalaSi})`;

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

function iniciarMusica() {
    const musica = document.getElementById("musica");
    if (musica) {
        musica.play().catch(() => {}); // El catch evita errores si el navegador bloquea el autoplay
    }
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