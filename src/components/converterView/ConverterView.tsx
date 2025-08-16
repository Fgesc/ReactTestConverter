import Currencies from "../currencies/Currencies";
import "./ConverterView.scss";

type ConverterViewType = {
  count: string;
  onChangeFieldValue: (value: string) => void;
  changeCurrency: (currency: string) => void;
  currentCurrency: string;
  width?: number;
  disabled?: boolean;
  prefix: string;
};

const ConverterView = (props: ConverterViewType) => {
  const { count, onChangeFieldValue, changeCurrency, currentCurrency, disabled, prefix} = props;

  const onChangeFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    onChangeFieldValue(value);
  };

  return (
    <>
      <Currencies changeCurrency={changeCurrency} currentCurrency={currentCurrency} prefix={prefix}/>
      <div className="box">
        <input
          className="box__input"
          type="number"
          value={count}
          onChange={onChangeFieldHandler}
          maxLength={10}
          disabled={disabled}
          data-testid={`${prefix}-input`}
        />
      </div>
    </>
  );
};

export default ConverterView;
