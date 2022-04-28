
import React, {Component} from 'react';
import Accordian from '../general/Accordian'
import styled from 'styled-components/native'
import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';


export default class CheckCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu :[
        { 
            id: '0',
            image: require('../../../assets/LookingImage/LookingImage.png'),
            title: "When You're Looking",
            headers: {"Ask Yourself:": 
                ['Does the advertised rent include a concession? If so, remember that concessions are usually a one-time rent discount.', 
                'Do you need a flexible rent due date? Ask your landlord if this is possible.', 
                'Do you have a pet, or are you anticipating one? Will you need parking? Pets and parking are two common sources of additional fees and deposits when renting.',
                'What types of amenities are you looking for?',
                'Does the type of building matter (high rise or garden style walk-up)?'], 
                "Ask the Landlord:": 
                ['Does the advertised rent include a concession?',
                'What kind of application do they use?',
                'Is there an application fee or a fee to hold the apartment?',
                'Will they do a background check, and if so, what are they looking for and how many years back will they look?',
                'Is there a minimum credit score or income required?',
                'Will they consider a renter with a previous eviction?']}
        },
        { 
          id: '1',
          image: require('../../../assets/SigningImage/SigningImage.png'),
          title: "When You're Signing", 
          headers: {"Ask Yourself:": ['How do I get a signed copy of the lease for my records?'], "Ask the Landlord": 
            ["What is included in the rent?",
            "Are there fees and deposits? How much are they, and are they refundable?",
            "Are there penalty fees if you break your lease early?",
            "What are the different lease term options and are the rents different for each option?",
            "Are there annual rent increases, and if so, when do these happen?",
            "Is the apartment subject to rent control?",
            "Are utilities included in the rent? If not, are you supposed to set up your own utility account?",
            "What does the lease renewal process look like?",
            "Is there on-site management or maintenance?"]}
        },
        { 
          id: '2',
          image: require('../../../assets/MovingInImage/MovingInImage.png'),
          title: "When You're Moving In",
          headers: {"Ask Yourself:": ['Do you need a flexible rent payment date, or grace period?'], "Ask the Landlord": 
          ["Are there fees for moving in or moving out?",
          "Are they willing to adjust the rent due date or offer a grace period?"]}
        },
        {
          id: '3',
          image: require('../../../assets/MovingOutImage/MovingOutImage.png'),
          title: "When You're Moving Out",
          headers: {"Ask Yourself:": ["Have you notified your landlord in writing?",
          "Are you breaking your lease early? Check your lease because there may be a fee for this.",
          "Are there move-out fees? Check your lease – these should be documented.",
          "Do you need to reserve a parking spot or a loading dock space for the moving vehicle? You may need to reserve it ahead of time with your landlord.",
          "Don’t leave any furniture or personal items behind when you move, even if you are discarding them. The landlord legally cannot move them, so you would still be \"occupying\" the apartment and this can cost you money!",
          "In some states you can be present for the move-out inspection. If you can’t attend, take photos of your apartment including the walls and floors in case there are any damage disputes later."],
          "Ask the Landlord:": [
            "Your landlord says the apartment must be clean, but how clean is “clean”? Some landlords want the apartment to be professionally cleaned, and some want “broom clean” – meaning the floors and visible surfaces are clean. This can impact your security deposit, so ask!",
         "If you paid one, when can you expect your security deposit to be returned? This can be anywhere from 30-60 days and varies by state.",
         "In some states you have the right to receive a written statement detailing any apartment damage expenses that might be charged against your security deposit. If your landlord doesn’t offer a statement, ask them for it.",
         "Ask your landlord what they consider “normal wear and tear” versus apartment damage. It may be a better financial decision to patch up any nail holes yourself rather than risking your security deposit!"
          ]}
        }
      ]
     }
  }

  render() {
    return (
      <Container>
        { this.renderAccordians() }
      </Container>
    );
  }

  renderAccordians=()=> {
    const items = [];
    // for (item of this.state.menu) {
      { this.state.menu.map((item, index) => (
        items.push(
            <Accordian key={item.id}
                 index = {index}
                image = {item.image}
                title = {item.title}
                headers = {item.headers}
            />
        )))
    }
    return items;
}
}

const Container = styled.View `
    padding-horizontal: 10px;
`
