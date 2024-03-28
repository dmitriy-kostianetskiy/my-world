import { fireEvent, render, screen } from '@testing-library/angular';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  test('should render logo', async () => {
    // Arrange
    await render(NavbarComponent, {
      componentProperties: {
        userName: 'John Doe',
        photoUrl: 'https://example.com/example.png',
        isLoggedIn: true,
      },
    });

    // Assert
    expect(screen.getByTestId('avatar')).toHaveAttribute('src', 'https://example.com/example.png');
  });

  test('should render user name', async () => {
    // Arrange
    await render(NavbarComponent, {
      componentProperties: {
        userName: 'John Doe',
        photoUrl: 'https://example.com/example.png',
        isLoggedIn: true,
      },
    });

    // Act
    fireEvent.click(screen.getByTestId('avatar-button'));

    // Assert
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
