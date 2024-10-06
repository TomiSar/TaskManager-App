import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskDescription } from '../TaskDescription';

const taskDescriptionTestProps = {
  description: 'Test Task Description',
};

const renderTaskDescription = (props = {}) => {
  const combinedProps = {
    ...taskDescriptionTestProps,
    ...props,
  };
  return render(<TaskDescription {...combinedProps} />);
};

describe('TaskDescription Component Tests', () => {
  it('renders with correct description', () => {
    renderTaskDescription();

    expect(
      screen.getByText(
        taskDescriptionTestProps.description,
      ),
    ).toBeInTheDocument();
  });

  it('renders default value when no description provided', () => {
    renderTaskDescription({ description: undefined });
    expect(
      screen.getByText('Task Description'),
    ).toBeInTheDocument();
  });

  it('renders empty value when description is empty', () => {
    renderTaskDescription({ description: '' });
    expect(
      screen.queryByText('Task Description'),
    ).not.toBeInTheDocument();

    const descriptionElement = screen.getByText(
      (content, element) =>
        !content && element?.tagName === 'P',
    );

    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toBeEmptyDOMElement();
  });
});
