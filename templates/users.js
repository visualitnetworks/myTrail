document.getElementById("newUserBtn").addEventListener('click', function (e) {

    document.getElementById("userUnLogued").style.display = 'none';
    document.getElementById("userLoged").style.display = 'none';
    document.getElementById("newUser").style.display = 'block';

});

document.getElementById("newUserBtnBack").addEventListener('click', function (e) {

    document.getElementById("userUnLogued").style.display = 'block';
    document.getElementById("userLoged").style.display = 'none';
    document.getElementById("newUser").style.display = 'none';

});

TextAreaFn();

document.getElementById('btnPOIs').onclick = function () {
    setWaypoisOptions(false);
};

document.getElementById('btnTexts').onclick = function () {
    setText2mapOptions();
};

setTimeout(() => {
    TR3.controls.addEventListener('change', function (event) {
        if (!TR3cfg.isDraged) {
            const isDragedTimeout = setTimeout(() => {
                TR3cfg.isDraged = false;
                clearTimeout(isDragedTimeout);
            }, 3000);
        }
        TR3cfg.isDraged = true;
    });
    TR3.map.addEventListener('click', function name(params) {
        if (TR3cfg.setingPOIs && !TR3cfg.isDraged) {
            var thisElem = TR3cfg.setingPOIs;
            var coordClick = TR3.cursor.coordClick;
            var coordT = TR3.coordM2T(coordClick.x, coordClick.y, coordClick.z);
            thisElem.lastChild.value = coordT[0].toFixed(2) + ',' + coordT[1].toFixed(2) + ',' + coordT[2].toFixed(3);
            var id = thisElem.children[0].getAttribute('TR3view');
            TR3.setOpts({ cursor3d: false });
            if (id.indexOf('PPOI') > -1) {
                var poi = TR3.scene.getObjectByName(thisElem.parentElement.getAttribute('TR3view'))
                poi.position.set(coordClick.x, coordClick.y, coordClick.z);
            }
            setTimeout(() => {
                $('#adminLoginPnl').dialog('open');
                $("#adminLoginPnl").css("max-height", window.innerHeight / 1.15);

                document.getElementById('menuLoged').style.height = 'auto';
                setTimeout(() => { document.getElementById('menuLoged').style.height = '42px'; }, 500);
            }, 1500);
            TR3cfg.setingPOIs = false;
        } else {
            TR3cfg.isDraged = false;
        }
    }, false);
}, 3000);

function setPOI3d(thisElem) {
    TR3cfg.isDraged = false;
    TR3cfg.setingPOIs = thisElem.parentElement;
    TR3.setOpts({ cursor3d: true });
    $('#adminLoginPnl').dialog('close');
};

function btnPOIsView(thisElem, kk, id) {
    var thisTable = thisElem;
    while (thisTable.nodeName !== 'TABLE') {
        thisTable = thisTable.parentElement;
    }

    var select = document.getElementById("selectTrackPOIs");
    var selectedOption = select.options[select.selectedIndex];

    document.getElementById("selectTrack").value = selectedOption.text;
    TR3cfg.selectTrack();

    var elemID = thisElem.parentElement.parentElement.rowIndex;
    var indexDB = thisTable.rows[elemID].cells[id].lastChild.value;
    var coord = indexDB.split(',');
    $('#adminLoginPnl').dialog('close');

    var tgt = TR3.getCoordsByXYmod(coord[0] * 1, coord[1] * 1, false, true);

    TR3cfg.moveRabbitLight(false, new THREE.Vector3(tgt[3], tgt[4], tgt[5]), 'jump', false, { x: TR3cfg.tweenDist, y: TR3cfg.tweenDist, z: TR3cfg.tweenDist });
};

function btnPOIsSUPR(thisElem) {

    var thisTable = thisElem;
    while (thisTable.nodeName !== 'TABLE') {
        thisTable = thisTable.parentElement;
    }

    var elemID = thisElem.parentElement.parentElement.rowIndex;
    var indexDB = thisTable.rows[elemID].cells[0].innerText;

    var colDB = document.querySelector('#' + thisTable.id + ' th:nth-child(' + (1) + ')').id;

    var tableDB = thisElem;
    while (tableDB.nodeName !== 'SECTION') {
        tableDB = tableDB.parentElement;
    }

    if (!TR3cfg.oridt4DB.DELETE) {
        TR3cfg.oridt4DB.DELETE = [];
    }

    if (indexDB.indexOf('NEW:') == -1) {
        //var obj = {table: tableDB.id};
        //obj[colDB] = indexDB;
        TR3cfg.oridt4DB.DELETE.push({ table: tableDB.id, [colDB]: indexDB });
    }

    var idPoi = thisElem.parentElement.parentElement.getAttribute('TR3view');
    var poi3d = TR3.scene.getObjectByName(idPoi);
    TR3.scene.remove(poi3d);

    var track;
    var selectTrackPOIsVal = document.getElementById('selectTrackPOIs').selectedOptions[0].innerText;
    for (let i = 0; i < tracksTrail.length; i++) {
        var tracksTrailI = tracksTrail[i];
        if (selectTrackPOIsVal == tracksTrailI.name) {
            track = tracksTrailI;
        }
    }
    track.arrWayPois.splice(elemID - 1, 1);

    thisTable.deleteRow(elemID);
};

function btnPOIsUpdown(thisElem, direction) {
    var index = thisElem.parentElement.parentElement.rowIndex;
    var thisTable = thisElem;
    while (thisTable.nodeName !== 'TABLE') {
        thisTable = thisTable.parentElement;
    }

    var rows = thisTable.rows,
        parent = rows[index].parentNode;

    var newIndex;
    if (direction === "up") {
        newIndex = index - 1;
        if (index > 1) {
            parent.insertBefore(rows[index], rows[index - 1]);
        } else { return false }
    }

    if (direction === "down") {
        newIndex = index + 1;
        if (index < rows.length - 1) {
            parent.insertBefore(rows[index + 1], rows[index]);
        } else { return false }
    }

    var track;
    var selectTrackPOIsVal = document.getElementById('selectTrackPOIs').selectedOptions[0].innerText;
    for (let i = 0; i < tracksTrail.length; i++) {
        var tracksTrailI = tracksTrail[i];
        if (selectTrackPOIsVal == tracksTrailI.name) {
            track = tracksTrailI;
        }
    }
    track.arrWayPois = array_move(track.arrWayPois, index - 1, newIndex - 1);

    function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
    };
};

