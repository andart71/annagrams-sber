import React from 'react';
import styled from 'styled-components';

interface Image {
    src: string;
    width?: number;
    height?: number;
}

const StyledImage = styled.div<Image>`
    background: url(${({ src }) => src}) no-repeat center center;
    background-size: cover;
    width: ${({ width }) => (width ? `${width}px` : '100%')};
    height: ${({ height }) => (height ? `${height}px` : '100%')};
`;

const Img: React.FC<Image> = ({ ...props }) => {
    return <StyledImage {...props} />;
};

export default Img;