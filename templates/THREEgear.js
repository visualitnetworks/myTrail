"use strict";
TR3cfg.setTR32 = function setTR32() {

	TR3.setValues({ magnification: TR3cfg.magnification });

	var TR3pms = {
		oriImg: TR3cfg.canvas,
		oriDTM: geoDataTR3.z,
		desty: document.getElementById('TR3'),
		bbox: geoDataTR3.BBOX,
		projCode: TR3cfg.map.getView().getProjection().getCode(),
		cameraDist: 5
	};
	TR3.IFCnoLoader = true;
	TR3.widthImgFake = geoDataTR3.resolution.w;
	TR3.heightImgFake = geoDataTR3.resolution.h;
	TR3.reducMeshWset = geoDataTR3.size.segW;
	TR3.reducMeshHset = geoDataTR3.size.segH;
	TR3.noSlctBox = true;

	TR3.mapGuy = {
		name: 'kitt'/*,
				anim: { idle: 0, run: 2, jump: 3, dance: 1 }*/
	};

	TR3.setStart(TR3pms, TR3cfg).then(function (obj) {
		//obj.material.wireframe = true;
		//obj.material.depthTest = false
		TR3.controls.maxDistance = TR3cfg.distTiles * 2;
		TR3.controls.maxPolarAngle = 1.1;

		//TR3.setGradientMesh('gray');

		//lights
		TR3cfg.rabbitLight = TR3.addFlareLight(TR3cfg.mineColor, true, 50);
		/*TR3cfg.rabbitLight.color.r *= 5;
		TR3cfg.rabbitLight.color.g *= 5;
		TR3cfg.rabbitLight.color.b *= 5;*/
		TR3cfg.rabbitLight.children[0].position.y += TR3cfg.rabbitLightOffsetY || 20;

		TR3cfg.rabbitLight.visible = true;
		TR3cfg.rabbitLight.name = 'rabbitLight';
		TR3cfg.rabbitLight.renderOrder = 2;

		TR3.scene.add(TR3cfg.rabbitLight);

		//getItemsSQL();
		setTimeout(function () {
			/*if (TR3cfg.locat) {
				TR3.setLookAt(TR3cfg.locat.lookAt); TR3cfg.locat = false; 
			}*/
			//$("#dlgIFCdoc").dialog("widget").position({ my: "center bottom", at: "center bottom-45px", of: window });
			//$("#dlgIFCdoc").dialog('open');
			//setTimeout(function () { document.getElementById('loading').style.display = 'none'; }, 500);
			TR3.setOpts({ autoRotate: true });
			if (TR3cfg.first != false) {
				eventTR3();
				TR3cfg.first = false;
			};

			if (formURL.lookToward != false && formURL.lookToward.length > 5) {
				var lAt = formURL.lookToward
				TR3.camera.position.set(lAt[0], lAt[1], lAt[2]);
				TR3.controls.target.set(lAt[3], lAt[4], lAt[5]);
			} else {
				//var lookAt = TR3cfg.loc.lookAt;
				//TR3.setLookAtini(lookAt[0], lookAt[1]);
				var lookCtmP = TR3cfg.loc.lookCustom.pos;
				TR3.camera.position.set(lookCtmP.x, lookCtmP.y, lookCtmP.z);
				var lookCtmT = TR3cfg.loc.lookCustom.tgt;
				TR3.controls.target.set(lookCtmT.x, lookCtmT.y, lookCtmT.z);
			}

			setInterval(() => {
				var pos = TR3.camera.position;
				var raycaster = TR3.getRayCaster(false);
				var inter = TR3.getIntersect(raycaster, [TR3cfg.tileGroup]);
				var tgt = new THREE.Vector3();
				if(inter && inter[0] && inter[0][0] && inter[0][0].point) {
					tgt = inter[0][0].point;
				} else {
					tgt = TR3.controls.target;
				}

				var tgt = TR3.getIntersect(raycaster, [TR3cfg.tileGroup])[0][0].point;
				spams.set("looktoward", [pos.x, pos.y, pos.z, tgt.x, tgt.y, tgt.z].map(function (each_element) {
					return Number(each_element.toFixed());
				}));

				spams.set("autostart", false);
				formURL.autostart = false;

				window.history.replaceState({}, '', `${location.pathname}?${spams.toString()}`);
			}, 2000);

		}, 50);

		//TR3.getFeatFromOL( TR3cfg.vecTrail.getSource().getFeatures(), [TR3cfg.tileGroup] );//tubeOl/lineOl

		setItems3D();

		TR3.decorations(false, false, false, false);
		//TR3.scene.getObjectByName("starField").visible = false;

		TR3cfg.refresWFSbuild = true;
		TR3cfg.vectorWFS.getSource().refresh(true);//vectorWFS
	});
};

