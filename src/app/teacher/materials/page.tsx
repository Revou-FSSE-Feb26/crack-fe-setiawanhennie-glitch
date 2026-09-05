"use client";

import { useEffect, useState } from "react";
import { Plus, ChevronDown, ChevronUp, BookOpen, X, Pencil, Trash2, FileUp } from "lucide-react";
import {
  fetchTeacherMaterials,
  createCourse,
  createLesson,
  extractDocument,
  fetchLesson,
  updateLesson,
  deleteLesson,
} from "@/lib/auth-client";

const EMOJIS = ["🔢", "", "📚", "🌍", "🎨", "", "🎵", "⚽"];
const COLORS = [
  "bg-blue-500/10",
  "bg-emerald-500/10",
  "bg-orange-500/10",
  "bg-purple-500/10",
  "bg-rose-500/10",
  "bg-amber-500/10",
];

export default function TeacherMaterialsPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Create modal state
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"course" | "lesson">("course");
  const [saving, setSaving] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [error, setError] = useState("");
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    emoji: "📚",
    color: COLORS[0],
  });
  const [lessonForm, setLessonForm] = useState({ courseId: "", title: "", content: "" });

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [editForm, setEditForm] = useState({ id: "", title: "", content: "" });

  const load = () => fetchTeacherMaterials().then(setCourses).catch(console.error);

  useEffect(() => {
    load();
  }, []);

  /* ---------- Create ---------- */
  const handleSubmit = async () => {
    setSaving(true);
    setError("");
    try {
      if (mode === "course") {
        if (!courseForm.title.trim() || !courseForm.description.trim()) {
          throw new Error("Judul dan deskripsi wajib diisi");
        }
        await createCourse(courseForm);
        setCourseForm({ title: "", description: "", emoji: "📚", color: COLORS[0] });
      } else {
        if (!lessonForm.courseId || !lessonForm.title.trim() || !lessonForm.content.trim()) {
          throw new Error("Semua field wajib diisi");
        }
        await createLesson(lessonForm.courseId, {
          title: lessonForm.title,
          content: lessonForm.content,
        });
        setLessonForm({ courseId: "", title: "", content: "" });
      }
      await load();
      setOpen(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  /* ---------- Document upload ---------- */
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setExtracting(true);
    setError("");
    try {
      const { text } = await extractDocument(file);
      setLessonForm((prev) => ({
        ...prev,
        content: text,
        title: prev.title || file.name.replace(/\.[^.]+$/, ""),
      }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setExtracting(false);
      e.target.value = "";
    }
  };

  /* ---------- Edit / Delete ---------- */
  const openLesson = async (id: string) => {
    setEditOpen(true);
    setEditLoading(true);
    setEditError("");
    try {
      const lesson = await fetchLesson(id);
      setEditForm({ id: lesson.id, title: lesson.title, content: lesson.content });
    } catch (e: any) {
      setEditError(e.message);
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditSave = async () => {
    if (!editForm.title.trim() || !editForm.content.trim()) {
      setEditError("Judul dan isi wajib diisi");
      return;
    }
    setEditSaving(true);
    setEditError("");
    try {
      await updateLesson(editForm.id, { title: editForm.title, content: editForm.content });
      setEditOpen(false);
      await load();
    } catch (e: any) {
      setEditError(e.message);
    } finally {
      setEditSaving(false);
    }
  };

  const handleEditDelete = async () => {
    if (!window.confirm("Hapus pelajaran ini? Tindakan tidak dapat dibatalkan.")) return;
    setEditSaving(true);
    try {
      await deleteLesson(editForm.id);
      setEditOpen(false);
      await load();
    } catch (e: any) {
      setEditError(e.message);
    } finally {
      setEditSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-extrabold">Materi & Kuis</h1>
          <p className="text-muted-foreground mt-1">Kelola materi pelajaran dan kuis Anda</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Buat Materi
        </button>
      </div>

      {/* Course grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="rounded-xl bg-card p-6 shadow-sm ring-1 ring-border">
            <div className="flex items-center justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${course.color}`}>
                {course.emoji}
              </div>
              <button
                onClick={() => setExpanded(expanded === course.id ? null : course.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                {expanded === course.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            <p className="mt-3 font-heading text-lg font-extrabold">{course.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              {course.lessons.length} pelajaran
            </p>

            {expanded === course.id && (
              <div className="mt-4 space-y-1 border-t border-border pt-3">
                {course.lessons.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Belum ada pelajaran.</p>
                ) : (
                  course.lessons.map((l: any, i: number) => (
                    <button
                      key={l.id}
                      onClick={() => openLesson(l.id)}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted/50"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary">
                        {i + 1}
                      </span>
                      <span className="truncate font-medium">{l.title}</span>
                      <Pencil className="ml-auto h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ================= CREATE MODAL ================= */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-card p-6 shadow-xl ring-1 ring-border">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-extrabold">Buat Materi</h2>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mode tabs */}
            <div className="mb-5 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
              <button
                onClick={() => setMode("course")}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                  mode === "course" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Kursus Baru
              </button>
              <button
                onClick={() => setMode("lesson")}
                className={`rounded-lg px-4 py-2 text-sm font-bold transition-all ${
                  mode === "lesson" ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Pelajaran Baru
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm font-medium text-red-600">{error}</div>
            )}

            {mode === "course" ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Judul Kursus</label>
                  <input
                    type="text"
                    placeholder="Contoh: Matematika Dasar"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Deskripsi</label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan singkat tentang kursus ini..."
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Ikon</label>
                  <div className="flex flex-wrap gap-2">
                    {EMOJIS.map((e) => (
                      <button
                        key={e}
                        onClick={() => setCourseForm({ ...courseForm, emoji: e })}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl transition-all ${
                          courseForm.emoji === e ? "bg-primary/20 ring-2 ring-primary" : "bg-muted hover:bg-muted/70"
                        }`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Warna</label>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCourseForm({ ...courseForm, color: c })}
                        className={`h-8 w-8 rounded-full ${c} transition-all ${
                          courseForm.color === c ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : ""
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Kursus</label>
                  <select
                    value={lessonForm.courseId}
                    onChange={(e) => setLessonForm({ ...lessonForm, courseId: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">— Pilih kursus —</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.emoji} {c.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Judul Pelajaran</label>
                  <input
                    type="text"
                    placeholder="Contoh: Pengenalan Aljabar"
                    value={lessonForm.title}
                    onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">Isi Materi</label>
                  <textarea
                    rows={6}
                    placeholder="Tulis materi pelajaran di sini, atau unggah dokumen di bawah..."
                    value={lessonForm.content}
                    onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <label
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted ${
                        extracting ? "pointer-events-none opacity-60" : ""
                      }`}
                    >
                      <FileUp className="h-3.5 w-3.5" />
                      {extracting ? "Mengekstrak teks..." : "Unggah PDF / Word / TXT"}
                      <input
                        type="file"
                        accept=".pdf,.docx,.txt,.md"
                        className="hidden"
                        onChange={handleFile}
                        disabled={extracting}
                      />
                    </label>
                    <span className="text-xs text-muted-foreground">Teks diisi otomatis & tetap bisa diedit</span>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Batal
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving || extracting}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setEditOpen(false)} />
          <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-xl bg-card p-6 shadow-xl ring-1 ring-border">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-extrabold">Edit Pelajaran</h2>
              <button onClick={() => setEditOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {editError && (
              <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm font-medium text-red-600">{editError}</div>
            )}

            {editLoading ? (
              <p className="py-8 text-center text-sm text-muted-foreground">Memuat pelajaran...</p>
            ) : (
              <>
                <div className="space-y-4 overflow-y-auto">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">Judul Pelajaran</label>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">Isi Materi</label>
                    <textarea
                      rows={12}
                      value={editForm.content}
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    onClick={handleEditDelete}
                    disabled={editSaving}
                    className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditOpen(false)}
                      className="rounded-lg px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleEditSave}
                      disabled={editSaving}
                      className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                    >
                      {editSaving ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}