var idElemIMGbtn, idElemIMGbtnPOI;
function TextAreaFn() {
    setTimeout(() => {
        var taClassI = document.getElementById('texaClass');
        //for (let index = 0; index < texaClass.length; index++) {
        //var taClassI = texaClass[index];
        //taClassI.classList.remove("texaClass");
        taClassI.onkeyup = function (event) {
            var counter;
            if (event.target.nextSibling) {
                counter = event.target.nextSibling;
            } else {
                counter = event.target;
            }
            counter.innerHTML = (this.maxLength - this.value.length) + "/" + this.maxLength;
        };
        //}

        var newImageDB = document.getElementsByClassName('newImageDB');
        for (let index = 0; index < newImageDB.length; index++) {
            var imgClassI = newImageDB[index];
            //imgClassI.classList.remove("newImageDB");
            imgClassI.onchange = function (event) {
                var thisElem = event.target;
                idElemIMGbtn = thisElem.getAttribute('TR3view');
                idElemIMGbtnPOI = thisElem.parentElement.parentElement.getAttribute('TR3view');
                var thisTable = event.target;
                var tableDB = { id: 'globals' }
                var colDB = '---';
                var indexDB = '---';
                var colIndexDB = 'IDglobals'
                if (thisTable.parentElement.nodeName == 'LI') { //GLOBALS
                    colDB = indexDB = thisElem.nextElementSibling.id.split('___')[1];
                } else {
                    while (thisTable.nodeName !== 'TABLE') {
                        thisTable = thisTable.parentElement;
                    }

                    var colIndex = thisElem.parentElement.cellIndex;
                    rowIndex = thisElem.parentElement.parentElement.sectionRowIndex;
                    indexDB = thisElem.parentElement.parentElement.children[0].innerText;
                    colDB = document.querySelector('#' + thisTable.id + ' th:nth-child(' + (colIndex + 1) + ')').id;
                    colIndexDB = document.querySelector('#' + thisTable.id + ' th:nth-child(' + (1) + ')').id;

                    tableDB = thisElem;
                    while (tableDB.nodeName !== 'SECTION') {
                        tableDB = tableDB.parentElement;
                    }
                }

                var counter;
                if (thisElem.nextSibling.nextSibling) {
                    counter = event.target.nextSibling.nextSibling;
                    counter.innerHTML = this.files[0].name;

                    if (!TR3cfg.oridt4DB.IMAGES) {
                        TR3cfg.oridt4DB.IMAGES = [];
                    }

                    for (let i = 0; i < TR3cfg.oridt4DB.IMAGES.length; i++) {
                        var imagesI = TR3cfg.oridt4DB.IMAGES[i];
                        if (imagesI.table == tableDB.id && imagesI[colIndexDB] == indexDB) {
                            TR3cfg.oridt4DB.IMAGES.splice(i, 1)
                        }
                    }

                    if (this.files[0].name.length > 150) {
                        alert('ERROR: name IMAGE too large!');
                    } else {
                        TR3cfg.oridt4DB.IMAGES.push({ [colIndexDB]: indexDB, [colDB]: this.files[0].name, table: tableDB.id });
                        var fileReader = new FileReader();
                        fileReader.onload = function () {
                            TR3cfg.oridt4DB.IMAGES[TR3cfg.oridt4DB.IMAGES.length - 1].blob = fileReader.result;
                            if (idElemIMGbtn && idElemIMGbtnPOI && idElemIMGbtn.indexOf('PPOI') > -1) {
                                var poi3d = TR3.scene.getObjectByName(idElemIMGbtnPOI);
                                if (poi3d) {
                                    var pinED = poi3d.TR3.extraData.slctItem;
                                    var SRCsource = pinED.split('<img src=')[2].split(' style')[0];
                                    poi3d.TR3.extraData.slctItem = pinED.replace(SRCsource, fileReader.result);
                                }
                            } else {
                                var elem = document.getElementById(idElemIMGbtn);
                                if (elem) {
                                    elem.src = fileReader.result;
                                }
                            }
                        }
                        fileReader.readAsDataURL(this.files[0]);
                    }
                }
            };
        }
    }, 100);

};

/**
 * DATATABLES
 */
function loginUser() {
    var url = "./php/login.php";
    TR3cfg.user = [$("#name_user").val(), $("#pass_user").val()];//['Agus','rasmuslerdorf'];
    var dataForm = {
        user: TR3cfg.user[0],
        pass: TR3cfg.user[1],
        path: spams.get("zzproj")
    };
    $.ajax({
        type: "POST",
        url: url,
        data: dataForm,
        success: function (data) {
            //console.log(data);
            if (data.indexOf("Find fail:") > -1) {
                console.log(data);
                alert(data);
            } else {
                TR3cfg.user = false;

                document.getElementById("userUnLogued").style.display = 'none';
                document.getElementById("newUser").style.display = 'none';
                document.getElementById("userLoged").style.display = 'block';

                var splitData = data.split('$$$');
                TR3cfg.db = { session: splitData[1], directory: splitData[2] };
                getDataTrail();
            }
        },
        error: function (data) {
            console.log(data);
            alert(data);
        }
    });
};

function getDataTrail(init) {
    var url = "./php/getDataTrail.php";
    var dataForm = {
        proj: formURL.zzProj.split('/')[1]
    };
    $.ajax({
        type: "POST",
        url: url,
        data: dataForm,
        success: function (data) {
            if (data.indexOf("Find fail:") > -1) {
                console.log(data);
                alert(data);
            } else {
                var splitData = data.split('$$$');
                var arrDataJson = [];
                for (let i = 0; i < splitData.length; i++) {
                    arrDataJson.push(JSON.parse(splitData[i]));
                }
                if (!init) {
                    fillUserProj(arrDataJson);
                } else {
                    fillMapProj(arrDataJson);
                }
            }
        },
        error: function (data) {
            console.log(data);
            alert(data);
            if (data.indexOf("Find fail:") > -1) {
                alert(data);
            }
        }
    });
};

var indexImages = 0;
function setDataTrail_Images(objData, reload) {
    var saveUser2DB = document.getElementById("saveUser2DB");
    if (saveUser2DB.innerHTML.indexOf("Salvando...") > -1) {
        return false;
    }
    if (TR3cfg.oridt4DB.IMAGES && TR3cfg.oridt4DB.IMAGES.length <= 0) {
        setDataTrail(objData, reload);
        return false;
    }

    var url = "./php/setDataTrail.php";
    var dataForm = {
        images: [objData.IMAGES[indexImages]],
        token: TR3cfg.db.session,
        directory: TR3cfg.db.directory
    };
    $.ajax({
        type: "POST",
        url: url,
        data: dataForm,
        success: function (data) {
            console.log(data);
            if (data.indexOf('Done OK!') == -1) {
                alert(data);
            } else {
                indexImages++;
                saveUser2DB.innerHTML = " 👍";
                if (objData.IMAGES.length <= indexImages) {
                    setDataTrail(objData, reload)
                } else {
                    setDataTrail_Images(objData, reload)
                }
            }
        },
        error: function (data) {
            console.log(data);
            if (data.indexOf("Find fail:") > -1) {
                alert(data);
            }
        }
    });
};

function setDataTrail(objData, reload) {
    var saveUser2DB = document.getElementById("saveUser2DB");
    if (saveUser2DB.innerHTML.indexOf("Salvando...") > -1) {
        return false;
    }
    var url = "./php/setDataTrail.php";
    var dataForm = {
        delete: objData.DELETE,
        insert: objData.INSERT,
        update: objData.UPDATE,
        token: TR3cfg.db.session,
        directory: TR3cfg.db.directory
    };
    $.ajax({
        type: "POST",
        url: url,
        data: dataForm,
        success: function (data) {
            console.log(data);
            if (data.indexOf('Done OK!') == -1) {
                alert(data);
            } else {
                var saveUser2DB = document.getElementById("saveUser2DB");
                if (saveUser2DB.innerHTML.indexOf(" ") > -1) {
                    saveUser2DB.innerHTML = "Vale!😀";
                } else {
                    saveUser2DB.innerHTML = "Hecho! 👍";
                }
                if (reload) { location.reload(); }
                setTimeout(() => {
                    saveUser2DB.innerHTML = "Guarde su progreso! 💾 <span style=\"font-size: small;color: #777; width: 100%;display: block;\">· Sólo guarda los cambios</span>";
                }, 15000);

                indexImages = 0;
                getDataTrail();
            }
        },
        error: function (data) {
            console.log(data);
            if (data.indexOf("Find fail:") > -1) {
                alert(data);
            }
        }
    });
};

function newUser() {
    var email1_newUser = document.getElementById("email1_newUser").value;
    var email2_newUser = document.getElementById("email2_newUser").value;
    var pass1_newUser = document.getElementById("pass1_newUser").value;
    var pass2_newUser = document.getElementById("pass2_newUser").value;

    if (email1_newUser !== email2_newUser) {
        alert("Error: Emails del formulario no coincide");
        return false;
    }

    if (pass1_newUser !== pass2_newUser) {
        alert("Error: Password de formulario no coincide");
        return false;
    }

    var url = "./php/newUser.php";
    var dataForm = {
        token: document.getElementById("key_newUser").value,
        pass: document.getElementById("pass1_newUser").value,
        email: document.getElementById("email1_newUser").value,
        name: document.getElementById("name_newUser").value
    };
    $.ajax({
        type: "POST",
        url: url,
        data: dataForm,
        success: function (data) {
            console.log(data);
            alert(data);
            if (data.indexOf("Find fail:") == -1) {
                document.getElementById("userUnLogued").style.display = 'block';
                document.getElementById("newUser").style.display = 'none';
                document.getElementById("userLoged").style.display = 'none';
            }

        },
        error: function (data) {
            console.log(data);
            alert(data);
            if (data.indexOf("Find fail:") > -1) {
                alert(data);
            }
        }
    });
};

