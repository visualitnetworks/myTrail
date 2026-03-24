function doOnOrientationChange() {
	setTimeout(function () {
		if (!isMobile()) {
			$("#cRight").dialog("option", "width", 500).resize();
			$("#cRight").dialog("option", "height", "auto").resize();

			$("#dlgDownTracks").dialog("option", "width", 500).resize();
			$("#dlgDownTracks").dialog("option", "height", "auto").resize();

			$("#cRight").dialog("widget").position({ my: "center bottom", at: "center bottom-5px", of: window });
			$("#dlgInfoTrack").dialog("widget").position({ my: "center bottom", at: "center bottom-5px", of: window });
			$("#dlgDownTracks").dialog("widget").position({ my: "center top", at: "center top+5px", of: window });

			$("#dlgIFCdoc").dialog("widget").position({ my: "center bottom", at: "center bottom-95px", of: window });
		} else {
			$('#cRight').css({
				'width': $(window).width() - 20,
				'height': $(window).height() - 20,
				'left': '0px',
				'top': '0px'
			}).resize();
			$('#dlgInfoTrack').css({
				'width': $(window).width() - 20,
				'height': $(window).height() - 20,
				'left': '0px',
				'top': '0px'
			}).resize();
			$('#dlgDownTracks').css({
				'width': $(window).width() - 20,
				'height': $(window).height() - 20,
				'left': '0px',
				'top': '0px'
			}).resize();
		}
	}, 500);
}

/*if (screen && screen.orientation && screen.orientation.type) {
	screen.orientation.addEventListener("change", doOnOrientationChange);
} else {
	window.addEventListener('orientationchange', doOnOrientationChange);//Safari!!!
}
window.addEventListener('resize', () => { doOnOrientationChange(); });
doOnOrientationChange();*/

$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
	_title: function (title) {
		if (!this.options.title) {
			title.html("&#160;");
		} else {
			title.html(this.options.title);
		}
	}
}));

$("#tools").dialog({ position: { my: "right top", at: "right top", of: window }, title: '<span idiomax="herras" id="herras">Herramientas</span>', width: 300, autoOpen: false });

$("#info").dialog({ position: { my: "center center", at: "center center", of: window }, title: 'Info', width: 350, autoOpen: false });
$('#info').bind('dialogclose', function (event, ui) {
	var idLayer = "fa-regular fa-copyright";
	document.getElementsByClassName(idLayer)[0].className = document.getElementsByClassName(idLayer)[0].className.replace('ItemActive', 'ItemInactive');
});
setTimeout(() => {
	$("#info").siblings('div.ui-dialog-titlebar').remove();
}, 100);
$("#info").parents('div').css("border-radius", "10px");

$("#adminLoginPnl").dialog({ position: { my: "center center", at: "center center", of: window }, title: 'Info', width: 350, autoOpen: false });
$('#adminLoginPnl').bind('dialogclose', function (event, ui) {
	var idLayer = "fa-regular fa-copyright";
	document.getElementsByClassName(idLayer)[0].className = document.getElementsByClassName(idLayer)[0].className.replace('ItemActive', 'ItemInactive');
});
$("#adminLoginPnl").siblings('div.ui-dialog-titlebar').remove();
$("#adminLoginPnl").parents('div').css("border-radius", "10px");

$("#setTextEditor").dialog({ position: { my: "center center", at: "center center", of: window }, title: 'Info', width: 350, autoOpen: false });
$('#setTextEditor').bind('dialogclose', function (event, ui) {
	var idLayer = "fa-regular fa-copyright";
	document.getElementsByClassName(idLayer)[0].className = document.getElementsByClassName(idLayer)[0].className.replace('ItemActive', 'ItemInactive');
});
$("#setTextEditor").siblings('div.ui-dialog-titlebar').remove();
$("#setTextEditor").parents('div').css("border-radius", "10px");
$("body").on("click", function (e) {
	if (e.target.id == 'setTextEditor' || e.target.id == 'texaClass'
		|| e.target.classList.value == 'makeBold' || e.target.classList.value == 'editBtn') {
	} else { $("#setTextEditor").dialog('close'); }
});

$("#cRight").dialog({
	position: { my: "center center", at: "center center", of: window }, title: 'Info',
	'width': $(window).width() - 10,
	'height': $(window).height() - 10,
	'left': '0px',
	'top': '0px', autoOpen: false
});
$("#cRight").siblings('div.ui-dialog-titlebar').remove();
$("#cRight").parents('div').css("border-radius", "10px");

$("#dlgInfoTrack").dialog({
	position: { my: "center center", at: "center center", of: window }, title: 'Info',
	'width': $(window).width() - 10,
	'height': $(window).height() - 10,
	'left': '0px',
	'top': '0px', autoOpen: false
});
$("#dlgInfoTrack").siblings('div.ui-dialog-titlebar').remove();

$('#map').dialog({ position: { my: "left top", at: "left top", of: window }, title: '<span idiomax="mapa" id="mapa">Mapa</span>', width: TR3cfg.mapSize, height: TR3cfg.mapSize, autoOpen: false });
$("#search").dialog({ position: { my: "center bottom", at: "center bottom", of: window }, title: false, width: 210, autoOpen: false });

$("#dlgIFCdoc").dialog({
	position: { my: "center bottom", at: "center bottom-45px", of: window },
	title: '', width: 350, autoOpen: false,
	open: function (event, ui) {
		$("#dlgIFCdoc").dialog("widget").position({ my: "center bottom", at: "center bottom-95px", of: window });
	}
});
$("#dlgIFCdoc").siblings('div.ui-dialog-titlebar').remove();
$("#dlgIFCdoc").parents('div').css("border-radius", "10px");

$("#dlgImagePatreon").dialog({
	position: { my: "center", at: "center", of: window },
	title: '', width: 100, autoOpen: false
});

$("#dlgImagePatreon").siblings('div.ui-dialog-titlebar').remove();
$("#dlgImagePatreon").parents('div').css("border-radius", "10px");

