import { ComponentPropsWithoutRef } from 'react';
import styled from 'styled-components';

export function WideButton({ children, disabled, ...props }: ComponentPropsWithoutRef<'button'>) {
  return (
    <ButtonS disabled={disabled} {...props}>
      {children}
    </ButtonS>
  );
}

const ButtonS = styled.button<{ disabled: boolean | undefined }>`
  width: 100%;
  height: var(--height-header);
  border-radius: 2rem;
  font-size: 1rem;
  color: ${({ disabled }) => disabled && 'var(--color-disabled1)'};
  background-color: ${({ disabled }) =>
    disabled ? 'var(--color-disabled2)' : 'var(--color-main)'};
`;

export const ButtonWrapperS = styled.div<{ $fixed?: boolean; $transparent?: boolean }>`
  padding: 1rem;
  position: ${({ $fixed }) => $fixed && 'fixed'};
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ $transparent }) => ($transparent ? '' : '#fff')};
`;
