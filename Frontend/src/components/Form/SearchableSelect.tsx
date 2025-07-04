import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

// Tipado para una opción
export interface Option {
    value: string | number;
    label: string;
}

// Props del componente
interface SearchableSelectProps {
    onSearch: (query: string, callback: (options: Option[]) => void) => void;
    onSelect: (option: Option) => void;
    defaultValue?: Option;
}

// Estilos
const Container = styled.div`
  position: relative;
  width: 250px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 40px;
  width: 100%;
  max-height: 200px;
  margin: 0;
  padding: 0;
  list-style: none;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  overflow-y: auto;
  z-index: 10;
`;

const OptionItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const LoadingItem = styled.li`
  padding: 8px;
  display: flex;
  justify-content: center;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid #ccc;
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
    onSearch,
    onSelect,
    defaultValue,
}) => {
    const [inputValue, setInputValue] = useState<string>(defaultValue?.label || "");
    const [options, setOptions] = useState<Option[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Buscar opciones al escribir
    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            try {
                setLoading(true);
                setHasSearched(true);
                onSearch(inputValue, (newOptions: Option[]) => {
                    setOptions(newOptions);
                    setLoading(false);
                })
            } catch (error) {
                setOptions([]);
                setLoading(false);
            }
            ;
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [inputValue, onSearch]);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option: Option) => {
        setInputValue(option.label);
        setShowDropdown(false);
        onSelect(option);
    };

    return (
        <Container ref={containerRef}>
            <Input
                type="text"
                value={inputValue}
                placeholder="Buscar por nombre..."
                onChange={(e) => {
                    setInputValue(e.target.value);
                    setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
            />
            {showDropdown && (
                <Dropdown>
                    {loading ? (
                        <LoadingItem>
                            <Spinner />
                        </LoadingItem>
                    ) : options.length > 0 ? (
                        options.map((opt, index) => (
                            <OptionItem key={index} onClick={() => handleSelect(opt)}>
                                {opt.label}
                            </OptionItem>
                        ))
                    ) : hasSearched ? (
                        <LoadingItem>Sin resultados</LoadingItem>
                    ) : null}
                </Dropdown>
            )}
        </Container>
    );
};
