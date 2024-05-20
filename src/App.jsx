import Body from "./Components/Body"
import './App.css'
import { useEffect } from "react";
import CanvasComponent from "./Components/CanvasComponent";
import"./Components/styles.css"
import FireworksComponent from "./Components/FireworksComponent";
function App() {

  return (
  <>
   <div>
      <Body/>
      <CanvasComponent/>
      <FireworksComponent/>
    </div>
  
  </>
 
  )
}

export default App;
