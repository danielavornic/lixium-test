import { Oval } from "react-loader-spinner";

export const Spinner = () => {
  return (
    <Oval
      visible={true}
      height="60"
      width="60"
      color="#3b82f6"
      secondaryColor="#93c5fd"
      wrapperClass="justify-center"
    />
  );
};
