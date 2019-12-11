import React from 'react';
import './Overlay.scss';
import Swiper from 'react-id-swiper';

const Overlay = (props) => {
	console.log(props);
	const setOverlay = props.setOverlay;
	const params = {
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		spaceBetween: 30
	};
	return (
		<div className="overlay-container">
			<div className="overlay">
				<a href="#" className="close"
					onClick={(e) => {
						e.preventDefault();
						setOverlay(null);
					}}
				>X</a>
				<h1>{props.details.filename}</h1>
				<Swiper {...params}>
					<div>
						<div className="inner">
							<img className="gallery-img" src={props.details.filename} alt=""></img>
							<span className="similarity">1.0</span>
						</div>
					</div>
					<div>
						<div className="inner">
							<img className="gallery-img" src={props.details.closest_imgs[0][1]} alt=""></img>
							<span className="similarity">{props.details.closest_imgs[0][0]}</span>
						</div>
					</div>
					<div>
						<div className="inner">
							<img className="gallery-img" src={props.details.closest_imgs[1][1]} alt=""></img>
							<span className="similarity">{props.details.closest_imgs[1][0]}</span>
						</div>
					</div>
					<div>
						<div className="inner">
							<img className="gallery-img" src={props.details.closest_imgs[2][1]} alt=""></img>
							<span className="similarity">{props.details.closest_imgs[2][0]}</span>
						</div>
					</div>
					<div>
						<div className="inner">
							<img className="gallery-img" src={props.details.closest_imgs[3][1]} alt=""></img>
							<span className="similarity">{props.details.closest_imgs[3][0]}</span>
						</div>
					</div>
					<div>
						<div className="inner">
							<img className="gallery-img" src={props.details.closest_imgs[4][1]} alt=""></img>
							<span className="similarity">{props.details.closest_imgs[4][0]}</span>
						</div>
					</div>
				</Swiper>
			</div>
		</div>
	);
}

export default Overlay;