function eventTR3() {
	setInterval(() => {
		if (TR3cfg.rabbitLight && TR3cfg.rabbitLight.visible && TR3cfg.rabbitLight.position.y != 0) {
			var pos = TR3cfg.rabbitLight.position;
			var pinGroup = TR3cfg.getVisibleTrail(TR3cfg.trails).lerp.getObjectByName('pinGroup');
			var distControl = Infinity;
			var childClosest = [];
			pinGroup.traverse(function (child) {
				if (child.TR3) {
					var ed = child.TR3.extraData;
					var sleAux = ed.scaleAux;
					child.scale.set(sleAux, sleAux, sleAux);

					var distClild = child.position.distanceTo(pos);
					if (distClild < 500 && distClild < distControl + 50) {
						distControl = distClild;
						TR3cfg.idPoi = ed.idArrPoi
						childClosest.push(child);
					}
				}
			});

			if (childClosest.length > 0) {
				for (let i = 0; i < childClosest.length; i++) {
					childClosest[i].scale.multiplyScalar(1.3);
				}
			}
		}
	}, 500);

	TR3.map.addEventListener("TR3-onIntersectEvClick",
		function (req) {
			var det = req.detail;
			if (det.intersect[0]) {
				var obj = det.intersect[0].object.scene || det.intersect[0].object;
				while (!obj.TR3) {
					obj = obj.parent;
				}

				var slct = obj.TR3.extraData.slctItem;
				if (typeof (slct) == 'string' && slct != "" && slct.indexOf('undefined') == -1) {
					var des = obj.position;

					var tli = TR3cfg.getVisibleTrail(TR3cfg.trails).path;
					var segmentClosePoint = TR3cfg.getCloseIndexTrail(tli, des);

					TR3cfg.rabbitLight.visible = false;
					TR3.followCtmPath.pauseIndex = segmentClosePoint.pauseIndex;
					TR3cfg.rabbitLight.position.copy(des.addScalar(-1));

					var auxDist = TR3.dataLineAtIndex(TR3cfg.LineRabbit, TR3.followCtmPath.pauseIndex);
					updateMetricsTrack(auxDist);

					waitPrevNextScene = true;
					TR3cfg.moveRabbitLight(
						function () {
							TR3.CameraMoveEvEnd();
							var tli = TR3cfg.getVisibleTrail(TR3cfg.trails).path;
							var userdataClose = TR3cfg.getCloseIndexTrail(tli, TR3cfg.rabbitLight.position);
							TR3.followCtmPath.pauseIndex = userdataClose.pauseIndex;
							TR3cfg.rabbitLight.position.copy(userdataClose.from.addScalar(-1));
							waitPrevNextScene = false;
						}, false, 'jump', 3000, { x: TR3cfg.tweenDist, y: TR3cfg.tweenDist, z: TR3cfg.tweenDist });

					$("#dlgIFCdoc").dialog('close');
					setTimeout(() => { $("#dlgIFCdoc").dialog('open'); }, 500);
					$("#dlgIFCdoc").html(slct);
					TR3cfg.idiomax.set(TR3cfg.idiomax.actual);

				} else if (slct.indexOf('undefined') != -1) {

					TR3.transformControls.attach(obj);
					TR3.transCtrlsEnabled(true);
					var size3dObj = document.getElementById('size3dObj');
					if (obj && obj.parent) {
						var XYZ = TR3.getSizeObj(obj);
						size3dObj.innerHTML = '<b>X:</b>' + XYZ[0][0] + '' + XYZ[0][1] + ' <b>Y:</b>' + XYZ[2] + '' + XYZ[2][1] + ' <b>Z:</b>' + XYZ[1][0] + '' + XYZ[1][1];
					}
				} else if (det.intersect.point) {

				}
			}
		}
	);

	/*TR3.map.addEventListener("TR3-onIntersectEvOver",
		function (req) {
			TR3.slctBox[0].visible = false;
		}
	);*/

	TR3.map.addEventListener("TR3-onTransformEvTrue",
		function (req) {
			var det = req.detail.object;
			if (det.ext == 'ifc') {
				createTreeMenuByEv(det);
			}

		}
	);

	TR3.map.addEventListener("TR3-onCompleteFiles",
		function (req) {
			var det = req.detail[0];
			if (det.ext == 'ifc') {
				createTreeMenuByEv(det);
			}
		}
	);
};