$("#dlgDownTracks").dialog({
	position: { my: "center center", at: "center center", of: window }, title: 'Info',
	'width': $(window).width() - 10,
	'height': $(window).height() - 10,
	'left': '0px',
	'top': '0px', autoOpen: false
});
$("#dlgDownTracks").siblings('div.ui-dialog-titlebar').remove();
$("#dlgDownTracks").parents('div').css("border-radius", "10px");
$('#dlgDownTracks').on('dialogclose', function (event, ui) {
	document.getElementById('downTrack').className = document.getElementById('downTrack').className.replace('ItemActive', 'ItemInactive');
});

// find the titlebar
var dlgtb = $("#map").dialog("instance").uiDialogTitlebar;
// add the button to titlebar    
dlgtb.append("<button id='btnExtMap' style='/*right:6px;*/position:absolute' class='ui-dialog-titlebar-close'></button>");
// make it an button    
$("#btnExtMap").button({
	icon: " ui-icon-caret-1-n",
	showLabel: false,
});
// add click handler
$("#btnExtMap").click(function () {
	if ($('#map')[0].style.display == 'block' || $('#map')[0].style.display == '') {
		$('#map')[0].style.display = 'none';
		//setTR3();
	} else {
		$('#map')[0].style.display = 'block';
	}
});

// find the titlebar
var dlgtb2 = $("#map").dialog("instance").uiDialogTitlebar;
// add the button to titlebar    
dlgtb2.append("<button id='btnExtMap2' style='/*right:6px;*/position:absolute' class='ui-dialog-titlebar-close'></button>");
// make it an button    
$("#btnExtMap2").button({
	icon: "ui-icon-arrow-4-diag",
	showLabel: false,
});
// add click handler
$("#btnExtMap2").click(function () {
	TR3cfg.switch2d3d();
});

$("#info").dblclick(function () {
	$("#tools").dialog("open");
	TR3.controls.maxPolarAngle = Infinity;
	TR3.controls.maxDistance = Infinity;
});

// find the titlebar
var dlgtb = $("#tools").dialog("instance").uiDialogTitlebar;
// add the button to titlebar    
dlgtb.append("<button id='btnExtTools' style='/*right:6px;*/position:absolute' class='ui-dialog-titlebar-close'></button>");
// make it an button    
$("#btnExtTools").button({
	icon: " ui-icon-caret-1-n",
	showLabel: false,
});
// add click handler
$("#btnExtTools").click(function () {
	if ($('#tools')[0].style.display == 'block' || $('#tools')[0].style.display == '') { $('#tools')[0].style.display = 'none' } else { $('#tools')[0].style.display = 'block' }
});

// find the titlebar
var dlgtb = $("#search").dialog("instance").uiDialogTitlebar;
// add the button to titlebar    
dlgtb.append("<button id='btnExtsearch' style='/*right:6px;*/position:absolute' class='ui-dialog-titlebar-close'></button>");
// make it an button    
$("#btnExtsearch").button({
	icon: " ui-icon-caret-1-n",
	showLabel: false,
});
// add click handler
$("#btnExtsearch").click(function () {
	if ($('#search')[0].style.display == 'block' || $('#search')[0].style.display == '') { $('#search')[0].style.display = 'none' } else { $('#search')[0].style.display = 'block' }
});

// find the titlebar
var dlgtb = $("#dlgIFCdoc").dialog("instance").uiDialogTitlebar;
// add the button to titlebar    
dlgtb.append("	<button id='btnExtdlgIFCdocPrev' style='left:5px;font-size: xx-small;width: 40px;color: crimson;' class='ui-dialog-titlebar-close'>&lt;&lt;Prev</button>\
				<button id='btnExtdlgIFCdocStop' style='left:47px;font-size: xx-small;width: 40px;color: crimson;' class='ui-dialog-titlebar-close'>Stop</button>\
				<button id='btnExtdlgIFCdocNext' style='left:89px;font-size: xx-small;width: 40px;color: crimson;' class='ui-dialog-titlebar-close'>Next>></button>\
				<button id='btnExtdlgIFCdoc' style='/*right:6px;*/position:absolute' class='ui-dialog-titlebar-close'></button>");
// make it an button    
$("#btnExtdlgIFCdoc").button({
	icon: " ui-icon-caret-1-n",
	showLabel: true,
});
// add click handler

TR3cfg.switch2d3d = function () {
	if (TR3cfg.pause3d == false) {
		$("#map").dialog('option', 'position', { my: "left top", at: "left top", of: window });
		$("#map").dialog("option", "height", window.innerHeight);
		$("#map").dialog("option", "width", window.innerWidth);
		/*var mapCanvas = $('#map canvas');
		for (var i = 0; i < mapCanvas.length; i++) {
			var mapCanvasI = mapCanvas[i];
			mapCanvasI.style.top = '0px';
			mapCanvasI.style.left = '0px';
		}
		TR3.clearMeshMap();
		TR3cfg.map.updateSize();*/
		TR3cfg.pause3d = true;
	} else {
		$("#map").dialog("option", "height", TR3cfg.mapSize);
		$("#map").dialog("option", "width", TR3cfg.mapSize);
		$('#map')[0].style.display = 'none';
		TR3cfg.pause3d = false;
		//setTR3();
	}
}

setTimeout(function () {
	$('#search')[0].style.display = 'none';
}, 5000);
$('#map')[0].style.display = 'none';

var constIn = 0;
var constOut = 0;

document.addEventListener('mousedown', function (e) {
	Ev_Start_Down(e);
});

document.addEventListener('touchstart', function (e) {
	Ev_Start_Down(e);
});

