import { Oval } from "react-loader-spinner";

export const Spinner = () => {
  return (
    <Oval
      visible={true}
      height="60"
      width="60"
      color="#ec4899"
      secondaryColor="#f472b6"
      wrapperClass="justify-center"
    />
  );
};
