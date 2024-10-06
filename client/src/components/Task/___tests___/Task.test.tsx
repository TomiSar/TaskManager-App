import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { Task } from '../Task';
import { Priority } from '../../../enums/Priority';
import { Status } from '../../../enums/Status';
import { customTheme } from '../../../theme/customTheme';
import { format } from 'date-fns';

const mockOnStatusChange = jest.fn();
const mockOnClickMarkUpdate = jest.fn();
const mockOnClickDelete = jest.fn();

const taskTestProps = {
  id: '096b21cd-a020-4a02-9371-44648fd01617',
  title: 'Test Task Title',
  date: new Date(),
  description: 'Test Task Title Description',
  priority: Priority.medium,
  status: Status.todo,
  onStatusChange: mockOnStatusChange,
  onClick: mockOnClickMarkUpdate,
  onDelete: mockOnClickDelete,
};

describe('Task Component Test Suite', () => {
  it.skip('renders correct props to child components', () => {
    render(<Task {...taskTestProps} />);

    expect(
      screen.getByText(taskTestProps.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Medium priority'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(format(taskTestProps.date, 'PPP')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(taskTestProps.description),
    ).toBeInTheDocument();
    expect(
      screen.getByText('In Progress'),
    ).toBeInTheDocument();
  });

  it('triggers onStatusChange when status changes', () => {
    render(<Task {...taskTestProps} />);

    const button = screen.getByRole('checkbox');
    fireEvent.click(button);

    expect(mockOnStatusChange).toHaveBeenCalledWith(
      expect.any(Object),
      taskTestProps.id,
    );
  });

  it('triggers onDelete when the Delete Task button is clicked', () => {
    render(<Task {...taskTestProps} />);

    const deleteTaskButton =
      screen.getByText('Delete Task');
    fireEvent.click(deleteTaskButton);

    expect(mockOnClickDelete).toHaveBeenCalledWith(
      taskTestProps.id,
    );
  });

  it('renders the correct success border color when priority is Low', () => {
    render(
      <Task {...taskTestProps} priority={Priority.low} />,
    );

    const taskBox = screen.getByTestId('task-box');
    const expectedColorRgb =
      customTheme().palette.success.light;

    expect(
      window.getComputedStyle(taskBox).borderColor,
    ).toBe(expectedColorRgb);
  });

  it('renders the correct warning border color when priority is Medium', () => {
    render(
      <Task
        {...taskTestProps}
        priority={Priority.medium}
      />,
    );

    const taskBox = screen.getByTestId('task-box');
    const expectedColorRgb =
      customTheme().palette.warning.light;

    expect(
      window.getComputedStyle(taskBox).borderColor,
    ).toBe(expectedColorRgb);
  });

  it('renders the correct warning border color when priority is High', () => {
    render(
      <Task {...taskTestProps} priority={Priority.high} />,
    );

    const taskBox = screen.getByTestId('task-box');
    const expectedColorRgb =
      customTheme().palette.error.light;

    expect(
      window.getComputedStyle(taskBox).borderColor,
    ).toBe(expectedColorRgb);
  });
});