function Ev_Start_Down(e) {
	//TR3.oscillate = [];
	/*setTimeout(function () {
		TR3cfg.idiomax.set(TR3cfg.idiomax.get());
	}, 100);*/
	if (e && (document.getElementById("buttonPlay").className == 'ItemActive' || e.target.id.indexOf('buttonSpeed') != -1) && e.target.parentElement.id != 'TR3') {
		//setTimeout(function () { TR3.setOpts({ autoRotate: true }); }, 200);
	} else {
		//if (TR3cfg.clicked != true) {
		TR3.setOpts({ autoRotate: false });
		TR3cfg.clicked = true;
		if (TR3.loadingDiv.style.display == "block") {
			TR3.divLoading('<i class="fa-regular fa-circle-play"></i> off <i class="fa-regular fa-circle-play"></i>');
			TR3.loadingDiv.innerHTML = TR3.loadingDiv.innerHTML.replace("Loading ...", "");
			setTimeout(function () { TR3.loadingDiv.style.display = "none" }, 1000);
		}

		//$("#dlgIFCdoc").dialog('open');

		if (TR3.followCtmPath && TR3cfg.rabbitLight) {

			if (TWEENrabbit.cam) {
				var target = TR3.controls.target.clone();
				var camera = TR3.camera.position.clone();

				TWEENrabbit.cam.stop();
				TWEENrabbit.tgt.stop();

				TR3.controls.target.copy(target);
				TR3.camera.position.copy(camera);
			}

			TR3.followCtmPath.stop = true;
			/*var target = TR3.controls.target.clone();
			var tcr = TR3cfg.tweenControlRabbit;
			for (let i = 0; i < tcr.length; i++) {
				tcr[i].stop();
			}
			TR3cfg.tweenControlRabbit = [];
			TR3.controls.target.copy(target);*/

			document.getElementById('buttonPlay').className = document.getElementById('buttonPlay').className.replace('ItemActive', 'ItemInactive');
			document.getElementById('buttonPlay').className = document.getElementById('buttonPlay').className.replace('fa-solid fa-pause', 'fa-solid fa-play');
			togglePlay = true;
		}
		//}
	}
};

var firstTimeFollow = false;
var togglePlay = true;
var allowedPaly = true;
var justOneOnly = true;
TR3cfg.incDisTrack = 0;
TR3cfg.incDifTrack = 0;
var flagStartPlace = false;
var target = new THREE.Vector3();
TWEENrabbit = [];
document.getElementById("buttonPlay").addEventListener('click', function () {
	//var idClassPlay = 'fa-solid fa-play';
	//var idClassPause = 'fa-solid fa-pause';
	var follRabb = TR3cfg.followRabbitCam;
	TR3.controls.maxPolarAngle = Math.PI;
	document.getElementById('dataTrack').style.display = 'block';
	if (!allowedPaly || waitPrevNextScene) { setTimeout(function () { allowedPaly = true; }, 5000); return false; }

	togglePlay = !togglePlay;
	if (togglePlay == false) {
		document.getElementById('buttonPlay').className = document.getElementById('buttonPlay').className.replace('ItemInactive', 'ItemActive');
		//document.getElementById('buttonPlay').className = document.getElementById('buttonPlay').className.replace(idClassPlay, idClassPause);
		TR3cfg.rabbitLight.visible = true;

		TR3cfg.clicked = false;
		var pauseIndex = TR3.followCtmPath.pauseIndex || 0;
		TR3.setOpts({ autoRotate: false });
		function onComplete() {
			if (TR3cfg.LineRabbit)
				TR3.followCtmPath(TR3cfg.LineRabbit,
					TR3cfg.rabbitLight,
					TR3cfg.tweenSpeed,
					function (coords) {
						if (TR3.camera.position.distanceTo(coords) > 10000) {//too Far away
							TR3.camera.position.copy(coords).addScalar(TR3cfg.followRabbitCam.maxDist); follRabb.stop = false;
						}

						TR3.oscillate = [];
						if (TR3.followCtmPath.stop == true) { TR3cfg.rabbitLight.visible = false; return false; }
						//var dis = TR3cfg.tweenDist;
						//var pos = new THREE.Vector3(coords.x - dis, coords.y + dis, coords.z + dis)

						var trueCoords = TR3.coordM2T(coords.x, coords.y, coords.z);
						var trueTarget = TR3.coordM2T(target.x, target.y, target.z);
						var distance = Math.abs(TR3.getCoordsDistance3D(trueCoords, trueTarget));

						TR3cfg.incDisTrack += distance;
						var difAlt = Math.abs(trueCoords[2] - trueTarget[2]);
						flagStartPlace = false;
						if (Math.abs(Math.abs(TR3cfg.rabbitLight.posStart.x) - Math.abs(coords.x)) < TR3.tPixMesh / 2 &&
							Math.abs(Math.abs(TR3cfg.rabbitLight.posStart.z) - Math.abs(coords.z)) < TR3.tPixMesh / 2) {
							difAlt = 0;
							flagStartPlace = true;
						}
						TR3cfg.incDifTrack += difAlt;

						var auxDist;
						if (TR3.followCtmPath.pauseIndex % 20 == 0 && !flagStartPlace && justOneOnly) {
							//TR3.camera.position.copy(pos);
							justOneOnly = false;

							setTimeout(function () { justOneOnly = true; }, 700);

							auxDist = TR3.dataLineAtIndex(TR3cfg.LineRabbit, TR3.followCtmPath.pauseIndex);

						} else {
							auxDist = { dist: TR3cfg.incDisTrack, incAlt: TR3cfg.incDifTrack };
						}
						updateMetricsTrack(auxDist);

						target.copy(coords);
						//TR3.controls.target.copy(coords);
						if (follRabb.type == 'adaptative') {
							if (follRabb.tween && target.distanceTo(TR3.camera.position) < follRabb.maxDist) {
								var camera = TR3.camera.position.clone();
								follRabb.tween.stop();
								TR3.camera.position.copy(camera);
							}
							if (!follRabb.stop) {
								var camera = TR3.camera.position.clone();
								if (follRabb.tween) follRabb.tween.stop();
								TR3.camera.position.copy(camera);

								follRabb.stop = true;
								var getNormalPointAtObjectFaceByRay = TR3.getNormalPointAtObjectFaceByRay(false, TR3cfg.tileGroup, follRabb.hi || 500, false);

								var normPoint;
								if (getNormalPointAtObjectFaceByRay) {
									normPoint = getNormalPointAtObjectFaceByRay.normalPoint;
								} else { follRabb.stop = false; return false; }

								var timeDist = follRabb.timeDist;
								if (TR3.timeSpeedPlus) { timeDist /= TR3.timeSpeedPlus }
								if (firstTimeFollow) { timeDist = 1000; }

								follRabb.tween = new TWEEN.Tween(TR3.camera.position) //https://github.com/tweenjs/es6-tween
									.to({
										x: normPoint.x,
										y: normPoint.y,
										z: normPoint.z
									}, timeDist)
									.easing(TWEEN.Easing.Linear)
									.on('complete', function () {
										follRabb.stop = false;
									})
									.start();
							}
						} else {
							var offs = TR3cfg.followRabbitCam;//obj.TR3.hitbox.y * 5;
							var destiPos = new THREE.Vector3(coords.x + offs.x, coords.y + offs.y, coords.z + offs.z);
							TR3.camera.position.copy(destiPos);
						}
						TR3.controls.target.copy(coords);
						firstTimeFollow = false;
					},
					function () {
						TR3.controls.maxPolarAngle = 1.1;
						console.log('followCtmPathEnd');
						TR3cfg.rabbitLight.visible = false;
						allowedPaly = true;
						firstTimeFollow = true;
						follRabb.stop = true;

						var camera = TR3.camera.position.clone();
						if (follRabb.tween)
							follRabb.tween.stop();
						TR3.camera.position.copy(camera);
						TR3.followCtmPath.stop = true;

						if (TR3cfg.clicked == false) {
							TR3cfg.incDisTrack = 0;
							TR3cfg.incDifTrack = 0;
							//follRabb.stop = true;

							//TR3cfg.resetChart(false);

							TR3.followCtmPath.pauseIndex = 0;
							TR3cfg.rabbitLight.position.copy(TR3cfg.rabbitLight.posStart);
						}
						Ev_Start_Down();
					},
					pauseIndex, true
				);
		}

		TWEENrabbit = TR3cfg.moveRabbitLight(onComplete, false, follRabb.type, follRabb.timeDist || false, follRabb);
		var target = TR3.controls.target.clone();
		if (follRabb.type && follRabb.type == 'adaptative') {
			var camera = TR3.camera.position.clone();
			TWEENrabbit.cam.stop();
			TWEENrabbit.tgt.stop();
			TR3.controls.target.copy(target);
			TR3.camera.position.copy(camera);

			if (firstTimeFollow && TR3cfg.incDisTrack == 0) {
				var lookCtmP = TR3cfg.loc.lookCustom.pos;
				var pos = new THREE.Vector3(lookCtmP.x, lookCtmP.y, lookCtmP.z);
				TR3.camera.position.copy(pos);
			}
		}
	} else {
		document.getElementById('buttonPlay').className = document.getElementById('buttonPlay').className.replace('ItemActive', 'ItemInactive');
		//document.getElementById('buttonPlay').className = document.getElementById('buttonPlay').className.replace(idClassPause, idClassPlay);
		allowedPaly = false;
		Ev_Start_Down();
	}
});

