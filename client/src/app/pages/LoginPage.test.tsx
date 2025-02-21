import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from "./LoginPage";
import useUser from "../hooks/useUser";
import React from "react";

jest.mock("../../hooks/useUser");

describe("LoginPage", () => {
  const mockFetchCurrentUser = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useUser as jest.Mock).mockReturnValue({
      currentUser: null,
      fetchCurrentUser: mockFetchCurrentUser,
      login: mockLogin,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login page correctly", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter your username/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("allows the user to type a username", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/Enter your username/i);
    await userEvent.type(input, "testuser");

    expect(input).toHaveValue("testuser");
  });

  it("calls login function when clicking the button", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/Enter your username/i);
    const button = screen.getByRole("button", { name: /Login/i });

    await userEvent.type(input, "testuser");
    await userEvent.click(button);

    expect(mockLogin).toHaveBeenCalledWith("testuser");
  });

  it("calls login function when pressing Enter", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/Enter your username/i);

    await userEvent.type(input, "testuser{enter}");

    expect(mockLogin).toHaveBeenCalledWith("testuser");
  });

  it("displays an error message if login fails", async () => {
    (useUser as jest.Mock).mockReturnValue({
      currentUser: null,
      fetchCurrentUser: mockFetchCurrentUser,
      login: mockLogin,
      error: "Invalid username",
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText(/Invalid username/i)).toBeInTheDocument();
  });
});
