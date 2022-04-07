import { trigger } from '../helpers/Event'

let navMobile = document.querySelector('.NavMobile')

if (navMobile) {
	let navMobileOpeners = document.querySelectorAll('.NavOpener')

	navMobile.addEventListener('open', (e) => {
		navMobileOpeners.forEach(navMobileOpener => {
			navMobileOpener.classList.add('is-open')
		})
		navMobile.classList.add('is-open')
		document.body.classList.add('G-navOverlay')
	})

	navMobile.addEventListener('close', (e) => {
		navMobileOpeners.forEach(navMobileOpener => {
			navMobileOpener.classList.remove('is-open')
		})
		navMobile.classList.remove('is-open')
		document.body.classList.remove('G-navOverlay')
	})


	navMobileOpeners.forEach(navMobileOpener => {
		navMobileOpener.addEventListener('click', e => {
			if (navMobile.classList.contains('is-open')) {
				trigger(navMobile, 'close')
			} else {
				trigger(navMobile, 'open')
			}
		})
	})

	// event outer click
	document.body.addEventListener('click', e => {
		if (
			navMobile.classList.contains('is-open') &&
			// !e.target.closest('.NavMobile') &&
			!e.target.closest('.NavOpener') &&
			!e.target.classList.contains('NavOpener')
		){
			trigger(navMobile, 'close')
		}
	})
}
