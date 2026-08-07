"use client";

const writingAreaClass =
  "w-full min-h-56 rounded-xl border border-p-grey-10 bg-p-grey-10/35 px-5 py-5 text-sm leading-[1.7] text-p-text outline-none placeholder:text-p-grey-50 focus:border-p-grey-50";

const fileInputClass =
  "text-sm text-p-grey-60 file:mr-4 file:rounded-lg file:border file:border-p-grey-10 file:bg-p-white file:px-4 file:py-2 file:text-sm file:text-p-grey-80 hover:file:bg-p-grey-10";

type SectionFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  imageUrl: string | null;
  onImageChange: (url: string | null) => void;
  onUpload: (file: File) => Promise<void>;
  uploading: boolean;
  placeholder: string;
};

export function SectionField({
  label,
  value,
  onChange,
  imageUrl,
  onImageChange,
  onUpload,
  uploading,
  placeholder,
}: SectionFieldProps) {
  return (
    <section className="flex flex-col gap-3">
      <label className="text-[11px] uppercase tracking-[0.12em] text-p-grey-50">
        {label}
      </label>

      {imageUrl ? (
        <div className="overflow-hidden rounded-2xl border border-p-grey-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={`${label} preview`}
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
      ) : null}

      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void onUpload(file);
          event.target.value = "";
        }}
        className={fileInputClass}
      />

      {imageUrl ? (
        <button
          type="button"
          disabled={uploading}
          onClick={() => onImageChange(null)}
          className="w-fit text-xs text-p-grey-60 hover:text-p-text disabled:opacity-40"
        >
          Remove image
        </button>
      ) : null}

      {uploading ? (
        <p className="text-xs text-p-grey-50">Uploading image…</p>
      ) : null}

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={writingAreaClass}
        placeholder={placeholder}
      />
    </section>
  );
}
