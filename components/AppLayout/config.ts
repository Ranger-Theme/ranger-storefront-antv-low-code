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
export const rectNode = {
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
  data: {
    type: 'rect'
  },
  tools: ['node-editor']
}

export const circleNode = {
  zIndex: 3,
  shape: 'circle',
  width: 80,
  height: 80,
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
  data: {
    type: 'circle'
  },
  tools: ['node-editor']
}

export const ellipseNode = {
  zIndex: 3,
  shape: 'ellipse',
  width: 120,
  height: 60,
  attrs: {
    label: {
      textWrap: {
        width: -10, // 设置自动换行宽度
        height: 'auto' // 高度自动调整
      }
    },
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
  data: {
    type: 'ellipse'
  },
  tools: ['node-editor']
}

export const groupsNode = {
  zIndex: 1,
  inherit: 'rect',
  width: 100,
  height: 100,
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
  rect: rectNode,
  circle: circleNode,
  ellipse: ellipseNode,
  groudp: groupsNode
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
      }
    ]
  }
  return data
}