function tooggleMinMaxDialog() {
};

function logOutUser() {
    $('#adminLoginPnl').dialog('close');

    var url = "./php/exitLogin.php";

    document.getElementById("userUnLogued").style.display = 'block';
    document.getElementById("newUser").style.display = 'none';
    document.getElementById("userLoged").style.display = 'none';

    if (!TR3cfg.db || !TR3cfg.db.session) {
        return false;
    }

    var dataForm = {
        token: TR3cfg.db.session
    };
    $.ajax({
        type: "POST",
        url: url,
        data: dataForm,
        success: function (data) {
            //console.log(data);
            TR3cfg.user = false;
        },
        error: function (data) {
            console.log(data);
            alert(data);
            if (data.indexOf("Find fail:") > -1) {
                alert(data);
            }
        }
    });
};

function setMineOptions(data) {

    var mainOpts = document.getElementById("mainOpts");
    var autoOpenElm = 'checked';
    if (data.autoOpen == '0') { autoOpenElm = '' };

    mainOpts.innerHTML = '\
            <div style="float: left;">\
				<ul style="width: 45%; float: left;line-height:200%">\
					<li>\
						<label>Color: </label>\
						<input class="setTest4DB" id="___color___DB" type="text" style="width: 140px;">\
					</li>\
					<li>\
						<label>logo: </label>\
						<input TR3view="logoIntro" type="file" class="newImageDB" value="Subir Imagen" accept="image/*">(300x100pxPNG)\
						<span id="___logo___DB" style="font-size:x-small;color: chocolate">img:'+ data.logo + '</span>\
					</li>\
					<li>\
						<label>Imagen Fondo: </label>\
						<input TR3view="esun_DIV_backgroundImage..." type="file" class="newImageDB" value="Subir Imagen" accept="image/*">(1920x1080pxJPG)\
						<span id="___image___DB" style="font-size:x-small;color: chocolate">img:'+ data.image + '</span>\
					</li>\
					<li>\
						<label>Imagen patrocinios: </label>\
						<input class="setTest4DB" value="" id="___autoOpen___DB" type="checkbox" '+ autoOpenElm + '>autoOpen\
						<br><input TR3view="imagePatreon" type="file" class="newImageDB" value="Subir Imagen" accept="image/*">(500x500pxJPG)\
						<span id="___patreons___DB" style="font-size:x-small;color: chocolate">img:'+ data.patreons + '</span>\
					</li>\
				</ul>\
                <p style="height: 45px;"><br></p>\
				<ul style="width: 45%; float: right">\
					<li>\
						<label>Título de página: </label><br>\
						<div id="ta___title___AppDB" TR3view="" class="setTest4DB" placeholder="Nombre del trail"\
							maxlength="100">'+ decodeCustomTags(data.title) + '</div>\
                        <input type="button" class="editBtn" value="Edit" onClick="getTextEditorBtn(\'none\')">\
					</li>\
					<li>\
                    	<label>Párrafo de inicio: </label>\
						<div id="ta___text___AppDB" TR3view="textContIntro" class="setTest4DB" placeholder="Pequeño texto descriptivo del trail" \
                            maxlength="300">'+ decodeCustomTags(data.text) + '</div>\
                        <input type="button" class="editBtn" value="Edit" onClick="getTextEditorBtn(\'unset\')">\
					</li>\
                    <li>\
                    	<label>Botón de Información: </label>\
						<div id="ta___inform___AppDB" TR3view="infoTrailDiv"  class="setTest4DB" placeholder="Panel de información Trail" \
                            maxlength="1100">'+ decodeCustomTags(data.inform) + '</div>\
                        <input type="button" class="editBtn" value="Edit" onClick="getTextEditorBtn(\'unset\')">\
					</li>\
				</ul>\
			</div>';

    var optPick = {
        // animation speed
        animationSpeed: 50,
        // easing function
        animationEasing: 'swing',
        // defers the change event from firing while the user makes a selection
        change: null,
        changeDelay: 0,
        // hue, brightness, saturation, or wheel
        control: 'hue',
        // default color
        defaultValue: data.color,
        // hex or rgb
        format: 'rgb',
        // show/hide speed
        //show: null,
        showSpeed: 100,
        //hide: null,
        hideSpeed: 100,
        // is inline mode?
        inline: false,
        // a comma-separated list of keywords that the control should accept (e.g. inherit, transparent, initial). 
        keywords: '',
        // uppercase or lowercase
        letterCase: 'lowercase',
        // enables opacity slider
        opacity: false,
        // custom position
        position: 'bottom left',
        // additional theme class
        theme: 'default',
        // an array of colors that will show up under the main color <a href="https://www.jqueryscript.net/tags.php?/grid/">grid</a>
        swatches: [],
        change: function (rgb, opacity) {

            var scene = TR3.scene.children;
            var colorTHREE = new THREE.Color(rgb);
            /*var rabbitLight = TR3.scene.getObjectByName('rabbitLight');
            rabbitLight.color = colorTHREE;
            rabbitLight.children[0].material.color = colorTHREE;*/
            for (let index = 0; index < scene.length; index++) {
                var sceneI = scene[index];
                if (sceneI.type == 'Line2' /*&& sceneI.visible == true*/) {
                    sceneI.material.color = colorTHREE;
                }
            }

            const svg = document.querySelector('#chart_div svg');
            svg.querySelectorAll('path').forEach(r => {
                r.setAttribute('fill', '#' + colorTHREE.getHexString() + '77');
                r.setAttribute('stroke', rgb);
            });
            document.documentElement.style.setProperty('--mineColor', rgb);
            TR3cfg.mineColor = rgb;

            TR3.scene.remove(TR3cfg.rabbitLight);
            var posStart = TR3cfg.rabbitLight.posStart;
            var position = TR3cfg.rabbitLight.position;
            TR3cfg.rabbitLight = TR3.addFlareLight(TR3cfg.mineColor, true, 50);
            TR3cfg.rabbitLight.children[0].position.y += TR3cfg.rabbitLightOffsetY || 20;
            TR3cfg.rabbitLight.visible = true;
            TR3cfg.rabbitLight.name = 'rabbitLight';
            TR3cfg.rabbitLight.renderOrder = 2;
            TR3cfg.rabbitLight.posStart = posStart;
            TR3cfg.rabbitLight.position.copy(position);
            TR3.scene.add(TR3cfg.rabbitLight);
        }
    }
    $('#___color___DB').minicolors(optPick);
    $("#adminLoginPnl").css("max-height", window.innerHeight / 1.15);
};

function setTrackOptions(data) {

    var tableTracks = document.getElementById('tableTracks').getElementsByTagName('tbody')[0]
    tableTracks.innerHTML = "";
    var slctTrackPOIs = document.getElementById('selectTrackPOIs');
    slctTrackPOIs.innerHTML = "";

    for (let i = 0; i < data.length; i++) {
        var selected = '';
        if (i == 0) { selected = 'selected'; }
        slctTrackPOIs.innerHTML += '<option id=' + data[i].gpx + ' value="' + data[i].IDtracks + '" ' + selected + '>' + data[i].name + '</option>';

        let row = tableTracks.insertRow();
        let cell0 = row.insertCell();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        let cell3 = row.insertCell();
        let cell4 = row.insertCell();
        let cell5 = row.insertCell();

        cell0.innerHTML = data[i].IDtracks;
        cell0.className = 'hide-column';
        cell1.innerHTML = data[i].gpx;
        cell2.innerHTML = '<div id="taNameTrackDB" TR3view="DownNameTrail" class="setTest4DB" placeholder="Nombre del track"\
	 maxlength="50">'+ decodeCustomTags(data[i].name) + '</div>\
     <input type="button" class="editBtn" value="Edit" onClick="getTextEditorBtn(\'none\')">';
        cell3.innerHTML = '<div id="taPlaceTrackDB" TR3view="DownPlaceTrail" class="setTest4DB" placeholder="Lugar del track"\
	 maxlength="50">'+ decodeCustomTags(data[i].place) + '</div>\
     <input type="button" class="editBtn" value="Edit" onClick="getTextEditorBtn(\'none\')">';
        cell4.innerHTML = '<div id="taDateTrackDB" TR3view="DownDateTrail" class="setTest4DB" placeholder="Fecha y hora"\
	 maxlength="50">'+ decodeCustomTags(data[i].date) + '</div>\
     <input type="button" class="editBtn" value="Edit" onClick="getTextEditorBtn(\'none\')">';
        cell5.innerHTML = '<div id="taInfoTrackDB" TR3view="DownInfoTrail" class="setTest4DB" placeholder="Infomación adicional"\
	 maxlength="50">'+ decodeCustomTags(data[i].info) + '</div>\
     <input type="button" class="editBtn" value="Edit" onClick="getTextEditorBtn(\'none\')">';
    }
    TextAreaFn();
};

