export function handleScroll(container, direction, scrollAmount) {
	const containerScrollAmount = container.scrollLeft;

	if (direction === 'left') {
		container.scrollTo({
			left: containerScrollAmount - scrollAmount,
			behavior: 'smooth',
		});
	} else if (direction === 'right') {
		container.scrollTo({
			left: containerScrollAmount + scrollAmount,
			behavior: 'smooth',
		});
	}
}
