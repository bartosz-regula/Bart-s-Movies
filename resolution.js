const breakpoints = [
  { size: 1920, label: 'Full HD duże monitory' },
  { size: 1440, label: 'większe desktopy' },
  { size: 1280, label: 'macbook Air' },
  { size: 1024, label: 'małe laptopy/ iPad PRO' },
  { size: 768, label: 'iPad mini' },
  { size: 440, label: 'iPhone Pro Max' },
  { size: 414, label: 'iPhone XR' },
  { size: 375, label: 'iPhone XS' },
  { size: 320, label: 'iphone 5' },
];

// Wyświetlenie w konsoli
breakpoints.forEach((bp) => {
  console.log(`${bp.size}px – ${bp.label}`);
});