function setText2mapOptions(thisData) {
    var data = [
        { coords: [0, 0, 0], text: '', IDtext2map: 'NEW:' + Math.random() }
    ];
    var tableTexts = document.getElementById('tableTexts').getElementsByTagName('tbody')[0];

    if (thisData) {
        data = JSON.parse(JSON.stringify(thisData));
        tableTexts.innerHTML = "";
    } else {
        let textMap = TR3.makeTextMap(htmlDecode(data[0].text),
            {
                pos: data[0].coords,
                font: '28px Arial',
                bgColor: 'rgba(0, 0, 0, 0)',
                textColor: '#fff',
                //height: 95,
                rotate: false,
                stroke: { color: 'rgb(0, 0, 0)', width: 5 }
            });
        textMap.name = 't2m_N:' + data[0].IDtext2map;
        //textMap.renderOrder = -1;
        textMap.material.depthTest = false;
        textMap.renderOrder = 1;
        textMap.scale.multiplyScalar(1 * .7);
        textMap.geometry.rotateX(-Math.PI / 2 + .25);
        TR3.lookAtXY.push(textMap);

        TR3cfg.Text2map3d.push(textMap);
        TR3.scene.add(textMap);
    }

    for (let i = 0; i < data.length; i++) {
        let row = tableTexts.insertRow();
        row.setAttribute('TR3view', 't2m_N:' + data[i].IDtext2map);

        let cell0 = row.insertCell();
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        let cell3 = row.insertCell();

        cell0.innerHTML = data[i].IDtext2map;
        cell0.className = 'hide-column';
        cell1.innerHTML = '<input type="button" TR3view="PPOI" onclick="setPOI3d(this,\'up\',\'tablePOIs\')"  value="Señala el punto"><br><span style="font-size:x-small">xyz:</span><input id="coordsText2MapDB" style="font-size:x-small" class="setTest4DB" type="text" value="' + data[i].coords + '">';
        cell2.innerHTML = '<div id="taText2MapDB" TR3view="PPOI" style="text-align: center !important;" class="setTest4DB" rows="1" cols="25" placeholder="Texto sobre el mapa" maxlength="100">' + decodeCustomTags(data[i].text) + '</div>\
            <input type="button" class="editBtn" value="Edit" onClick="getTextEditorBtn(\'unset\',\'none\')">';
        cell3.innerHTML = '<input type="button" onclick="btnPOIsUpdown(this,\'up\',\'tableTexts\')" value="⬆️"><input type="button" onclick="btnPOIsUpdown(this,\'down\',\'tableTexts\')" value="⬇️"><input type="button" onclick="btnPOIsView(this,\'tableTexts\',1)" value="👁️"><input type="button" onclick="btnPOIsSUPR(this,\'tableTexts\')" value="🗑️">';

    }

    TextAreaFn();
    $("#adminLoginPnl").css("max-height", window.innerHeight / 1.15);
};

