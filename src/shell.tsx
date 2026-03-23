import { type JSX } from "react";
import { CallControlBar } from "./components/callControlBar";
import "./styles.css";

export const Shell = (): JSX.Element => {
  return (
    <>
      <CallControlBar />
    </>
  );
};
