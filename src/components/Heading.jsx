import { useContext } from 'react'
import styled from 'styled-components'

import { device } from 'style/responsive'
import { MenuContext } from 'contexts/MenuContext'

const Heading = ({ title }) => {
  
  const menuCtx = useContext(MenuContext)

  return (
    <HeadingStyled>
      {window.matchMedia('(max-width: 600px)') && (
        <OpenMenu onClick={menuCtx.toggleMenu}>
          <span />
        </OpenMenu>
      )}
      {title}
    </HeadingStyled>
  )
}

export default Heading

const HeadingStyled = styled.h1`
  padding: 2.5rem 3rem;
  border-bottom: 1px solid var(--grey);
  width: 100%;
  font-size: 2.5rem;
  border-bottom: 1px solid #f1f1f2;
  display: flex;
  align-items: center;
  position: relative;
  min-height: 6.5rem;

  @media ${device.tablet} {
    font-size: 1.4rem;
    text-align: center;
    justify-content: center;
  }
`

const OpenMenu = styled.span`
  width: 40px;
  height: 40px;
  background: #f1f1f2;
  border-radius: 10px;
  z-index: 100;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 2rem;
  top: 1.25rem;
  display: none;

  @media ${device.tablet} {
    display: flex;
  }

  > span {
    height: 1px;
    width: 12px;
    background: black;
    position: relative;
  }

  > span:before {
    content: '';
    height: 1px;
    width: 12px;
    background: black;
    position: absolute;
    top: -4px;
    left: 0;
    right: 0;
  }

  > span:after {
    content: '';
    height: 1px;
    width: 12px;
    background: black;
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
  }
`
