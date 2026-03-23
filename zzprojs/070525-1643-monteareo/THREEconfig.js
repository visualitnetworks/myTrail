"use strict";
var TR3cfg =
{
	id: "Monteareo",
	magnification: 1.5,
	tweenDist: 1500,
	tweenTime: 2000,
	tweenSpeed: 15,
	distTiles: 2500,

	languaje: {
		set: 'ES',
		insert: true,
		includes: ['ES', 'EN'],
	},

	Text2map3d: [],
	objText2map: [],
	editionMode: false,

	sprite: {
		offsetZsprite: 140,
		fontSize: 45
	},

	tileSet: {
		row: 5,
		col: 8
	},

	arrTilesPreload: ['1-4', '2-4', '1-3', '2-3'],

	visibleGridTiles: false,//peta con los POIs

	loc: {
		//lookAt: [40, 20],
		lookCustom: {
			pos: {
				"x": -1549.1325137232282,
				"y": 745.0115024407482,
				"z": -359.11351146858703
			},
			tgt: {
				"x": -301.22238043146393,
				"y": -140.88300400931877 + 50,
				"z": -477.99076281652424
			}
		},
		pos: { h: geoDataTR3.center[0], v: geoDataTR3.center[1], z: 14 }
	},

	//lineLerpOffsetY: 4,
	//mineColor: 'rgb(104, 229, 27)',
	pathProjDir: formURL.zzProj,
	pathProjImgs: formURL.zzProj + 'skin/imgs/',
};

TR3cfg.followRabbitCam = { type: 'lateral', x: -TR3cfg.tweenDist, y: TR3cfg.tweenDist, z: TR3cfg.tweenDist, framesDist: 400 /* *0 GTA Mode */ };

var tracksTrail = new Array(2);

if (formURL.editor) { document.getElementById('adminLogin').style.display = "block"; }

if (isMobile()) {
	TR3cfg.mobile = true;
	document.getElementById('contIntro').setAttribute("style", "background: linear-gradient(180deg, rgba(0, 0, 0, 0) 73.58%, rgba(0, 0, 0, 0.74) 100%), url(" + TR3cfg.pathProjDir + "skin/intro-mvl.jpg) no-repeat center/cover rgb(0 0 0) !important");
}
if (isiOS()) {
	TR3cfg.isiOS = true;
}

function preload_image(im_url) {
	let img = new Image();
	img.src = im_url;
}
//preload_image("source/obj3d/intro.jpg");

TR3cfg.mainTexturesLoaded = false;
TR3cfg.attTextTiles = [];
var contPretiles = 0;
function preload_imageTiles(im_url) {
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function () {
		let pathParts = img.src.split("/");
		let file = pathParts[pathParts.length - 1];
		let name = file.split('.')[0];

		TR3cfg.attTextTiles.push({ img: img, name: name });
		if (TR3cfg.attTextTiles.length == contPretiles) { TR3cfg.mainTexturesLoaded = true }
	}
	img.src = im_url;
};

function preload_tiles() {
	var arrTiles = TR3cfg.arrTilesPreload;
	for (var i = 0; i < arrTiles.length; i++) {
		preload_imageTiles(TR3cfg.pathProjDir + "tiles/" + arrTiles[i] + ".jpeg");
		contPretiles++;
	}
};
preload_tiles();

TR3cfg.myturn = false;
TR3cfg.progressTimer = setInterval(function () {
	if (TR3cfg.myturn) {
		TR3cfg.myturn.children[1].value++;
		var currentProgess = TR3cfg.myturn.children[1].value;
		handleMyturnBar(currentProgess);
		if (currentProgess > 69) {
			clearInterval(TR3cfg.progressTimer);
		}
	}
}, 100);

if (isMobile()) {
	TR3cfg.mobile = true;
}

