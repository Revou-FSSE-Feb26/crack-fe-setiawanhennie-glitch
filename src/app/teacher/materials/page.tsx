"use client";

import { useEffect, useState } from "react";
import { Plus, ChevronDown, ChevronUp, BookOpen, X, Pencil, Trash2, FileUp, Camera, Gamepad2, Heart, Timer } from "lucide-react";
import {
  fetchTeacherMaterials,
  createCourse,
  createLesson,
  extractDocument,
  fetchLesson,
  updateLesson,
  deleteLesson,
  uploadImage,
  createQuiz,
  fetchQuizzes,
  deleteQuiz,
} from "@/lib/auth-client";

const EMOJIS = ["🔢", "🔬", "📚", "🌍", "🎨", "💻", "🎵", "⚽"];
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
  const [uploadingImage, setUploadingImage] = useState(false);
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
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizSaving, setQuizSaving] = useState(false);
  const [quizError, setQuizError] = useState("");
  const [quizForm, setQuizForm] = useState({
    title: "",
    lessonId: "",
    timeLimit: "",
    lives: "3",
    xpReward: "50",
    questions: [{ type: "MULTIPLE_CHOICE", prompt: "", options: ["", "", "", ""], answer: "" }],
  });

  const loadQuizzes = () => fetchQuizzes().then(setQuizzes).catch(console.error);

  const updateQuestion = (i: number, patch: any) => {
    setQuizForm((prev) => ({
      ...prev,
      questions: prev.questions.map((q: any, idx: number) => (idx === i ? { ...q, ...patch } : q)),
    }));
  };

  const addQuestion = () => {
    setQuizForm((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { type: "MULTIPLE_CHOICE", prompt: "", options: ["", "", "", ""], answer: "" },
      ],
    }));
  };

  const removeQuestion = (i: number) => {
    setQuizForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((_: any, idx: number) => idx !== i),
    }));
  };

  const resetQuizForm = () =>
    setQuizForm({
      title: "",
      lessonId: "",
      timeLimit: "",
      lives: "3",
      xpReward: "50",
      questions: [{ type: "MULTIPLE_CHOICE", prompt: "", options: ["", "", "", ""], answer: "" }],
    });

  const handleQuizSubmit = async () => {
    setQuizSaving(true);
    setQuizError("");
    try {
      if (!quizForm.title.trim()) throw new Error("Judul kuis wajib diisi");
      await createQuiz({
        title: quizForm.title,
        lessonId: quizForm.lessonId || undefined,
        timeLimit: quizForm.timeLimit ? Number(quizForm.timeLimit) : null,
        lives: quizForm.lives ? Number(quizForm.lives) : null,
        xpReward: Number(quizForm.xpReward) || 50,
        questions: quizForm.questions.map((q: any) => ({
          type: q.type,
          prompt: q.prompt,
          options:
            q.type === "FILL_BLANK"
              ? []
              : q.type === "TRUE_FALSE"
              ? ["Benar", "Salah"]
              : q.options.filter((o: string) => o.trim()),
          answer: q.answer,
        })),
      });
      resetQuizForm();
      await loadQuizzes();
      setQuizOpen(false);
    } catch (e: any) {
      setQuizError(e.message);
    } finally {
      setQuizSaving(false);
    }
  };

  const handleQuizDelete = async (id: string) => {
    if (!window.confirm("Hapus kuis ini?")) return;
    try {
      await deleteQuiz(id);
      await loadQuizzes();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const load = () => fetchTeacherMaterials().then(setCourses).catch(console.error);

  useEffect(() => {
    load();
    loadQuizzes();
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

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>, target: "create" | "edit") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const { url } = await uploadImage(file);
      const markdown = `\n![${file.name.replace(/\.[^.]+$/, "")}](${url})\n`;
      if (target === "create") {
        setLessonForm((prev) => ({ ...prev, content: prev.content + markdown }));
      } else {
        setEditForm((prev) => ({ ...prev, content: prev.content + markdown }));
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploadingImage(false);
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
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
            Buat Materi
          </button>
          <button
            onClick={() => setQuizOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-purple-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:opacity-90"
          >
            <Gamepad2 className="h-4 w-4" />
            Buat Kuis
          </button>
        </div>
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

            {/* Quiz list */}
      <div className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 font-heading text-xl font-extrabold">
          <Gamepad2 className="h-5 w-5 text-primary" />
          Kuis ({quizzes.length})
        </h2>
        {quizzes.length === 0 ? (
          <div className="rounded-xl bg-card p-8 text-center ring-1 ring-border">
            <p className="text-sm text-muted-foreground">
              Belum ada kuis. Klik "Buat Kuis" untuk membuat kuis pertama Anda!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {quizzes.map((q) => (
              <div key={q.id} className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-heading text-base font-extrabold">{q.title}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {q.lesson ? `📖 ${q.lesson.title}` : "Tanpa pelajaran"} • {q._count.questions} pertanyaan
                    </p>
                  </div>
                  <button
                    onClick={() => handleQuizDelete(q.id)}
                    className="shrink-0 text-muted-foreground hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-purple-600">+{q.xpReward} XP</span>
                  {q.timeLimit && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-amber-600">
                      <Timer className="h-3 w-3" /> {q.timeLimit}s/soal
                    </span>
                  )}
                  {q.lives && (
                    <span className="flex items-center gap-1 rounded-full bg-rose-500/10 px-2.5 py-1 text-rose-600">
                      <Heart className="h-3 w-3" /> {q.lives} nyawa
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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

                    <label
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted ${
                        uploadingImage ? "pointer-events-none opacity-60" : ""
                      }`}
                    >
                      <Camera className="h-3.5 w-3.5" />
                      {uploadingImage ? "Mengunggah..." : "Sisipkan Gambar"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImage(e, "create")}
                        disabled={uploadingImage}
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
      
      {/* ================= QUIZ BUILDER MODAL ================= */}
      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setQuizOpen(false)} />
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-card p-6 shadow-xl ring-1 ring-border">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-extrabold">🎮 Buat Kuis</h2>
              <button onClick={() => setQuizOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {quizError && (
              <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm font-medium text-red-600">{quizError}</div>
            )}

            {/* Quiz settings */}
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold">Judul Kuis</label>
                <input
                  type="text"
                  placeholder="Contoh: Kuis Aljabar"
                  value={quizForm.title}
                  onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold">Pelajaran (opsional)</label>
                <select
                  value={quizForm.lessonId}
                  onChange={(e) => setQuizForm({ ...quizForm, lessonId: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">— Tidak terikat pelajaran —</option>
                  {courses.flatMap((c) =>
                    c.lessons.map((l: any) => (
                      <option key={l.id} value={l.id}>
                        {c.emoji} {c.title} • {l.title}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="mb-1.5 flex items-center gap-1 text-sm font-semibold">
                    <Timer className="h-3.5 w-3.5" /> Detik/Soal
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="Kosong = santai"
                    value={quizForm.timeLimit}
                    onChange={(e) => setQuizForm({ ...quizForm, timeLimit: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-1 text-sm font-semibold">
                    <Heart className="h-3.5 w-3.5" /> Nyawa
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="Kosong = ∞"
                    value={quizForm.lives}
                    onChange={(e) => setQuizForm({ ...quizForm, lives: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold">XP Reward</label>
                  <input
                    type="number"
                    min={0}
                    value={quizForm.xpReward}
                    onChange={(e) => setQuizForm({ ...quizForm, xpReward: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            {/* Questions */}
            <div className="mt-6 space-y-4">
              {quizForm.questions.map((q: any, i: number) => (
                <div key={i} className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold">Pertanyaan {i + 1}</span>
                    <div className="flex items-center gap-2">
                      <select
                        value={q.type}
                        onChange={(e) =>
                          updateQuestion(i, {
                            type: e.target.value,
                            options: e.target.value === "TRUE_FALSE" ? ["Benar", "Salah"] : ["", "", "", ""],
                            answer: "",
                          })
                        }
                        className="rounded-md border border-border bg-background px-2 py-1 text-xs"
                      >
                        <option value="MULTIPLE_CHOICE">Pilihan Ganda</option>
                        <option value="TRUE_FALSE">Benar / Salah</option>
                        <option value="FILL_BLANK">Isian Singkat</option>
                      </select>
                      {quizForm.questions.length > 1 && (
                        <button onClick={() => removeQuestion(i)} className="text-muted-foreground hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Tulis pertanyaan..."
                    value={q.prompt}
                    onChange={(e) => updateQuestion(i, { prompt: e.target.value })}
                    className="mb-3 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />

                  {q.type === "FILL_BLANK" ? (
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Jawaban benar</label>
                      <input
                        type="text"
                        placeholder="Contoh: Jakarta"
                        value={q.answer}
                        onChange={(e) => updateQuestion(i, { answer: e.target.value })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {(q.type === "TRUE_FALSE" ? ["Benar", "Salah"] : q.options).map((opt: string, oi: number) => (
                        <div key={oi} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${i}`}
                            checked={q.answer === opt && opt !== ""}
                            onChange={() => updateQuestion(i, { answer: opt })}
                            className="h-4 w-4 accent-primary"
                          />
                          {q.type === "TRUE_FALSE" ? (
                            <span className="text-sm">{opt}</span>
                          ) : (
                            <input
                              type="text"
                              placeholder={`Opsi ${oi + 1}`}
                              value={opt}
                              onChange={(e) => {
                                const newOptions = q.options.map((o: string, idx: number) =>
                                  idx === oi ? e.target.value : o
                                );
                                const newAnswer = q.answer === q.options[oi] ? e.target.value : q.answer;
                                updateQuestion(i, { options: newOptions, answer: newAnswer });
                              }}
                              className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                          )}
                        </div>
                      ))}
                      <p className="text-xs text-muted-foreground">Tandai radio = jawaban benar</p>
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={addQuestion}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Plus className="h-4 w-4" />
                Tambah Pertanyaan
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setQuizOpen(false)}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Batal
              </button>
              <button
                onClick={handleQuizSubmit}
                disabled={quizSaving}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {quizSaving ? "Menyimpan..." : "Simpan Kuis"}
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

                <div className="mt-2 flex items-center gap-2">
                  <label
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-muted ${
                      uploadingImage ? "pointer-events-none opacity-60" : ""
                    }`}
                  >
                    <Camera className="h-3.5 w-3.5" />
                    {uploadingImage ? "Mengunggah..." : "Sisipkan Gambar"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImage(e, "edit")}
                      disabled={uploadingImage}
                    />
                  </label>
                  <span className="text-xs text-muted-foreground">Gambar disisipkan ke isi materi</span>
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