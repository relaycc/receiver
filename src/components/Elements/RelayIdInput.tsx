import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import { Check } from './Icons';
import { LoadingSpinner } from './LoadingSpinner';
import { Handle, isEthAddress, isHandle } from '../../domain';
import { useEnsAddress, useLensAddress } from '../../hooks';

export interface RelayIdInputProps {
  onSubmit: (valToSubmit: Handle) => unknown;
  placeholder?: string;
  autofocus?: boolean;
  errorMessage?: string;
  HintIcon: FunctionComponent;
  className?: string;
  onSubmitIsRunning?: boolean;
}

export const RelayIdInput: FunctionComponent<RelayIdInputProps> = ({
  onSubmit,
  autofocus,
  placeholder,
  errorMessage,
  HintIcon,
  className,
  onSubmitIsRunning,
}) => {
  const [inputIsError, setInputIsError] = useState(false);
  const [inputIsValid, setInputIsValid] = useState(false);
  const [inputVal, setInputVal] = useState<string | null>(null);
  const ensAddress = useEnsAddress({ handle: inputVal });
  const lensAddress = useLensAddress({ handle: inputVal });

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputIsError(false);
    setInputIsValid(false);
    setInputVal(e.target.value);
  }, []);

  const onTrySubmit = useCallback(() => {
    if (inputIsValid === false || inputVal === null) {
      setInputIsError(true);
    } else {
      if (!isHandle(inputVal)) {
        throw new Error(
          'onTrySubmit: inputVal is not a valid handle: ' + inputVal
        );
      } else {
        onSubmit(inputVal);
      }
    }
  }, [setInputIsError, inputIsValid, inputVal, onSubmit]);

  useEffect(() => {
    if (
      isEthAddress(inputVal) ||
      isEthAddress(ensAddress.data) ||
      isEthAddress(lensAddress.data)
    ) {
      setInputIsValid(true);
    }
  }, [inputVal, ensAddress.data, lensAddress.data]);

  const isValidating = useMemo(() => {
    return ensAddress.isLoading || lensAddress.isLoading;
  }, [ensAddress.isLoading, lensAddress.isLoading]);

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
        placeholder={placeholder || 'Enter ENS, Lens, or address...'}
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
          } else {
            if (inputIsValid) {
              return <Check />;
            } else {
              if (isValidating) {
                return <LoadingSpinner />;
              } else {
                return <HintIcon />;
              }
            }
          }
        })()}
      </div>
      {inputIsError && (
        <p className="RelayIdInputErrorMessage">
          {errorMessage || 'Please enter a valid handle...'}
        </p>
      )}
    </form>
  );
};
