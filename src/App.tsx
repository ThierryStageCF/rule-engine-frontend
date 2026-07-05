import type {JSX} from "react";
import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./router/AppRouter.tsx";

function App(): JSX.Element {

  return (
      <BrowserRouter>
          <div className="min-h-screen">
              <AppRouter/>
          </div>
      </BrowserRouter>
  )
}

export default App;