function setWaypoisOptions(thisData, tracks) {
    var data = [
        {
            IDwaypois: 'NEW:' + Math.random(), coords: [0, 0, 0], type: 'start', title: '', image: '', text: '', color: '#00ff00', tilt: '0',
            slctItem: '\
            <p onclick="$(\'#dlgIFCdoc\').dialog(\'close\');" class="close-modal-style" ><img src="./skin/icon-close.svg"></p>\
	        <h6>' + 'algoRandmoaquí' + '</h6>\
	        <div style="margin:auto;overflow: hidden; border-radius:  10px;">\
	        <img src=' + 'algoRandmoaquí' + ' style="width:100%;"></div>\
	        <p class="idiomax" id="wp1" style=" font-size:medium;min-height:66px;" ppp>\
	        ' + 'algoRandmoaquí' + '</p>',
            track: document.getElementById('selectTrackPOIs').value
        }
    ];

    if (thisData) {
        //borra tablas si las hubiera
        var tablePOIs = document.getElementById('waypois');
        tablePOIs.innerHTML = "";

        data = JSON.parse(JSON.stringify(thisData));
    } else {
        var pin3d = {
            src: "source/obj3d/pin3d.glb",
            scale: [2.5, 2.5, 2.5],
            pos: data[0].coords,
            extraData: data[0],
            //aRotate: -1.5,
            slctItem: true
        };

        TR3.loadFile(pin3d).then(function (obj) {
            for (var i = 0; i < obj.length; i++) {
                var pin3d = obj[i].scene;
                pin3d.renderOrder = 1000;
                var ED = pin3d.TR3.extraData;
                ED.point = [0, 0, 0];
                pin3d.name = 'poi_N:' + ED.IDwaypois;

                pin3d.position.y += TR3.zMax * 3;
                var raycaster = TR3.getRayCaster([pin3d.position, new THREE.Vector3(0, -1, 0)], 'point-vector');
                var intersect = raycaster.intersectObject(TR3cfg.tileGroup, true)[0];
                if (intersect) {
                    pin3d.position.copy(intersect.point);
                }

                pin3d.traverse(function (child) {
                    if (child.isMesh && child.material) {
                        if (child.name !== 'Cylinder1') {
                            child.material = new THREE.MeshBasicMaterial({ color: new THREE.Color(ED.color) });
                        } else {
                            //child.material.map = 'source/obj3d/camera.png'
                            const texture = new THREE.TextureLoader().load('source/icons/' + ED.type + '.jpg');
                            //texture.needsUpdate = true;
                            texture.colorSpace = THREE.SRGBColorSpace;
                            texture.minFilter = THREE.LinearFilter;
                            child.material = new THREE.MeshBasicMaterial({ map: texture });
                        }
                    }
                });
                TR3.lookAtXY.push(pin3d);
                TR3.scene.add(pin3d);

                var track;
                var selectTrackPOIsVal = document.getElementById('selectTrackPOIs').selectedOptions[0].innerText;
                for (let i = 0; i < tracksTrail.length; i++) {
                    var tracksTrailI = tracksTrail[i];
                    if (selectTrackPOIsVal == tracksTrailI.name) {
                        track = tracksTrailI;
                    }
                }
                track.arrWayPois.push(ED);
            }

        });
    }

    if (tracks && tracks.length) {
        for (let i = 0; i < tracks.length; i++) {
            var node = document.getElementById("tablePOIs");
            var tablePOIsClone = node.cloneNode(true);
            tablePOIsClone.id = 'tablePOIs' + tracks[i].IDtracks;
            tablePOIsClone.style.display = 'block';
            document.getElementById("waypois").appendChild(tablePOIsClone);
        }
    }

    for (let i = 0; i < data.length; i++) {
        var tablePOIs = document.getElementById('tablePOIs' + data[i].track).getElementsByTagName('tbody')[0];
        if (tablePOIs) {
            let row = tablePOIs.insertRow();
            row.setAttribute('TR3view', 'poi_N:' + data[i].IDwaypois);
            let cell0 = row.insertCell();
            let cell1 = row.insertCell();
            let cell2 = row.insertCell();
            let cell3 = row.insertCell();
            let cell4 = row.insertCell();
            let cell5 = row.insertCell();
            let cell6 = row.insertCell();
            let cell7 = row.insertCell();
            let cell8 = row.insertCell();

            cell0.innerHTML = data[i].IDwaypois;
            cell0.className = 'hide-column';
            cell1.innerHTML = data[i].track;
            cell1.className = 'hide-column';
            cell2.innerHTML = '<input TR3view="PPOI" type="button" onclick="setPOI3d(this,\'up\',\'tablePOIs\')" value="Señalar POI"><br><span style="font-size:x-small">xyz:</span><input id="coordsPoiDB" style="font-size:x-small" class="setTest4DB" type="text" value="' + data[i].coords + '">';
            cell3.innerHTML = '<select class="setTest4DB" id="slctTypePoi" onchange="changeTypePoi(this)">\
                        <option value="meta">🏁 Meta</option>\
                        <option value="start">🚩 Salida</option>\
                        <option value="alert">⚠️ Alerta</option>\
                        <option value="danger">❗ Peligro</option>\
                        <option value="cross">🔀 Cruce</option>\
                        <option value="endAlert">🔕 Fin de Alerta</option>\
                        <option value="foodwhater">🍏 Avituallamiento</option>\
                        <option value="whater">💧 Agua</option>\
                        <option value="health">⛑️ Salud</option>\
                        <option value="time">⏱️ Control de tiempo</option>\
                        <option value="view">🌄 Vistas</option>\
                        <option value="fans">🎉 Zona de Público</option>\
                        <option value="Info">ℹ️ Punto Información</option>\
                        <option value="check">✅ Punto control</option>\
                    </select>';
            cell4.innerHTML = '<div id="taTitlePoiDB" TR3view="PPOI" TR3viewTXT="<h6>_</h6>" class="setTest4DB" placeholder="Título del punto" maxlength="100">' + decodeCustomTags(data[i].title) + '</div>\
            <input type="button" class="editBtn" value="Edit" onClick="getTextEditorBtn(\'none\')">';
            cell5.innerHTML = '<div id="taParagPoiDB" TR3view="PPOI" TR3viewTXT="ppp>_</p>" class="setTest4DB" placeholder="Párrafo sobre el punto" maxlength="600" style="overflow-y:scroll">' + decodeCustomTags(data[i].text) + '</div>\
            <input type="button" class="editBtn" value="Edit" onClick="getTextEditorBtn(\'unset\')">';
            cell6.innerHTML = '<span style="font-size: smaller;">👉 700x400px JPG</span><br><input type="file" TR3view="PPOI" class="newImageDB" value="Subir Imagen"  accept="image/*"><br><span id="imgPoiDB"style="font-size:x-small;color:chocolate">img:' + data[i].image + '</span>';
            cell7.innerHTML = '<span style="font-size: smaller;">Inclinar chincheta<br>(↖️.↗️)</span><br>\
                    <select class="setTest4DB" id="slctTiltPoi" onchange="changeTiltPoi(this)">\
                        <option value="0">🙅‍♂️ No</option>\
                        <option value="R">↗️ Right</option>\
                        <option value="L">↖️ Left</option>\
                    </select>';
            cell8.innerHTML = '<input type="button" onclick="btnPOIsUpdown(this,\'up\',\'tablePOIs\')" value="⬆️"><input type="button" onclick="btnPOIsUpdown(this,\'down\',\'tablePOIs\')" value="⬇️"><input type="button" onclick="btnPOIsView(this,\'tablePOIs\',2)" value="👁️"><input type="button" onclick="btnPOIsSUPR(this,\'tablePOIs\')" value="🗑️">';

            cell3.getElementsByTagName('select')[0].value = data[i].type;
            cell7.getElementsByTagName('select')[0].value = data[i].tilt;
        }
    }
    TextAreaFn();
    selectTrackPOIs();
    $("#adminLoginPnl").css("max-height", window.innerHeight / 1.15);
};

function changeTiltPoi(thisEl) {
    var idPoi = thisEl.parentElement.parentElement.getAttribute('TR3view');
    var poi3d = TR3.scene.getObjectByName(idPoi);

    var thisTilt = 0
    if (thisEl.value == 'L') { thisTilt = 0.35; }
    else if (thisEl.value == 'R') { thisTilt = -0.35; }
    poi3d.children[0].setRotationFromAxisAngle(new THREE.Vector3(0, 0, 1), thisTilt)
}

function changeTypePoi(thisEl) {
    var idPoi = thisEl.parentElement.parentElement.getAttribute('TR3view');
    var poi3d = TR3.scene.getObjectByName(idPoi);
    poi3d.traverse(function (child) {
        if (child.isMesh && child.material) {
            if (child.name !== 'Cylinder1') {
                child.material = new THREE.MeshBasicMaterial({ color: new THREE.Color(TR3cfg.colorPoi[thisEl.value] || '#51a6df') });
            } else {
                //child.material.map = 'source/obj3d/camera.png'
                const texture = new THREE.TextureLoader().load('source/icons/' + thisEl.value + '.jpg');
                //texture.needsUpdate = true;
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.minFilter = THREE.LinearFilter;
                child.material = new THREE.MeshBasicMaterial({ map: texture });
            }
        }
    });
}

function selectTrackPOIs() {
    var tablePOIs = document.getElementById('waypois').children;
    var selectTrackPOIsVal = document.getElementById('selectTrackPOIs').value;
    var slcPOIS2MAP = document.getElementById('selectTrackPOIs').selectedOptions[0].innerText;
    for (let i = 0; i < tablePOIs.length; i++) {
        const tablePOIsI = tablePOIs[i];
        var display = 'none';
        if (tablePOIsI.id == 'tablePOIs' + selectTrackPOIsVal) {
            display = 'block';
        }
        tablePOIsI.style.display = display;
    }

    document.getElementById("selectTrack").value = slcPOIS2MAP;
    TR3cfg.selectTrack();
};

function getDaTest4DB() {
    var dt4DBelem = document.getElementsByClassName('setTest4DB');
    var dt4DB = {};
    for (let i = 0; i < dt4DBelem.length; i++) {
        var rowIndex = '';
        var indexDB = '';
        var dt4DBelemI = dt4DBelem[i];
        var colDB = '';
        var trackID = '';

        if (dt4DBelemI.parentElement.nodeName == 'TD') {
            var tableID = dt4DBelem[i];
            while (tableID.nodeName !== 'TABLE') {
                tableID = tableID.parentElement;
            }

            var colIndex = dt4DBelemI.parentElement.cellIndex;
            rowIndex = dt4DBelemI.parentElement.parentElement.sectionRowIndex;

            if (dt4DBelemI.parentElement.parentElement.children[0].className == 'hide-column')
                indexDB = dt4DBelemI.parentElement.parentElement.children[0].innerText;

            if (dt4DBelemI.parentElement.parentElement.children[1].className == 'hide-column')
                trackID = dt4DBelemI.parentElement.parentElement.children[1].innerText;

            colDB = document.querySelector('#' + tableID.id + ' th:nth-child(' + (colIndex + 1) + ')').id;
        }

        var tableDB = dt4DBelem[i];
        while (tableDB.nodeName !== 'SECTION') {
            tableDB = tableDB.parentElement;
        }

        //if (tableDB.id == 'text2map') { rowIndex = ''; }

        var val2DB = '0';
        if (dt4DBelemI.type && dt4DBelemI.type == 'checkbox' && dt4DBelemI.checked) {
            val2DB = '1';
        } else {
            val2DB = dt4DBelemI.value || dt4DBelemI.innerHTML;
        }

        if (val2DB == "") { val2DB = '0'; }

        dt4DB[dt4DBelemI.id + '_rowTab_' + rowIndex + '_rowTab_' + '_tabDB_' + tableDB.id + '_tabDB_' + '_colDB_' + colDB + '_colDB_' + '_idDB_' + indexDB + '_idDB_' + '_trackID_' + trackID + '_trackID_'] = val2DB;

    }
    return dt4DB;
};

