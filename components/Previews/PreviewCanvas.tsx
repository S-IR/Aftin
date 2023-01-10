import React, { useEffect, useMemo, useRef } from 'react'
import { previewCategoryValue } from '../../constants/previews/previewCategories'
import { previewPhone, previewTemplate } from '../../constants/previews/previewTemplates'
import PreviewImg from './PreviewImg'
import PreviewElement from './PreviewElement'
import { useAppDispatch, useAppSelector } from '../../Redux/hooks'
import { previewsCount } from '../../features/previews/previewsSlice'
import { Stage as KonvaStage, Layer, Rect, KonvaNodeComponent } from 'react-konva'

interface props {
  selectedCategory: {
    name: string,
    value: previewCategoryValue
  }
}

const PreviewCanvas = ({ selectedCategory }: props) => {

  const src = useAppSelector(previewsCount).image

  const determinePreviewIMG = (selectedCategory: {
    name: string,
    value: previewCategoryValue
  }): previewTemplate | null => {
    switch (selectedCategory.value) {
      case 'phone':
        return previewPhone
      default:
        return null
    }
  }

  const placementData = useMemo(() => determinePreviewIMG(selectedCategory), [selectedCategory])
  const stageRef = useRef<KonvaNodeComponent<Stage, StageProps>>(null)
  const canvasBGRef = useRef<null | KonvaNodeComponent<Rect, RectConfig>>(null)
  const layerRef = useRef<null | KonvaNodeComponent<Layer, LayerConfig>>(null)


  if (placementData === null) return <div>placement data is null</div>
  placementData.sentImgPlacement.src = src




  return (
    <div>
      {placementData !== null &&
        <KonvaStage
          width={1920}
          height={1080}
          ref={stageRef}
          willReadFrequently={true}
        >
          <Layer
            ref={layerRef}
          >
            <Rect
              ref={canvasBGRef}
              width={1920}
              height={1080}
              x={0}
              y={0}
              fill={`white`}
            />
            {/* if the background data is NOT an array, do this  */}
            {!Array.isArray(placementData.bg) ?
              <>
                {/* <PreviewElement data={placementData.bg} layerRef={layerRef} /> */}
                <PreviewElement data={placementData.sentImgPlacement}  layerRef={layerRef} />
              </>

              :
              <></>


            }
          </Layer>
        </KonvaStage>
      }
    </div>
  )

}

export default PreviewCanvas