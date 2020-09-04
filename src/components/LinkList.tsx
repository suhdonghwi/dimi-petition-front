import React, {useState} from 'react';
import styled from 'styled-components';

import {TextInput, SecondaryButton } from 'assets/styles/BasicComponent';
import colors from 'assets/colors';

interface LinkListProps {
  initialLinks: Array<string>; 
  onChangeLinks: (links: Array<string>) => void;
};

const Container = styled.div`
  
`;

const Links = styled.ul`
  padding: 0;  
  margin: 0;
  list-style-type: none;
`;

const LinkContainer = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const LinkInput = styled(TextInput)`
  flex: 1;
  margin-right: 0.7rem;
  min-width: 11rem;
`;


const DeleteButton = styled(SecondaryButton)`
  width: 10rem;
`;

const AddButton = styled(SecondaryButton)`
  width: 10rem;
  color: ${colors.main};
  border-color: ${colors.main};
`;

const LinkList = ({initialLinks, onChangeLinks}: LinkListProps) => {
  const [links, setLinks] = useState(initialLinks);
  const [linkInput, setLinkInput] = useState('');

  const onAdd = () => {
    const trimmed = linkInput.trim();
    if (trimmed === '') return;

    setLinks([...links, trimmed]);
    setLinkInput('');

    onChangeLinks(links);
  };

  const onDelete = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));

    onChangeLinks(links);
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onAdd();
  }

  return (
    <Container>
      <Links>
        {
          links.map((url, i) => (
            <li key={i}>
              <LinkContainer>
                <LinkInput value={url}  disabled/> 
                <DeleteButton type="button" value="링크 삭제" onClick={() => onDelete(i)}/>
              </LinkContainer>
            </li>
          ))
        }
      </Links>

      <LinkContainer>
        <LinkInput 
          value={linkInput} 
          onKeyPress={onKeyPress}
          onChange={(e) => setLinkInput(e.target.value)}
        />
        <AddButton type="button" value="링크 추가" onClick={onAdd}/>
      </LinkContainer>
    </Container>
  );
};

export default LinkList;