function setMarker(srcMark, offsetMark, pointMark, name, info) {
	TR3cfg.vectorLayer.setVisible(true);
	var iconFeature = new ol.Feature({
		geometry: new ol.geom.Point(pointMark),
		name: name,
		info: info
	});

	var top, left;
	switch (offsetMark.charAt(1)) {
		case 'R': left = 1;
			break;
		case 'L': left = 0;
			break;
		default: left = 0.5;
	};
	switch (offsetMark.charAt(0)) {
		case 'T': top = 0;
			break;
		case 'D': top = 1;
			break;
		default: top = 0.5;
	};

	var iconStyle = new ol.style.Style({
		image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
			anchor: [left, top],//fraction of the icon. Default value is [0.5, 0.5] (icon center).
			opacity: 0.75,
			src: srcMark,
			scale: 0.50
		})),
		text: new ol.style.Text({
			font: '15px Calibri,sans-serif',
			offsetY: 15,
			fill: new ol.style.Fill({ color: '#000' }),
			stroke: new ol.style.Stroke({
				color: '#fff', width: 2
			}),
			text: name
		})
	});

	iconFeature.setStyle(iconStyle);

	/*var markers;

	TR3cfg.map.getLayers().forEach(function(el) {
		if (el.get('name') === 'vectorSourceV') {
			markers = el;
		}
	})*/

	var featMarkSource = TR3cfg.vectorLayer.getSource().getFeatures();
	if (typeof featMarkSource != "undefined") { //if feature 'chincheta' exist --> remove it
		for (var i = 0; i < featMarkSource.length; i++) {
			var featMarkSourceI = featMarkSource[i];
			if (featMarkSourceI.get('name') == 'chincheta'/*iconFeature.get('name')*/)
				TR3cfg.vectorLayer.getSource().removeFeature(featMarkSourceI);
		}
	}

	/*iconFeature.addEventListener("click", function () {
			alert();
		}
	);*/

	TR3cfg.vectorLayer.getSource().addFeature(iconFeature);
};

function delMarkers() {
	TR3cfg.vectorLayer.setVisible(false);
	var featMarkSource = TR3cfg.vectorLayer.getSource().getFeatures();
	if (typeof featMarkSource != "undefined") { //if feature 'chincheta' exist --> remove it
		for (var i = 0; i < featMarkSource.length; i++) {
			if (featMarkSource[i].get('name') == 'chincheta')
				TR3cfg.vectorLayer.getSource().removeFeature(featMarkSource[i])
		}
	}
};

