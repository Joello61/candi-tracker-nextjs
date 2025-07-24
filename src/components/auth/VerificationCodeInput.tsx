'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface VerificationCodeInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export const VerificationCodeInput: React.FC<VerificationCodeInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  autoFocus = true,
  className
}) => {
  const [inputs, setInputs] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(length).fill(null));

  // Synchroniser avec la valeur externe
  useEffect(() => {
    const newInputs = value.split('').concat(new Array(length).fill(''));
    setInputs(newInputs.slice(0, length));
  }, [value, length]);

  // Auto-focus sur le premier input
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (index: number, inputValue: string) => {
    // Ne permettre que les chiffres
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    
    if (numericValue.length <= 1) {
      const newInputs = [...inputs];
      newInputs[index] = numericValue;
      setInputs(newInputs);

      // Mettre à jour la valeur globale
      const newValue = newInputs.join('');
      onChange(newValue);

      // Passer au champ suivant si un chiffre est saisi
      if (numericValue && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // Appeler onComplete si tous les champs sont remplis
      if (newValue.length === length && onComplete) {
        onComplete(newValue);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      
      const newInputs = [...inputs];
      
      if (inputs[index]) {
        // Effacer le champ actuel
        newInputs[index] = '';
      } else if (index > 0) {
        // Passer au champ précédent et l'effacer
        newInputs[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
      }
      
      setInputs(newInputs);
      onChange(newInputs.join(''));
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    
    const pastedData = e.clipboardData.getData('text/plain');
    const numericData = pastedData.replace(/[^0-9]/g, '').slice(0, length);
    
    if (numericData) {
      const newInputs = numericData.split('').concat(new Array(length).fill(''));
      const finalInputs = newInputs.slice(0, length);
      
      setInputs(finalInputs);
      onChange(finalInputs.join(''));
      
      // Focuser sur le dernier champ rempli ou le suivant
      const nextIndex = Math.min(numericData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      
      // Appeler onComplete si tous les champs sont remplis
      if (numericData.length === length && onComplete) {
        onComplete(numericData);
      }
    }
  };

  return (
    <div className={cn("flex gap-2 justify-center", className)}>
      {inputs.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "w-12 h-12 text-center text-lg font-mono",
            "border-2 rounded-lg",
            "focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
            digit ? "border-blue-300" : "border-gray-300",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          autoComplete="off"
        />
      ))}
    </div>
  );
};