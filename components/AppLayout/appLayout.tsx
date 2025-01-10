import { useEffect, useRef } from 'react'
import { Collapse } from 'antd'
import { Graph, Shape } from '@antv/x6'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Dnd } from '@antv/x6-plugin-dnd'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { History } from '@antv/x6-plugin-history'
import type { MouseEvent } from 'react'

import { defaultDataInit, nodeConfig } from './config'
import { StyledAppLayout, StyledLayerItem } from './styled'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const menuContainer = document.createElement('div')
menuContainer.id = 'context-menu'
menuContainer.style.position = 'absolute'
menuContainer.style.display = 'none'
menuContainer.style.background = '#fff'
menuContainer.style.border = '1px solid #ddd'
menuContainer.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)'
menuContainer.style.zIndex = '1000'
menuContainer.style.padding = '8px'
document.body.appendChild(menuContainer)

// 动态生成菜单内容
const getMenuContent = (nodeType: string) => {
  if (nodeType === 'ellipse') {
    return `
      <div id="edit-ellipse" style="padding: 4px 8px; cursor: pointer;">Edit Ellipse Label</div>
      <div id="delete-ellipse" style="padding: 4px 8px; cursor: pointer;">Delete Ellipse Node</div>
    `
  } else if (nodeType === 'rect') {
    return `
      <div id="edit-rect" style="padding: 4px 8px; cursor: pointer;">Edit Rect Label</div>
      <div id="delete-rect" style="padding: 4px 8px; cursor: pointer;">Delete Rect Node</div>
    `
  }
  return ''
}

