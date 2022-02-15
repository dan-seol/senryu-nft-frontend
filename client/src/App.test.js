import { render, screen } from '@testing-library/react';
import App from './App';
import { checkFormattedSenryu } from './components/SenryuChecker'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('senryu checker', () => {
  let senryu = {
    firstLine: "The calm evening sun ",
    secondLine: " a beetle eats placidly ",
    thirdLines: " in the old gum tree"
  }

  expect(checkFormattedSenryu(senryu)).toBeTruthy()
})
