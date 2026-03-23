"use strict";
/**
 * Clase que se encarga de los textos de idioma,
 * y la lógica del intercambio de los textos
 * @class idiomax
 */

/**
 * Objeto de la clase
 * @public
 */
TR3cfg.idiomax = {
    text: {}, actual: "", enable: !TR3cfg.idiomaxEnable, includes: ['ES', 'EN'], default: 'ES'
};

/**
 * Función de carga de textos de idioma en objeto
 */
function loadIdiomax() {
    TR3cfg.idiomax.text = {
        "saberM": {
            "message": {
                "ES": "saber más",
                "EN": "Learn more",
                "DE": "mehr erfahren",
                "FR": "en savoir plus",
                "AST": "----",
            },
            "description": "Aplicado a enlaces que abren en ventana nueva para documentar al usuario"
        },
        "mapa": {
            "message": {
                "ES": "Mapa",
                "EN": "Map",
                "DE": "Karte",
                "FR": "Carte",
                "AST": "----",
            },
            "description": "Indica el titulo del diálogo del mapa 2D"
        },
        "despla": {
            "message": {
                "ES": "Mover",
                "EN": "Drag",
                "DE": "Verschieben",
                "FR": "Déplacer",
                "AST": "----",
            },
            "description": "Descrive la función de mover el mapa 2D (draging)"
        },
        "herras": {
            "message": {
                "ES": "Herramientas",
                "EN": "Options",
                "DE": "Werkzeuge",
                "FR": "Outils",
                "AST": "----",
            },
            "description": "Indica el titulo del diálogo que manejan distintas opciones del usuario para operar o visualizar"
        },
        "slctTrack": {
            "message": {
                "ES": "Seleccionar Recorrido",
                "EN": "Select Track",
                "DE": "Strecke auswählen",
                "FR": "Sélectionner un parcours",
                "AST": "----",
            },
            "description": "Describe el imput select que da opción a seleccionar el track que el usuario quiere visualizar"
        },
        "legalInfo": {
            "message": {
                "ES": "Información Legal",
                "EN": "Legal",
                "DE": "Rechtliche Hinweise",
                "FR": "Informations légales",
                "AST": "----",
            },
            "description": "Indica el título del diálogo para las atribuciones y copyright"
        },
        "dist": {
            "message": {
                "ES": "DISTANCIA",
                "EN": "DISTANCE",
                "DE": "DISTANZ",
                "FR": "DISTANCE",
                "AST": "----",
            },
            "description": "Indica la longitud espacial acumulada que hay desde un punto a otro"
        },
        "desNvl": {
            "message": {
                "ES": "DESNIVEL",
                "EN": "ELEVATION",
                "DE": "HÖHENUNTERSCHIED",
                "FR": "DÉNIVELÉ",
                "AST": "----",
            },
            "description": "Indica la diferencia de altura espacial acumulada que entre dos puntos"
        },
        "download": {
            "message": {
                "ES": "Descargar",
                "EN": "Download",
                "DE": "Herunterladen",
                "FR": "Télécharger",
                "AST": "----",
            },
            "description": "texto de cada botón que permite descargar el recorrido que indica de la carrara"
        },
        "loading": {
            "message": {
                "ES": "Cargando",
                "EN": "Loading",
                "DE": "Laden",
                "FR": "Chargement",
                "AST": "----",
            },
            "description": "Texto de la barra de carga antes de entrar en al app"
        },
        "startNow": {
            "message": {
                "ES": "Comenzar ahora",
                "EN": "Start now",
                "DE": "Jetzt starten",
                "FR": "Commencer maintenant",
                "AST": "----",
            },
            "description": "Texto de la barra de carga justo al entrar en al app (500ms)"
        },
        "TtlGPS": {
            "message": {
                "ES": "Habilita la ubicación del GPS de tu teléfono",
                "EN": "Enable your phone's GPS location",
                "DE": "Aktiviere den GPS-Standort deines Smartphones",
                "FR": "Active la localisation GPS de ton téléphone",
                "AST": "----",
            },
            "description": "Mensaje del título del diálogo que avisa al usuario que debe habilitar la función GPS del móvil"
        },
        "bdyGPS": {
            "message": {
                "ES": "Para poder disfrutar de todas las funcionalidades del recorrido debes activar tu ubicación.",
                "EN": "Enable your phone’s GPS to enjoy all track features.",
                "DE": "Um alle Funktionen der Route nutzen zu können, musst du deinen Standort aktivieren.",
                "FR": "Pour profiter de toutes les fonctionnalités du parcours, active ta localisation.",
                "AST": "----",
            },
            "description": "Mensaje del cuerpo del diálogo que avisa al usuario que debe habilitar la función GPS del móvil"
        },
        "activeLoc": {
            "message": {
                "ES": "Activar ubicación",
                "EN": "Enable location",
                "DE": "Standort aktivieren",
                "FR": "Activer la localisation",
                "AST": "----",
            },
            "description": "texto en el botón para activar la geolocalización del usuario"
        },
        "state": {
            "message": {
                "ES": "Estado",
                "EN": "Status",
                "DE": "Status",
                "FR": "État",
                "AST": "----",
            },
            "description": "Estado de permisos del GPS del usuario"
        },
        "bdyStateGPS": {
            "message": {
                "ES": "Ha de habilitar la Geolocalización en el dispositivo y permitir acceso al navegador.<br><br>Consulte cómo aquí:",
                "EN": "Please enable geolocation on your device and allow access in your browser.<br><br>Learn how here:",
                "DE": "Du musst die Standortfreigabe auf deinem Gerät aktivieren und den Zugriff im Browser erlauben.<br><br>Mehr Infos hier:",
                "FR": "Active la géolocalisation sur ton appareil et autorise l’accès dans ton navigateur.<br><br>Voir comment ici :",
                "AST": "----",
            },
            "description": "Indica al usuario que ha de habilitar la geolocalización GPS y le ofrece enleces de consulta"
        },
        "tryAgain": {
            "message": {
                "ES": "Reintentar",
                "EN": "Try Again",
                "DE": "Erneut versuchen",
                "FR": "Réessayer",
                "AST": "----",
            },
            "description": "texto del botón que permite averiguar el permiso para acceder a la función GPS del dispositivo"
        },
        "cancelGPS": {
            "message": {
                "ES": "Deshabilitar Geolocalización",
                "EN": "Disable geolocation",
                "DE": "Standort deaktivieren",
                "FR": "Désactiver la géolocalisation",
                "AST": "----",
            },
            "description": "texto de botón que permite dejar de usar la geolocalización del dispositivo"
        },
        "next2placeTtl": {
            "message": {
                "ES": "Parece que estás alejado del recorrido",
                "EN": "Looks like you're currently away from the track.",
                "DE": "Du scheinst dich außerhalb der Route zu befinden",
                "FR": "Il semble que tu sois éloigné du parcours",
                "AST": "----",
            },
            "description": "título del diálogo que Indica al usuario que probablemente no esté en la zona de uso prevista para el GPS"
        },
        "next2placePrf": {
            "message": {
                "ES": "Revisa tu ubicación y activa la geolocalización cuando te encuentree por los alrededores de la zona.",
                "EN": "Make sure to check your location and turn on geolocation when you're nearby.",
                "DE": "Überprüfe deinen Standort und aktiviere die Geolokalisierung, wenn du dich in der Nähe der Route befindest.",
                "FR": "Vérifie ta position et active la géolocalisation quand tu te trouves à proximité de la zone.",
                "AST": "----",
            },
            "description": "cuerpo del diálogo que Indica al usuario que probablemente no esté en la zona de uso prevista para el GPS"
        },
        "introTtl": {
            "message": {
                "ES": "Inspecciona el recorrido",
                "EN": "Explore trail",
                "DE": "Strecke ansehen",
                "FR": "Explorer le parcours",
                "AST": "----",
            },
            "description": "titulo de diálogo de portada que invita al usuario a ver los recorridos de la carrera"
        },
        "devBy": {
            "message": {
                "ES": "Desarrollado por",
                "EN": "Developed By",
                "DE": "Entwickelt von",
                "FR": "Développé par",
                "AST": "----",
            },
            "description": "Indica que la app ha sido desarrollada por (terre3)"
        },
        "mapsBy": {
            "message": {
                "ES": "Mapas ofrecidos por ",
                "EN": "Maps offered by ",
                "DE": "Karten angeboten von ",
                "FR": "Cartes fournies par ",
                "AST": "----",
            },
            "description": "Indica que la app ha sido desarrollada por (terre3)"
        }
    }
};

