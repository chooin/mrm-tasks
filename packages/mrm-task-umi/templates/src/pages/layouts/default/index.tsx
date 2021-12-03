import React from "react";
import { Layout } from "./styled";

type Props = {
  children: React.PropsWithChildren<undefined>;
};

export default ({ children }: Props): JSX.Element => (
  <Layout>{children}</Layout>
);
