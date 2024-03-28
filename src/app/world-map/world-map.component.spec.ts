import { render, screen } from '@testing-library/angular';
import { WorldMapComponent } from './world-map.component';

describe('AppComponent', () => {
  test('should render all countries grey', async () => {
    // Arrange
    await render(WorldMapComponent, {});

    // Assert
    const elements = screen.queryAllByTestId(/country-path-.*/);

    elements.forEach(element => {
      expect(element).toHaveStyle({
        fill: 'grey',
      });
    });
  });

  test('should render selected countries green', async () => {
    // Arrange
    await render(WorldMapComponent, {
      componentInputs: {
        selectedCountries: ['RUS'],
      },
    });

    // Assert
    expect(screen.getByTestId('country-path-RUS')).toHaveStyle({
      fill: 'green',
    });
  });
});
