export default function checkButtonsVisibility(containerRef, setShowButtons) {
  if (containerRef.current) {
    const { scrollWidth, clientWidth } = containerRef.current;
    setShowButtons(scrollWidth > clientWidth);
  }
}
