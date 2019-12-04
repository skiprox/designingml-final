import React from 'react';
import './Overlay.scss';

const Overlay = (props) => {
	console.log(props);
	let filename = props.details.filename.replace(/\//g, '_');
	const setOverlay = props.setOverlay;
	return (
		<div className="overlay">
			<button
				onClick={() => {
					setOverlay(null);
				}}
			>Close this please</button>
			<h1>{props.details.filename}</h1>
			<img src={'resized/' + filename}></img>
		</div>
	);
}

export default Overlay;
