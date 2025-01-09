import styled from '@emotion/styled'

export const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  padding: 0;
  font-family: sans-serif;

  .app-content {
    flex: 1;
    min-height: 100%;
    margin-right: 8px;
    margin-left: 8px;
    box-shadow: 0 0 10px 1px #e9e9e9;
  }
  .dnd-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
    padding: 16px;
    border: 1px solid #f0f0f0;
    user-select: none;
    .dnd-circle {
      width: 60px;
      height: 60px;
      margin: 16px;
      line-height: 60px;
      text-align: center;
      border: 1px solid #8f8f8f;
      border-radius: 100%;
      cursor: move;
    }
  }
  .custom-rectangle {
    position: relative;
    z-index: 3;
    width: 200px;
    height: 40px;
    line-height: 40px;
    cursor: move;
    text-align: center;
    border: 1px solid #8f8f8f;
    border-radius: 6px;
    color: #333;
    background-color: #fff;
  }
`
