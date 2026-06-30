import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckSquare,
  Clock3,
  Target,
  StickyNote,
  PlayCircle,
  RotateCcw,
  ExternalLink,
} from "lucide-react";
import { start, pause, reset, tick } from "../../Stores/pomodoroSlice";

const resourcesFallback = [
  {
    id: 1,
    title: "MDN Web Docs",
    category: "Documentation",
    link: "https://developer.mozilla.org",
  },
  {
    id: 2,
    title: "freeCodeCamp",
    category: "Learning",
    link: "https://www.freecodecamp.org",
  },
  {
    id: 3,
    title: "React Docs",
    category: "Framework",
    link: "https://react.dev",
  },
];

function Card({ title, action, children, className = "" }) {
  return (
    <div className={`min-w-0 rounded-3xl border border-slate-100 bg-white shadow-sm ${className}`}>
      <div className="flex items-center justify-between px-4 pb-3 pt-4 md:px-5 md:pt-5">
        <h3 className="text-base font-semibold text-slate-900 md:text-lg">{title}</h3>
        {action}
      </div>
      <div className="px-4 pb-4 md:px-5 md:pb-5">{children}</div>
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
        style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
      />
    </div>
  );
}

function HabitDots({ done = 0, total = 7 }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-3 w-3 rounded-full ${i < done ? "bg-green-500" : "bg-slate-200"}`}
        />
      ))}
    </div>
  );
}

function formatTime(seconds = 0) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function getLastNDates(days) {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - index));
    return date.toISOString().split("T")[0];
  });
}

function getDayShort(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", { weekday: "short" });
}

export default function Dashboard() {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks || []);
  const notes = useSelector((state) => state.notes?.notes || []);
  const habits = useSelector((state) => state.habits?.habits || []);
  const pomodoro = useSelector((state) => state.pomodoro || {});
  const goals = useSelector((state) => state.goals?.items || []);

  useEffect(() => {
    if (!pomodoro.isRunning) return;

    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(interval);
  }, [pomodoro.isRunning, dispatch]);

  const weekDates = useMemo(() => getLastNDates(7), []);

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  const activeGoals = useMemo(
    () => goals.filter((goal) => !goal.completed).length,
    [goals]
  );

  const habitSummary = useMemo(() => {
    return habits.map((habit) => {
      const weeklyDone = weekDates.filter((date) =>
        habit.completedDates?.includes(date)
      ).length;

      return {
        id: habit.id,
        title: habit.title,
        done: weeklyDone,
        score: Math.round((weeklyDone / 7) * 100),
      };
    });
  }, [habits, weekDates]);

  const studyData = useMemo(() => {
    return weekDates.map((date) => {
      const hours = habits.reduce((sum, habit) => {
        return sum + (habit.completedDates?.includes(date) ? 1 : 0);
      }, 0);

      return {
        day: getDayShort(date),
        hours,
      };
    });
  }, [habits, weekDates]);

  const totalStudyHours = useMemo(
    () => studyData.reduce((sum, item) => sum + item.hours, 0),
    [studyData]
  );

  const streakDays = useMemo(() => {
    let streak = 0;
    for (let i = weekDates.length - 1; i >= 0; i--) {
      const hasCompletion = habits.some((habit) =>
        habit.completedDates?.includes(weekDates[i])
      );
      if (hasCompletion) streak++;
      else break;
    }
    return streak;
  }, [habits, weekDates]);

  const goalSummary = useMemo(() => {
    return goals.slice(0, 5).map((goal) => ({
      ...goal,
      progress:
        goal.targetValue > 0
          ? Math.round((goal.currentProgress / goal.targetValue) * 100)
          : 0,
    }));
  }, [goals]);

  const totalHabitCompletions = useMemo(
    () =>
      habits.reduce(
        (sum, habit) => sum + (habit.completedDates?.length || 0),
        0
      ),
    [habits]
  );

  const productivityScore = useMemo(() => {
    if (tasks.length + habits.length === 0) return 0;
    const activeHabitCount = habitSummary.filter((habit) => habit.done > 0).length;
    return Math.round(
      ((completedTasks + activeHabitCount) / (tasks.length + habits.length)) * 100
    );
  }, [tasks, habits, habitSummary, completedTasks]);

  const badges = useMemo(() => {
    const list = [];

    if (streakDays >= 7) {
      list.push({ title: "7 Day Streak", subtitle: "Consistency is building", icon: "🔥" });
    }
    if (completedTasks >= 10) {
      list.push({ title: "Task Starter", subtitle: "10+ tasks completed", icon: "🎯" });
    }
    if (completedTasks >= 50) {
      list.push({ title: "Task Master", subtitle: "50+ tasks completed", icon: "🧠" });
    }
    if (totalHabitCompletions >= 20) {
      list.push({ title: "Habit Builder", subtitle: "20+ habits completed", icon: "🏗️" });
    }
    if (productivityScore >= 80) {
      list.push({ title: "High Performer", subtitle: "80%+ productivity", icon: "🚀" });
    }

    return list.slice(0, 4);
  }, [streakDays, completedTasks, totalHabitCompletions, productivityScore]);

  const pomodoroProgress = useMemo(() => {
    const total =
      pomodoro.mode === "shortBreak"
        ? 5 * 60
        : pomodoro.mode === "longBreak"
        ? 15 * 60
        : 25 * 60;

    return Math.round(((total - (pomodoro.timeLeft || total)) / total) * 100);
  }, [pomodoro.mode, pomodoro.timeLeft]);

  const pomodoroLabel =
    pomodoro.mode === "shortBreak"
      ? "Short Break"
      : pomodoro.mode === "longBreak"
      ? "Long Break"
      : "Focus Time";

  const recentTasks = tasks.slice(0, 5);
  const recentNotes = notes.slice(0, 4);
  const recentResources = resourcesFallback.slice(0, 3);

  return (
    <div className="w-full bg-[#f6f8fc]">
      <div className="w-full px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_340px]">
          <section className="min-w-0 space-y-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Welcome back! 👋
              </h1>
              <p className="text-sm text-slate-500">
                Your dashboard is now using existing app data.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
              {[
                {
                  title: "Total Tasks",
                  value: tasks.length,
                  subtitle: `${Math.max(tasks.length - completedTasks, 0)} pending`,
                  color: "bg-purple-100 text-purple-600",
                  icon: <CheckSquare size={22} />,
                },
                {
                  title: "Completed Tasks",
                  value: completedTasks,
                  subtitle: "From task data",
                  color: "bg-green-100 text-green-600",
                  icon: <CheckSquare size={22} />,
                },
                {
                  title: "Total Notes",
                  value: notes.length,
                  subtitle: "Saved notes",
                  color: "bg-blue-100 text-blue-600",
                  icon: <StickyNote size={22} />,
                },
                {
                  title: "Study Hours",
                  value: totalStudyHours,
                  subtitle: "Last 7 days",
                  color: "bg-yellow-100 text-yellow-600",
                  icon: <Clock3 size={22} />,
                },
                {
                  title: "Active Goals",
                  value: activeGoals,
                  subtitle: "In progress",
                  color: "bg-pink-100 text-pink-600",
                  icon: <Target size={22} />,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="min-w-0 rounded-3xl border border-slate-100 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.color}`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm text-slate-500">{item.title}</p>
                      <p className="mt-1 text-3xl font-bold leading-none">{item.value}</p>
                      <p className="mt-2 text-xs text-slate-400">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              <Card
                title="Today's Tasks"
                action={<button className="text-sm font-medium text-sky-500">View All</button>}
              >
                <div className="space-y-3">
                  {recentTasks.length ? (
                    recentTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex flex-col gap-3 rounded-2xl border border-slate-100 px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            readOnly
                            className="h-4 w-4 shrink-0 rounded border-slate-300 accent-violet-600"
                          />
                          <span className="truncate text-sm font-medium text-slate-700">
                            {task.text}
                          </span>
                        </div>
                        <span
                          className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${
                            task.completed
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {task.completed ? "Done" : "Pending"}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No tasks available.</p>
                  )}
                </div>
              </Card>

              <Card
                title="Study Overview"
                action={
                  <button className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm text-slate-600">
                    This Week
                  </button>
                }
              >
                <div className="overflow-x-auto pt-2">
                  <div className="flex h-64 min-w-[420px] items-end justify-between gap-4">
                    {studyData.map((item) => (
                      <div
                        key={item.day}
                        className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                      >
                        <div className="flex h-full w-full items-end justify-center">
                          <div
                            className="w-full max-w-[38px] rounded-t-2xl bg-gradient-to-t from-violet-600 to-purple-400"
                            style={{ height: `${Math.max(item.hours * 20, 8)}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card
                title="Recent Notes"
                action={<button className="text-sm font-medium text-sky-500">View All</button>}
              >
                <div className="space-y-3">
                  {recentNotes.length ? (
                    recentNotes.map((note) => (
                      <div
                        key={note.id}
                        className="flex flex-col gap-3 rounded-2xl border border-slate-100 px-3 py-3"
                      >
                        <p className="truncate text-sm font-medium text-slate-700">
                          {note.title || "Untitled Note"}
                        </p>
                        <p className="line-clamp-2 text-xs text-slate-400">
                          {note.content || note.description || "No content"}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No notes available.</p>
                  )}
                </div>
              </Card>

              <Card
                title="Goals"
                action={<button className="text-sm font-medium text-sky-500">View All</button>}
              >
                <div className="space-y-5">
                  {goalSummary.length ? (
                    goalSummary.map((goal) => (
                      <div key={goal.id}>
                        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                          <span className="min-w-0 truncate font-medium text-slate-700">
                            {goal.title}
                          </span>
                          <span className="shrink-0 text-slate-500">{goal.progress}%</span>
                        </div>
                        <ProgressBar value={goal.progress} />
                        <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                          <span>{goal.category}</span>
                          <span>{goal.deadline}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No goals available.</p>
                  )}
                </div>
              </Card>

              <Card
                title="Resources"
                action={<button className="text-sm font-medium text-sky-500">View All</button>}
              >
                <div className="space-y-3">
                  {recentResources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-slate-100 px-3 py-3 transition hover:bg-slate-50"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-700">
                          {resource.title}
                        </p>
                        <p className="truncate text-xs text-slate-400">
                          {resource.category}
                        </p>
                      </div>
                      <ExternalLink size={16} className="shrink-0 text-slate-400" />
                    </a>
                  ))}
                </div>
              </Card>

              <Card
                title="Achievements"
                action={<button className="text-sm font-medium text-sky-500">View All</button>}
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {badges.length ? (
                    badges.map((badge, index) => (
                      <div
                        key={`${badge.title}-${index}`}
                        className="rounded-3xl border border-slate-100 p-4 text-center"
                      >
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-500 text-2xl text-white shadow-md">
                          {badge.icon}
                        </div>
                        <p className="mt-3 text-sm font-semibold text-slate-800">
                          {badge.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {badge.subtitle}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400">No badges yet. Keep going 🚀</p>
                  )}
                </div>
              </Card>
            </div>
          </section>

          <aside className="self-start space-y-6 2xl:sticky 2xl:top-8">
            <Card title="Pomodoro Timer">
              <div className="flex flex-col items-center">
                <div className="relative mt-2 flex h-48 w-48 items-center justify-center md:h-52 md:w-52">
                  <div className="absolute inset-0 rounded-full border-[10px] border-slate-100" />
                  <div className="absolute inset-0 rounded-full">
                    <div
                      className="h-full w-full rounded-full"
                      style={{
                        background: `conic-gradient(#7c3aed 0 ${pomodoroProgress}%, #e5e7eb ${pomodoroProgress}% 100%)`,
                        WebkitMask:
                          "radial-gradient(farthest-side, transparent calc(100% - 10px), #000 0)",
                        mask:
                          "radial-gradient(farthest-side, transparent calc(100% - 10px), #000 0)",
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold tracking-tight md:text-5xl">
                      {formatTime(pomodoro.timeLeft || 0)}
                    </p>
                    <p className="mt-2 text-sm text-slate-500">{pomodoroLabel}</p>
                  </div>
                </div>

                <div className="mt-6 grid w-full grid-cols-2 gap-3">
                  <button
                    onClick={() => dispatch(pomodoro.isRunning ? pause() : start())}
                    className="rounded-2xl bg-gradient-to-r from-violet-600 to-purple-500 px-4 py-3 font-medium text-white shadow-md"
                  >
                    <span className="inline-flex items-center gap-2">
                      <PlayCircle size={18} />
                      {pomodoro.isRunning ? "Pause" : "Start"}
                    </span>
                  </button>

                  <button
                    onClick={() => dispatch(reset())}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-600"
                  >
                    <span className="inline-flex items-center gap-2">
                      <RotateCcw size={18} />
                      Reset
                    </span>
                  </button>
                </div>

                <p className="mt-4 text-center text-sm text-slate-400">
                  Sessions: {pomodoro.sessionsCompleted || 0} | Focus minutes: {pomodoro.focusMinutes || 0}
                </p>
              </div>
            </Card>

            <Card
              title="Habits"
              action={<button className="text-sm font-medium text-sky-500">View All</button>}
            >
              <div className="space-y-4">
                {habitSummary.length ? (
                  habitSummary.slice(0, 4).map((habit) => (
                    <div key={habit.id} className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-medium text-slate-700">{habit.title}</p>
                        <p className="shrink-0 text-sm text-slate-500">{habit.score}%</p>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <HabitDots done={habit.done} total={7} />
                        <span className="shrink-0 text-xs text-slate-400">{habit.done}/7</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No habits available.</p>
                )}
              </div>
            </Card>

            <div className="rounded-3xl bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-400 p-6 text-white shadow-lg">
              <p className="text-sm font-medium text-white/80">Motivation</p>
              <p className="mt-6 text-base leading-7 text-white/95">
                Progress comes from the habits you repeat and the tasks you finish.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}