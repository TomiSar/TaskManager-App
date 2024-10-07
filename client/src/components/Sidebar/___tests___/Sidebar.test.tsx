import React from 'react';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '../Sidebar';
import { Profile } from '../../Profile/Profile';

jest.mock('../../Profile/Profile', () => ({
  Profile: jest.fn(() => (
    <div data-testid="mock-profile">Profile Component</div>
  )),
}));

jest.mock('../../TaskForm/CreateTaskForm', () => ({
  CreateTaskForm: jest.fn(() => (
    <div data-testid="mock-create-task-form">
      Create Task Form Component
    </div>
  )),
}));

describe('Sidebar Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Profile Component with correct props', () => {
    render(<Sidebar />);

    expect(
      screen.getByTestId('mock-profile'),
    ).toBeInTheDocument();
    expect(Profile).toHaveBeenCalledWith(
      {
        firstName: 'Chuck',
        lastName: 'Norris',
      },
      {},
    );
  });

  it('renders Create Task Form Component', () => {
    render(<Sidebar />);

    expect(
      screen.getByTestId('mock-create-task-form'),
    ).toBeInTheDocument();
  });
});
