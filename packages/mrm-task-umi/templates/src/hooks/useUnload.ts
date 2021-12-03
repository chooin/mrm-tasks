import { useEffect } from "react";

export default (fn: () => void): void => {
  useEffect(() => fn, []);
};
