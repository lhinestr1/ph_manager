/* eslint react-hooks/exhaustive-deps: 0 */
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import noop from '../../helpers/noop';
import { Flex } from '../Grid/Flex';
import styled from 'styled-components';
import { Button } from 'antd';

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  &:before {
    content: ' ';
    position: absolute;
    background-color: #fff;
    width: 2px;
    height: 16px;
    top: 1px;
    right: 7px;
    transform: rotate(45deg);
  }
  &:after {
    content: '';
    position: absolute;
    background-color: #fff;
    width: 16px;
    height: 2px;
    top: 8px;
    right: 0;
    transform: rotate(45deg);
  }
`;
const Content = styled.div`
  background-color: #fff;
  color: #7E7E7E;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  max-height: 95%;
  overflow-y: auto;
  z-index: 1001;
  max-width: 700px;
  border-radius: 10px;
  font-size: 1.1rem;
`;

// modal 2
type Fulfill = (value: { accept?: boolean; cancel?: boolean }) => void;

interface ModalContent {
  title?: ReactNode;
  main: ReactNode;
  accept?: string | boolean;
  cancel?: string | boolean;
  noClosable?: boolean;
}

type ModalAsync = (
  c: ModalContent
) => Promise<{ accept?: boolean; cancel?: boolean }>;

export const useModalC = (): [
  { content?: ModalContent; fulfill: Fulfill; close: () => void },
  ModalAsync
] => {
  const [content, setContent] = useState<ModalContent>();
  const [fulfill, setFulfill] = useState<Fulfill>(noop);

  const modal = useCallback((c: ModalContent) => {
    setContent(c);
    const promise = new Promise((resolve: Fulfill) => {
      setFulfill(() => resolve);
    });
    return promise;
  }, []);

  const close = useCallback(() => {
    setContent(undefined);
  }, []);

  return [{ content, fulfill, close }, modal];
};

interface ModalProps {
  props: {
    fulfill: Fulfill;
    content?: ModalContent;
    close(): void;
  };
  container?: HTMLElement;
}

export const ModalC: React.FC<ModalProps> = ({
  props: { content, fulfill, close },
  container = document.getElementById('modal'),
}) => {
  const accept = useCallback(() => {
    fulfill({ accept: true });
    close();
  }, [fulfill]);

  const cancel = useCallback(() => {
    fulfill({ cancel: true });
    close();
  }, [fulfill]);

  useEffect(() => {
    return () => {
      if (fulfill) fulfill({ cancel: true });
      close();
    };
  }, []);

  return (
    <>
      {container &&
        content &&
        ReactDOM.createPortal(
          <ModalStyled>
            <Background onClick={() => !content.noClosable && cancel()} />
            {!content.noClosable && <Close onClick={cancel} />}
            <Content>
              {content.title && <div className="title">{content.title}</div>}
              {content.main && <div className="main">{content.main}</div>}
              {(content.accept || content.cancel) && (
                <Flex row justify="center">
                  {content.accept && (
                    <Button onClick={accept}>
                      {content.accept === true ? 'Aceptar' : content.accept}
                    </Button>
                  )}
                  {content.cancel && (
                    <Button onClick={cancel}>
                      {content.cancel === true ? 'Cancelar' : content.cancel}
                    </Button>
                  )}
                </Flex>
              )}
            </Content>
          </ModalStyled>,
          container
        )}
    </>
  );
};
