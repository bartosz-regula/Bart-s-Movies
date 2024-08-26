import Card from './Card';
import styles from './SearchResults.module.css';

export default function SearchResults({ results }) {
  return (
    <div className={styles.container}>
      {results.map((show) => (
        <Card key={show.id} show={show} />
      ))}
    </div>
  );
}