var waitPrevNextScene = false; //disabled!
TR3cfg.idPoi = -1;
document.getElementById("buttonBackward").addEventListener('click', function () {
	if (!waitPrevNextScene) {
		waitPrevNextScene = true;
		TR3cfg.idPoi--;

		var tli = TR3cfg.getVisibleTrail(TR3cfg.trails);
		var pinGroup = tli.lerp.getObjectByName('pinGroup');
		pinGroup.traverse(function (child) {
			if (child.TR3) {
				var ed = child.TR3.extraData;
				var sleAux = ed.scaleAux;
				child.scale.set(sleAux, sleAux, sleAux);
			}
		});

		var trki = new Object();
		var poi = new Object();
		for (let i = 0; i < tracksTrail.length; i++) {
			if (tli.path.name == tracksTrail[i].gpx) {
				trki = tracksTrail[i];
				if (TR3cfg.idPoi < 0) { TR3cfg.idPoi = 0 }

				poi = trki.arrWayPois[TR3cfg.idPoi];

				if (poi.tilt && trki.arrWayPois[TR3cfg.idPoi - 1] && trki.arrWayPois[TR3cfg.idPoi - 1].tilt) {
					TR3cfg.idPoi--;
					poi = trki.arrWayPois[TR3cfg.idPoi];
				}

				var coord = TR3.getCoordsByXYmod(poi.point[0], poi.point[1], false, true);
				//if (Math.abs(TR3cfg.rabbitLight.position.x - coord[3]) < 100) { waitPrevNextScene = false; return false; }

				TR3cfg.rabbitLight.visible = false;
				TR3cfg.rabbitLight.position.set(coord[3], coord[4], coord[5]);
				this.className = 'btn-circular ItemActive';
				TR3cfg.moveRabbitLight(
					function () {
						document.getElementById("buttonBackward").className = 'btn-circular ItemInActive';
						var tli = TR3cfg.getVisibleTrail(TR3cfg.trails).path;
						var userdataClose = TR3cfg.getCloseIndexTrail(tli, TR3cfg.rabbitLight.position);
						TR3.followCtmPath.pauseIndex = userdataClose.pauseIndex;
						TR3cfg.rabbitLight.position.copy(userdataClose.from.addScalar(-1));
						waitPrevNextScene = false;

						pinGroup.traverse(function (child) {
							if (child.TR3) {
								var ed = child.TR3.extraData;
								if (ed.point.toString() == poi.point.toString()) {
									child.scale.multiplyScalar(1.3);
								}
							}
						});
					}, false, 'jump', 3000, { x: TR3cfg.tweenDist, y: TR3cfg.tweenDist, z: TR3cfg.tweenDist });
			}
		}
		TR3cfg.clicked = true;
	}
});

