import PersonData from '@/app/components/PersonData';
import { fetchData } from '@/app/helpers/fetchData';

export default async function Page({ params }) {
  const showId = params.id;

  const [personData, filmographyData, seriesData, imagesData] = await Promise.all([
    fetchData(`/person/${showId}`),
    fetchData(`/person/${showId}/movie_credits`),
    fetchData(`/person/${showId}/tv_credits`),
    fetchData(`/person/${showId}/images`),
  ]);

  const backgroundStyles = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/w1280${personData.profile_path})`,
    backgroundSize: 'contain',
    backgroundBlendMode: 'multiply',
  };

  return (
    <div style={backgroundStyles}>
      <PersonData person={personData} />
      {/* <p>Person Filography</p> */}
      {/* <p>Person Series</p> */}
      {/* <p>Person Images</p> */}
    </div>
  );
}

/*
export async function getServerSideProps({ params }) {
	const apiKey =
		'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODE0MjhiODYxMjdlYWQ3OWM4NjI5OWNiOWQ4YzQ1MyIsInN1YiI6IjVmZDcxZTg2OGM0NGI5MDAzZWQ4MjE2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fPt6dqkHI3CGQCV8jtR0KuuNgTv4N4h6MH1mzFEAQrk';
	const baseUrl = 'https://api.themoviedb.org/3';

	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: apiKey,
		},
	};

	try {
		const actorResponse = await fetch(
			`${baseUrl}/person/${params.id}?api_key=${apiKey}`,
			options
		);
		const actorData = await actorResponse.json();

		const actorMoviesResponse = await fetch(
			`${baseUrl}/person/${params.id}/movie_credits?api_key=${apiKey}`,
			options
		);
		const actorMoviesData = await actorMoviesResponse.json();

		const actorTvResponse = await fetch(
			`${baseUrl}/person/${params.id}/tv_credits?api_key=${apiKey}`,
			options
		);
		const actorTvData = await actorTvResponse.json();

		const actorImagesResponse = await fetch(
			`${baseUrl}/person/${params.id}/images?api_key=${apiKey}`,
			options
		);
		const actorImagesData = await actorImagesResponse.json();

		return {
			props: {
				actor: actorData,
				actorMovies: actorMoviesData.cast,
				actorTv: actorTvData.cast,
				actorImages: actorImagesData,
			},
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			props: {
				actor: null,
				actorMovies: [],
				actorTv: [],
			},
		};
	}
}





*/
