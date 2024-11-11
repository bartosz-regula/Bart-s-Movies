import CardContainer from '@/app/components/CardContainer';
import ExploreMore from '../../components/ExploreMore';

export default function Page() {
  return (
    <CardContainer>
      <ExploreMore showType="/movie/popular" />
    </CardContainer>
  );
}