document.getElementById("buttonForward").addEventListener('click', function () {
	if (!waitPrevNextScene) {
		waitPrevNextScene = true;
		TR3cfg.idPoi++;

		var tli = TR3cfg.getVisibleTrail(TR3cfg.trails);
		var pinGroup = tli.lerp.getObjectByName('pinGroup');
		pinGroup.traverse(function (child) {
			if (child.TR3) {
				var ed = child.TR3.extraData;
				var sleAux = ed.scaleAux;
				child.scale.set(sleAux, sleAux, sleAux);
			}
		});

		var trki = new Object();
		var poi = new Object();
		for (let i = 0; i < tracksTrail.length; i++) {
			if (tli.path.name == tracksTrail[i].gpx) {
				trki = tracksTrail[i];
				if (TR3cfg.idPoi > trki.arrWayPois.length - 1) { TR3cfg.idPoi = trki.arrWayPois.length - 1; }

				var poi = trki.arrWayPois[TR3cfg.idPoi];
				if (poi.tilt && trki.arrWayPois[TR3cfg.idPoi + 1] && trki.arrWayPois[TR3cfg.idPoi + 1].tilt) {
					TR3cfg.idPoi++;
					poi = trki.arrWayPois[TR3cfg.idPoi];
				}

				var coord = TR3.getCoordsByXYmod(poi.point[0], poi.point[1], false, true);
				//if (Math.abs(TR3cfg.rabbitLight.position.x - coord[3]) < 100) { waitPrevNextScene = false; return false; }

				TR3cfg.rabbitLight.visible = false;
				TR3cfg.rabbitLight.position.set(coord[3], coord[4], coord[5]);
				this.className = 'btn-circular ItemActive';
				TR3cfg.moveRabbitLight(
					function () {
						document.getElementById("buttonForward").className = 'btn-circular ItemInActive';
						var tli = TR3cfg.getVisibleTrail(TR3cfg.trails).path;
						var userdataClose = TR3cfg.getCloseIndexTrail(tli, TR3cfg.rabbitLight.position);
						TR3.followCtmPath.pauseIndex = userdataClose.pauseIndex;
						TR3cfg.rabbitLight.position.copy(userdataClose.from.addScalar(-1));
						waitPrevNextScene = false;

						pinGroup.traverse(function (child) {
							if (child.TR3) {
								var ed = child.TR3.extraData;
								if (ed.point.toString() == poi.point.toString()) {
									child.scale.multiplyScalar(1.3);
								}
							}
						});
					}, false, 'jump', 3000, { x: TR3cfg.tweenDist, y: TR3cfg.tweenDist, z: TR3cfg.tweenDist });
			}
		}
		TR3cfg.clicked = true;
	}
});

TR3cfg.moveRabbitLight = function (onComplete, tgt, cameraTypeMove, fncTime, gapCamera) {
	if (!onComplete) {
		onComplete = function () { }
	}
	var rabbPos = tgt || TR3cfg.rabbitLight.position;
	var gap = gapCamera || TR3cfg.followRabbitCam;
	var pos = new THREE.Vector3(rabbPos.x + gap.x, rabbPos.y + gap.y, rabbPos.z + gap.z)
	var tweenTime = fncTime || TR3cfg.tweenTime / 2;
	var tweenCAM;
	var tweenTGT;

	if (cameraTypeMove && cameraTypeMove == 'adaptative') { tweenTime = 750; }

	if (rabbPos.x == TR3.controls.target.x) {
		TR3.controls.target.addScalar(100);
		TR3.camera.position.addScalar(100);
		rabbPos.addScalar(-1);
		//tweenTime = 100;
	}

	if (cameraTypeMove && cameraTypeMove == 'jump') {

		var dis = TR3cfg.tweenDist;//obj.TR3.hitbox.y * 5;
		//var destiPos = new THREE.Vector3(des.x + dis, des.y + dis, des.z + dis);//new THREE.Vector3(desti[0], desti[1], desti[2]);
		var normalPointRay = TR3.getNormalPointAtObjectFaceByRay(TR3.getRayCaster([new THREE.Vector3(rabbPos.x, rabbPos.y + 1000, rabbPos.z), new THREE.Vector3(0, -1, 0)], 'point-vector'), TR3cfg.tileGroup, dis, false);
		var pos = normalPointRay.normalPoint;
		if (Math.abs(rabbPos.x - pos.x) < 500) { pos.x += 1000 * Math.sign(pos.x); }
		if (Math.abs(rabbPos.z - pos.z) < 500) { pos.z += 1000 * Math.sign(pos.z); }

		var raycaster = TR3.getRayCaster([new THREE.Vector3(pos.x, pos.y + 1000, pos.z), new THREE.Vector3(0, -1, 0)], 'point-vector')
		var intersect = TR3.getIntersect(raycaster, [TR3cfg.tileGroup])[0][0];
		if (intersect) {
			if (pos.y < intersect.point.y) { pos.y = intersect.point.y + 1000; }
		}
		var raycaster = TR3.getRayCaster([pos, new THREE.Vector3().subVectors(pos, rabbPos).normalize().negate()], 'point-vector');
		var intersect = TR3.getIntersect(raycaster, [TR3cfg.tileGroup])[0][0];
		if (intersect && intersect.point.distanceTo(rabbPos) > 300) {
			pos.y += 1000;
		}

		var onCompleteJump = onComplete;
		var halfPosCam = TR3.camera.position.lerp(pos, .5);
		tweenCAM = new TWEEN.Tween(TR3.camera.position) //https://github.com/tweenjs/es6-tween
			.to({ x: halfPosCam.x, y: halfPosCam.y + 500, z: halfPosCam.z }, tweenTime / 2)
			//.easing(TWEEN.Easing.Quadratic.Out)
			.on('complete', function () {
				new TWEEN.Tween(TR3.camera.position) //https://github.com/tweenjs/es6-tween
					.to({ x: pos.x, y: pos.y, z: pos.z }, tweenTime / 2)
					.easing(TWEEN.Easing.Quadratic.Out)
					.on('complete', onCompleteJump)
					.start();
			})
			.start();
		onComplete = function () { };
	} else {
		tweenCAM = new TWEEN.Tween(TR3.camera.position) //https://github.com/tweenjs/es6-tween
			.to({ x: pos.x, y: pos.y, z: pos.z }, tweenTime)
			.start();
	}


	tweenTGT = new TWEEN.Tween(TR3.controls.target) //https://github.com/tweenjs/es6-tween
		.to({ x: rabbPos.x, y: rabbPos.y, z: rabbPos.z }, tweenTime / 2)
		.on('complete', onComplete)
		.start();

	return { cam: tweenCAM, tgt: tweenTGT };
};

