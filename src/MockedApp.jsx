
  import logo from './logo.svg';
  import './App.css';
  import { Button } from '@heroui/react';
import { ClerkProvider,   SignedIn,
    SignedOut,
    SignInButton,
    UserButton } from '../test/__mocks__/@clerk/clerk-react';
  
  function App() {
    return (
      <ClerkProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Edit <code>src/App.js</code> and save to reload.</p>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
            <Button>Press me</Button>
          </header>
        </div>
      </ClerkProvider>
    );
  }
  
  export default App;
  