export interface HotspotDef {
  id: string;
  label: string;
  title: string;
  description: string;
  partIds: string[];
  icon: 'display' | 'camera' | 'frame' | 'logo';
}

export const HOTSPOTS: HotspotDef[] = [
  {
    id: 'display',
    label: 'Display',
    title: 'ProMotion LTPO OLED',
    description:
      'A 120Hz adaptive refresh rate display, dynamically tuned from 1Hz to 120Hz by the Always-On pipeline.',
    partIds: ['part_9', 'part_1', 'part_6'],
    icon: 'display',
  },
  {
    id: 'camera',
    label: 'Camera System',
    title: 'Pro Camera Array',
    description:
      'A triple-lens system fused with the Neural Engine for real-time computational photography, Smart HDR and Deep Fusion.',
    partIds: ['part_5', 'part_7', 'part_8', 'part_11', 'part_15', 'part_16', 'part_17', 'part_18'],
    icon: 'camera',
  },
  {
    id: 'frame',
    label: 'Titanium Frame',
    title: 'Grade 5 Titanium',
    description:
      'Aerospace-grade titanium alloy chassis — stronger than steel yet lighter, dissipating heat through the graphite layer beneath.',
    partIds: ['part_2', 'part_3', 'part_4', 'part_10'],
    icon: 'frame',
  },
  {
    id: 'logo',
    label: 'MagSafe',
    title: 'MagSafe & Wireless',
    description:
      'The circular magnet array centers power transfer, while the Qi2 coil and the A18 Pro PMIC negotiate 25W wireless charging.',
    partIds: ['part_14', 'part_12', 'part_13'],
    icon: 'logo',
  },
];
