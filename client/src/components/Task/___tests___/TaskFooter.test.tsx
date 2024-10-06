import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { TaskFooter } from '../TaskFooter';
import { Status } from '../../../enums/Status';

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

const renderTaskFooter = (props = {}) => {
  const combinedProps = {
    ...taskFooterTestProps,
    ...props,
  };
  return render(<TaskFooter {...combinedProps} />);
};

const taskFooterText = {
  inProgress: 'In Progress',
  markComplete: 'Mark Complete',
  deleteTask: 'Delete Task',
};
describe('TaskFooter Component Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all elements', () => {
    renderTaskFooter();
    expect(
      screen.getByLabelText(taskFooterText.inProgress),
    ).toBeInTheDocument();
    expect(
      screen.getByText(taskFooterText.markComplete),
    ).toBeInTheDocument();
    expect(
      screen.getByText(taskFooterText.deleteTask),
    ).toBeInTheDocument();
  });

  it('renders the correct switch status when the task status is ToDO', () => {
    renderTaskFooter({ status: Status.todo });
    const switchElement = screen.getByLabelText(
      taskFooterText.inProgress,
    );
    expect(switchElement).not.toBeChecked();
  });

  it('renders the correct switch status when the task status is InProgress', () => {
    renderTaskFooter({ status: Status.inprogress });
    const switchElement = screen.getByLabelText(
      taskFooterText.inProgress,
    );
    expect(switchElement).toBeChecked();
  });

  it('triggers onStatusChange when the switch is toggled', () => {
    renderTaskFooter();

    const switchElement = screen.getByLabelText(
      taskFooterText.inProgress,
    );
    fireEvent.click(switchElement);

    expect(mockOnStatusChange).toHaveBeenCalledWith(
      expect.any(Object),
      taskFooterTestProps.id,
    );
  });

  [Status.todo, Status.inprogress].forEach((status) => {
    it(`triggers onClick for the Mark Complete button when task status is ${status}`, () => {
      renderTaskFooter({ status });
      const markCompleteButton = screen.getByText(
        taskFooterText.markComplete,
      );
      fireEvent.click(markCompleteButton);

      expect(mockOnClickMarkUpdate).toHaveBeenCalledWith(
        expect.any(Object),
        taskFooterTestProps.id,
      );
    });
  });
});
