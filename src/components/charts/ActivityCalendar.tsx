interface ActivityDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4; // Niveau d'activité (0 = aucune, 4 = très active)
}

interface ActivityCalendarProps {
  data: ActivityDay[];
}

export const ActivityCalendar = ({ data }: ActivityCalendarProps) => {
  // Générer les 52 dernières semaines (plus gérable)
  const generateCalendarDays = () => {
    const days = [];
    const today = new Date();
    const weeksToShow = 52;
    
    for (let i = weeksToShow * 7 - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dateStr = date.toISOString().split('T')[0];
      const dayData = data.find(d => d.date === dateStr);
      
      days.push({
        date: dateStr,
        count: dayData?.count || Math.floor(Math.random() * 5), // Mock data pour demo
        level: (dayData?.level || Math.floor(Math.random() * 5)) as 0 | 1 | 2 | 3 | 4,
        day: date.getDay(),
        week: Math.floor(i / 7)
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const getActivityColor = (level: number) => {
    // Style GitHub avec progression claire d'intensité
    const colors = {
      0: 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700',           // Aucune activité
      1: 'bg-green-200 dark:bg-green-900/60 border-green-300 dark:border-green-800',   // Faible
      2: 'bg-green-300 dark:bg-green-800/80 border-green-400 dark:border-green-700',   // Modérée  
      3: 'bg-green-400 dark:bg-green-700 border-green-500 dark:border-green-600',      // Élevée
      4: 'bg-green-500 dark:bg-green-600 border-green-600 dark:border-green-500'       // Très élevée
    };
    return colors[level as keyof typeof colors] || colors[0];
  };

  const dayLabels = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  // Organiser les jours par semaines
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  // Calculer les statistiques
  const totalContributions = calendarDays.reduce((sum, day) => sum + day.count, 0);
  const activeDays = calendarDays.filter(day => day.count > 0).length;
  const currentStreak = (() => {
    let streak = 0;
    for (let i = calendarDays.length - 1; i >= 0; i--) {
      if (calendarDays[i].count > 0) streak++;
      else break;
    }
    return streak;
  })();

  return (
    <div className="space-y-4">
      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-muted/30 rounded-lg p-2">
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{totalContributions}</div>
          <div className="text-xs text-muted-foreground">Contributions</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-2">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{activeDays}</div>
          <div className="text-xs text-muted-foreground">Jours actifs</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-2">
          <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{currentStreak}</div>
          <div className="text-xs text-muted-foreground">Streak actuel</div>
        </div>
      </div>

      {/* Calendrier avec scroll personnalisé */}
      <div className="relative">
        <div className="overflow-x-auto activity-calendar-scroll">
          <div className="min-w-fit pb-2">
            {/* Labels des jours */}
            <div className="flex mb-2">
              <div className="w-6"></div> {/* Espace pour aligner */}
              <div className="flex flex-col gap-1 text-xs text-muted-foreground mr-2">
                {dayLabels.map((day, index) => (
                  <div key={day} className="h-3 flex items-center justify-center w-4">
                    {index % 2 === 1 && <span className="font-medium">{day}</span>}
                  </div>
                ))}
              </div>
              
              {/* Grille d'activité */}
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={day.date}
                        className={`w-3 h-3 rounded-sm border cursor-pointer transition-all duration-200 hover:scale-125 hover:ring-1 hover:ring-green-400 hover:z-10 relative hover:shadow-sm ${getActivityColor(day.level)}`}
                        title={`${new Date(day.date).toLocaleDateString('fr-FR')}: ${day.count} contributions (Niveau ${day.level})`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Légende améliorée */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Moins</span>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm border ${getActivityColor(level)}`}
              title={`Niveau ${level}`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">Plus</span>
      </div>
    </div>
  );
};
