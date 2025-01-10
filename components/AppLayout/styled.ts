import styled from '@emotion/styled'

export const StyledAppLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-column-gap: 8px;
  justify-content: space-between;
  align-items: stretch;

  .app-content {
    min-height: 100%;
    box-shadow: 0 0 10px 1px #e9e9e9;
  }

  .dnd-wrap {
    display: flex;
    user-select: none;
    flex-direction: column;
    border: 1px solid #f0f0f0;

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
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #333;
    cursor: move;
    z-index: 3;
    text-align: center;
    background-color: #fff;
    border: 1px solid #8f8f8f;
    border-radius: 6px;
  }

  .custom-circle {
    position: relative;
    width: 80px;
    height: 80px;
    color: #333;
    cursor: move;
    z-index: 3;
    text-align: center;
    background-color: #fff;
    border: 1px solid #8f8f8f;
    border-radius: 50%;
  }

  .custom-ellipse {
    position: relative;
    width: 120px;
    height: 60px;
    color: #333;
    cursor: move;
    z-index: 3;
    text-align: center;
    background-color: #fff;
    border: 1px solid #8f8f8f;
    border-radius: 50%;
  }

  .custom-layer {
    position: relative;
    width: 100%;
    height: 40px;
    cursor: move;
    z-index: 3;
    text-align: center;
    background-color: #fefff6;
    border: 1px dashed #cccccc;
  }

  .custom-row {
    position: relative;
    width: 100%;
    height: 40px;
    cursor: move;
    z-index: 3;
    text-align: center;
    background-color: #ebf8fa;
    border: 1px dashed #cccccc;
  }
`

export const StyledLayerItem = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
`