function getNewDaTest4DB() {
    //COMPARE OBJECTS OLD - NEW
    var newdt4DB = getDaTest4DB();
    var data4DB = {};
    Object.keys(newdt4DB).forEach(function (key) {
        if (newdt4DB[key] !== TR3cfg.oridt4DB[key]) {
            data4DB[key] = encodeCustomTags(newdt4DB[key]);
        };

    });

    //DELETE
    var data = { DELETE: [], INSERT: [], UPDATE: [], IMAGES: [] };
    if (TR3cfg.oridt4DB && TR3cfg.oridt4DB.DELETE)
        data.DELETE = JSON.parse(JSON.stringify(TR3cfg.oridt4DB.DELETE));

    //ADD IMAGES
    if (TR3cfg.oridt4DB && TR3cfg.oridt4DB.IMAGES)
        data.IMAGES = JSON.parse(JSON.stringify(TR3cfg.oridt4DB.IMAGES));

    //FORMATING OBJECT
    Object.keys(data4DB).forEach(function (key) {
        if (key.split('_idDB_')[1] != '') {
            if (key.split('_idDB_')[1].indexOf('NEW:') !== -1) {
                var obj = {};
                if (key.split('_tabDB_')[1] == 'text2map') {
                    obj = { ID: 'text2map' + key.split('_idDB_')[1], table: 'text2map', [key.split('_colDB_')[1]]: data4DB[key], short: key.split('_rowTab_')[1] };
                } else {
                    obj = {
                        ID: 'waypois' + key.split('_idDB_')[1], table: 'waypois', short: key.split('_rowTab_')[1], [key.split('_colDB_')[1]]: data4DB[key], track: key.split('_trackID_')[1],
                        image: document.getElementById('tablePOIs' + key.split('_trackID_')[1])
                            .getElementsByTagName('tbody')[0].rows[key.split('_rowTab_')[1] * 1].querySelector('#imgPoiDB').lastChild.nodeValue.replace('img:', '')
                    };
                }
                data.INSERT.push(obj);
            } else {
                var obj = {};
                if (key.split('_tabDB_')[1] == 'text2map') {
                    obj = { ID: 'text2map' + key.split('_idDB_')[1], table: 'text2map', IDtext2map: key.split('_idDB_')[1], [key.split('_colDB_')[1]]: data4DB[key] };
                } else if (key.split('_tabDB_')[1] == 'waypois') {
                    obj = { ID: 'waypois' + key.split('_idDB_')[1], table: 'waypois', IDwaypois: key.split('_idDB_')[1], short: key.split('_rowTab_')[1], [key.split('_colDB_')[1]]: data4DB[key] };
                } else {
                    obj = { ID: 'tracks' + key.split('_idDB_')[1], table: 'tracks', IDtracks: key.split('_idDB_')[1], [key.split('_colDB_')[1]]: data4DB[key] };
                }
                data.UPDATE.push(obj);
            }
        } else {
            data.UPDATE.push({ /*ID: 'globalsGLOBALS',*/ table: 'globals', [key.split('___')[1]]: data4DB[key] });
        }
    });

    //COMPRESS 2 SQL ARRAYS
    var dataSQL = { DELETE: [], INSERT: [], UPDATE: [], IMAGES: [] };
    Object.keys(data).forEach(function (key) {
        var dataKey = data[key];
        dataSQL[key].push(data[key][0]);
        for (let i = 1; i < dataKey.length; i++) {
            var dataKeyI = dataKey[i];
            if (dataKeyI.short && dataKeyI.ID == dataSQL[key][dataSQL[key].length - 1].ID && dataKeyI.short == dataSQL[key][dataSQL[key].length - 1].short) {
                jQuery.extend(dataSQL[key][dataSQL[key].length - 1], dataKeyI); //MERGE
            } else {
                dataSQL[key].push(dataKeyI); //PUSH
            }
        }
    });
    return dataSQL;
};

function saveDataTrail(reload) {
    var newData4DB = getNewDaTest4DB();
    //console.log(newData4DB);
    setDataTrail_Images(newData4DB, reload);
    document.getElementById("saveUser2DB").innerHTML = "Salvando...🛠️"
};

function fillUserProj(data, oridt4DB) {
    setMineOptions(data[0][0]);
    setTrackOptions(data[1]);
    setText2mapOptions(data[2] || true);
    setWaypoisOptions(data[3] || true, data[1]);
    if (!oridt4DB)
        TR3cfg.oridt4DB = getDaTest4DB();
};

