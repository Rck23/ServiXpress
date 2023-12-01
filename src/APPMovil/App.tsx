import { NavigationContainer } from "@react-navigation/native";
import { Navigator } from "./src/Navigation/Navigator";
import { AuthProvider } from "./src/Context/Auth/Context";
import { DomProvider } from "./src/Context/Dom/Context";

const AppState = ({ children }: any) => {
  return (
    <DomProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </DomProvider>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App;