import { useEffect, useRef } from 'react'
import { Graph, Shape } from '@antv/x6'
import { Clipboard } from '@antv/x6-plugin-clipboard'
import { Dnd } from '@antv/x6-plugin-dnd'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import type { MouseEvent } from 'react'

import { defaultDataInit, nodeConfig } from './config'
import { StyledContainer } from './styled'

const AppLayout = () => {
  const containerRef = useRef<any>(null)
  const dndContainerRef = useRef<any>(null)
  const graphRef = useRef<any>(null)
  const dndRef = useRef<any>(null)

  // dnd-拖动节点放在画布上
  const startDrag = (e: MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget
    const type = target.getAttribute('data-type')
    if (type) {
      const node = graphRef.current?.createNode(nodeConfig[type])
      dndRef.current?.start(node, e.nativeEvent as any)
    }
  }

  useEffect(() => {
    requestAnimationFrame(() => {
      // 画布
      const graph: any = new Graph({
        container: containerRef.current,
        autoResize: true,
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
      const canvasWidth = graph.container.clientWidth
      // 使用插件
      graph
        .use(
          new Snapline({
            enabled: true,
            sharp: true
          })
        )
        .use(
          new Selection({
            rubberband: true
          })
        )
        .use(new Keyboard())
        .use(new Clipboard())
      // 快捷键与事件
      // 复制
      graph.bindKey(['meta+c', 'ctrl+c'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.copy(cells)
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
      // 控制连接桩显示/隐藏
      const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
        for (let i = 0, len = ports.length; i < len; i += 1) {
          ports[i].style.visibility = show ? 'visible' : 'hidden'
        }
      }
      graph.on('node:mouseenter', () => {
        const container: any = document.getElementById('graph-container')
        const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
        showPorts(ports, true)
      })
      graph.on('node:mouseleave', () => {
        const container: any = document.getElementById('graph-container')
        const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
        showPorts(ports, false)
      })

      graph.fromJSON(defaultDataInit(canvasWidth))

      return () => {
        if (graphRef.current) {
          graphRef.current.dispose()
        }
      }
    })
  }, [])

  return (
    <StyledContainer id="cus-container">
      <div className="dnd-wrap" ref={dndContainerRef}>
        <div data-type="rect" className="custom-rectangle" onMouseDown={startDrag} />
      </div>
      <div id="graph-container" className="app-content" ref={containerRef} />
    </StyledContainer>
  )
}

export default AppLayout
