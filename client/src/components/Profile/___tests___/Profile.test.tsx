import React from 'react';
import { render, screen } from '@testing-library/react';
import { Profile } from '../Profile';
import { setAvatarLetters } from '../../../helpers/helpers';

const profileDefaultProps = {
  firstName: 'John',
  lastName: 'Doe',
};

describe('Profile Component', () => {
  it('renders avatar letters, first name, last name, and welcome message with default props', () => {
    render(<Profile />);

    const { firstName, lastName } = profileDefaultProps;
    const avatarLetters = setAvatarLetters(
      firstName,
      lastName,
    );

    expect(
      screen.getByText(`Welcome ${firstName} ${lastName}!`),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('profile-avatar'),
    ).toHaveTextContent(avatarLetters);
    expect(
      screen.getByTestId('profile-name'),
    ).toHaveTextContent(`${firstName} ${lastName}`);
  });

  it('renders correct avatar letters, first name, last name, and welcome message with provided props', () => {
    const firstName: string = 'Chuck';
    const lastName: string = 'Norris';
    render(
      <Profile firstName={firstName} lastName={lastName} />,
    );

    expect(
      screen.getByText(`Welcome ${firstName} ${lastName}!`),
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

  it('renders empty avatar and welcome message when firstName and lastName are empty', () => {
    render(<Profile firstName="" lastName="" />);

    expect(
      screen.getByText('Welcome !'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('profile-avatar'),
    ).toHaveTextContent('');
    expect(
      screen.getByTestId('profile-name'),
    ).toHaveTextContent('');
  });
});