/**
 * Creación e inicialización del sistema de idioma
 * 
 * @public
 * @param {string} idi - Idioma principal, para carga inicial
 * @param {boolean} insert - Si se crea el interfaz para cambio de idioma
 * @param {Array} includes - Idiomas que se incluyen para estar disponibles
 */
TR3cfg.idiomax.make = function (idi, insert, includes) {
    loadIdiomax();

    if (insert) {
        var addIdiom = '';
        var lang2include = includes || TR3cfg.idiomax.includes;
        TR3cfg.idiomax.includes = lang2include;
        for (let i = 0; i < lang2include.length; i++) {
            var key = lang2include[i];
            if (!i % 2) {
                addIdiom += '<span onclick="TR3cfg.idiomax.set(\'' + key + '\')"\
                    style="float: left">'+ key + '\
                </span>'
            } else {
                addIdiom += '<span style="float: left;color: ' + TR3cfg.mineColor + '">&nbsp;|&nbsp;</span>\
                <span onclick="TR3cfg.idiomax.set(\''+ key + '\')"\
                    style="float: left">'+ key + '\
                 </span>'
            }
        };
        var insertHtml = '\
        <span title="languages" id="idio" style="z-index:10000001 !important;position:absolute;bottom:20px;right:55px;color: #ccc; font-size: small; cursor: pointer">\
        '+ addIdiom + '\
        </span >';

        document.body.insertAdjacentHTML('afterbegin', insertHtml);
    } else {
        TR3cfg.idiomax.includes = [idi];
    }

    TR3cfg.loadIdiomClassExt = setInterval(function () {
        if (TR3cfg.loadIdiomaxExtClass) {
            clearInterval(TR3cfg.loadIdiomClassExt);

            loadIdiomaxExt();
            TR3cfg.idiomax.set(idi || TR3cfg.idiomax.get());
            document.getElementById("seccIntro").style.display = 'flex';
        }
    }, 100);
};

