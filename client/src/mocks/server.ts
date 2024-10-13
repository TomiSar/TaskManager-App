import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API_URL } from '../constants/constants';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

const mockTasks = [
  {
    id: '6f0b4d7b-1f8e-420b-993b-a79babab8714',
    title: 'Test number uno',
    creationDate: '2024-09-09T15:49:40.000Z',
    dueDate: '2024-10-10T22:49:55.000Z',
    description: 'Test number uno just for kicks',
    priority: Priority.medium as string,
    status: Status.inprogress as string,
  },
  {
    id: '27514f60-406a-42c5-beae-46810c504532',
    title: 'Test number dos',
    creationDate: '2024-08-10T23:18:14.000Z',
    dueDate: '2024-09-30T23:19:12.000Z',
    description: 'Testing is fun',
    priority: Priority.high as string,
    status: Status.completed as string,
  },
];

export const mockServer = setupServer(
  http.get(API_URL, () => {
    return HttpResponse.json(mockTasks, { status: 200 });
  }),

  http.delete(`${API_URL}/:id`, async ({ params }) => {
    const { id } = params;
    const index = mockTasks.findIndex(
      (task) => task.id === id,
    );
    if (index !== -1) {
      mockTasks.splice(index, 1);
      return HttpResponse.json({ status: 200 });
    } else {
      return HttpResponse.json({ status: 404 });
    }
  }),

  http.put(API_URL, async ({ params }) => {
    const {
      id,
      status,
      title,
      dueDate,
      description,
      priority,
    } = params;

    const taskId = mockTasks.findIndex(
      (task) => task.id === id,
    );
    if (taskId !== -1) {
      const updatedTask = {
        ...mockTasks[taskId],
        status: status as string,
        title: title as string,
        dueDate: dueDate as string,
        description: description as string,
        priority: priority as string,
      };

      mockTasks[taskId] = updatedTask;

      return HttpResponse.json({
        updatedTask,
        message: 'Task updated successfully',
        status: 200,
      });
    } else {
      return HttpResponse.json(
        { error: 'The task with given ID does not exist' },
        { status: 404 },
      );
    }
  }),

  // Handler for 500 Internal Server Error
  http.get(API_URL, async () => {
    return HttpResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }),
);