function fillMapProj(data) {
    TR3cfg.mineColor = data[0][0].color;
    document.documentElement.style.setProperty('--mineColor', data[0][0].color);
    var titleTrail = htmlDecode(data[0][0].title);

    document.title = titleTrail;
    document.querySelector('meta[name="description"]').setAttribute("content", titleTrail);

    document.querySelector('meta[property="twitter:description"]').setAttribute("content", titleTrail);
    document.querySelector('meta[property="og:description"]').setAttribute("content", titleTrail);
    document.querySelector('meta[property="og:site_name"]').setAttribute("content", titleTrail);
    document.querySelector('meta[property="og:title"]').setAttribute("content", titleTrail);

    document.getElementById('contIntro').setAttribute("style", "background: linear-gradient(180deg, rgba(0, 0, 0, 0) 73.58%, rgba(0, 0, 0, 0.74) 100%), \
        url(" + TR3cfg.pathProjDir + "skin/" + encodeURI(data[0][0].image).replace("(", "%28").replace(")", "%29") + ") no-repeat center/cover rgb(0 0 0) !important");
    document.getElementById('logoIntro').src = TR3cfg.pathProjDir + "skin/" + data[0][0].logo;
    document.getElementById('logoIntro').style.content = "url('')";

    document.getElementById('textContIntro').setAttribute("idiomax", 'globals_text');
    document.getElementById('textContIntro').innerHTML = htmlDecode(data[0][0].text);
    document.getElementById('infoTrailDiv').innerHTML = htmlDecode(data[0][0].inform);

    document.getElementById('imagePatreon').src = TR3cfg.pathProjDir + "skin/" + data[0][0].patreons;

    if (data[0][0].autoOpen * 1) {
        $("#dlgImagePatreon").dialog('open');
        setTimeout(() => {
            $("#dlgImagePatreon").dialog("widget").position({ my: "center center", at: "center center", of: window });
        }, 100);
        setTimeout(() => {
            $("#dlgImagePatreon").dialog("widget").position({ my: "center center", at: "center center", of: window });
        }, 1000);
    }

    tracksTrail = data[1] || new Array();
    for (let i = 0; i < tracksTrail.length; i++) {
        tracksTrail[i].arrWayPois = new Array();
    }

    for (let i = 0; i < tracksTrail.length; i++) {
        var selected = '';
        if (i == 0) { selected = 'selected'; }
        document.getElementById('selectTrack').innerHTML += '<option id="' + tracksTrail[i].gpx + '"' + selected + '>' + tracksTrail[i].name + '</option>';

        document.getElementById('dlgDownTracksForm').innerHTML += '\
		<div style="border-bottom: solid 1px #ccc;">\
			<button class="btnTrack" onclick="TR3cfg.downTrack(\''+ tracksTrail[i].gpx + '\')">\
				<div> <img src="./skin/icon-download.svg"> <span idiomax="download" id="download">Descargar</span> </div>\
			</button>\
			<p id="DownNameTrail" style="color:black">'+ htmlDecode(tracksTrail[i].name) + '</p>\
			<p style="font-size: small;color:#aaa"><span id="DownPlaceTrail">'+ htmlDecode(tracksTrail[i].place) + '</span> | <span id="DownDateTrail">' + htmlDecode(tracksTrail[i].date) + '</span> | <span id="DownInfoTrail">' + htmlDecode(tracksTrail[i].info) + '</span></p>\
		</div>';
    };

    TR3cfg.objText2map = [];
    if (data[2])
        for (let i = 0; i < data[2].length; i++) {
            const txt2mI = data[2][i];
            TR3cfg.objText2map.push({ text: txt2mI.text, pos: txt2mI.coords.split(','), scale: 1, lookAtXY: true, IDtext2map: txt2mI.IDtext2map });

        }

    const objText2map_Interval = setInterval(function () {
        if (TR3.config.src) {
            objText2map_IntervalStop();

            for (let i = 0; i < TR3cfg.objText2map.length; i++) {
                var txti = TR3cfg.objText2map[i];
                let textMap = TR3.makeTextMap(htmlDecode(txti.text),
                    {
                        pos: txti.pos,
                        font: '28px Arial',
                        bgColor: 'rgba(0, 0, 0, 0)',
                        textColor: '#fff',
                        //height: 95,
                        rotate: false,
                        stroke: { color: 'rgb(0, 0, 0)', width: 5 }
                    });
                textMap.name = 't2m_N:' + txti.IDtext2map;
                //textMap.renderOrder = -1;
                textMap.material.depthTest = false;
                textMap.renderOrder = 1;
                textMap.scale.multiplyScalar(txti.scale * .7);
                if (txti.lookAtXY) {
                    textMap.geometry.rotateX(-Math.PI / 2 + .25);
                    TR3.lookAtXY.push(textMap);
                }
                TR3cfg.Text2map3d.push(textMap);
                TR3.scene.add(textMap);
            }
        }
    }, 100);

    function objText2map_IntervalStop() {
        clearInterval(objText2map_Interval);
    }

    TR3cfg.colorPoi = { start: '#00ff00', meta: '#F08080', alert: '#ffff00', endAlert: '#ffff00', danger: '#000000', check: '#90EE90' };
    if (data[3])
        for (let i = 0; i < data[3].length; i++) {
            for (let j = 0; j < tracksTrail.length; j++) {
                if (tracksTrail[j].IDtracks == data[3][i].track) {
                    const poi2mI = data[3][i];
                    var thisColorPoi = TR3cfg.colorPoi[poi2mI.type];
                    var thisTilt = 0
                    if (poi2mI.tilt == 'L') { thisTilt = 0.35; } else if (poi2mI.tilt == 'R') { thisTilt = -0.35; }
                    if (!thisColorPoi) { thisColorPoi = '#51a6df' }
                    tracksTrail[j].arrWayPois.push({
                        point: poi2mI.coords.split(','),
                        type: poi2mI.type,
                        tilt: thisTilt,
                        color: thisColorPoi,
                        idArrPoi: poi2mI.short * 1,
                        IDwaypois: poi2mI.IDwaypois,
                        slctItem: '\
            <p onclick="$(\'#dlgIFCdoc\').dialog(\'close\');" class="close-modal-style" ><img src="./skin/icon-close.svg"></p>\
	        <h6>' + htmlDecode(poi2mI.title) + '</h6>\
	        <div style="margin:auto;overflow: hidden; border-radius:  10px;">\
	        <img src=' + TR3cfg.pathProjImgs + poi2mI.image + ' style="width:100%;"></div>\
	        <p class="idiomax" id="wp1" style=" font-size:medium;min-height:66px;" ppp>\
	        	 ' + htmlDecode(poi2mI.text) + '\
	        </p>'
                    });
                }
            }
        }

    /*for (let i = 0; i < tracksTrail.length; i++) {
        if (tracksTrail[i]) {
            var tktliArr = tracksTrail[i].arrWayPois;
            for (let j = 0; j < tktliArr.length; j++) {
                tktliArr[j].idArrPoi = j;
            }
        }
    }*/
};

getDataTrail(true);

var activeElementSlct;
function getFocused() {
    activeElementSlct = document.activeElement;
    return activeElementSlct;
};

function setTagAtCursor(tag) {
    var selection = window.getSelection();
    var slct2str = selection.toString();
    if (slct2str && slct2str !== '') {
        var node = activeElementSlct;
        if (node.tagName !== 'TEXTAREA') { return false; }
        var inpTxt = node.value;
        if (tag == 'a') {
            node.value = inpTxt.replace(slct2str, '#' + tag + '|' + slct2str + '@Link|' + tag + '#');
        } else {
            node.value = inpTxt.replace(slct2str, '#' + tag + '|' + slct2str + '|' + tag + '#');
        }
    }
};

function setSingleTagAtCursor(tag) {
    var el = activeElementSlct;
    if (el.tagName !== 'TEXTAREA') { return false; }
    const [start, end] = [el.selectionStart, el.selectionEnd];
    el.setRangeText(tag, start, end, 'select');
};

function decodeCustomTags(text) {
    var URL;
    var URLori;
    while (text.indexOf('#a|') > -1 && text.indexOf('@') > -1 && text.indexOf('|a#') > -1  ) {
        URL = setHttp(text.split('#a|')[1].split('@')[1].split('|a#')[0]);
        URLori = text.split('#a|')[1].split('@')[1].split('|a#')[0];
        text = text.replace('#a|', '<a style="color: chocolate" target="_blank" href="' + URL + '">').replace('@' + URLori + '|a#', '</a>')
    }

    function setHttp(link) {
        if (link.search(/^http[s]?\:\/\//) == -1) {
            link = 'http://' + link;
        }
        return link;
    }

    return text.replaceAll('#b|', '<strong>').replaceAll('|b#', '</strong>')
        .replaceAll('#u|', '<u>').replaceAll('|u#', '</u>')
        .replaceAll('#i|', '<i>').replaceAll('|i#', '</i>')
        .replaceAll('#center|', '<centrer style="text-align: center;width: 100%;float: left;">').replaceAll('|center#', '</centrer>')
        .replaceAll('#br|', '<br>')
        .replaceAll('#hr|', '<hr>');
};

function encodeCustomTags(text) {
    var URL;
    var URLtxt;
    while (text.indexOf('<a style="color: chocolate" target="_blank" href=') > -1 && text.indexOf('">') > -1 && text.indexOf('</a>') > -1  ) {
        var split = text.split('<a style="color: chocolate" target="_blank" href="')[1].split('">')
        URL = split[0];
        URLtxt = split[1].split('</a>')[0];
        text = text.replace('<a style="color: chocolate" target="_blank" href="', '#a|' + URLtxt + '@' + URL).replace(URL + '">' + URLtxt +'</a>','|a#')

    }

    return text.replaceAll('<strong>', '#b|').replaceAll('</strong>', '|b#')
        .replaceAll('<u>', '#u|').replaceAll('</u>', '|u#')
        .replaceAll('<i>', '#i|').replaceAll('</i>', '|i#')
        .replaceAll('<centrer style="text-align: center;width: 100%;float: left;">', '#center|').replaceAll('</centrer>', '|center#')
        .replaceAll('<br>', '#br|')
        .replaceAll('<hr>', '#hr|');
};

function htmlDecode(input) {
    var e = document.createElement('textarea');
    e.innerHTML = input;
    // handle case of empty input
    return decodeCustomTags(e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue);
};

var elemntEdTxt;
function getTextEditorBtn(richText, onlyBreak) {
    elemntEdTxt = getFocused().previousElementSibling;
    var TextEditor = document.getElementById('setTextEditor');
    TextEditor.children[0].style.display = richText;
    for (let index = 0; index < TextEditor.children[0].children.length; index++) {
        TextEditor.children[0].children[index].style.display = 'unset';
    }
    if (onlyBreak) {
        for (let index = 0; index < TextEditor.children[0].children.length - 1; index++) {
            TextEditor.children[0].children[index].style.display = 'none';
        }
    }

    var textarea = TextEditor.getElementsByTagName('textarea')[0];
    textarea.nextSibling.innerHTML = '';
    textarea.setAttribute("maxlength", elemntEdTxt.getAttribute("maxlength"));
    textarea.setAttribute("placeholder", elemntEdTxt.getAttribute("placeholder"));
    textarea.value = encodeCustomTags(elemntEdTxt.innerHTML);

    $("#setTextEditor").dialog("widget").position({ my: "center center", at: "center center", of: window });
    $('#setTextEditor').dialog('open');
};

function setTextEditorBtn() {
    var TextEditor = document.getElementById('setTextEditor');
    var textarea = TextEditor.getElementsByTagName('textarea')[0].value;
    elemntEdTxt.innerHTML = htmlDecode(textarea);
    var TR3view = elemntEdTxt.getAttribute('TR3view');
    $('#setTextEditor').dialog('close');

    if (TR3view.indexOf('PPOI') > -1) {
        var idPoi = elemntEdTxt.parentElement.parentElement.getAttribute('TR3view');

        var poi3d = TR3.scene.getObjectByName(idPoi);
        if (idPoi.indexOf('t2m') > -1) {
            TR3.scene.remove(poi3d);
            let textMap = TR3.makeTextMap(htmlDecode(elemntEdTxt.innerHTML), {
                pos: [0, 0, 0], font: '28px Arial', bgColor: 'rgba(0, 0, 0, 0)',
                textColor: '#fff',
                //height: 95,
                rotate: false,
                stroke: { color: 'rgb(0, 0, 0)', width: 5 }
            });

            textMap.position.copy(poi3d.position);
            textMap.name = idPoi;
            //textMap.renderOrder = -1;
            textMap.material.depthTest = false;
            textMap.renderOrder = 1;
            textMap.scale.multiplyScalar(1 * .7);
            textMap.geometry.rotateX(-Math.PI / 2 + .25);
            TR3.lookAtXY.push(textMap);
            TR3cfg.Text2map3d.push(textMap);
            TR3.scene.add(textMap);
        } else {
            var id2split = elemntEdTxt.getAttribute('TR3viewTXT').split('_');
            var pinED = poi3d.TR3.extraData.slctItem;
            var SRCsource = pinED.split(id2split[0])[1].split(id2split[1])[0];
            poi3d.TR3.extraData.slctItem = pinED.replace(SRCsource, elemntEdTxt.innerHTML);
        }
    } else {
        document.getElementById(TR3view).innerHTML = elemntEdTxt.innerHTML;
    }
};

function loadTRTdoc(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            fillUserProj(JSON.parse(e.target.result), true);
            alert('Se ha rellenado el proyecto, recuerde que las imágenes han de incorporarse por separado.')
            /*var contents = e.target.result;
            fileInput.func(contents)
            document.body.removeChild(fileInput)*/
        }
        reader.readAsText(input.files[0]);
    }
};

