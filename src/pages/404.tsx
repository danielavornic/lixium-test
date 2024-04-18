import { Layout } from "@/components/layout";

const ErrorPage = () => {
  return (
    <Layout title="Error">
      <h1 className="mb-8 text-2xl font-bold">404 Error</h1>
      <p>Page not found.</p>
    </Layout>
  );
};

export default ErrorPage;
