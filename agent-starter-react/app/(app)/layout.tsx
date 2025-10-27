import { headers } from 'next/headers';
import { getAppConfig } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const hdrs = await headers();
  //const { companyName, logo, logoDark } = await getAppConfig(hdrs);

  return (
    <>
      {children}
    </>
  );
}