function geoLocation(geoActive) {

	var geolocBTN = document.getElementById('geoloc');
	geolocBTN.className = geolocBTN.className.replace('ItemActive', 'ItemInactive');

	if (geolocBTN.className.indexOf('ItemInactive') > -1) {
		geolocBTN.className = geolocBTN.className.replace('ItemInactive', 'ItemActive');
	} else {
		geolocBTN.className = geolocBTN.className.replace('ItemActive', 'ItemInactive');
	}
	if (geoActive === false) {
		geolocBTN.className = geolocBTN.className.replace('ItemActive', 'ItemInactive');
		if ($('#info').dialog('isOpen'))
			$('#info').dialog('close');
	} else { geoActive = true }
	TR3cfg.gAct = geoActive;

	if (!TR3cfg.GeolocTR3) {
		TR3cfg.GeolocTR3 = new ol.Geolocation({
			projection: TR3cfg.map.getView().getProjection(),
			tracking: true,
			trackingOptions: {
				enableHighAccuracy: true,
			}
		});
	}

	function geoloc() {
		var pos = TR3cfg.GeolocTR3.getPosition();
		var acc = TR3cfg.GeolocTR3.getAccuracy();

		if ((pos == null || typeof (pos) == 'undefined') && TR3cfg.gAct) {
			navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
				if (result.state === 'granted') {
					console.log('granted');
					if ($('#info').dialog('isOpen'))
						$('#info').dialog('close');
					//clearInterval(geoPermis);
					/*var POSxy = TR3cfg.map.getView().getCenter();
					var POSz = TR3cfg.map.getView().getZoom();
					var POS = (POSxy[0]).toFixed(2) + ',' + (POSxy[1]).toFixed(2) + ',' + POSz;
					window.location.replace(window.location.href + 'POS=' + POS + '&location=true');*/
				} else {
					$('#info').html('<h6><b><span idiomax="state" id="state">Estado</span>: <span style="color:red">' + result.state.toUpperCase() + '</span></b></h6>\
						<hr>\
						<p style="font-size: medium;"><span idiomax="bdyStateGPS" id="bdyStateGPS">Ha de <b>habilitar la Geolocalización</b> en el dispositivo y <b>permitir acceso</b> al navegador.<br><br>\
						Para habilitar la configuración puede consultar aquí:</span>\
						<br><a target="_blank" href="https://support.google.com/chrome/answer/142065">Chrome</a>\
						<br><a target="_blank" href="https://www.soydemac.com/administra-los-servicios-de-localizacion-en-safari/">Safari</a>\
						<br><a target="_blank" href="https://support.mozilla.org/es/kb/firefox-comparte-mi-ubicacion-con-sitios-web">Firefox</a></p>\
						<button type="button"\
							onClick="geoLocation(true)" title="try access" idiomax="tryAgain" id="tryAgain">Reintentar\
						</button>\
						<button type="button"\
							onClick="geoLocation(false)" title="cancel GPS" idiomax="cancelGPS" id="cancelGPS">Deshabilitar Geolocalización\
						</button>');
					if (!$('#info').dialog('isOpen'))
						$('#info').dialog('open');
				}

			});

		} else {

			if (pos && TR3cfg.__trak && TR3cfg.gAct) {

				var extent = TR3cfg.loc.bbox;

				if (!isFinite(ol.extent.getIntersection(extent, [pos[0], pos[1], pos[0], pos[1]])[0])) {
					$('#info').html('\<p onclick="$(\'#info\').dialog(\'close\');" class="close-modal-style" ><img src="./skin/icon-close.svg"></p>\
					<img src="./skin/icon-gps-recorrido.svg" style="display:flex; max-width:76px; margin:0 auto 16px;">\
					<h6 idiomax="next2placeTtl">Parece que estás alejado del recorrido</h6>\
					<p idiomax="next2placePrf" id="wp1" style="text-align:center;width: 320px;margin-top:5px;min-height:66px;">\
						Revisa tu ubicación y activa la geolocalización cuando te encuentree por los alrededores de la zona.</p>\
					<button style="\
						idiomax="next2placeBtn"\
						border-radius: 15px;width: 100%;\
						background-color:var(--mineColor);\
						color: white;\
						border: none;\
						" onclick="$(\'#info\').dialog(\'close\');">\
							ok\
					</button>');

					geoLocation(false);

					setTimeout(function () {
						$('#info').dialog('open');
					}, 500);
					return false;
				}

				if ($('#info').dialog('isOpen'))
					$('#info').dialog('close');
				var GPSaccuration = document.getElementById("GPSaccuration");
				GPSaccuration.style.display = 'block';
				if (acc > 30) {
					GPSaccuration.innerHTML = "\
								<i class='fa-solid fa-wifi blink_me'></i> Geoposición fuera de Precisión (" + acc.toFixed(0) + ")\
								<i class='fa-solid fa-wifi blink_me'></i><br>\
								<b> Por favor, espere</b> para mejor posicionamiento";

					GPSaccuration.style.backgroundColor = 'rgba(200,200,0,.5)';
					GPSaccuration.style.color = 'black';
					GPSaccuration.style.marginTop = '55px';
				} else {
					GPSaccuration.innerHTML = "Precisión Actual Correcta (" + acc.toFixed(0) + ")";

					GPSaccuration.style.backgroundColor = 'transparent';
					GPSaccuration.style.color = 'azure';

					$('#dlgIFCdoc').dialog('close');
					setGiraffe(pos);

					/*var sphProj = 'EPSG:4326';
					var thisProj = 'EPSG:3857';
					var c1 = ol.proj.transform(pos, thisProj, sphProj);*/
					TR3cfg.map.getView().setCenter(pos);
					TR3cfg.map.getView().setZoom(16);
				}

			}
			TR3cfg.posB4 = TR3cfg.GeolocTR3.getPosition();
		}

	}
	geoloc();
	if (geoActive) {
		TR3cfg.GeolocTR3.on('change', geoloc);

		/*var GPSaccuration = document.getElementById("GPSaccuration");
		GPSaccuration.style.display = 'block';
		GPSaccuration.innerHTML = "\
								<i class='fa-solid fa-wifi blink_me'></i> Conectando a RED \
								<i class='fa-solid fa-wifi blink_me'></i><br>\
								<b>Por favor, espere</b> para su posicionamiento";

		GPSaccuration.style.backgroundColor = 'rgba(200,200,0,.5)';
		GPSaccuration.style.color = 'black';*/

		TR3cfg.__trak = true;
		if (TR3cfg.giraffe)
			TR3cfg.giraffe.visible = true;
	} else {
		TR3cfg.GeolocTR3.un('change', geoloc);

		TR3cfg.__trak = false;
		TR3cfg.posB4 = [0, 0];
		document.getElementById('exploreDiv').style.display = 'none';
		document.getElementById('personFlySliderDiv').style.display = 'none';
		TR3.setOpts({ autoRotate: false });
		/*if (TR3cfg.pause3d == false) {
			TR3.orbitalViewFn();
			TR3.setLookAtini.apply(this, TR3cfg.loc.lookAt);
		}*/
		if (TR3cfg.giraffe)
			TR3cfg.giraffe.visible = false;

		var GPSaccuration = document.getElementById("GPSaccuration");
		GPSaccuration.style.display = 'none';
	}
	//}
};

