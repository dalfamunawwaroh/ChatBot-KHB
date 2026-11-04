import { useState } from "react";
import { Save, RotateCcw, User, Building2, Sparkles } from "lucide-react";
import { ADMIN_USER } from "../../data/admin";
import { CONTACT_INFO } from "../../data/content";
import { useAdmin } from "../AdminContext";

interface SettingsForm {
  name: string;
  email: string;
  phone: string;
  org: string;
  address: string;
  hours: string;
  language: string;
  tone: string;
  showSource: boolean;
  autoEscalate: boolean;
}

const INITIAL: SettingsForm = {
  name: ADMIN_USER.name,
  email: ADMIN_USER.email,
  phone: ADMIN_USER.phone,
  org: ADMIN_USER.org,
  address: CONTACT_INFO.officeAddress,
  hours: CONTACT_INFO.operatingHours,
  language: "Bahasa Indonesia",
  tone: "Ramah & ringkas",
  showSource: true,
  autoEscalate: true,
};

export default function Settings() {
  const { showToast } = useAdmin();
  const [form, setForm] = useState<SettingsForm>(INITIAL);
  const [saved, setSaved] = useState<SettingsForm>(INITIAL);

  const isDirty = JSON.stringify(form) !== JSON.stringify(saved);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSaved(form);
    showToast("Pengaturan disimpan");
  };

  const handleReset = () => {
    setForm(saved);
    showToast("Perubahan dibatalkan");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-[54rem]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-[1.5rem] font-extrabold text-[#06301f] tracking-[-0.02em] leading-tight">
            Pengaturan
          </h1>
          <p className="text-[0.86rem] text-[#10231a]/60 mt-1">
            Profil pengelola, informasi komunitas, dan perilaku asisten.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            disabled={!isDirty}
            className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-[rgba(22,163,74,0.2)] bg-white text-[#0b5c30] text-[0.8rem] font-semibold hover:bg-[#eaf6ee] transition-colors disabled:opacity-40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Batal
          </button>
          <button
            type="submit"
            disabled={!isDirty}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full text-white text-[0.8rem] font-semibold disabled:opacity-40"
            style={{ background: "linear-gradient(180deg, #16a34a 0%, #0f7a3d 100%)" }}
          >
            <Save className="w-3.5 h-3.5" />
            Simpan
          </button>
        </div>
      </div>

      <Section icon={<User className="w-4 h-4" />} title="Profil pengelola" desc="Data admin yang tampil pada panel.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Nama lengkap" id="set-name">
            <input
              id="set-name"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              className="input-base"
            />
          </Field>
          <Field label="Email" id="set-email">
            <input
              id="set-email"
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="input-base"
            />
          </Field>
          <Field label="Nomor WhatsApp" id="set-phone">
            <input
              id="set-phone"
              value={form.phone}
              onChange={(event) => setForm({ ...form, phone: event.target.value })}
              className="input-base"
            />
          </Field>
          <Field label="Peran" id="set-role">
            <input id="set-role" value={ADMIN_USER.role} disabled className="input-base bg-[#f6fbf7] text-[#10231a]/50" />
          </Field>
        </div>
      </Section>

      <Section icon={<Building2 className="w-4 h-4" />} title="Informasi komunitas" desc="Dipakai pada halaman kontak dan footer situs.">
        <div className="space-y-3">
          <Field label="Nama organisasi" id="set-org">
            <input
              id="set-org"
              value={form.org}
              onChange={(event) => setForm({ ...form, org: event.target.value })}
              className="input-base"
            />
          </Field>
          <Field label="Alamat sekretariat" id="set-address">
            <input
              id="set-address"
              value={form.address}
              onChange={(event) => setForm({ ...form, address: event.target.value })}
              className="input-base"
            />
          </Field>
          <Field label="Jam layanan" id="set-hours">
            <input
              id="set-hours"
              value={form.hours}
              onChange={(event) => setForm({ ...form, hours: event.target.value })}
              className="input-base"
            />
          </Field>
        </div>
      </Section>

      <Section icon={<Sparkles className="w-4 h-4" />} title="Perilaku asisten" desc="Nada jawaban dan aturan eskalasi.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Bahasa" id="set-language">
            <select
              id="set-language"
              value={form.language}
              onChange={(event) => setForm({ ...form, language: event.target.value })}
              className="input-base"
            >
              <option>Bahasa Indonesia</option>
              <option>Bahasa Indonesia + istilah Arab</option>
              <option>Bahasa Sunda (percakapan)</option>
            </select>
          </Field>
          <Field label="Gaya jawaban" id="set-tone">
            <select
              id="set-tone"
              value={form.tone}
              onChange={(event) => setForm({ ...form, tone: event.target.value })}
              className="input-base"
            >
              <option>Ramah &amp; ringkas</option>
              <option>Formal &amp; rinci</option>
              <option>Sangat ringkas (poin)</option>
            </select>
          </Field>
        </div>

        <div className="mt-3 space-y-2">
          <Toggle
            label="Selalu tampilkan sumber dokumen"
            desc="Setiap jawaban menyertakan nama dokumen dan halaman rujukan."
            checked={form.showSource}
            onChange={(value) => setForm({ ...form, showSource: value })}
          />
          <Toggle
            label="Eskalasi otomatis ke Pendamping PPH"
            desc="Pertanyaan di luar basis pengetahuan langsung diteruskan ke pendamping."
            checked={form.autoEscalate}
            onChange={(value) => setForm({ ...form, autoEscalate: value })}
          />
        </div>
      </Section>

      <p className="text-[0.72rem] text-[#10231a]/45 leading-relaxed">
        Prototipe: perubahan hanya tersimpan selama halaman dibuka (belum ada backend).
      </p>
    </form>
  );
}

function Section({
  icon,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="card-elevated rounded-[1.1rem] p-4 sm:p-5">
      <div className="flex items-start gap-2.5 mb-4">
        <span className="w-8 h-8 rounded-lg bg-[#eaf6ee] border border-[rgba(22,163,74,0.16)] text-[#0f7a3d] flex items-center justify-center shrink-0">
          {icon}
        </span>
        <div>
          <h2 className="text-[0.95rem] font-bold text-[#06301f]">{title}</h2>
          <p className="text-[0.76rem] text-[#10231a]/50 mt-0.5">{desc}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[0.7rem] font-bold uppercase tracking-wider text-[#0b5c30] mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border border-[rgba(22,163,74,0.14)] bg-[#f6fbf7]/60 px-3 py-2.5">
      <div className="min-w-0">
        <div className="text-[0.82rem] font-semibold text-[#06301f]">{label}</div>
        <div className="text-[0.72rem] text-[#10231a]/50 leading-snug">{desc}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5.5 rounded-full shrink-0 transition-colors ${checked ? "bg-[#16a34a]" : "bg-[#d6ecdd]"}`}
        style={{ height: "1.375rem" }}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
            checked ? "left-[1.375rem]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}
