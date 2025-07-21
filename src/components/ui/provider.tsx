import { ColorModeProvider } from "./color-mode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider forcedTheme="dark">{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
