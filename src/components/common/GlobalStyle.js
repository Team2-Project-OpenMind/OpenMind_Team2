import { createGlobalStyle } from 'styled-components';
import 'assets/font/Pretendard/pretendard.css';
import 'assets/font/Actor/Actor.css';

const GlobalStyle = createGlobalStyle`
    :root {

        // Color
        --gray10: #ffffff;
        --gray20: #f9f9f9;
        --gray30: #cfcfcf;
        --gray40: #818181;
        --gray50: #515151;
        --gray60: #000000;

        --brown10: #F5F1EE; 
        --brown20: #E4D5C9; 
        --brown30: #C7BBB5; 
        --brown40: #542F1A; 
        --brown50: #341909; 

        --blue50: #1877F2;
        --yellow50: #FEE500;
        --red50: #B93333;


        // Shadow
        --shadow1pt: 0px 4px 4px 0px rgba(140, 140, 140, 0.25);
        --shadow2pt: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        --shadow3pt: 0px 16px 20px 0px rgba(48, 48, 48, 0.62);

        // Font
        --body1-regular: 400 2rem 'Pretendard';
        --body2-regular: 400 1.8rem 'Pretendard';
        --body3-regular: 400 1.6rem 'Pretendard';

        --body1-bold: 400 2rem 'Actor';
        --body2-bold: 400 1.8rem 'Actor';
        --body3-bold: 400 1.6rem 'Actor';
        
        --caption1-regular: 400 1.4rem 'Pretendard';
        --caption1-medium: 500 1.4rem 'Pretendard';
        --caption1-bold: 400 1.4rem 'Actor';
    }    
    
    h1, h2, h3 {
        font-family: 'Actor';
        font-weight: 400;
    }

    h1 {
        font-size: 4rem;
    }

    h2 {
        font-size: 3.2rem;
    }

    h3 {
        font-size: 2.4rem;
    }

`;

export default GlobalStyle;
