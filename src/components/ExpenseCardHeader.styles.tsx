import styled from "styled-components";

export const Header = styled.header`
      display: grid;
      grid-template: 2fr 1fr / 1fr;
      border: 1px solid black;
      padding: 10px;
    `

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const ProgressBar = styled.progress`
  width: 100%;
  height: 20px;
`

export const BottomSection = styled.div``