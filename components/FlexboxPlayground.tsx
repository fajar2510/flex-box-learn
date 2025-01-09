'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

interface FlexboxSettings {
  justifyContent: string;
  alignItems: string;
  alignContent: string;
  flexDirection: FlexDirection;
  flexWrap: FlexWrap;
}

const defaultSettings: FlexboxSettings = {
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  alignContent: 'flex-start',
  flexDirection: 'row',
  flexWrap: 'nowrap',
};

const descriptions = {
  justifyContent: {
    'flex-start': 'Mengatur item di awal container',
    'flex-end': 'Mengatur item di akhir container',
    'center': 'Mengatur item di tengah container',
    'space-between': 'Memberi jarak yang sama antar item',
    'space-around': 'Memberi jarak yang sama di sekitar item',
    'space-evenly': 'Memberi jarak yang persis sama antar item'
  },
  alignItems: {
    'flex-start': 'Mengatur item di bagian atas',
    'flex-end': 'Mengatur item di bagian bawah',
    'center': 'Mengatur item di tengah secara vertikal',
    'stretch': 'Meregangkan item memenuhi container',
    'baseline': 'Menyejajarkan item berdasarkan baseline teks'
  },
  alignContent: {
    'flex-start': 'Mengatur baris di bagian atas',
    'flex-end': 'Mengatur baris di bagian bawah',
    'center': 'Mengatur baris di tengah',
    'stretch': 'Meregangkan baris memenuhi container',
    'space-between': 'Memberi jarak yang sama antar baris',
    'space-around': 'Memberi jarak yang sama di sekitar baris'
  },
  flexDirection: {
    'row': 'Mengatur item secara horizontal (kiri ke kanan)',
    'row-reverse': 'Mengatur item secara horizontal terbalik (kanan ke kiri)',
    'column': 'Mengatur item secara vertikal (atas ke bawah)',
    'column-reverse': 'Mengatur item secara vertikal terbalik (bawah ke atas)'
  },
  flexWrap: {
    'nowrap': 'Item tetap dalam satu baris',
    'wrap': 'Item pindah ke baris baru jika tidak cukup ruang',
    'wrap-reverse': 'Item pindah ke baris baru dengan urutan terbalik'
  }
};

export default function FlexboxPlayground() {
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<FlexboxSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('flexboxSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('flexboxSettings', JSON.stringify(settings));
    }
  }, [settings, mounted]);

  const boxes = Array.from({ length: 6 }, (_, i) => i + 1);

  if (!mounted) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-3">
      <div className="space-y-8">

        {/* Kotak Flex Box Interaktif */}
        <Card className="p-8 bg-white">
          <div
            className="flex border-4 border-dashed border-indigo-200 min-h-[400px] rounded-lg transition-all duration-300 p-4"
            style={{
              justifyContent: settings.justifyContent,
              alignItems: settings.alignItems,
              alignContent: settings.alignContent,
              flexDirection: settings.flexDirection,
              flexWrap: settings.flexWrap,
            }}
            >
            {boxes.map((num) => (
              <motion.div
                key={num}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center w-20 h-20 m-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg text-white font-bold shadow-lg"
              >
                {num}
              </motion.div>
            ))}
          </div>
        </Card>

      </div>

      {/* Menu bagian Combo Box interaktif */}
      <div className="sticky top-4 h-fit">
            <div className="justify-content items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <Card className="p-4 ">
                <h3 className="font-semibold mb-2 text-sm ">Justify Content</h3>
                <Select
                  value={settings.justifyContent}
                  onValueChange={(value) =>
                    setSettings((prev) => ({ ...prev, justifyContent: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <p className="text-sm text-gray-600 mt-2">{descriptions.justifyContent[settings.justifyContent as keyof typeof descriptions.justifyContent]}</p> */}
              </Card>
    
              <Card className="p-4">
                <h3 className="font-semibold mb-2 text-sm">Align Items</h3>
                <Select
                  value={settings.alignItems}
                  onValueChange={(value) =>
                    setSettings((prev) => ({ ...prev, alignItems: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['flex-start', 'flex-end', 'center', 'stretch', 'baseline'].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <p className="text-sm text-gray-600 mt-2">{descriptions.alignItems[settings.alignItems as keyof typeof descriptions.alignItems]}</p> */}
              </Card>
    
              <Card className="p-4">
                <h3 className="font-semibold mb-2 text-sm">Align Content</h3>
                <Select
                  value={settings.alignContent}
                  onValueChange={(value) =>
                    setSettings((prev) => ({ ...prev, alignContent: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['flex-start', 'flex-end', 'center', 'stretch', 'space-between', 'space-around'].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <p className="text-sm text-gray-600 mt-2">{descriptions.alignContent[settings.alignContent as keyof typeof descriptions.alignContent]}</p> */}
              </Card>
    
              <Card className="p-4">
                <h3 className="font-semibold mb-2 text-sm">Flex Direction</h3>
                <Select
                  value={settings.flexDirection}
                  onValueChange={(value) =>
                    setSettings((prev) => ({ ...prev, flexDirection: value as FlexDirection }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['row', 'row-reverse', 'column', 'column-reverse'].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <p className="text-sm text-gray-600 mt-2">{descriptions.flexDirection[settings.flexDirection as keyof typeof descriptions.flexDirection]}</p> */}
              </Card>
    
              <Card className="p-4">
                <h3 className="font-semibold mb-2 text-sm">Flex Wrap</h3>
                <Select
                  value={settings.flexWrap}
                  onValueChange={(value) =>
                    setSettings((prev) => ({ ...prev, flexWrap: value as FlexWrap }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {['nowrap', 'wrap', 'wrap-reverse'].map((value) => (
                      <SelectItem key={value} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {/* <p className="text-sm text-gray-600 mt-2">{descriptions.flexWrap[settings.flexWrap as keyof typeof descriptions.flexWrap]}</p> */}
              </Card>
          
            </div>
          
            {/* CSS saat ini */}
            <Card className="p-6 mt-3">
              <h2 className="text-xl font-bold mb-4">CSS Saat Ini</h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap break-words">
              {`.container {
                display: flex;
                justify-content: ${settings.justifyContent};
                align-items: ${settings.alignItems};
                align-content: ${settings.alignContent};
                flex-direction: ${settings.flexDirection};
                flex-wrap: ${settings.flexWrap};
              }`}
            </pre>

            </Card>
      </div>
    </div>
  );
}