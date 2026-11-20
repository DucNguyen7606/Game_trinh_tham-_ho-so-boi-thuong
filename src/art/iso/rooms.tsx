import type { PortraitSpec } from '@/art/Portrait'
import { BackWalls, Box, Cyl, Face, IsoStage, Slab, WallText, iso } from './iso'
import { IsoFigure } from './figure'
import { Book, Cup } from './props'

/**
 * The interview room as a diorama: the person questioned sits at the table,
 * facing the camera side; the investigator's notebook, recorder and coffee
 * are on the near side of the table.
 */
export function InterviewRoom({ spec, talking, label }: { spec: PortraitSpec; talking: boolean; label: string }) {
  return (
    <IsoStage label={label} origin={[780, 250]} scale={2.15} sky={['#cfc8ea', '#f6dccb']}>
      <Slab w={260} d={250} floor="#e2d3c6" depth={22} />
      {/* rug */}
      <Face points={[[40, 50, 0.3], [230, 50, 0.3], [230, 220, 0.3], [40, 220, 0.3]]} fill="#d7b9b0" />
      <BackWalls w={260} d={250} h={125} left="#cbbfe0" right="#ddd0e6" edge="#9a8fb0" t={7} />
      {/* window with blinds on the right wall */}
      <Face points={[[120, 0.5, 50], [220, 0.5, 50], [220, 0.5, 112], [120, 0.5, 112]]} fill="#eef5f8" />
      {[58, 70, 82, 94].map((z) => (
        <Face key={z} points={[[120, 0.8, z], [220, 0.8, z], [220, 0.8, z + 3], [120, 0.8, z + 3]]} fill="#c9d6de" />
      ))}
      {/* wall clock and company sign on the left wall */}
      <Face points={[[0.5, 150, 80], [0.5, 178, 80], [0.5, 178, 108], [0.5, 150, 108]]} fill="#fffaf0" />
      <Face points={[[0.8, 163, 93], [0.8, 165, 93], [0.8, 165, 104], [0.8, 163, 104]]} fill={iso.ink} />
      <Face points={[[0.5, 50, 84], [0.5, 130, 84], [0.5, 130, 106], [0.5, 50, 106]]} fill={iso.blue} />
      <WallText at={[1, 90, 91]} plane="L" text="BẢO HIỂM AN TÍN" size={13} />
      {/* filing shelf in the back corner */}
      <Box at={[10, 10, 0]} size={[30, 40, 90]} color="#b7a9cf" />
      <Box at={[22, 12, 90]} size={[18, 8, 18]} color={iso.coral} />
      <Box at={[22, 22, 90]} size={[18, 8, 15]} color={iso.gold} />
      <Box at={[22, 32, 90]} size={[18, 8, 18]} color={iso.blue} />
      {/* the person questioned, seated, facing +x towards the table */}
      <Box at={[50, 106, 0]} size={[46, 46, 24]} color="#6c6787" />
      <Box at={[44, 106, 24]} size={[8, 46, 40]} color="#6c6787" />
      <IsoFigure at={[56, 114, 0]} spec={spec} facing="x" pose="sit" size={1} talking={talking} />
      {/* the table */}
      <Box at={[110, 85, 0]} size={[8, 8, 50]} color={iso.woodDark} />
      <Box at={[110, 175, 0]} size={[8, 8, 50]} color={iso.woodDark} />
      <Box at={[192, 85, 0]} size={[8, 8, 50]} color={iso.woodDark} />
      <Box at={[192, 175, 0]} size={[8, 8, 50]} color={iso.woodDark} />
      <Box at={[104, 80, 50]} size={[102, 108, 6]} color="#b8927a" />
      {/* recorder, notebook, coffee, desk lamp */}
      <Box at={[124, 160, 56]} size={[22, 14, 7]} color={iso.ink} />
      <Box at={[128, 173.6, 59]} size={[6, 1, 2]} color={iso.coral} />
      <Book at={[150, 110, 56]} color={iso.coral} />
      <Cup at={[184, 166, 56]} fill="#7b5236" />
      <Box at={[180, 92, 56]} size={[16, 16, 3]} color={iso.ink} />
      <Box at={[187, 99, 59]} size={[2.5, 2.5, 34]} color={iso.ink} />
      <Cyl at={[188, 100, 86]} r={9} len={10} axis="z" color={iso.gold} cap="#fff1c2" />
      {/* the investigator's empty chair on the near side */}
      <Box at={[222, 115, 0]} size={[40, 40, 24]} color="#7e9cb5" />
      <Box at={[254, 115, 24]} size={[8, 40, 40]} color="#7e9cb5" />
      {/* a plant in the front corner */}
      <Cyl at={[40, 225, 0]} r={12} len={20} axis="z" color="#c98a5c" />
      <Box at={[32, 217, 20]} size={[16, 16, 22]} color={iso.leaf} />
    </IsoStage>
  )
}
