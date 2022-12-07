import { useRouter } from 'next/router';
import Page from '@components/page';
import { META_DESCRIPTION } from '@lib/constants';
import { Stickers } from '@components/Stickers';

export default function Conf() {
  const { query } = useRouter();
  const id = query.id?.toString();

  return (
    <Page meta={{ title: 'Storybook Day | Stickers', description: META_DESCRIPTION }}>
      <Stickers id={id} />
    </Page>
  );
}