document.getElementById("buttonStereo").addEventListener('click', function () {
	var options = TR3.getOptions();
	var opt = options.anaglyph;
	TR3.setOpts({ anaglyph: !opt });
	var idLayer = "fas fa-solid fa-glasses";
	if (opt) {
		document.getElementsByClassName(idLayer)[0].className = document.getElementsByClassName(idLayer)[0].className.replace('ItemActive', 'ItemInactive');
	} else {
		document.getElementsByClassName(idLayer)[0].className = document.getElementsByClassName(idLayer)[0].className.replace('ItemInactive', 'ItemActive');
	}
});

//var hasTouchStartEvent = 'ontouchstart' in document.createElement('div');

/*document.addEventListener(hasTouchStartEvent ? 'touchstart' : 'mousedown', function (e) {
	//console.log( e.touches ? 'TouchEvent' : 'MouseEvent' );
}, false);*/
let toogleGeoloc = false;
document.getElementById("geoloc").addEventListener('click', function () {
	if (!toogleGeoloc) {
		$('#info').html('<p onclick="$(\'#info\').dialog(\'close\');" class="close-modal-style"><img src="./skin/icon-close.svg"></p>\
	<h6 idiomax="TtlGPS" id="TtlGPS">Habilita la ubicación del GPS de tu teléfono</h6>\
	<p idiomax="bdyGPS" id="bdyGPS">\
		Para poder disfrutar de todas las funcionalidades del recorrido debes activar tu ubicación.</p>\
		<button onclick="geoLocation()">\
			<img class="white-icon" style="max-width:18px" src="./skin/icon-gps.svg">\
			<span idiomax="activeLoc" id="activeLoc">Activar ubicación</span>\
		</button>');
		$('#info').dialog('open');
		TR3cfg.idiomax.set(TR3cfg.idiomax.get());
	} else {
		$('#info').dialog('close');
		geoLocation(false);
	}
	toogleGeoloc = !toogleGeoloc;
});

document.getElementById("btnInfoTrack").addEventListener('click', function () {
	var dlg = $("#dlgInfoTrack");
	var idButton = "btnInfoTrack";
	toggleDLG(dlg, idButton);
});

document.getElementById("adminLogin").addEventListener('click', function () {
	var dlg = $("#adminLoginPnl");
	var idButton = "adminLogin";
	toggleDLG(dlg, idButton);
	$("#adminLoginPnl").css("max-height", window.innerHeight / 1.15);

	document.getElementById('menuLoged').style.height = 'auto';
	setTimeout(() => { document.getElementById('menuLoged').style.height = '42px'; }, 500);
});

document.getElementById("buttonWalk").addEventListener('click', function () {
	TR3cfg.__trak = false;
	var idGeoloc = "fas fa-crosshairs";
	var idWalk = "fas fa-walking";
	document.getElementsByClassName(idGeoloc)[0].className = document.getElementsByClassName(idGeoloc)[0].className.replace('ItemActive', 'ItemInactive');
	if (TR3.moving != true) {
		document.getElementsByClassName(idWalk)[0].className = document.getElementsByClassName(idWalk)[0].className.replace('ItemInactive', 'ItemActive');
		TR3.moveKey.size = 7;
		TR3.personViewFn();
		TR3.setOpts({ autoRotate: false });
	} else {
		document.getElementsByClassName(idWalk)[0].className = document.getElementsByClassName(idWalk)[0].className.replace('ItemActive', 'ItemInactive');
		TR3.moving = false;
		TR3.orbitalViewFn();
		TR3.setOpts({ autoRotate: false });

		TR3.setLookAtini(TR3cfg.loc.lookAt);
	}
});

TR3cfg.buttonLyrsCheck = true;
document.getElementById("buttonLyrs").addEventListener('click', function () {
	//var dlg = $("#dlgLayers");
	TR3cfg.buttonLyrsCheck = !TR3cfg.buttonLyrsCheck;
	if (TR3cfg.buttonLyrsCheck) {
		this.className = this.className.replace('ItemActive', 'ItemInactive');
	} else {
		this.className = this.className.replace('ItemInactive', 'ItemActive');
	}

	TR3.divLoading('<i class="fa-solid fa-layer-group"></i> Loading Map <i class="fa-solid fa-layer-group"></i>');
	TR3.loadingDiv.innerHTML = TR3.loadingDiv.innerHTML.replace("Loading ...", "");
	TR3.loadingDiv.style.marginTop = TR3.canvasDestH / 2 - 40 + "px";
	TR3.loadingDiv.style.marginLeft = TR3.canvasDestW / 2 - 40 + "px";

	if (TR3cfg.buttonLyrsCheck) {
		//TR3cfg.checkeableLyrs[0].setVisible(true);
		TR3cfg.loadimageMesh('imageMap');
		TR3.scene.getObjectByName('patch').visible = true;
	} else {
		TR3cfg.loadimageMesh('imageMap1');
		TR3.scene.getObjectByName('patch').visible = false;
	}
});

TR3cfg.downTrack = function (name) {
	var link = document.createElement("a");
	// If you don't know the name or want to use
	// the webserver default set name = ''
	link.setAttribute('download', name + '.gpx');
	link.href = TR3cfg.pathProjDir + 'data/' + name + '.gpx';
	document.body.appendChild(link);
	link.click();
	link.remove();
}

TR3cfg.selectTrack = function () {
	var select = document.getElementById("selectTrack");
	var selectedOption = select.options[select.selectedIndex];

	TR3cfg.setVisibleTrail(selectedOption.id);
};