function setGiraffe(coords) {
	//var coordMod = TR3.getCoordsByXYmod(coords[0],-coords[1]);
	//var hi = 1770;
	//TR3.setLookAt([coords[0],coordMod[4],-coords[1],coords[0]+hi,coordMod[4]+hi,-coords[1]+hi]);

	var myInterval = setInterval(myTimer, 1000);
	var XY = coords || TR3cfg.map.getView().getCenter();

	setMarker('css/origin.png', 'CC', XY, 'You are Here!', false);

	function myTimer() {
		if (TR3.newMeshMap == 0 && TR3cfg.giraffe === false) {
			var giraffe = {
				src: "source/obj3d/giraffe.glb",
				scale: [TR3.tPixMesh * 3 / 10, TR3.tPixMesh * 3 / 10, TR3.tPixMesh * 3 / 10],
				aRotate: 1.5,
				pos: [XY[0], XY[1], false]
			};
			TR3cfg.giraffe = true;

			TR3.loadFile(giraffe).then(function (obj) {
				TR3.scene.add(obj[0].scene);
				TR3cfg.giraffe = obj[0].scene;
				TR3cfg.giraffe.visible = false;

				var posGfe = TR3cfg.rabbitLight.position;
				TR3.setLookAt([posGfe.x, posGfe.y, posGfe.z, posGfe.x + 600, 300, posGfe.z + 600]);

				myStopFunction();
			});

		} else if (TR3.newMeshMap == 0 && TR3cfg.giraffe != false) {
			//girafe position
			if (TR3cfg.giraffe.position) {
				var coords = TR3.coordM2T(XY[0], XY[1], false, true);
				TR3cfg.rabbitLight.position.set(coords[0], coords[1], coords[2]);
				TR3cfg.rabbitLight.visible = true;
				//var posGfe = TR3cfg.giraffe.position;
				TR3.setLookAt([coords[0], coords[1], coords[2], coords[0] + 600, 300, coords[2] + 600]);

				TR3cfg.giraffe.TR3.x = XY[0];
				TR3cfg.giraffe.TR3.y = XY[1];
			}

			myStopFunction();
		}
	}

	function myStopFunction() {

		setTimeout(function () {
			if (TR3cfg.lightAndRing && TR3cfg.giraffe) {
				TR3cfg.giraffe.lookAt(new THREE.Vector3(TR3cfg.lightAndRing.position.x, 0, TR3cfg.lightAndRing.position.z))
				TR3cfg.giraffe.rotateY(Math.PI + Math.PI / 7.5);
			}
		}, 250);
		clearInterval(myInterval);
	}

	myTimer();
};

