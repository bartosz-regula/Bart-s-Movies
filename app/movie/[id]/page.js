import ShowDetails from '@/app/components/ShowDetails';

export default async function Page({ params }) {
  const showId = params.id;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/${showId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const show = await res.json();
  const backgroundStyles = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.62), rgba(0, 0, 0, 0.95)), url(https://image.tmdb.org/t/p/w1280${show.backdrop_path})`,
    backgroundSize: 'cover',
    backgroundBlendMode: 'multiply',
  };
  return (
    <div style={backgroundStyles}>
      <ShowDetails show={show} />
    </div>
  );
}
