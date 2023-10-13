import { NavigationContainer } from "@react-navigation/native";
import { Navigator } from "./src/Navigation/Navigator";
import { AuthProvider } from "./src/Context/Auth/Context";

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
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