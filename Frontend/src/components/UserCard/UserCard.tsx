import React, { useEffect, useState } from 'react'
import { IUser } from '../../types/common';
import * as Styled from './UserCard.styled';
import { Pencil, Trash2, IdCard, Mail, Phone } from "lucide-react";

interface Props {
  user: IUser,
  delay: number
}

export const UserCard: React.FC<Props> = ({ user, delay }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  /**
   * 
   * Acciones
   * <Styled.ButtonGroup>
      <Styled.IconButton>
        <Pencil size={16} />
      </Styled.IconButton>
      <Styled.RedIconButton>
        <Trash2 size={16} />
      </Styled.RedIconButton>
    </Styled.ButtonGroup>
   */

  return (
    <Styled.AnimatedWrapper $visible={visible}>
      <Styled.Card>
        <Styled.CardHeader>
          <Styled.Name>
            {user.firstName} {user.lastName}
          </Styled.Name>
        </Styled.CardHeader>
        <Styled.IconText>
          <IdCard size={16} /> {user.documentNumber}
        </Styled.IconText>
        <Styled.IconText>
          <Mail size={16} /> {user.email}
        </Styled.IconText>
        <Styled.IconText>
          <Phone size={16} /> {user.mainPhoneNumber}
        </Styled.IconText>
        <Styled.RoleBadge>{user.role}</Styled.RoleBadge>
      </Styled.Card>
    </Styled.AnimatedWrapper>
  );
};