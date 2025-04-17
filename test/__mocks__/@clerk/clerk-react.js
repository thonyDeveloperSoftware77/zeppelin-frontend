let mockRole = "org:teacher";
let mockIsSignedIn = true;
let mockIsLoaded = true;

export function __setRole(role) {
  mockRole = role;
}

export function __setAuthState({ isSignedIn, isLoaded }) {
  mockIsSignedIn = isSignedIn;
  mockIsLoaded = isLoaded;
}

export const useAuth = () => {
    console.log('Mock useAuth called');
    return {
      isSignedIn: mockIsSignedIn,
      isLoaded: mockIsLoaded,
    };
  };

export const useUser = () => ({
  user: {
    publicMetadata: {
      role: mockRole,
    },
  },
});

export const SignedIn = ({ children }) => children;
export const SignedOut = () => null;
export const SignInButton = () => <button>Sign In</button>;
export const UserButton = () => <button>User</button>;
export const ClerkProvider = ({ children }) => children;