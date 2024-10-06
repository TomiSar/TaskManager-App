import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { TaskFooter } from '../TaskFooter';
import { Status } from '../../../enums/Status';

describe('TaskFooter Component Tests', () => {
  const mockOnStatusChange = jest.fn();
  const mockOnClickMarkUpdate = jest.fn();
  const mockOnClickDelete = jest.fn();

  const taskFooterTestProps = {
    id: '096b21cd-a020-4a02-9371-44648fd01617',
    status: Status.todo,
    onStatusChange: mockOnStatusChange,
    onClick: mockOnClickMarkUpdate,
    onDelete: mockOnClickDelete,
  };

  it('renders all elements without crashing', () => {
    render(<TaskFooter {...taskFooterTestProps} />);
    expect(
      screen.getByLabelText('In Progress'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Mark Complete'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Delete Task'),
    ).toBeInTheDocument();
  });

  it('renders the correct switch status when the task status is ToDO', () => {
    render(
      <TaskFooter
        {...taskFooterTestProps}
        status={Status.todo}
      />,
    );
    const switchElement =
      screen.getByLabelText('In Progress');
    expect(switchElement).not.toBeChecked();
  });

  it('renders the correct switch status when the task status is InProgress', () => {
    render(
      <TaskFooter
        {...taskFooterTestProps}
        status={Status.inprogress}
      />,
    );
    const switchElement =
      screen.getByLabelText('In Progress');
    expect(switchElement).toBeChecked();
  });

  it('triggers onStatusChange when the switch is toggled', () => {
    render(<TaskFooter {...taskFooterTestProps} />);

    const switchElement =
      screen.getByLabelText('In Progress');
    fireEvent.click(switchElement);

    expect(mockOnStatusChange).toHaveBeenCalledWith(
      expect.any(Object),
      taskFooterTestProps.id,
    );
  });

  it('triggers onClick for the Mark Complete button when task status is ToDo', () => {
    render(
      <TaskFooter
        {...taskFooterTestProps}
        status={Status.todo}
      />,
    );

    const markCompleteButton =
      screen.getByText('Mark Complete');
    fireEvent.click(markCompleteButton);

    expect(mockOnClickMarkUpdate).toHaveBeenCalledWith(
      expect.any(Object),
      taskFooterTestProps.id,
    );
  });

  it('triggers onClick for the Mark Complete button when task status is InProgress', () => {
    render(
      <TaskFooter
        {...taskFooterTestProps}
        status={Status.inprogress}
      />,
    );

    const markCompleteButton =
      screen.getByText('Mark Complete');
    fireEvent.click(markCompleteButton);

    expect(mockOnClickMarkUpdate).toHaveBeenCalledWith(
      expect.any(Object),
      taskFooterTestProps.id,
    );
  });
});
