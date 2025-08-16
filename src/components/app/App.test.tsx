import { screen, waitFor} from "@testing-library/react";
import {userEvent} from '@testing-library/user-event';
import App from "./App";
import { expect, it, describe} from "vitest";
import { renderWithRedux } from "../../test/utils.tsx";

describe("App component", function () {

  it('Должен отрендерить компонент App', () => {
    renderWithRedux(<App />);
    expect(screen.getByText(/Конвертер валют онлайн/i)).toBeInTheDocument();
    screen.debug()
  });

  it('Должно сменить валюту слева при нажатии кнопки EUR в левом конвертере', async () => {
  renderWithRedux(<App />);
    await waitFor(() => screen.getByTestId('from-EUR'));
    let eurButton = screen.getByTestId('from-EUR');
    await userEvent.click(eurButton); 
    screen.debug()
    expect(screen.getByText(/1 EUR =/i)).toBeInTheDocument();     
  });

  it('Должно сменить валюту справа при нажатии кнопки RUB в правом конвертере', async () => {
  renderWithRedux(<App />);
    await waitFor(() => screen.findByTestId('to-EUR'));
    let eurButton = screen.getByTestId('to-EUR');
    await userEvent.click(eurButton); 
    screen.debug()
    expect(screen.getByText(/1 EUR =/i)).toBeInTheDocument();     
  });

  it('Должно изменить значение в правом поле input ', async () => {
  renderWithRedux(<App />);
    await waitFor(() => screen.findByTestId('from-EUR'));
    let eurButton = screen.getByTestId('from-EUR');
    await userEvent.click(eurButton);
    await userEvent.clear(screen.getByTestId('from-input'));
    await userEvent.type(screen.getByTestId('from-input'), '1');
    screen.debug()
    expect(screen.getByTestId('to-input')).toHaveValue(1.17); 
  });

  it('Выбрали одинаковые валюты -  курс должен считаться равным 1', async () => {
  renderWithRedux(<App />);
    await waitFor(() => screen.findByTestId('to-RUR'));
    let eurButton = screen.getByTestId('to-RUR');
    await userEvent.click(eurButton); 
    screen.debug()
    const texts = screen.getAllByText(/1 RUR = 1.00/i);
    expect(texts.length).toEqual(2);
  });

  it('Должен изменить значение в левом инпуте', async () => {
    renderWithRedux(<App />);
      let firstInput = screen.getByTestId('from-input');
        await userEvent.clear(firstInput);
        await userEvent.type(firstInput, '50');
        screen.debug()
      expect(firstInput).toHaveValue(50);    
  });  

});






























