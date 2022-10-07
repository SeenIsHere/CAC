import { useRouter } from "next/router";

const Error = () => {
  const router = useRouter();
  const { code } = router.query;

  return (
    <div className="error-page-container">
      <div className="Main">Error!!!</div>
      <div className="Sub"> Code: {code}</div>
    </div>
  );
};

export default Error;
