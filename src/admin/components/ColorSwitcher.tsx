import { Check, Palette } from "lucide-react";
import { Dropdown } from "@/components/ui/Dropdown";
import { useTheme } from "@/theme/ThemeContext";

export function ColorSwitcher() {
  const { colorPreset, setColorPresetId, presets } = useTheme();

  return (
    <Dropdown
      panelClassName="right-0 w-64 p-3"
      trigger={({ toggle }) => (
        <button
          onClick={toggle}
          className="text-gray-secondary dark:text-gray-300 flex size-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700"
          aria-label="Switch theme color"
        >
          <Palette className="size-4.5" />
        </button>
      )}
    >
      {() => (
        <div>
          <p className="text-gray-primary dark:text-gray-100 mb-3 px-1 text-sm font-semibold">Theme Color</p>
          <div className="grid grid-cols-5 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setColorPresetId(preset.id)}
                className="group relative flex flex-col items-center gap-1"
                title={preset.name}
              >
                <span
                  className="flex size-9 items-center justify-center rounded-full ring-2 ring-transparent transition-all group-hover:ring-gray-300"
                  style={{ backgroundColor: preset.swatch }}
                >
                  {colorPreset.id === preset.id && <Check className="size-4 text-white" />}
                </span>
              </button>
            ))}
          </div>
          <p className="text-gray-tertiary mt-3 px-1 text-xs">{colorPreset.name} selected</p>
        </div>
      )}
    </Dropdown>
  );
}
