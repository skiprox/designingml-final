import React, { useState , useRef, useEffect } from 'react';

import Overlay from './components/Overlay/Overlay';

import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';

import { TweenMax } from 'gsap';

import positions from './image_umap_positions';

import './App.scss';

//let positions;

function App() {
	const canvas = useRef(null);
	const [overlay, setOverlay] = useState(null);

	// Load all our images into the canvas!
	useEffect(() => {
		console.log(positions);
		const app = new PIXI.Application({
			width: window.innerWidth,
			height: window.innerHeight,
			view: canvas.current
		});
		document.body.appendChild(app.view);

		let positionDict = {}

		for(let i = 0; i < positions.length; i ++) {
			const filename = positions[i].filename.replace(/\//g, '_');
			const name = filename.replace('.jpg', '');

			app.loader.add(name, "./resized/" + filename)

			positionDict[name] = positions[i]
		}

		const viewport = new Viewport({
			screenWidth: window.innerWidth,
			screenHeight: window.innerHeight,
			worldWidth: positions.length,
			worldHeight: positions.length,
			interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
		});

		// Set the background color
		app.renderer.backgroundColor = 0xf8f8f8;

		// add the viewport to the stage
		app.stage.addChild(viewport);

		// activate plugins
		viewport
			.drag()
			.pinch()
			.wheel()
			.decelerate()


		app.loader.load((loader, resources) => {
			for(let key in resources) {
				const imageSprite = new PIXI.Sprite(resources[key].texture)

				const clusterPos = positionDict[key].cluster_pos;

				imageSprite.x = app.renderer.width * (clusterPos[0] * 2 - 1);
				imageSprite.y = app.renderer.width * (clusterPos[1] * 2 - 1);

				imageSprite.anchor.x = 0.5;
				imageSprite.anchor.y = 0.5;

				console.log(imageSprite);
				imageSprite.transform.scale.x = 0.5;
				imageSprite.transform.scale.y = 0.5;

				imageSprite.interactive = true;

				const name = key;
				imageSprite.on('click', () => {
					setOverlay(positionDict[name]);
				});

				imageSprite.on('mouseover', () => {
					TweenMax.to(imageSprite.scale, 0.3, {x:1, y:1});
					// imageSprite.height = imageSprite.height * 2;
					// imageSprite.width = imageSprite.width * 2;
				});

				imageSprite.on('mouseout', () => {
					TweenMax.to(imageSprite.scale, 0.3, {x:0.5, y:0.5});
					// imageSprite.height = imageSprite.height * .5;
					// imageSprite.width = imageSprite.width * .5;
				});

				viewport.addChild(imageSprite);
			}
		});
	}, []);
	return (
		<div className="app">
			<canvas ref={canvas} />
			{overlay && <Overlay details={overlay} setOverlay={setOverlay} />}
		</div>
	);
}

export default App;