function setItems3D() {
	/*TRAILS-->*/
	TR3cfg.trails = new Array();
	for (let i = 0; i < tracksTrail.length; i++) {
		TR3cfg.trail({
			src: TR3cfg.pathProjDir + "data/" + tracksTrail[i].gpx + ".glb",
			pos: [
				TR3.centerZone[0],
				TR3.centerZone[1],
				TR3.zMed
			],
			extraData: tracksTrail[i].gpx,
			//aRotate: -1.5,
			slctItem: false
		}, tracksTrail[i].arrWayPois, TR3cfg.mineColor).then(function (line) {
			TR3cfg.trails.push(line);
			line.lerp.visible = false;
			line.lerp.position.y = 10000;
			if (line.path.name == tracksTrail[0].gpx) {
				TR3cfg.LineRabbit = line.path;
				line.lerp.visible = true;
				line.lerp.position.y = TR3cfg.lineLerpOffsetY || 3;
				TR3cfg.rabbitLight.posStart = line.lerp.startRabit;
				TR3cfg.rabbitLight.position.copy(line.lerp.startRabit);
				TR3.oscillate.push([TR3cfg.rabbitLight, 5, 25, TR3cfg.rabbitLight.position.y]);

				var dist = TR3.dataLineAtIndex(TR3cfg.LineRabbit, TR3cfg.LineRabbit.geometry.getAttribute('position').count - 1);
				trackChart.setChart(dist);
			}
		});
	}
	/*<--TRAILS*/

	/*var flag = {
		src: "source/obj3d/flag.glb",
		scale: [4,4,4],
		pos: [-643353.719,5394454.003,false],
		aRotate: -1.5,
		slctItem: false
	};

	TR3.loadFile(flag).then(function (obj) {

		let obj3D = obj[0].scene;
		TR3.scene.add(obj3D);
		//shadow.visible = true;
	});*/

	//-->TILES
	var rowPatch = TR3cfg.tileSet.row;
	var colPatch = TR3cfg.tileSet.col;

	rowPatch++;//+1 because 0 exist!
	colPatch++;//+1 because 0 exist!
	var contTiles = -1;
	var once = true;
	TR3cfg.tileGroup = new THREE.Group();
	TR3cfg.tileGroup.scale.copy(TR3.mesh.scale);
	TR3.scene.add(TR3cfg.tileGroup);
	TR3.meshAUX = TR3cfg.tileGroup;
	for (var i = 0; i < rowPatch; i++) {
		for (var j = 0; j < colPatch; j++) {
			fetch(TR3cfg.pathProjDir + "tiles/" + i + "-" + j + ".json")
				.then((res) => {
					if (!res.ok) {
						console.log(`HTTP json error! Status: ${res.status}`);
						return false;
					}
					return res.json();
				})
				.then((data) => {
					var geom = new THREE.PlaneGeometry(data.size.w, data.size.h, data.size.segW - 1, data.size.segH - 1);
					var coord = TR3.coordM2T(data.center[0], data.center[1], TR3.zMed, true);
					var tile = new THREE.Mesh(geom.rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({}));
					tile.position.set(coord[0], coord[1], coord[2]);
					tile.name = 'sysTile_' + data.name;
					tile.userData = { name: data.name };
					tile.visible = false;
					TR3cfg.tileGroup.add(tile);

					if (TR3cfg.visibleGridTiles) {
						//-->watch tiles
						var TXTpms = {
							text: data.name,
							font: { fontFace: "Arial", bold: false },
							pos: { x: 700, y: 0, z: 700, inv: true },
							center: true
						};
						var textSprite = TR3.makeTextSprite(TXTpms);
						tile.add(textSprite);

						const object = new THREE.Mesh(geom, new THREE.MeshBasicMaterial(0xff0000));
						const box = new THREE.BoxHelper(object, 0xffff00);
						tile.add(box);
						//<--watch tiles*/
					}

					var vertices = tile.geometry.getAttribute("position");
					for (var k = 0; k < vertices.count; k++) {
						vertices.setY(k, data.z[k] - TR3.zMed);
					}

					contTiles++;
					if (contTiles >= rowPatch * colPatch / 2 && once) {
						once = false;
						loadTextMainTiles();
					}

				})
		}
	}


};

