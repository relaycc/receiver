import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Check } from './Icons';

export interface RelayGroupNameInputProps {
  onSubmit: (valToSubmit: string) => unknown;
  placeholder?: string;
  autofocus?: boolean;
  errorMessage?: string;
  HintIcon: FunctionComponent;
  className?: string;
  onSubmitIsRunning?: boolean;
  onSubmitIsSuccess?: boolean;
}

export const RelayGroupNameInput: FunctionComponent<
  RelayGroupNameInputProps
> = ({
  onSubmit,
  autofocus,
  placeholder,
  errorMessage,
  HintIcon,
  className,
  onSubmitIsRunning,
  onSubmitIsSuccess,
}) => {
  const [inputIsError, setInputIsError] = useState(false);
  const [inputVal, setInputVal] = useState<string | null>(null);
  const [submitIsSuccess, setSubmitIsSuccess] = useState(false);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputIsError(false);
    setSubmitIsSuccess(false);
    setInputVal(e.target.value);
  }, []);

  const onTrySubmit = useCallback(() => {
    if (inputVal === null) {
      setInputIsError(true);
    } else {
      onSubmit(inputVal);
    }
  }, [setInputIsError, inputVal, onSubmit, setInputIsError]);

  useEffect(() => {
    if (onSubmitIsSuccess === true) {
      setSubmitIsSuccess(true);
    } else {
      setSubmitIsSuccess(false);
    }
    setTimeout(() => setSubmitIsSuccess(false), 3000);
  }, [onSubmitIsSuccess]);

  return (
    <form
      className={`${className} RelayIdInputForm OverrideMargin`}
      onSubmit={(e) => {
        e.preventDefault();
        onTrySubmit();
      }}>
      <input
        className="RelayIdInputInput rr-mb-2"
        autoFocus={Boolean(autofocus)}
        placeholder={placeholder || 'Enter Group Name'}
        type="text"
        spellCheck="false"
        autoComplete="off"
        autoCorrect="false"
        autoCapitalize="false"
        value={inputVal || ''}
        onChange={onChange}
      />
      <div className="RelayIdInputIcon">
        {(() => {
          if (onSubmitIsRunning) {
            return <LoadingSpinner />;
          } else if (submitIsSuccess) {
            return <Check />;
          } else {
            return <HintIcon />;
          }
        })()}
      </div>
      {inputIsError && (
        <p className="RelayIdInputErrorMessage">
          {errorMessage || 'Group Name is required'}
        </p>
      )}
    </form>
  );
};
