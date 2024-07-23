import ShowCase from './ShowCase';

export default function MainSection() {
	return (
		<main>
			<ShowCase type='movie/popular' title='Popular Movies' />
			<ShowCase type='movie/top_rated' title='Top Rated Movies' />
			<ShowCase type='trending/tv/day' title='Popular Series' />
			<ShowCase type='tv/top_rated' title='Top Rated Series' />
		</main>
	);
}
