import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { mocked } from "jest-mock";
import SubscribeButton from "./index";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const router = useRouter();


jest.mock("next-auth/react", () => {
  return {
    useSession() {
      return [null, false];
    },
    signIn: jest.fn()
  };
});

jest.mock("next/router")

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SubscribeButton />);

    expect(screen.getByText("Subscrive now")).toBeInTheDocument();
  });

  it("redirects user to sign in when not authenticated", () => {
    const signInMocked = mocked(signIn);




    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscrive now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionOnMocked = mocked(useSession);

    const pushMock = jest.fn()

    useSessionOnMocked.mockReturnValueOnce([
        { data: {user: { name: 'John Doe', email: 'aaaa@example.com' }, 
        expires: 'fake-expires',
        activeSubscription: 'faasaws'
    } },
        false
    ])

    useRouterMocked.mockReturnValueOnce({
        push: pushMock
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalled()
  })
});
