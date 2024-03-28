import { render, screen } from '@testing-library/angular';
import { StatisticsComponent } from './statistics.component';

describe('StatisticsComponent', () => {
  test('should render statistics', async () => {
    // Arrange
    await render(StatisticsComponent, {
      componentProperties: {
        numberOfSelectedCountries: 16,
      },
    });

    // Assert
    expect(screen.getByText('16')).toBeInTheDocument();
    expect(screen.getByText('9%')).toBeInTheDocument();
    expect(screen.getByText('161')).toBeInTheDocument();
  });
});
