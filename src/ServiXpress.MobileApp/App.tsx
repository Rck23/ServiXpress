import { NavigationContainer } from "@react-navigation/native";
import { Navigator } from "./src/Navigation/Navigator";

const AppState = ({ children }: any) => {
  return (
    //TODO: Meter main context  
    <>
      {children}
    </>
  )
}


const App = () => {
  return (
    <NavigationContainer>
      <Navigator />

    </NavigationContainer>
  )
}

export default App;



// <NavigationContainer>
{/* <AppState> */ }

{/* </AppState> */ }
// </NavigationContainer>