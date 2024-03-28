import { render, screen } from '@testing-library/angular';
import { CountrySelectorComponent } from './country-selector.component';

describe('CountrySelectorComponent', () => {
  test('should render countries', async () => {
    // Arrange
    await render(CountrySelectorComponent, {
      componentInputs: {
        countries: [
          {
            id: 'RUS',
            name: 'Russia',
          },
          {
            id: 'USA',
            name: 'United States of America',
          },
          {
            id: 'FRA',
            name: 'France',
          },
        ],
      },
    });

    // Assert
    expect(screen.getByText('Russia')).toBeInTheDocument();
    expect(screen.getByText('United States of America')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
  });

  test('should check countries', async () => {
    // Arrange
    await render(CountrySelectorComponent, {
      componentInputs: {
        countries: [
          {
            id: 'RUS',
            name: 'Russia',
          },
          {
            id: 'USA',
            name: 'United States of America',
          },
          {
            id: 'FRA',
            name: 'France',
          },
        ],
        selectedCountries: ['RUS'],
      },
    });

    // Assert
    expect(
      screen.getByRole('checkbox', {
        name: 'Russia',
      }),
    ).toBeChecked();
  });
});