var intervalTiles;
function loadTextMainTiles() {
	var contArrMainTiles = 0;
	intervalTiles = setInterval(function () {
		if (!TR3cfg.tileGroup.getObjectByName("sysTile_4-4") || TR3cfg.mainTexturesLoaded == false) { console.log('no_tiles_yet'); return false; }
		clearInterval(intervalTiles);
		for (var i = 0; i < TR3cfg.attTextTiles.length; i++) {

			var texture = new THREE.Texture(TR3cfg.attTextTiles[i].img);
			texture.colorSpace = THREE.SRGBColorSpace;
			texture.minFilter = THREE.LinearFilter;
			texture.flipY = true;

			texture.onUpdate = function () {
				console.log("texture updated");
			};
			var sysTile_  = TR3cfg.tileGroup.getObjectByName("sysTile_" + TR3cfg.attTextTiles[i].name);
			if(sysTile_ && sysTile_.material.map) sysTile_.material.map = texture;
			texture.needsUpdate = true;
			
			contArrMainTiles++;

			var currentProgess = TR3cfg.myturn.children[1].value++;
			handleMyturnBar(currentProgess);

			if (contArrMainTiles == TR3cfg.attTextTiles.length) {
				ditanceTiles();
				finshingMyTurn(); loadTextOtheriles();
			}
		}
	}, 100);
};

function loadTextOtheriles() {
	/*var rowPatch = 7;
	var colPatch = 12;
	rowPatch++;//+1 because 0 exist!
	colPatch++;//+1 because 0 exist!
	for (var i = 0; i < rowPatch; i++) {
		for (var j = 0; j < colPatch; j++) {
			var tileMapI = TR3cfg.tileGroup.getObjectByName("sysTile_" + i + "-" + j);
			if (tileMapI.material.map == null)
				tileMapI.material.map = new THREE.TextureLoader().load(TR3cfg.pathProjTiles + i + "-" + j + ".jpeg", function (tex) {
					tex.flipY = true;
				});
		}
	}*/
};

function ditanceTiles() {
	setInterval(function () {
		if (!TR3cfg.tileGroup) { return false; }
		var refernce = TR3.controls.target;

		var raycaster = TR3.getRayCaster(false);
		var inter = TR3.getIntersect(raycaster, [TR3.mesh]);
		if (inter.length > 0 && inter[0][0] && inter[0][0].point) {
			refernce = inter[0][0].point;
		}

		for (var i = 0; i < TR3cfg.tileGroup.children.length; i++) {
			var tileI = TR3cfg.tileGroup.children[i];
			var tilePoint = tileI.position;

			var dist = tilePoint.distanceTo(refernce);
			var visible = false;
			if (dist < TR3cfg.distTiles) {
				visible = true;
				if (tileI.material.map == null) {
					tileI.material.wireframe = true;
					setWFfalse(tileI, TR3cfg.intTexTime || 0.01);
					TR3cfg.starTextTime = performance.now();
					tileI.material.map = new THREE.TextureLoader().load(TR3cfg.pathProjDir + "tiles/" + tileI.userData.name + ".jpeg", function (tex) {
						tex.flipY = true;
						tex.colorSpace = THREE.SRGBColorSpace;
						TR3cfg.intTexTime = performance.now() - TR3cfg.starTextTime;
					});
				}
			}
			tileI.visible = visible;
		}
	}, 1000);
}

function setWFfalse(tile2wfFalse, time) {
	setTimeout(function () {
		tile2wfFalse.material.wireframe = false;
	}, time * 1.1);
}

function finshingMyTurn() {
	clearInterval(TR3cfg.progressTimer);
	var progressTimer2 = setInterval(function () {
		var currentProgess = TR3cfg.myturn.children[1].value += 10;
		handleMyturnBar(currentProgess);
		if (currentProgess > 99) {
			clearInterval(progressTimer2);
		}
	}, 100);
};

function handleMyturnBar(currP) {
	var currentProgess = currP.toFixed(1);
	var textHTML = TR3cfg.myturn.children[0];

	document.documentElement.style.setProperty("--display-progressBar", "block");

	if (currentProgess > 98) {
		textHTML.innerHTML = '<span idiomax="startNow" id="startNow" style="display: contents">' + TR3cfg.idiomax.text.startNow.message[TR3cfg.idiomax.actual] + '</span>';
		setTimeout(function () { TR3cfg.myturn.click(); }, 500);
	} else {
		if (TR3cfg.idiomax.actual)
			textHTML.innerHTML = '<span idiomax="loading" id="loading" style="display: contents">' + TR3cfg.idiomax.text.loading.message[TR3cfg.idiomax.actual] + ' </span>' + currentProgess.toString().replace('.', ',') + '%';
	}
};