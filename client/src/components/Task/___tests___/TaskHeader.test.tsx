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
      screen.getByText('Medium priority'),
    ).toBeInTheDocument();
  });

  it('renders default values when no props provided', () => {
    render(<TaskHeader />);

    expect(
      screen.getByText('Task Header title'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Low priority'),
    ).toBeInTheDocument();
  });

  it('renders empty value when title is empty', () => {
    render(<TaskHeader title="" />);

    expect(
      screen.queryByText('Task Header title'),
    ).not.toBeInTheDocument();
    const titleElement = screen.getByText(
      (content, element) =>
        content === '' && element?.tagName === 'H5',
    );

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toBeEmptyDOMElement();
  });

  it('renders the correct success font color when priority is Low', () => {
    render(
      <TaskHeader
        {...taskHeaderTestProps}
        priority={Priority.low}
      />,
    );

    const priorityText = screen.getByText('Low priority');
    const expectedColorRgb = convertHexToRgbColor(
      customTheme().palette.success.main,
    );

    expect(
      window.getComputedStyle(priorityText).color,
    ).toBe(expectedColorRgb);
  });

  it('renders the correct warning font color when priority is Medium', () => {
    render(<TaskHeader {...taskHeaderTestProps} />);

    const priorityText = screen.getByText(
      'Medium priority',
    );
    const expectedColorRgb = convertHexToRgbColor(
      customTheme().palette.warning.main,
    );

    expect(
      window.getComputedStyle(priorityText).color,
    ).toBe(expectedColorRgb);
  });

  it('renders the correct error font color when priority is High', () => {
    render(
      <TaskHeader
        {...taskHeaderTestProps}
        priority={Priority.high}
      />,
    );

    const priorityText = screen.getByText('High priority');
    const expectedColorRgb = convertHexToRgbColor(
      customTheme().palette.error.main,
    );

    expect(
      window.getComputedStyle(priorityText).color,
    ).toBe(expectedColorRgb);
  });
});
