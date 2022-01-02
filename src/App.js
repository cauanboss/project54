import Prop from 'prop-types';
import './App.css';
import { createContext, useContext, useReducer, useRef } from 'react';

// ACTIONS.JS
export const actions = {
  CHANGE_TITLE: 'CHANGE_TITLE',
};

// data.js
const globalState = {
  title: 'O titulo que contexto',
  body: 'O body do contexto',
  counter: 0,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_TITLE:
      return { ...state, title: action.payload };
  }

  return { ...state };
};

export const Context = createContext();
export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  const changeTitle = (payload) => {
    dispatch({ type: actions.CHANGE_TITLE, payload });
  };
  return <Context.Provider value={{ state, changeTitle }}>{children}</Context.Provider>;
};

AppContext.propTypes = {
  children: Prop.node,
};

export const H1 = () => {
  const context = useContext(Context);
  const inputRef = useRef();

  return (
    <>
      <h1>{context.state.title}</h1>
      <input
        onChange={() => context.changeTitle(inputRef.current.value)}
        type="text"
        ref={inputRef}
      />
    </>
  );
};

function App() {
  return (
    <AppContext>
      <div>
        <H1 />
      </div>
    </AppContext>
  );
}

export default App;
