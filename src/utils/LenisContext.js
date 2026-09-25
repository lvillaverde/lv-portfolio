import { createContext, useContext } from "react";

const LenisContext = createContext(null);

export const useLenisContext = () => useContext(LenisContext);

export default LenisContext;