function RRSS(className) {

	var POSxy = TR3cfg.map.getView().getCenter();
	var POSz = TR3cfg.map.getView().getZoom();
	POS = (POSxy[0]).toFixed(2) + ',' + (POSxy[1]).toFixed(2) + ',' + POSz;

	var HREF = window.location.href.split("?");

	var URLSHARE = HREF[0] + '?&POS=' + POS;

	var URLSHAREuri = encodeURIComponent(URLSHARE);

	var RRSSshare;

	if (className.indexOf('twitter') > -1)
		RRSSshare = 'https://twitter.com/intent/tweet?summary=&url=' + URLSHAREuri;
	if (className.indexOf('instagram') > -1)
		RRSSshare = 'https://www.instagram.com/?url=' + URLSHAREuri;
	if (className.indexOf('facebook') > -1)
		RRSSshare = 'https://www.facebook.com/sharer.php?u=' + URLSHAREuri;
	if (className.indexOf('whatsapp') > -1)
		RRSSshare = 'whatsapp://send?text=' + URLSHAREuri;

	var textShare = document.getElementById("textShare");
	textShare.style.display = 'block';
	textShare.value = URLSHARE;

	var openW = window.open(RRSSshare, '_blank');
	if (openW == null || typeof (openW) == 'undefined') {
		$('#rrss').html('<p style="font-size: medium;">El enlace para mostrar el contenido ha sido bloqueado en la siguiente dirección:<br><a target="_blank" href="' + RRSSshare + '">' + RRSSshare +
			'</a><br>Para habilitar la configuración puede consultar aquí:\
				<br><a target="_blank" href="https://support.google.com/chrome/answer/95472">Chrome</a>\
				<br><a target="_blank" href="https://www.soydemac.com/como-permitir-ventanas-emergentes-en-safari/">Safari</a>\
				<br><a target="_blank" href="https://support.mozilla.org/es/kb/configuracion-y-preferencias-de-las-pestanas">Firefox</a></p>');
		$('#rrss').dialog('open');
	}

};