document.getElementById("dbclik4line").addEventListener('dblclick', function () {
	//TR3cfg.tileGroup.scale.set(1, 1, 1);
	TR3.getFeatFromOL(TR3cfg.vecTrail.getSource().getFeatures(), [TR3cfg.tileGroup]);//tubeOl/lineOl

	setTimeout(function () { TR3.transCtrlsEnabled(TR3.scene.children[TR3.scene.children.length - 1]) }, 500); //TR3.click_Obj3d
	setTimeout(function () { TR3.exportGLTF('selected'); }, 1000); //TR3.click_Obj3d
});

document.getElementById("dbclik4lineLerping").addEventListener('dblclick', function () {
	//TR3cfg.tileGroup.scale.set(1, 1, 1);
	TR3.getFeatFromOL(TR3cfg.vecTrail.getSource().getFeatures(), [TR3cfg.tileGroup], 30);//tubeOl/lineOl

	setTimeout(function () { TR3.transCtrlsEnabled(TR3.scene.children[TR3.scene.children.length - 1]) }, 500); //TR3.click_Obj3d
	setTimeout(function () { TR3.exportGLTF('selected'); }, 1000); //TR3.click_Obj3d
});

var indexSpeed = -1;
var arrValSpeed = [2, .5, 1];
document.getElementById("buttonSpeed").addEventListener('click', function () {
	indexSpeed++;
	if (indexSpeed > arrValSpeed.length - 1) { indexSpeed = 0; }
	var valSpeed = arrValSpeed[indexSpeed]
	TR3.timeSpeedPlus = valSpeed;
	this.innerText = 'x' + valSpeed.toString();
});

document.getElementById("downTrack").addEventListener('click', function () {
	var dlg = $("#dlgDownTracks");
	var idButton = "downTrack";
	toggleDLG(dlg, idButton);
});

document.getElementById("buttonTraks").addEventListener('click', function () {
	var idButton = "buttonTraks";
	toggleDLG(dlg, idButton);
});

TR3cfg.loadimageMesh = function loadimageMesh(src) {
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function () {
		var canvas = document.createElement('CANVAS'),
			ctx = canvas.getContext('2d');
		canvas.id = 'IGNBaseTodo';
		canvas.height = img.height;
		canvas.width = img.width;
		ctx.drawImage(img, 0, 0);

		TR3.setImageMesh(canvas);
		//document.getElementById('waitMaplbl').style.display = 'none';

		TR3.loadingDiv.innerHTML = TR3.loadingDiv.innerHTML.replace("Loading ...", "");
		setTimeout(function () { TR3.loadingDiv.style.display = "none" }, 1000);

	};
	img.src = TR3cfg.pathProjDir + 'data/' + src + '.jpeg';
}

document.getElementById("buttonTerrain").addEventListener('click', function () {
	document.getElementById('terrain').click();
	var checked = document.getElementById('terrain').checked
	var idLayer = "fa-solid fa-mountain";
	if (!checked) {
		document.getElementsByClassName(idLayer)[0].className = document.getElementsByClassName(idLayer)[0].className.replace('ItemActive', 'ItemInactive');
	} else {
		document.getElementsByClassName(idLayer)[0].className = document.getElementsByClassName(idLayer)[0].className.replace('ItemInactive', 'ItemActive');
	}

});

document.getElementById("buttonCright").addEventListener('click', function () {
	var dlg = $("#cRight");
	var idButton = "buttonCright";
	toggleDLG(dlg, idButton);
});

document.getElementById("zenital").addEventListener('click', function () {
	var lookAt = TR3cfg.loc.lookAt;
	TR3.setLookAtini(lookAt[0], lookAt[1]);
	TR3.moving = false;
	TR3.setOpts({ autoRotate: true });
});

function toggleDLG(dlg, idButton) {
	var isOpen = dlg.dialog("isOpen");
	var className = document.getElementById(idButton).className;

	if (isOpen) {
		document.getElementById(idButton).className = className.replace('ItemActive', 'ItemInactive');
		dlg.dialog("close");
	} else {
		document.getElementById(idButton).className = className.replace('ItemInactive', 'ItemActive');
		dlg.dialog("open");
	}
	TR3cfg.idiomax.set(TR3cfg.idiomax.get());

	return dlg.dialog("isOpen");
}

var elements = document.getElementsByClassName("rrssBtn");
for (var i = 0; i < elements.length; i++) {
	elements[i].addEventListener('click',
		function () {
			RRSS(this.className);
		}
		, false);
}

function setBuildings(feat) {
	for (var i = 0; i < feat.length; i++) {
		//var extent = feat[i].getGeometry().getExtent();
		//var bbox = TR3cfg.map.getView().calculateExtent(TR3cfg.map.getSize());
		//var bbox = TR3cfg.loc.bbox;
		var prop = feat[i].getProperties();
		var center = feat[i].getGeometry().getInteriorPoint().getCoordinates();

		var coords = feat[i].getGeometry().getCoordinates();

		if (prop.fAboveG > 0) {

			var center = TR3.translate2DbyXYmod(center[0], center[1], true)
			var vertex = coords[0];
			var vertex2D = [];
			for (var j = 0; j < vertex.length; j++) {
				vertex2D.push(TR3.translate2DbyXYmod(vertex[j][0], vertex[j][1], true));
			}
			var groupBuild = TR3.extrude2Dfeature(vertex2D, prop.fAboveG * 3, [center[0], center[1]], true);
			var Y = TR3.getCoordsByXYmod(center[0], center[1])[4]

			for (var j = 0; j < groupBuild.length; j++) {
				groupBuild[j].position.y += Y;
				//TR3.scene.add(groupBuild[j]);
			}
			groupBuild[0].material.color.set(new THREE.Color(0xFFFFFF));
			TR3.scene.add(groupBuild[0]);
			TR3.vGeom.build.push(groupBuild[1]);
		}
	}
}

function setTR3() {
}

// https://openlayers.org/en/latest/examples/tile-load-events.html
/**
 * Renders a progress bar.
 * @param {HTMLElement} el The target element.
 * @constructor
 */
