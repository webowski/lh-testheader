let customEvents = {
	open: new Event('open'),
	close: new Event('close'),
}

export const trigger = (element, event) => {
	element.dispatchEvent(customEvents[event])
}
