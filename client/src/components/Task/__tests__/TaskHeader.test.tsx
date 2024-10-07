import React from 'react';
import { render, screen } from '@testing-library/react';
import { Priority } from '../../../enums/Priority';
import { format } from 'date-fns';
import { TaskHeader } from '../TaskHeader';
import { convertHexToRgbColor } from '../../../helpers/helpers';
import { customTheme } from '../../../theme/customTheme';

const taskHeaderTestProps = {
  title: 'Test Task Header Title',
  date: new Date(),
  priority: Priority.medium,
};

const taskHeaderText = {
  title: 'Task Header Title',
  mediumPriority: 'Medium priority',
  lowPriority: 'Low priority',
};

describe('TaskHeader Component Tests', () => {
  it('renders with correct props', () => {
    render(<TaskHeader {...taskHeaderTestProps} />);

    expect(
      screen.getByText(taskHeaderTestProps.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        format(taskHeaderTestProps.date, 'PPP'),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(taskHeaderText.mediumPriority),
    ).toBeInTheDocument();
  });

  it('renders default values when no props provided', () => {
    render(<TaskHeader />);

    expect(
      screen.getByText(taskHeaderText.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(taskHeaderText.lowPriority),
    ).toBeInTheDocument();
  });

  it('renders empty value when title is empty', () => {
    render(<TaskHeader title="" />);

    expect(
      screen.queryByText(taskHeaderText.title),
    ).not.toBeInTheDocument();
    const titleElement = screen.getByText(
      (content, element) =>
        content === '' && element?.tagName === 'H5',
    );

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toBeEmptyDOMElement();
  });

  const taskHeaderColorTestsByPriority = [
    {
      priority: Priority.low,
      expectedColor: customTheme().palette.success.main,
    },
    {
      priority: Priority.medium,
      expectedColor: customTheme().palette.warning.main,
    },
    {
      priority: Priority.high,
      expectedColor: customTheme().palette.error.main,
    },
  ];

  taskHeaderColorTestsByPriority.forEach(
    ({ priority, expectedColor }) => {
      it(`renders the correct font color when priority is ${priority}`, () => {
        render(
          <TaskHeader
            {...taskHeaderTestProps}
            priority={priority}
          />,
        );

        const priorityText = screen.getByText(
          `${priority} priority`,
        );
        const expectedColorRgb =
          convertHexToRgbColor(expectedColor);

        expect(
          window.getComputedStyle(priorityText).color,
        ).toBe(expectedColorRgb);
      });
    },
  );

  it('matches the TaskHeader snapshot', () => {
    const { asFragment } = render(<TaskHeader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
