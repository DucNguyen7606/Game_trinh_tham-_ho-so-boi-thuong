import type { ReactNode } from 'react'
import type { PortraitSpec } from '@/art/Portrait'
import { BackWalls, Box, Cyl, Face, IsoStage, Slab, WallText, iso } from './iso'
import { IsoFigure } from './figure'
import { Cup } from './props'

/** An open notebook read by someone sitting on the +x side: the spine runs along x, text lines along y. */
function NotebookX({ at }: { at: [number, number, number] }) {
  const [x, y, z] = at
  return (
    <g>
      <Box at={[x, y, z]} size={[30, 46, 2]} color={iso.coral} />
      <Box at={[x + 1.5, y + 2, z + 2]} size={[27, 20.5, 1.5]} color="#fffaf0" />
      <Box at={[x + 1.5, y + 23.5, z + 2]} size={[27, 20.5, 1.5]} color={iso.cream} />
      {[6, 11, 16, 21].map((o) => (
        <Face key={o} points={[[x + o, y + 25.5, z + 3.7], [x + o + 1, y + 25.5, z + 3.7], [x + o + 1, y + 41, z + 3.7], [x + o, y + 41, z + 3.7]]} fill={iso.inkSoft} />
      ))}
      {/* pen beside it, pointing at the reader */}
      <Box at={[x + 8, y + 50, z]} size={[22, 2.5, 2.5]} color={iso.ink} />
    </g>
  )
}

/**
 * The interview room as a diorama. The person questioned sits on the far side
 * facing +x; the investigator sits opposite with their back to the camera.
 * Notebook, pen, coffee and the case folder sit on the investigator's side,
 * turned towards them; the recorder sits between the two, its microphone towards
 * the person questioned, who has a glass of water.
 */
export function InterviewRoom({
  spec,
  talking,
  interviewer,
  asking = false,
  label,
  extra,
}: {
  spec: PortraitSpec
  talking: boolean
  interviewer?: PortraitSpec
  /** The investigator is asking a question: gestures and brows. */
  asking?: boolean
  label: string
  /** More things on the table (drawn after the table props, before the investigator). */
  extra?: ReactNode
}) {
  return (
    <IsoStage label={label} origin={[780, 250]} scale={2.15} sky={['#cfc8ea', '#f6dccb']}>
      <Slab w={270} d={250} floor="#e2d3c6" depth={22} />
      {/* rug */}
      <Face points={[[30, 60, 0.3], [250, 60, 0.3], [250, 210, 0.3], [30, 210, 0.3]]} fill="#d7b9b0" />
      <BackWalls w={270} d={250} h={125} left="#cbbfe0" right="#ddd0e6" edge="#9a8fb0" t={7} />
      {/* window with blinds on the right wall */}
      <Face points={[[120, 0.5, 50], [220, 0.5, 50], [220, 0.5, 112], [120, 0.5, 112]]} fill="#eef5f8" />
      {[58, 70, 82, 94].map((z) => (
        <Face key={z} points={[[120, 0.8, z], [220, 0.8, z], [220, 0.8, z + 3], [120, 0.8, z + 3]]} fill="#c9d6de" />
      ))}
      {/* wall clock and the company sign on the left wall */}
      <Cyl at={[0, 170, 96]} r={13} len={2} axis="x" color="#e9e1d4" cap="#fffaf0" />
      <Face points={[[2.4, 169, 96], [2.4, 171, 96], [2.4, 171, 106], [2.4, 169, 106]]} fill={iso.ink} />
      <Face points={[[2.4, 170, 95], [2.4, 178, 95], [2.4, 178, 97], [2.4, 170, 97]]} fill={iso.ink} />
      <Face points={[[0.5, 50, 84], [0.5, 130, 84], [0.5, 130, 106], [0.5, 50, 106]]} fill={iso.blue} />
      <WallText at={[1, 90, 91]} plane="L" text="BẢO HIỂM AN TÍN" size={13} />
      {/* low filing cabinet in the back corner */}
      <Box at={[180, 8, 0]} size={[70, 30, 60]} color="#b7a9cf" />
      <Box at={[190, 12, 60]} size={[14, 18, 18]} color={iso.coral} />
      <Box at={[206, 12, 60]} size={[10, 18, 14]} color={iso.gold} />
      <Cyl at={[236, 22, 60]} r={7} len={12} axis="z" color={iso.leaf} />
      {/* the person questioned, seated, facing +x towards the table */}
      <Box at={[50, 106, 0]} size={[46, 46, 24]} color="#6c6787" />
      <Box at={[44, 106, 24]} size={[8, 46, 40]} color="#6c6787" />
      <IsoFigure at={[56, 117, 0]} spec={spec} facing="x" pose="sit" size={1} talking={talking} />
      {/* the table */}
      <Box at={[110, 85, 0]} size={[8, 8, 50]} color={iso.woodDark} />
      <Box at={[110, 175, 0]} size={[8, 8, 50]} color={iso.woodDark} />
      <Box at={[192, 85, 0]} size={[8, 8, 50]} color={iso.woodDark} />
      <Box at={[192, 175, 0]} size={[8, 8, 50]} color={iso.woodDark} />
      <Box at={[104, 80, 50]} size={[102, 108, 6]} color="#b8927a" />
      {/* desk lamp on the far corner, angled over the table */}
      <Box at={[110, 86, 56]} size={[16, 16, 3]} color={iso.ink} />
      <Box at={[117, 93, 59]} size={[2.5, 2.5, 34]} color={iso.ink} />
      <Cyl at={[118, 98, 86]} r={8} len={9} axis="z" color={iso.gold} cap="#fff1c2" />
      {/* glass of water for the person questioned */}
      <Cup at={[118, 160, 56]} fill="#cfe6f2" />
      {/* recorder between them, microphone grille towards the person questioned */}
      <Box at={[132, 122, 56]} size={[16, 26, 6]} color={iso.ink} />
      <Face points={[[132, 126, 59], [132, 144, 59], [132, 144, 61], [132, 126, 61]]} fill="#6c6787" />
      <Box at={[145, 128, 62]} size={[2, 4, 1]} color={iso.coral} />
      {/* case folder, notebook and pen, coffee: the investigator's side */}
      <Box at={[160, 86, 56]} size={[34, 26, 3]} color="#e8cf98" />
      <Box at={[162, 86, 59]} size={[30, 26, 1]} color="#f1dcaa" />
      <NotebookX at={[166, 116, 56]} />
      <Cup at={[192, 176, 56]} fill="#7b5236" />
      {extra}
      {/* the investigator's chair and the investigator, back to the camera */}
      {interviewer && <IsoFigure at={[240, 121, 0]} spec={interviewer} facing="-x" pose="sit" size={1} talking={asking} />}
      {/* seat drawn after the figure: it is nearer the camera than the shins under the table */}
      <Box at={[218, 112, 0]} size={[36, 44, 22]} color="#7e9cb5" />
      <Box at={[252, 112, 24]} size={[8, 44, 42]} color="#7e9cb5" />
      {/* a plant in the front corner */}
      <Cyl at={[30, 228, 0]} r={12} len={20} axis="z" color="#c98a5c" />
      <Box at={[22, 220, 20]} size={[16, 16, 22]} color={iso.leaf} />
    </IsoStage>
  )
}
