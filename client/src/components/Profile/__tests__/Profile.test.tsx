import React from 'react';
import { render, screen } from '@testing-library/react';
import { Profile } from '../Profile';
import { setAvatarLetters } from '../../../helpers/helpers';

const profileTestProps = {
  firstName: 'John',
  lastName: 'Doe',
};

const profileText = {
  defaultText: 'Personal Task Manager',
  welcome: 'Welcome',
};

describe('Profile Component test', () => {
  it('renders avatar letters, firstName, lastName and welcome message with default props', () => {
    render(<Profile />);
    const { firstName, lastName } = profileTestProps;

    expect(
      screen.getByText(
        `${profileText.welcome} ${firstName} ${lastName}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(profileText.defaultText),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('profile-avatar'),
    ).toHaveTextContent(
      setAvatarLetters(firstName, lastName),
    );
    expect(
      screen.getByTestId('profile-name'),
    ).toHaveTextContent(`${firstName} ${lastName}`);
  });

  it('renders correct avatar letters, firstName, lastName and welcome message with provided props', () => {
    const firstName: string = 'Chuck';
    const lastName: string = 'Norris';
    render(
      <Profile firstName={firstName} lastName={lastName} />,
    );

    expect(
      screen.getByText(
        `${profileText.welcome} ${firstName} ${lastName}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(profileText.defaultText),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('profile-avatar'),
    ).toHaveTextContent(
      setAvatarLetters(firstName, lastName),
    );
    expect(
      screen.getByTestId('profile-name'),
    ).toHaveTextContent(`${firstName} ${lastName}`);
  });

  it('renders correctly when firstName is provided and lastName is empty', () => {
    render(
      <Profile
        firstName={profileTestProps.firstName}
        lastName=""
      />,
    );

    expect(
      screen.getByText(
        `${profileText.welcome} ${profileTestProps.firstName}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(profileText.defaultText),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('profile-avatar'),
    ).toHaveTextContent(
      setAvatarLetters(profileTestProps.firstName, ''),
    );
    expect(
      screen.getByTestId('profile-name'),
    ).toHaveTextContent(profileTestProps.firstName);
  });

  it('renders correctly when lastName is provided and firstName is empty', () => {
    render(
      <Profile
        firstName=""
        lastName={profileTestProps.lastName}
      />,
    );

    expect(
      screen.getByText(
        `${profileText.welcome} ${profileTestProps.lastName}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(profileText.defaultText),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('profile-avatar'),
    ).toHaveTextContent(
      setAvatarLetters('', profileTestProps.lastName),
    );
    expect(
      screen.getByTestId('profile-name'),
    ).toHaveTextContent(profileTestProps.lastName);
  });

  it('renders empty avatar and welcome message when firstName and lastName are empty', () => {
    render(<Profile firstName="" lastName="" />);

    expect(
      screen.getByText(`${profileText.welcome}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(profileText.defaultText),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('profile-avatar'),
    ).toHaveTextContent('');
    expect(
      screen.getByTestId('profile-name'),
    ).toHaveTextContent('');
  });

  it('renders correctly when firstName or lastName are undefined', () => {
    render(
      <Profile
        firstName={undefined}
        lastName={undefined}
      />,
    );

    expect(
      screen.getByText(
        `${profileText.welcome} ${profileTestProps.firstName} ${profileTestProps.lastName}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(profileText.defaultText),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('profile-avatar'),
    ).toHaveTextContent(
      setAvatarLetters(
        profileTestProps.firstName,
        profileTestProps.lastName,
      ),
    );
    expect(
      screen.getByTestId('profile-name'),
    ).toHaveTextContent(
      `${profileTestProps.firstName} ${profileTestProps.lastName}`,
    );
  });

  it('matches the Profile snapshot', () => {
    const { asFragment } = render(<Profile />);
    expect(asFragment()).toMatchSnapshot();
  });
});
