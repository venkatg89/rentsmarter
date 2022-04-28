import React from "react";
import styled from 'styled-components/native';

import typography from "../../config/typography";


function NavTitleAssistant(props) {
    return (
      <Container>
        <TitleRow>
          <RowText1>Virtual Assistant</RowText1>
        </TitleRow>
    
      </Container>
    );
  }

// the backwards tick (the grave accent character) is an ES6 Javascript template literal

export default NavTitleAssistant

const Container = styled.View`
flex:1;
align-items: center;
justify-content: center;
`

const TitleRow = styled.View`
flex-direction: row;
` 

const RowText1 = styled(typography.largeTextSemiBold)`
 color: #05314D ;
`


