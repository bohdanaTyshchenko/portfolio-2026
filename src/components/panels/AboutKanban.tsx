"use client";

import { useRef, useState, type PointerEvent } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import { typography } from "@/lib/typography";

type ColumnId = "backlog" | "in-progress" | "done";

type Priority = "low" | "medium" | "high";

type Task = {
  id: string;
  title: string;
  priority: Priority;
  column: ColumnId;
};

type DragState = {
  taskId: string;
  width: number;
  offsetX: number;
  offsetY: number;
  x: number;
  y: number;
};

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: "backlog", title: "Backlog" },
  { id: "in-progress", title: "In progress" },
  { id: "done", title: "Done" },
];

const INITIAL_TASKS: Task[] = [
  { id: "film", title: "Scan the last film roll", priority: "low", column: "backlog" },
  { id: "meetup", title: "Plan the next designer meetup", priority: "high", column: "backlog" },
  { id: "tiktok", title: "Film a TikTok about design careers", priority: "medium", column: "backlog" },
  { id: "trip", title: "Book flights for country #26", priority: "medium", column: "in-progress" },
  { id: "portfolio", title: "Ship portfolio 2026", priority: "high", column: "in-progress" },
  { id: "dms", title: "Reply to Instagram DMs", priority: "low", column: "done" },
];

const PRIORITY_CHIP: Record<Priority, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-[#e5f1fd] text-p-blue" },
  medium: { label: "Medium", className: "bg-p-pink-50 text-p-pink" },
  high: { label: "High", className: "bg-[#ffe6df] text-p-orange" },
};

function fireConfetti() {
  const defaults = {
    spread: 70,
    ticks: 220,
    gravity: 0.9,
    scalar: 1,
    zIndex: 200,
    colors: ["#ff9fc0", "#def283", "#6fb4f4", "#ff552a", "#ffffff"],
  };

  confetti({ ...defaults, particleCount: 90, origin: { x: 0.3, y: 0.6 } });
  confetti({ ...defaults, particleCount: 90, origin: { x: 0.7, y: 0.6 } });
  window.setTimeout(() => {
    confetti({ ...defaults, particleCount: 60, spread: 100, origin: { x: 0.5, y: 0.4 } });
  }, 250);
}

function TaskCardBody({ task }: { task: Task }) {
  const chip = PRIORITY_CHIP[task.priority];

  return (
    <>
      <p
        className={`${typography.bodyS} text-p-text ${
          task.column === "done" ? "line-through opacity-50" : ""
        }`}
      >
        {task.title}
      </p>
      <span
        className={`self-start rounded-full px-2 py-0.5 ${typography.caption} ${chip.className}`}
      >
        {chip.label}
      </span>
    </>
  );
}

export function AboutKanban() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [dropTarget, setDropTarget] = useState<ColumnId | null>(null);
  const celebratedRef = useRef(false);

  const moveTask = (taskId: string, column: ColumnId) => {
    setTasks((current) => {
      const next = current.map((task) =>
        task.id === taskId ? { ...task, column } : task,
      );

      const allDone = next.every((task) => task.column === "done");

      if (allDone && !celebratedRef.current) {
        celebratedRef.current = true;
        fireConfetti();
      } else if (!allDone) {
        celebratedRef.current = false;
      }

      return next;
    });
  };

  const columnAtPoint = (x: number, y: number): ColumnId | null => {
    const column = document
      .elementFromPoint(x, y)
      ?.closest<HTMLElement>("[data-kanban-column]");

    return (column?.dataset.kanbanColumn as ColumnId | undefined) ?? null;
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>, task: Task) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.setPointerCapture(event.pointerId);

    setDrag({
      taskId: task.id,
      width: rect.width,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag) {
      return;
    }

    setDrag({ ...drag, x: event.clientX, y: event.clientY });
    setDropTarget(columnAtPoint(event.clientX, event.clientY));
  };

  const endDrag = (commit: boolean) => {
    if (drag && commit && dropTarget) {
      moveTask(drag.taskId, dropTarget);
    }

    setDrag(null);
    setDropTarget(null);
  };

  const draggedTask = drag
    ? tasks.find((task) => task.id === drag.taskId)
    : undefined;

  return (
    <div className="grid w-full min-w-0 grid-cols-1 gap-3 rounded-[20px] bg-p-grey-5 p-4 sm:grid-cols-3 sm:p-5">
      {COLUMNS.map((column) => {
        const columnTasks = tasks.filter((task) => task.column === column.id);
        const isDropTarget = dropTarget === column.id && drag !== null;

        return (
          <div
            key={column.id}
            data-kanban-column={column.id}
            className={`flex h-[240px] min-w-0 flex-col rounded-[14px] bg-p-white p-3 transition-shadow duration-300 sm:h-[320px] ${
              isDropTarget ? "shadow-[inset_0_0_0_2px_var(--color-p-grey-20)]" : ""
            }`}
          >
            <div className="flex shrink-0 items-center justify-between px-1 pb-2">
              <p className={`${typography.h6} uppercase text-p-text`}>
                {column.title}
              </p>
              <span className={`${typography.bodyS} text-p-grey-50`}>
                {columnTasks.length}
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain">
              {columnTasks.map((task) => (
                <div
                  key={task.id}
                  onPointerDown={(event) => handlePointerDown(event, task)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={() => endDrag(true)}
                  onPointerCancel={() => endDrag(false)}
                  className={`flex shrink-0 cursor-grab touch-none select-none flex-col gap-2 rounded-[10px] border border-p-grey-10 bg-p-white p-3 transition-[opacity,box-shadow] duration-200 hover:shadow-[0_4px_4.15px_rgba(0,0,0,0.1)] active:cursor-grabbing ${
                    drag?.taskId === task.id ? "opacity-40" : ""
                  }`}
                >
                  <TaskCardBody task={task} />
                </div>
              ))}

              {columnTasks.length === 0 ? (
                <div
                  className={`flex flex-1 items-center justify-center rounded-[10px] border border-dashed border-p-grey-10 px-2 py-4 text-center ${typography.bodyS} text-p-grey-40`}
                >
                  Drop a task here
                </div>
              ) : null}
            </div>
          </div>
        );
      })}

      {drag && draggedTask
        ? createPortal(
            <div
              style={{
                position: "fixed",
                left: drag.x - drag.offsetX,
                top: drag.y - drag.offsetY,
                width: drag.width,
                zIndex: 300,
              }}
              className="pointer-events-none flex rotate-2 flex-col gap-2 rounded-[10px] border border-p-grey-10 bg-p-white p-3 shadow-[0_12px_24px_rgba(0,0,0,0.18)]"
              aria-hidden
            >
              <TaskCardBody task={draggedTask} />
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