const AppLayout = () => {
  const containerRef = useRef<any>(null)
  const canvasRef = useRef<any>(null)
  const dndContainerRef = useRef<any>(null)
  const graphRef = useRef<any>(null)
  const dndRef = useRef<any>(null)

  const startDrag = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    const type = target.getAttribute('data-type')
    if (type) {
      const node = graphRef.current?.createNode(nodeConfig[type])
      dndRef.current?.start(node, e.nativeEvent as any)
    }
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      // Calculate the width of the graph container excluding the dnd container
      const container = containerRef.current as HTMLElement
      const dndContainer = dndContainerRef.current as HTMLElement
      const canvas = canvasRef.current as HTMLElement
      const sidebarWidth = dndContainer.offsetWidth
      const canvasWidth = container.clientWidth - sidebarWidth - 8
      const canvasHeight = container.clientHeight

      // Initialize the graph with the adjusted width
      const graph = new Graph({
        container: canvas,
        autoResize: true,
        // Use calculated width here
        width: canvasWidth,
        height: canvasHeight,
        grid: {
          visible: true,
          type: 'doubleMesh',
          args: [
            {
              color: '#eee', // 主网格线颜色
              thickness: 1 // 主网格线宽度
            },
            {
              color: '#ddd', // 次网格线颜色
              thickness: 1, // 次网格线宽度
              factor: 4 // 主次网格线间隔
            }
          ]
        },
        interacting: (cellView) => {
          if (cellView?.cell?.getData()?.disableMove) {
            return { nodeMovable: false }
          }
          return true
        },
        translating: {
          restrict(view: any) {
            const { cell } = view
            if (cell.isNode()) {
              const parent = cell.getParent()
              if (parent) {
                return parent.getBBox()
              }
            }
            return true
          }
        },
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: 'ctrl',
          minScale: 0.5,
          maxScale: 3
        },
        connecting: {
          router: 'manhattan',
          anchor: 'center',
          connectionPoint: 'anchor',
          snap: true,
          allowNode: false,
          allowBlank: false,
          highlight: true,
          connector: {
            name: 'rounded',
            args: {
              radius: 8
            }
          },
          createEdge() {
            return new Shape.Edge({
              zIndex: 2,
              attrs: {
                line: {
                  stroke: '#A2B1C3',
                  strokeWidth: 2,
                  targetMarker: {
                    name: 'block',
                    width: 12,
                    height: 8
                  }
                }
              }
            })
          }
        },
        background: {
          color: '#F2F7FA'
        }
      })

      // dnd
      const dnd = new Dnd({
        target: graph,
        scaled: false,
        dndContainer: dndContainerRef.current
      })

      graphRef.current = graph
      dndRef.current = dnd

      // Graph plugins
      graph
        .use(
          new Snapline({
            enabled: true,
            sharp: true
          })
        )
        .use(
          new History({
            enabled: true
          })
        )
        .use(
          new Selection({
            enabled: true,
            rubberband: true
          })
        )
        .use(
          new Keyboard({
            enabled: true,
            global: true
          })
        )
        .use(
          new Clipboard({
            enabled: true
          })
        )

      // 复制
      graph.bindKey(['meta+c', 'ctrl+c'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.copy(cells)
        }
        return false
      })

      graph.bindKey(['meta+x', 'ctrl+x'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.cut(cells)
        }
        return false
      })

      // 粘贴
      graph.bindKey(['meta+v', 'ctrl+v'], () => {
        if (!graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 })
          graph.cleanSelection()
          graph.select(cells)
        }
        return false
      })

      // undo redo
      graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (graph.canUndo()) {
          graph.undo()
        }
        return false
      })

      graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        if (graph.canRedo()) {
          graph.redo()
        }
        return false
      })

      // select all
      graph.bindKey(['meta+a', 'ctrl+a'], () => {
        const nodes = graph.getNodes()
        if (nodes) {
          graph.select(nodes)
        }
      })

      // 删除
      graph.bindKey('backspace', () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          // 判断节点是否可删除
          const { disableMove } = cells[0]?.data ?? {}
          if (!disableMove) {
            graph.removeCells(cells)
          }
        }
      })

      // zoom
      graph.bindKey(['ctrl+1', 'meta+1'], () => {
        const zoom = graph.zoom()
        if (zoom < 1.5) {
          graph.zoom(0.1)
        }
      })

      graph.bindKey(['ctrl+2', 'meta+2'], () => {
        const zoom = graph.zoom()
        if (zoom > 0.5) {
          graph.zoom(-0.1)
        }
      })

      // 控制连接桩显示/隐藏
      const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
        for (let i = 0, len = ports.length; i < len; i += 1) {
          ports[i].style.visibility = show ? 'visible' : 'hidden'
        }
      }

      graph.on('node:mouseenter', () => {
        const canvas = canvasRef.current as HTMLElement
        const ports = canvas.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
        showPorts(ports, true)
      })

      graph.on('node:mouseleave', () => {
        const canvas = canvasRef.current as HTMLElement
        const ports = canvas.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
        showPorts(ports, false)
      })

      // 监听右键菜单事件
      graph.on('node:contextmenu', ({ e, node }) => {
        e.preventDefault()

        // 获取节点类型
        const nodeType = node.getData().type

        // 设置菜单内容
        menuContainer.innerHTML = getMenuContent(nodeType)

        // 显示菜单
        menuContainer.style.display = 'block'
        menuContainer.style.left = `${e.clientX}px`
        menuContainer.style.top = `${e.clientY}px`

        // 绑定菜单选项功能
        if (nodeType === 'ellipse') {
          document.getElementById('edit-ellipse')!.onclick = () => {
            const newText = prompt(
              'Enter new label for Ellipse Node:',
              node.attr('label/text') || ''
            )
            if (newText !== null) {
              node.attr('label/text', newText)
            }
            menuContainer.style.display = 'none'
          }

          document.getElementById('delete-ellipse')!.onclick = () => {
            node.remove()
            menuContainer.style.display = 'none'
          }
        } else if (nodeType === 'rect') {
          document.getElementById('edit-rect')!.onclick = () => {
            const newText = prompt('Enter new label for Rect Node:', node.attr('label/text') || '')
            if (newText !== null) {
              node.attr('label/text', newText)
            }
            menuContainer.style.display = 'none'
          }

          document.getElementById('delete-rect')!.onclick = () => {
            node.remove()
            menuContainer.style.display = 'none'
          }
        }
      })

      graph.on('blank:click', () => {
        menuContainer.style.display = 'none'
      })

      graph.resize(canvasWidth, canvasHeight)
      graph.fromJSON(defaultDataInit(canvasWidth))

      document.body.addEventListener('click', () => {
        menuContainer.style.display = 'none'
      })

      return () => {
        if (graphRef.current) {
          graphRef.current.dispose()
        }
      }
    })
  }, [])

  return (
    <StyledAppLayout ref={containerRef}>
      <div className="dnd-wrap" ref={dndContainerRef}>
        <h5>组件栏</h5>
        <Collapse
          defaultActiveKey={['1']}
          bordered={false}
          expandIconPosition="end"
          items={[
            {
              key: 'layer',
              label: '一般层级',
              children: (
                <div>
                  <StyledLayerItem>
                    <div data-type="group" className="custom-layer" onMouseDown={startDrag} />
                  </StyledLayerItem>
                  <StyledLayerItem>
                    <div data-type="custom-row" className="custom-row" onMouseDown={startDrag} />
                  </StyledLayerItem>
                </div>
              )
            },
            {
              key: 'node',
              label: '普通节点',
              children: (
                <div>
                  <StyledLayerItem>
                    <div data-type="rect" className="custom-rectangle" onMouseDown={startDrag} />
                  </StyledLayerItem>
                  <StyledLayerItem>
                    <div data-type="circle" className="custom-circle" onMouseDown={startDrag} />
                  </StyledLayerItem>
                  <StyledLayerItem>
                    <div data-type="ellipse" className="custom-ellipse" onMouseDown={startDrag} />
                  </StyledLayerItem>
                </div>
              )
            },
            {
              key: 'advance',
              label: '高级节点',
              children: <div>{text}</div>
            }
          ]}
        />
      </div>
      <div className="app-content" ref={canvasRef} />
    </StyledAppLayout>
  )
}

export default AppLayout
