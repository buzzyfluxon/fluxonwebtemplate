import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

type ContainerProps = {
  children: React.ReactNode;
  description?: string;
  className?: string;
};

export default function Container(props: ContainerProps) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    description: `Your trusted store for quality products.`,
    type: "website",
    ...customMeta,
  };

  return (
    <>
      <Head>
        <meta name="description" content={meta.description} />
      </Head>

      <header className="fixed top-0 z-50 w-full">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/">
            <span className="text-lg font-semibold">Mahant Ram & Sons</span>
          </Link>
        </div>
      </header>

      <main className={props.className}>{children}</main>
    </>
  );
}
