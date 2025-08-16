import { screen } from '@testing-library/react';
import { expect, it, describe, vi } from "vitest";
import { renderWithRedux } from "../../test/utils.tsx";
import Converter from './Converter.tsx';
import { currencyResponse } from '../../mocks/response.ts'; 


let fakeValute = Object.values(currencyResponse.Valute); 
let fakeChangeCurrency = vi.fn(); 
let fakeChangeFirstFieldValue = vi.fn(); 
let fakeChangeSecondFieldValue = vi.fn(); 


describe("Converter component", function () {

  it('Должен корректно отрисовать основные элементы конвертера', () => {
    renderWithRedux(<Converter 
        rateSecondCurrency={fakeValute[1].Value}
        rateFirstCurrency={0.01}
        changeCurrency={fakeChangeCurrency}
        changeFirstFieldValue={fakeChangeFirstFieldValue}
        currencies={fakeValute}
        changeSecondFieldValue={fakeChangeSecondFieldValue}
    />);
      expect(screen.getByText(/У меня есть/i)).toBeInTheDocument();
      expect(screen.getByText(/Хочу приобрести/i)).toBeInTheDocument();
  });


  it('Начальное значение в левом инпуте должно быть равно 100', () => {
    renderWithRedux(<Converter 
        rateSecondCurrency={fakeValute[1].Value}
        rateFirstCurrency={0.01}
        changeCurrency={fakeChangeCurrency}
        changeFirstFieldValue={fakeChangeFirstFieldValue}
        currencies={fakeValute}
        changeSecondFieldValue={fakeChangeSecondFieldValue}
    />);
    const firstInput = screen.getByTestId('from-input');
    expect(firstInput).toHaveValue(100);
  });


    it('Начальное значение в правом инпуте должно быть пустым', () => {
    renderWithRedux(<Converter 
        rateSecondCurrency={fakeValute[1].Value}
        rateFirstCurrency={0.01}
        changeCurrency={fakeChangeCurrency}
        changeFirstFieldValue={fakeChangeFirstFieldValue}
        currencies={fakeValute}
        changeSecondFieldValue={fakeChangeSecondFieldValue}
    />);
    const firstInput = screen.getByTestId('to-input');
    
    expect(firstInput).toHaveAttribute('value', '');
  });


  it('Валюта по умолчанию должна быть RUR', () => {
    renderWithRedux(<Converter 
        rateSecondCurrency={fakeValute[1].Value}
        rateFirstCurrency={0.01}
        changeCurrency={fakeChangeCurrency}
        changeFirstFieldValue={fakeChangeFirstFieldValue}
        currencies={fakeValute}
        changeSecondFieldValue={fakeChangeSecondFieldValue}
    />);
    
    let valuteDefault = screen.getByTestId('from-RUR')
    screen.debug()
    expect(valuteDefault).toBeInTheDocument()
  });

  it('Правый инпут должен быть недоступен для редактирования', () => {
      renderWithRedux(<Converter 
        rateSecondCurrency={fakeValute[1].Value}
        rateFirstCurrency={0.01}
        changeCurrency={fakeChangeCurrency}
        changeFirstFieldValue={fakeChangeFirstFieldValue}
        currencies={fakeValute}
        changeSecondFieldValue={fakeChangeSecondFieldValue}
    />);
    const secondInput = screen.getByTestId('to-input');
    expect(secondInput).toHaveAttribute('disabled');
  });

    it('Лувый инпут должен быть доступен для редактирования', () => {
      renderWithRedux(<Converter 
        rateSecondCurrency={fakeValute[1].Value}
        rateFirstCurrency={0.01}
        changeCurrency={fakeChangeCurrency}
        changeFirstFieldValue={fakeChangeFirstFieldValue}
        currencies={fakeValute}
        changeSecondFieldValue={fakeChangeSecondFieldValue}
    />);
    const firstInput = screen.getByTestId('from-input');
    expect(firstInput).not.toBeDisabled();
  });

  it('Показывает курс валют по умолчанию', () => {
      renderWithRedux(<Converter 
        rateSecondCurrency={fakeValute[1].Value}
        rateFirstCurrency={0.01}
        changeCurrency={fakeChangeCurrency}
        changeFirstFieldValue={fakeChangeFirstFieldValue}
        currencies={fakeValute}
        changeSecondFieldValue={fakeChangeSecondFieldValue}
    />);
    expect(screen.getByText(/1 RUR =/i)).toBeInTheDocument();
    expect(screen.getByText(/1 USD =/i)).toBeInTheDocument();
  });

  });

  