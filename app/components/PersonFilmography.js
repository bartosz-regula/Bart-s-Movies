import PersonShowContainer from './PersonShowContainer';

export default function PersonFilmography({ movies }) {
  return <PersonShowContainer show={movies} header="Filmography" />;
}
