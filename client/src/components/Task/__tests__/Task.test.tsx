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

const renderTask = (props = {}) => {
  const combinedProps = {
    ...taskTestProps,
    ...props,
  };
  return render(<Task {...combinedProps} />);
};

const taskText = {
  inProgress: 'In Progress',
  deleteTask: 'Delete Task',
  mediumPriority: 'Medium priority',
};

describe('Task Component Test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.skip('renders correct props to child components', () => {
    renderTask();

    expect(
      screen.getByText(taskTestProps.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(taskText.mediumPriority),
    ).toBeInTheDocument();
    expect(
      screen.getByText(format(taskTestProps.date, 'PPP')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(taskTestProps.description),
    ).toBeInTheDocument();
    expect(
      screen.getByText(taskText.inProgress),
    ).toBeInTheDocument();
  });

  it('triggers onStatusChange when status is changed from switch', () => {
    renderTask();

    const changeStatusSwitch = screen.getByLabelText(
      taskText.inProgress,
    );
    fireEvent.click(changeStatusSwitch);

    expect(mockOnStatusChange).toHaveBeenCalledWith(
      expect.any(Object),
      taskTestProps.id,
    );
  });

  it('triggers onDelete when the Delete Task button is clicked', () => {
    renderTask();

    const deleteTaskButton = screen.getByText(
      taskText.deleteTask,
    );
    fireEvent.click(deleteTaskButton);

    expect(mockOnClickDelete).toHaveBeenCalledWith(
      taskTestProps.id,
    );
  });

  const taskBorderColorTestsByPriority = [
    {
      priority: Priority.low,
      expectedColor: customTheme().palette.success.light,
    },
    {
      priority: Priority.medium,
      expectedColor: customTheme().palette.warning.light,
    },
    {
      priority: Priority.high,
      expectedColor: customTheme().palette.error.light,
    },
  ];

  taskBorderColorTestsByPriority.forEach(
    ({ priority, expectedColor }) => {
      it(`renders the correct border color when priority is ${priority}`, () => {
        renderTask({ priority });

        const taskBox = screen.getByTestId('task-box');

        expect(
          window.getComputedStyle(taskBox).borderColor,
        ).toBe(expectedColor);
      });
    },
  );

  it('matches the Task snapshot', () => {
    const { asFragment } = renderTask();
    expect(asFragment()).toMatchSnapshot();
  });
});
