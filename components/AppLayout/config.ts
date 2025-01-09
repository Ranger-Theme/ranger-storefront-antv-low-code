// 初始化边
const attrs = {
  circle: {
    r: 4,
    magnet: true,
    stroke: '#5F95FF',
    strokeWidth: 1,
    fill: '#fff',
    style: {
      visibility: 'hidden'
    }
  }
}
// 边属性
const ports = {
  groups: {
    top: {
      position: 'top',
      attrs
    },
    right: {
      position: 'right',
      attrs
    },
    bottom: {
      position: 'bottom',
      attrs
    },
    left: {
      position: 'left',
      attrs
    }
  },
  items: [
    {
      group: 'top'
    },
    {
      group: 'right'
    },
    {
      group: 'bottom'
    },
    {
      group: 'left'
    }
  ]
}

// 矩形节点
export const rectRectangle = {
  zIndex: 3,
  shape: 'rect',
  width: 200,
  height: 40,
  attrs: {
    body: {
      stroke: '#8f8f8f',
      strokeWidth: 1,
      fill: '#fff',
      rx: 6,
      ry: 6
    }
  },
  ports: {
    ...ports
  },
  tools: ['node-editor']
}

// 自定义群组数据
export const customGroupsNode = {
  zIndex: 1,
  inherit: 'rect',
  attrs: {
    body: {
      fill: '#FEFFF6',
      stroke: '#cccccc',
      strokeWidth: 1,
      strokeDasharray: '2 2'
    }
  }
}

// 所有的对应节点关系
export const nodeConfig: any = {
  rect: rectRectangle
}

// 默认数据
export const defaultData = {
  nodes: [
    {
      id: 'growth-strategy',
      parent: 'group1',
      shape: 'rect',
      zIndex: 2,
      x: 400,
      y: 60,
      attrs: {
        body: {
          strokeWidth: 0
        },
        label: {
          text: '增长站略',
          fontSize: 16
        }
      },
      data: {
        disableMove: true
      }
    },
    {
      id: 'long-term-value',
      parent: 'group1',
      shape: 'rect',
      width: 200,
      height: 40,
      zIndex: 2,
      x: 700,
      y: 25,
      attrs: {
        body: {
          stroke: '#ffffff',
          strokeWidth: 1,
          fill: '#EA5400',
          rx: 20,
          ry: 20
        },
        label: {
          text: '长期股东价值',
          fill: '#ffffff',
          fontSize: 14
        }
      },
      ports: {
        ...ports
      },
      data: {
        disableMove: true
      }
    },
    {
      id: 'productivity-strategy',
      parent: 'group1',
      zIndex: 2,
      x: 1200,
      y: 60,
      attrs: {
        body: {
          strokeWidth: 0
        },
        label: {
          text: '生产力战略',
          fontSize: 16
        }
      },
      data: {
        disableMove: true
      }
    }
  ]
}

// 默认数据
export const defaultDataInit = (canvasWidth: number) => {
  const data = {
    nodes: [
      ...defaultData.nodes,
      {
        id: 'group1',
        shape: 'rect',
        width: canvasWidth,
        height: 100,
        x: 0,
        y: 0,
        zIndex: 1,
        attrs: {
          body: {
            fill: '#FEFFF6',
            stroke: '#cccccc',
            strokeWidth: 1,
            strokeDasharray: '2 2'
          }
        },
        children: ['growth-strategy', 'long-term-value', 'productivity-strategy'],
        data: {
          disableMove: true
        }
      },
      {
        id: 'group2',
        shape: 'rect',
        width: canvasWidth,
        height: 90,
        x: 0,
        y: 100,
        attrs: {
          body: {
            fill: '#EBF8FA',
            stroke: '#cccccc',
            strokeWidth: 1,
            strokeDasharray: '2 2'
          }
        },
        data: {
          disableMove: true
        }
      },
      {
        id: 'group3',
        shape: 'rect',
        width: canvasWidth,
        height: 90,
        x: 0,
        y: 190,
        attrs: {
          body: {
            fill: '#FEFFF6',
            stroke: '#cccccc',
            strokeWidth: 1,
            strokeDasharray: '2 2'
          }
        },
        data: {
          disableMove: true
        }
      },
      {
        id: 'group4',
        shape: 'rect',
        width: canvasWidth,
        height: 450,
        x: 0,
        y: 280,
        attrs: {
          body: {
            fill: '#EBF8FA',
            stroke: '#cccccc',
            strokeWidth: 1,
            strokeDasharray: '2 2'
          }
        },
        data: {
          disableMove: true
        }
      },
      {
        id: 'group5',
        shape: 'rect',
        width: canvasWidth,
        height: 160,
        x: 0,
        y: 730,
        attrs: {
          body: {
            fill: '#FEFFF6',
            stroke: '#cccccc',
            strokeWidth: 1,
            strokeDasharray: '2 2'
          }
        },
        data: {
          groupName: 'learningAndGrowth',
          disableMove: true
        }
      }
    ]
  }
  return data
}
