import ShowDetails from '@/app/components/ShowDetails';

export default async function Page({ params }) {
	const showId = params.id;
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/movie/${showId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
	);

	const show = await res.json();

	return (
		<>
			<ShowDetails show={show} />
		</>
	);
}