var arrImgePoi = [];
function saveTRTdoc() {
    var autoOpenCheck = document.getElementById('___autoOpen___DB').checked;
    var aoCheck = 0;
    if (autoOpenCheck) { aoCheck = 1 };

    var mainData = [
        [],//globals
        [],//track
        [],//tex2map
        []//wayPois
    ];
    //globals
    var colorEl = document.getElementById('___color___DB').value;

    var imageEl = document.getElementById('___image___DB').innerText.replace('img:', '');
    var link___image___DB = document.createElement("a");
    link___image___DB.href = TR3cfg.pathProjDir + "skin/" + imageEl;
    link___image___DB.download = imageEl;
    link___image___DB.click();
    URL.revokeObjectURL(link___image___DB.href);

    var logoEl = document.getElementById('___logo___DB').innerText.replace('img:', '');
    var link___logo___DB = document.createElement("a");
    link___logo___DB.href = TR3cfg.pathProjDir + "skin/" + logoEl;
    link___logo___DB.download = logoEl;
    link___logo___DB.click();
    URL.revokeObjectURL(link___logo___DB.href);

    var patreonsEl = document.getElementById('___patreons___DB').innerText.replace('img:', '');
    var link___patreons___DB = document.createElement("a");
    link___patreons___DB.href = TR3cfg.pathProjDir + "skin/" + patreonsEl;
    link___patreons___DB.download = patreonsEl;
    link___patreons___DB.click();
    URL.revokeObjectURL(link___patreons___DB.href);

    var titeEl = document.getElementById('ta___title___AppDB').innerText;
    var textEl = document.getElementById('ta___text___AppDB').innerText;
    var infoEl = document.getElementById('ta___info___AppDB').innerText;

    mainData[0].push({
        color: colorEl, image: imageEl, logo: logoEl, patreons: patreonsEl,
        autoOpen: aoCheck, title: titeEl, text: textEl, info: infoEl
    });

    //track
    //{"IDtracks":"10","name":"Luanco-Candás","gpx":"0trail","date":"30min 🚥:🟢","place":"⭐⭐⭐⭐","info":"5.2Km 425m+"}
    var tableTracks = document.getElementById('tableTracks');
    for (var j = 1, row; row = tableTracks.rows[j]; j++) {
        mainData[1].push({
            IDtracks: row.cells[0].innerText,
            name: row.cells[2].getElementsByTagName('p')[0].innerText,
            gpx: row.cells[1].innerText,
            date: row.cells[4].getElementsByTagName('p')[0].innerText,
            place: row.cells[3].getElementsByTagName('p')[0].innerText,
            info: row.cells[5].getElementsByTagName('p')[0].innerText
        });
        /*for (var k = 1, col; col = row.cells[k]; k++) {
            //alert(col[j].innerText);
            mainData[1][i].push("tableTracks: " + col.innerText + " Fila: " + j + " Celda: " + k);
        }*/
    }

    //tex2map
    var tableTexts = document.getElementById('tableTexts');
    //{"IDtext2map":"49","text":"🏖️ Playa#br|de la Ribera","coords":"-644695.17,5405945.55,0.000"}
    for (var j = 1, row; row = tableTexts.rows[j]; j++) {
        mainData[2].push({
            IDtext2map: row.cells[0].innerText,
            text: row.cells[2].getElementsByTagName('p')[0].innerText,
            coords: row.cells[1].lastChild.value
        });
    }

    //wayPois
    var tablePOIs = document.getElementById('waypois').children;
    //{"IDwaypois":"145","image":"RU_LC_01.JPG.jpg","short":"0","coords":"-644622.57,5405708.93,14.803","type":"view","tilt":"0","track":"10","title_ES":"Playa de la River","title_EN":"playaE","title_DE":"playaD","title_FR":"playaF","title_AST":"playaAS","text_ES":"textoPlayaEs","text_EN":"textoPlayaEN","text_DE":"textoPlayaDE","text_FR":"textoPlayaFR","text_AST":"textoPlayaAST"},
    for (let i = 0; i < tablePOIs.length; i++) {
        const tablePOIsI = tablePOIs[i];
        for (var j = 1, row; row = tablePOIsI.rows[j]; j++) {
            var imagePOI = row.cells[6].lastChild.innerText.replace('img:', '');
            mainData[3].push({
                IDwaypois: row.cells[0].innerText,
                image: imagePOI,
                short: j - 1,
                coords: row.cells[2].lastChild.value,
                type: row.cells[3].lastChild.value,
                tilt: row.cells[7].lastChild.value,
                track: row.cells[1].innerText,
                title: row.cells[4].getElementsByTagName('p')[0].innerText,
                text: row.cells[5].getElementsByTagName('p')[0].innerText
            });

            var domnloadImg = true;//if img repeat, not download!
            for (let index = 0; index < arrImgePoi.length; index++) {
                const imgPoiI = arrImgePoi[index];
                if (imgPoiI == imagePOI) {
                    domnloadImg = false;
                }
            }

            if (domnloadImg) {
                arrImgePoi.push(imagePOI);

                var linkImagePOI = document.createElement("a");
                linkImagePOI.href = TR3cfg.pathProjImgs + imagePOI;
                linkImagePOI.download = imagePOI;
                linkImagePOI.click();
                URL.revokeObjectURL(linkImagePOI.href);
            }
        }
    }

    var linkTRTjson = document.createElement("a");
    var content = JSON.stringify(mainData);
    var file = new Blob([content], { type: 'text/plain' });
    linkTRTjson.href = URL.createObjectURL(file);
    linkTRTjson.download = "docConf_TR3.json";
    linkTRTjson.click();
};