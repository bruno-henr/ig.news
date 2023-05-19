import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SignInButton } from ".";
import { useSession } from 'next-auth/react'
import { mocked } from 'jest-mock'

jest.mock("next-auth/react");



describe("SignIn component", () => {
  it("renders correctly when user is not authenticated", () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])
    
    render(<SignInButton />);

    expect(screen.getByText("Sign in with github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([
        { data: {user: { name: 'John Doe', email: 'aaaa@example.com' }, expires: 'fake-expires'} },
        false
    ])

    const { debug } = render(<SignInButton />);
    debug()
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});
