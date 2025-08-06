import { SignedIn, SignedOut, SignInButton, UserButton, SignUpButton } from '@clerk/clerk-react'

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome to Personal Expense Tracker</h1>
        <p>Sign in to manage your financial records</p>
        
        <header className="auth-buttons">
          <SignedOut>
            <div className="button-group">
              <SignInButton mode='modal' className="auth-button signin-btn">
                <button>Sign In</button>
              </SignInButton>
              <SignUpButton mode='modal' className="auth-button signup-btn">
                <button>Sign Up</button>
              </SignUpButton>
            </div>
          </SignedOut>
          <SignedIn>
            <div className="user-section">
              <UserButton />
              <p>You are signed in! Redirecting to dashboard...</p>
            </div>
          </SignedIn>
        </header>
      </div>
    </div>
  )
}

export default Auth