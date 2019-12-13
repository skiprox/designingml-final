import React from 'react';
import './Overlay.scss';
import Swiper from 'react-id-swiper';
import { TweenMax } from 'gsap/dist/gsap';

const Overlay = (props) => {
	const setOverlay = props.setOverlay;
	let overlayContainer, overlay, similarities, tooltip;
	const closeAnimation = () => {
		TweenMax.to(overlay, 0.3, {
			y: -900,
			onComplete: function() {
				TweenMax.to(overlayContainer, 0.3, {
					opacity: 0,
					onComplete: function() {
						setOverlay(null);
					}
				});
			}
		});
	}
	const openAnimation = () => {
		TweenMax.set(overlayContainer, {opacity: 0});
		TweenMax.set(overlay, {y: 900});
		TweenMax.to(overlayContainer, 0.3, {
			opacity: 1,
			onComplete: function() {
				TweenMax.to(overlay, 0.3, {
					y: 0
				});
			}
		});
	}
	const openTooltip = () => {
		console.log('we open');
		tooltip.style.visibility = 'visible';
		TweenMax.to(tooltip, 0.3, {
			opacity: 1
		});
	}
	const closeTooltip = () => {
		TweenMax.to(tooltip, 0.3, {
			opacity: 0,
			onComplete: function() {
				tooltip.style.visibility = 'hidden';
			}
		})
	}
	setTimeout(() => {
		overlayContainer = document.querySelector('.overlay-container');
		overlay = document.querySelector('.overlay');
		similarities = [].slice.call(document.querySelectorAll('.similarity'));
		tooltip = document.querySelector('.tooltip');
		openAnimation();
		// Close event listener
		document.querySelector('.close').addEventListener('click', (e) => {
			e.preventDefault();
			closeAnimation();
		});
		// Clicking anywhere event listener
		overlayContainer.addEventListener('click', (e) => {
			if (e.target.classList.contains('overlay-container')) {
				closeAnimation();
			}
		});
		// Hovering over any similarity item
		similarities.forEach((elem) => {
			elem.addEventListener('mouseover', (e) => {
				openTooltip();
			});
			elem.addEventListener('mouseout', (e) => {
				closeTooltip();
			});
		});
	}, 10);
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
				<div className="similarity-hint tooltip">
					<p>This is an indicator of how similar the image is to the original. 1.0 means a perfect match, -1.0 means a complete mismatch.</p>
				</div>
				<a href="#" className="close">X</a>
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
