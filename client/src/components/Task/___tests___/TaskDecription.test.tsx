import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskDescription } from '../TaskDescription';

describe('TaskDescription Component Tests', () => {
  const taskDescriptionTestProps = {
    description: 'Test Task Description',
  };

  it('renders with correct description', () => {
    render(
      <TaskDescription {...taskDescriptionTestProps} />,
    );

    expect(
      screen.getByText(
        taskDescriptionTestProps.description,
      ),
    ).toBeInTheDocument();
  });

  it('renders default value when no description provided', () => {
    render(<TaskDescription />);

    expect(
      screen.getByText('Task content description'),
    ).toBeInTheDocument();
  });

  it('renders empty value when description is empty', () => {
    render(<TaskDescription description="" />);

    expect(
      screen.queryByText('Task content description'),
    ).not.toBeInTheDocument();
    const descriptionElement = screen.getByText(
      (content, element) =>
        !content && element?.tagName === 'P',
    );

    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toBeEmptyDOMElement();
  });
});