function Progress(el) {
	this.el = el;
	this.loading = 0;
	this.loaded = 0;
}

/**
 * Increment the count of loading tiles.
 */
Progress.prototype.addLoading = function () {
	if (this.loading === 0) {
		this.show();
	}
	++this.loading;
	this.update();
};

/**
 * Increment the count of loaded tiles.
 */
Progress.prototype.addLoaded = function () {
	var this_ = this;
	setTimeout(function () {
		++this_.loaded;
		this_.update();
	}, 100);
};

/**
 * Update the progress bar.
 */
Progress.prototype.update = function () {
	var width = ((this.loaded / this.loading) * 100).toFixed(1) + '%';
	this.el.style.width = width;
	if (this.loading === this.loaded) {
		this.loading = 0;
		this.loaded = 0;
		var this_ = this;
		setTimeout(function () {
			this_.hide();
		}, 500);
	}
};

/**
 * Show the progress bar.
 */
Progress.prototype.show = function () {
	this.el.style.visibility = 'visible';
};

/**
 * Hide the progress bar.
 */
Progress.prototype.hide = function () {
	if (this.loading === this.loaded) {
		this.el.style.visibility = 'hidden';
		this.el.style.width = 0;
	}
};

/**
 * Update the progress bar.
 */
Progress.prototype.update = function () {
	var width = ((this.loaded / this.loading) * 100).toFixed(1) + '%';
	this.el.style.width = width;
	if (this.loading === this.loaded) {
		this.loading = 0;
		this.loaded = 0;
		var this_ = this;
		setTimeout(function () {
			//setTR3();
		}, 500);
	}
};

var progress = new Progress(document.getElementById('progress'));
var countLoad = 0;
for (i = 0; i < TR3cfg.checkeableLyrs.length; i++) {
	TR3cfg.checkeableLyrs[i].getSource().on('tileloadstart', function () {
		progress.addLoading();
		//delMarkers();
	});

	TR3cfg.checkeableLyrs[i].getSource().on('tileloadend', function () {
		progress.addLoaded();
		//setTR3();
	});

	TR3cfg.checkeableLyrs[i].getSource().on('tileloaderror', function (event) {
		progress.addLoaded();
		if (countLoad < 30) {
			event.tile.load();
			countLoad++;
		}
	});
};

function moveForward(go) {
	var dist25pct = TR3.camera.position.distanceTo(TR3.controls.target) * 25 / 100;
	var dir = new THREE.Vector3();
	var speed = go * dist25pct;
	TR3.camera.getWorldDirection(dir);
	TR3.camera.position.addScaledVector(dir, speed);
}

var link2viewIntervalID;
function link2view(elem) {
	var inputLinkview = document.getElementById("inputLinkview");
	if (inputLinkview.style.visibility == 'visible') {
		elem.className = elem.className.replace('ItemActive', 'ItemInactive');
		inputLinkview.style.visibility = 'hidden';

		clearInterval(link2viewIntervalID);
	} else {
		elem.className = elem.className.replace('ItemInactive', 'ItemActive');
		inputLinkview.style.visibility = 'visible';

		link2viewIntervalID = setInterval(() => {
			var pos = TR3.camera.position;
			var raycaster = TR3.getRayCaster(false);
			var inter = TR3.getIntersect(raycaster, [TR3cfg.tileGroup]);
			var tgt = new THREE.Vector3();
			if (inter && inter[0] && inter[0][0] && inter[0][0].point) {
				tgt = inter[0][0].point;
			} else {
				tgt = TR3.controls.target;
			}

			spams.set("looktoward", [pos.x, pos.y, pos.z, tgt.x, tgt.y, tgt.z].map(function (each_element) {
				return Number(each_element.toFixed());
			}));

			spams.set("autostart", false);
			formURL.autostart = false;

			inputLinkview.value = `${location.origin}${location.pathname}?${spams.toString()}`;
		}, 1000);
	}

}

document.getElementById("myturn").addEventListener('click', function (e) {
	//if (e.target.innerHTML.indexOf( TR3cfg.idiomax.text[TR3cfg.idiomax.actual].startNow) > -1) {
	if (!e.pointerType) {//no se ha hecho click
		document.getElementById('contIntro').style.display = 'none';
		document.getElementById('loading').style.display = 'none';
		document.getElementById('dataTrack').style.display = 'none';

		document.getElementById('logo-terre3-right-bottom').style.display = 'block';

		/*var auxMesh = TR3.mesh.clone();
		auxMesh.name = 'auxMesh';
		auxMesh.position.y = -105;
		TR3.scene.add(auxMesh);*/
		TR3.mesh.material.depthTest = false;

		//Review positions pinGroupe (defensive CODE)
		for (i = 0; i < TR3cfg.trails.length; i++) {
			var pinGoupeReview = TR3cfg.trails[i].lerp.getObjectByName("pinGroup");//.children[34].position.y
			for (j = 0; j < pinGoupeReview.children.length; j++) {
				var object = pinGoupeReview.children[j];
				object.position.y += TR3.zMax * 3;
				var raycaster = TR3.getRayCaster([object.position, new THREE.Vector3(0, -1, 0)], 'point-vector');
				var intersect = raycaster.intersectObject(TR3cfg.tileGroup, true)[0];
				if (intersect) {
					object.position.copy(intersect.point);
				}
			}
		}

		setTimeout(() => {
			var Ghills = TR3.scene.getObjectByName('G-hills');
			if (Ghills) {
				Ghills.scale.x *= 1.5;
				Ghills.scale.z *= 1.5;
			}
			TR3.setOpts({ autoRotate: true }); TR3cfg.rabbitLight.visible = true;
		}, 200);
		setTimeout(function () {
			if (formURL.autostart) {
				togglePlay = true;
				document.getElementById('buttonPlay').click();
			}// true
		}, 1000);
	}
});
TR3cfg.myturn = document.getElementById('myturn');
TR3cfg.myturn.children[1].value = 12;