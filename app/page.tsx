import { Pagination } from './components';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  return (
    <Pagination itemCount={100} pageSize={10} currentPage={parseInt(page)} />
  );
}