function makeWayPoints(WP, color, dance, icon) {
	var wPoint = new Array();
	wPoint.pos = new Array();
	wPoint.scale = new Array();
	wPoint.slctItem = new Array();
	wPoint.aRotate = new Array();
	wPoint.extraData = new Array();

	for (var i = 0; i < WP.length; i++) {
		var pinObjJ = WP[i];
		var pinTxt = pinObjJ.sprite;
		var pinPin = pinObjJ.pin;
		var pinSprite = pinObjJ.pinSprite;
		var slctItem = pinObjJ.slctItem;

		if (pinPin) {
			wPoint.src = pinPin.src;
			wPoint.aRotate.push(pinPin.aRotate);
			wPoint.pos.push([pinObjJ.point[0], pinObjJ.point[1], false]);
			wPoint.scale.push(pinPin.scale);
			wPoint.slctItem.push(slctItem);
			wPoint.extraData.push({ color: color, dance: dance });
		}

		if (pinSprite) {
			makePinSprite(pinObjJ);
		}

		if (pinTxt) {
			makeTxtSprite(pinTxt, pinObjJ.point, slctItem, i, icon);
		}
	}

	if (wPoint.src) {
		makeLoadFile(wPoint);
	}
};

function makePinSprite(pinSprite, path, ext) {
	path = path || './img/';
	ext = ext || 'jpg';

	var sPoint = pinSprite;
	var geom = new THREE.PlaneGeometry(sPoint.size[0], sPoint.size[1]);

	var coord = TR3.getCoordsByXYmod(sPoint.point[0], sPoint.point[1], false, true);

	var texture = new THREE.TextureLoader().load(path + sPoint.pinSprite + '.' + ext);
	texture.colorSpace = THREE.SRGBColorSpace;
	// immediately use the texture for material creation 
	var material = new THREE.MeshBasicMaterial({ map: texture, alphaTest: 0.5 });
	var signMesh = new THREE.Mesh(geom.rotateX(-Math.PI / 12), material);

	var edgesGeometry = new THREE.EdgesGeometry(geom);
	var edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
	var edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);

	edges.name = 'edges';
	signMesh.add(edges);

	var box = TR3.getSizeObj(signMesh);
	signMesh.TR3 = new Object();
	signMesh.TR3.box = box[3];
	signMesh.TR3.hitbox = box[4];
	signMesh.TR3.radius = box[5];
	signMesh.TR3.slctItem = sPoint.slctItem;
	TR3.vGeom.obj3d.push(signMesh);

	signMesh.position.set(coord[3], coord[4] + signMesh.TR3.radius, coord[5]);
	TR3.lookAtXY.push(signMesh);

	TR3.scene.add(signMesh);
};

function updateMetricsTrack(dataAtindex) {

	TR3cfg.incDisTrack = dataAtindex.dist;
	TR3cfg.incDifTrack = dataAtindex.incAlt;
	var incDisTrackFrom = [TR3cfg.incDisTrack / 1000, 'km'];
	var fixDistTrack = 1;

	var incDifTrackFrom = TR3.formatMeasure(TR3cfg.incDifTrack, 'dist');
	var fixDiftTrack = 2;
	if (incDifTrackFrom[1] == 'm') { fixDiftTrack = 0; }

	document.getElementById('dataTrackDis').innerText = (incDisTrackFrom[0] * 1).toFixed(fixDistTrack).toString().replace('.', ',');
	document.getElementById('dataTrackDes').innerText = (incDifTrackFrom[0] * 1).toFixed(fixDiftTrack).toString().replace('.', ',');
	document.getElementById('dataTrackDisUnits').innerText = incDisTrackFrom[1];
	document.getElementById('dataTrackDesUnits').innerText = incDifTrackFrom[1];

};