/**
 * Aplica el idioma al entorno web, cambiando los textos 
 * asociados al objeto de textos de idioma
 * 
 * @public
 * @param {string} idiom texto de idioma según el estandat, Ej: "ES" para español
 * @example
 * TR3cfg.idiomax.set('ES');
 * TR3cfg.idiomax.set(TR3cfg.idiomax.get());
 */
TR3cfg.idiomax.set = function (idiom) {

    var idi = idiom || TR3cfg.idiomax.get();
    var thisIdioma = TR3cfg.idiomax.text;
    document.querySelectorAll('[idiomax]').forEach(function (el) {
        var idEleI = el.getAttribute('idiomax');
        if (thisIdioma[idEleI] && thisIdioma[idEleI].message) el.innerHTML = thisIdioma[idEleI].message[idi];
    });
    if (thisIdioma.globals_title && thisIdioma.globals_title.message) {
        document.title = thisIdioma.globals_title.message[idi];
    }

    /*for (let i = 0; i < TR3cfg.Text2map3d.length; i++) {
        TR3.scene.remove(TR3cfg.Text2map3d[i]);
    }
    TR3cfg.Text2map3d = [];

    TR3cfg.loadMap3d = setInterval(function () {
        if (TR3.mesh && TR3cfg.tileGroup) {
            clearInterval(TR3cfg.loadMap3d);
            for (let i = 0; i < TR3cfg.objText2map.length; i++) {
                var txti = TR3cfg.objText2map[i];
                var txt2Mi = TR3cfg.objText2map[i];
                let textMap = TR3.makeTextMap(thisIdioma[txt2Mi.txt].message[idi],
                    {
                        pos: txti.pos,
                        font: '28px Arial',
                        bgColor: 'rgba(0, 0, 0, 0)',
                        textColor: '#fff',
                        height: 90,
                        rotate: false,
                        stroke: { color: 'rgb(0, 0, 0)', width: 5 }
                    });
                //textMap.name = 'textMap';
                textMap.renderOrder = 999;
                textMap.scale.multiplyScalar(txt2Mi.scale);
                if (txt2Mi.lookAtXY) {
                    textMap.geometry.rotateX(-Math.PI / 2 + .25);
                    TR3.lookAtXY.push(textMap);
                }
                TR3cfg.Text2map3d.push(textMap);
                TR3.scene.add(textMap);
            }
        }
    }, 100);*/

    TR3cfg.idiomax.actual = idi;
};

/**
 * Devielve el texto de designación de idioma según el standart
 * a través de las funciones de idioma propias del navegador, tomando los 2 primeros caracteres
 * 
 * @public
 * @returns - Texto de idioma según el estandar de designación de idioma, Ej: "ES" español
 */
TR3cfg.idiomax.get = function () {
    //url or user preference
    var userLang = TR3cfg.idiomax.actual || formURL.lang;
    var idi, thisIdioma;
    if (userLang) {
        idi = userLang.split("-")[0].toUpperCase();//Código ISO-639 https://www.localeplanet.com/icu/
        thisIdioma = false;
        for (let i = 0; i < TR3cfg.idiomax.includes.length; i++) {
            if (TR3cfg.idiomax.includes[i] == idi) { thisIdioma = true; }
        }
    }
    //attending to the navigator languaje
    if (!thisIdioma) {
        userLang = navigator.language || navigator.userLanguage;
        idi = userLang.split("-")[0].toUpperCase();//Código ISO-639 https://www.localeplanet.com/icu/
        for (let i = 0; i < TR3cfg.idiomax.includes.length; i++) {
            if (TR3cfg.idiomax.includes[i] == idi) { thisIdioma = true; }
        }
    }

    //default
    if (!thisIdioma) { idi = TR3cfg.idiomax.default } // idioma por defecto
    return idi;
};
/*fin idiomax.js*/
