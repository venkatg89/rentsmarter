import React from "react";
import styled from 'styled-components/native';

import typography from "../../config/typographyVA";


function NavTitleSettings(props) {
    return (
      <Container>
        <TitleRow>
          <RowText1>Settings</RowText1>
        </TitleRow>
    
      </Container>
    );
  }

// the backwards tick (the grave accent character) is an ES6 Javascript template literal

export default NavTitleSettings

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

const ContainerText = styled.Text`
color: #05314D ;
font-size: 10px;
font-weight: bold;
`

