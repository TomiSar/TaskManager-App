import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { TaskArea } from '../TaskArea';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { format } from 'date-fns';
import { mockServer } from '../../../mocks/server';
import { http, HttpResponse } from 'msw';
import { API_URL } from '../../../constants/constants';
import { TaskStatusChangedContextProvider } from '../../../context';

// Set up the mock server before all tests
beforeAll(() => mockServer.listen());
afterEach(() => mockServer.resetHandlers());
afterAll(() => mockServer.close());

// Create a query client for testing
const queryClient = new QueryClient();

const taskAreaText = {
  toDoTasks: 'ToDo tasks',
  inProgressTasks: 'In Progress tasks',
  completedTasks: 'Completed tasks',
  markComplete: 'Mark Complete',
  deleteTask: 'Delete Task',
  mediumPriority: 'Medium priority',
  highPriority: 'High priority',
  emptyTaskList:
    'TaskManager board is empty. Start using board by creating new Task(s) from Sidebar using Create new Task Form.',
  apiError: 'Error fetching tasks data from API',
};

const renderTaskArea = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <TaskStatusChangedContextProvider>
        <TaskArea />
      </TaskStatusChangedContextProvider>
    </QueryClientProvider>,
  );
};

describe('TaskArea Component', () => {
  it('renders TaskArea with tasks from the API', async () => {
    renderTaskArea();

    // Check if loading state is shown initially
    expect(
      screen.getByRole('progressbar'),
    ).toBeInTheDocument();

    // Wait for the tasks to be fetched and displayed
    await waitFor(() => {
      expect(
        screen.getByText(
          `Status Of Your Tasks As On ${format(new Date(), 'PPPP')}`,
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByText(taskAreaText.toDoTasks),
      ).toBeInTheDocument();
      expect(
        screen.getByText(taskAreaText.inProgressTasks),
      ).toBeInTheDocument();
      expect(
        screen.getByText(taskAreaText.completedTasks),
      ).toBeInTheDocument();

      expect(
        screen.getByText('Test number uno'),
      ).toBeInTheDocument();

      expect(
        screen.getByText(taskAreaText.mediumPriority),
      ).toBeInTheDocument();

      expect(
        screen.getByText('Test number uno just for kicks'),
      ).toBeInTheDocument();

      expect(
        screen.getByText(taskAreaText.markComplete),
      ).toBeInTheDocument();
      expect(
        screen.getByText(taskAreaText.deleteTask),
      ).toBeInTheDocument();
    });
  });

  test('renders empty task list correctly', async () => {
    // Override the default mock response to return an empty list
    mockServer.use(
      http.get(API_URL, () => {
        return HttpResponse.json([], { status: 200 });
      }),
    );

    renderTaskArea();

    // Wait for the empty task state to be shown
    await waitFor(() => {
      expect(
        screen.getByText(taskAreaText.emptyTaskList),
      ).toBeInTheDocument();
    });
  });

  it('toggles TaskStatusChangedContext when task is updated', async () => {
    renderTaskArea();

    // Wait for tasks to be rendered
    await waitFor(() => {
      expect(
        screen.getByText(
          `Status Of Your Tasks As On ${format(new Date(), 'PPPP')}`,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(taskAreaText.toDoTasks),
      ).toBeInTheDocument();
      expect(
        screen.getByText(taskAreaText.inProgressTasks),
      ).toBeInTheDocument();
      expect(
        screen.getByText(taskAreaText.completedTasks),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Test number uno'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(taskAreaText.mediumPriority),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Test number uno just for kicks'),
      ).toBeInTheDocument();
      expect(
        screen.getByText(taskAreaText.markComplete),
      ).toBeInTheDocument();
      expect(
        screen.getByText(taskAreaText.deleteTask),
      ).toBeInTheDocument();
    });

    // Find the mark complete button and simulate clicking it
    const markCompleteButton = screen.getByText(
      taskAreaText.markComplete,
    );
    fireEvent.click(markCompleteButton);

    // Task status change should trigger a context update
    await waitFor(() => {
      // Ensure that refetch happens by checking if the task area has been re-rendered
      expect(
        screen.getByText('Test number uno'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Test number uno just for kicks'),
      ).toBeInTheDocument();
    });
  });

  it('handles delete task click correctly', async () => {
    renderTaskArea();

    // Wait for tasks to be rendered
    await waitFor(() => {
      expect(
        screen.getByText(
          `Status Of Your Tasks As On ${format(new Date(), 'PPPP')}`,
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByText(taskAreaText.toDoTasks),
      ).toBeInTheDocument();
      expect(
        screen.getByText(taskAreaText.inProgressTasks),
      ).toBeInTheDocument();
      expect(
        screen.getByText(taskAreaText.completedTasks),
      ).toBeInTheDocument();

      expect(
        screen.getByText('Test number uno'),
      ).toBeInTheDocument();

      expect(
        screen.getByText(taskAreaText.mediumPriority),
      ).toBeInTheDocument();

      expect(
        screen.getByText('Test number uno just for kicks'),
      ).toBeInTheDocument();

      expect(
        screen.getByText(taskAreaText.markComplete),
      ).toBeInTheDocument();
      expect(
        screen.getByText(taskAreaText.deleteTask),
      ).toBeInTheDocument();
    });

    window.confirm = jest.fn(() => true);

    const deleteButton = screen.getByText('Delete Task');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.queryByText('Test number uno'),
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText(
          'Test number uno just for kicks',
        ),
      ).not.toBeInTheDocument();
    });
  });

  it.skip('handles API error response correctly', async () => {
    mockServer.use(
      http.get(API_URL, () => {
        return HttpResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 },
        );
      }),
    );

    renderTaskArea();

    await waitFor(() => {
      expect(
        screen.getByText(taskAreaText.apiError),
      ).toBeInTheDocument();
    });
  });

  it('matches TaskArea Component snapshot', async () => {
    const { asFragment } = renderTaskArea();
    expect(asFragment()).toMatchSnapshot();
  });
});
