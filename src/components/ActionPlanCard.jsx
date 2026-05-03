import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export default function ActionPlanCard({ profile, onCompleteTask }) {
  const tasks = [
    { id: 1, title: 'Verify Registration Status', completed: profile.readiness > 30 },
    { id: 2, title: 'Find Polling Station', completed: profile.readiness > 50 },
    { id: 3, title: 'Review Candidates', completed: profile.readiness > 70 },
    { id: 4, title: 'Cast Vote', completed: profile.readiness >= 90 }
  ];

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-xl border border-white/5 h-full">
      <h3 className="text-xl font-bold text-white mb-4">Action Plan</h3>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-start gap-3 group cursor-pointer" onClick={() => onCompleteTask(task.id)}>
            <button className="mt-0.5 focus:outline-none transition-transform group-hover:scale-110">
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-secondary" />
              ) : (
                <Circle className="w-5 h-5 text-gray-500 group-hover:text-primary" />
              )}
            </button>
            <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
              {task.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
