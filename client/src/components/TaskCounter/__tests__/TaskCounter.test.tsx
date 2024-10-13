import React from 'react';
import { render, screen } from '@testing-library/react';
import { TaskCounter } from '../TaskCounter';
import { Status } from '../../../enums/Status';
import {
  setTaskCounterStatusBorderColor,
  //   setTaskCounterLabel,
} from '../../../helpers/helpers';
import { customTheme } from '../../../theme/customTheme';

jest.mock('../../../helpers/helpers', () => ({
  setTaskCounterStatusBorderColor: jest.fn(),
  setTaskCounterLabel: jest.fn(),
}));

describe('TaskCounter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<TaskCounter />);
    expect(screen.getByText(0)).toBeInTheDocument();
  });

  it('renders default count if no count is provided', () => {
    const taskStatus = Status.todo;
    render(<TaskCounter status={taskStatus} />);
    expect(screen.getByText(0)).toBeInTheDocument();
  });

  it('renders with passed props', () => {
    const taskStatus = Status.completed;
    const taskCount: number = 5;
    render(
      <TaskCounter status={taskStatus} count={taskCount} />,
    );

    expect(screen.getByText(taskCount)).toBeInTheDocument();
  });

  const taskCounterBorderColorTestsByStatus = [
    {
      status: Status.todo,
      expectedColor: customTheme().palette.error.main,
    },
    {
      status: Status.inprogress,
      expectedColor: customTheme().palette.warning.main,
    },
    {
      status: Status.completed,
      expectedColor: customTheme().palette.success.main,
    },
  ];

  taskCounterBorderColorTestsByStatus.forEach(
    ({ status, expectedColor }) => {
      it(`renders the correct border color if task status ${status}`, () => {
        (
          setTaskCounterStatusBorderColor as jest.Mock
        ).mockReturnValue(expectedColor);
        render(<TaskCounter status={status} count={2} />);

        expect(
          screen.getByTestId('task-counter-border'),
        ).toHaveStyle(`border-color: ${expectedColor}`);
        expect(
          setTaskCounterStatusBorderColor,
        ).toHaveBeenCalledWith(status);
      });
    },
  );
});
